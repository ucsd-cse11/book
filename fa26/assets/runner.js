// Page-side client for the modern-Java runner. All heavy lifting — the
// CheerpJ JVM, the resident ECJ compiler, program runs — lives in
// runner17-worker.js, which starts warming up when the page connects, so
// by the time a reader clicks Run the one-time setup has usually finished,
// and the page never freezes while Java is working.
//
// The worker is a SharedWorker where supported, so several open book tabs
// share one JVM and one warm-up (dedicated Worker fallback: Chrome for
// Android). Connection waits until the tab is actually visible — a stack
// of tabs opened in the background doesn't start a stack of warm-ups.
//
// Student code is written implicit-main style (`void main() { ... }`); a
// wrapper class is injected before compiling, and compiler messages are
// mapped back to the student's own line numbers. Images the program
// show()s are displayed below the widget.
'use strict';

(function () {
  let channel = null; // { post } once connected
  let warmupState = 'preparing Java…';
  const jobs = new Map();
  let nextId = 1;

  // Recorded output for untouched widgets (tools/capture-runs.js), keyed by a
  // hash of the source and, for a widget that names one, its file. A
  // reader's first Run on code they have not edited is painted from the
  // recording instead of waiting out the warm-up. `nocapture`
  // in the query turns this off, which is how the test suite and the recorder
  // itself still exercise the live path.
  // Fetched on the first Run rather than at load, so it never competes with
  // CheerpJ's warm-up for the browser's attention, and a reader who never runs
  // anything never asks for it. It is a few kilobytes against a wait of
  // seconds, so paying for it inside the click is free.
  let capturesPromise = null;
  function loadCaptures() {
    if (capturesPromise) return capturesPromise;
    capturesPromise = /(^|&)nocapture(=|&|$)/.test(location.search.slice(1))
      ? Promise.resolve(null)
      : fetch(new URL('../assets/prerender/index.json', document.baseURI))
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null);
    return capturesPromise;
  }

  // The same FNV-1a that lib/book.typ and tools/capture-runs.js use, so one
  // source string keys alike in Typst, in node, and here.
  function sourceKey(s) {
    let h = 2166136261;
    for (const b of new TextEncoder().encode(s)) {
      h = (h ^ b) >>> 0;
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h.toString(16).padStart(8, '0');
  }

  function captureKey(source, file) {
    return sourceKey(file ? file + '\u0000' + source : source);
  }

  // A worker that was stopped can never be reused — the program it was
  // running may still be spinning inside it — so each restart takes its
  // successor under a new name. Tabs agree on that name through
  // localStorage, which is what keeps them sharing one JVM across a
  // restart instead of warming up one apiece.
  const GEN_KEY = 'book-runner-gen';
  let genFallback = 0;
  function generation() {
    try { return Number(localStorage.getItem(GEN_KEY)) || 0; } catch (e) { return genFallback; }
  }
  function bumpGeneration() {
    genFallback = generation() + 1;
    try { localStorage.setItem(GEN_KEY, String(genFallback)); } catch (e) { /* no storage */ }
  }

  function ensureChannel() {
    if (channel) return channel;
    const url = new URL('../assets/runner-worker.js', document.baseURI);
    let target = null;
    let terminate = null;
    let mode = 'dedicated';
    if (typeof SharedWorker !== 'undefined') {
      try {
        const sw = new SharedWorker(url, { name: 'book-runner-' + generation() });
        sw.onerror = (e) => onWorkerFailure(e.message || 'worker error');
        target = sw.port;
        mode = 'shared';
      } catch (e) { /* fall through to a dedicated worker */ }
    }
    if (!target) {
      const w = new Worker(url);
      w.onerror = (e) => onWorkerFailure(e.message || 'worker error');
      target = w;
      terminate = () => w.terminate();
    }
    document.documentElement.dataset.javaWorker = mode;
    target.onmessage = onWorkerMessage;
    target.onmessageerror = () => onWorkerFailure('message error');
    channel = { post: (msg) => target.postMessage(msg), terminate };
    return channel;
  }

  // Let go of the worker without touching any job. A dedicated one can be
  // killed outright; a SharedWorker cannot be terminated from a page, so it
  // is asked to close itself and abandoned either way.
  function dropChannel() {
    if (channel && channel.terminate) {
      try { channel.terminate(); } catch (e) { /* already gone */ }
    }
    channel = null;
    warmupState = 'preparing Java…';
  }

  // Give up on whatever Java is doing. CheerpJ cannot interrupt a running
  // program, so this is the only honest answer to Stop: throw the worker
  // away, JVM and all, and pay the warm-up again on the next Run.
  function stopAll(label) {
    if (channel) { try { channel.post({ type: 'stop' }); } catch (e) { /* gone */ } }
    bumpGeneration();
    dropChannel();
    abandonJobs(label);
  }

  function abandonJobs(label) {
    const orphaned = [...jobs.values()];
    jobs.clear();
    for (const job of orphaned) {
      clearTimeout(job.nudge);
      cancelAnimationFrame(job.frame);
      render(job);
      job.out.hidden = job.buffer.trim() === '';
      paintTerminal(job.out, 'done');
      job.state.textContent = label;
      job.button.disabled = false;
      setRunning(job.widget, false);
      job.resolve({
        ok: false, compileError: false, stopped: true, images: 0,
        output: job.out.textContent,
      });
      announce(job.widget);
    }
  }

  // Another tab stopped the worker we were sharing.
  window.addEventListener('storage', (e) => {
    if (e.key === GEN_KEY) dropChannel();
  });

  function setRunning(widget, on) {
    if (!widget) return;
    if (on) widget.setAttribute('data-running', '');
    else widget.removeAttribute('data-running');
  }

  // Long enough that a slow-but-finite example finishes first, short enough
  // that a reader who wrote a loop notices Stop is sitting there.
  const NUDGE_MS = 8000;
  function armNudge(job) {
    clearTimeout(job.nudge);
    job.nudge = setTimeout(() => { job.state.textContent = 'still running…'; }, NUDGE_MS);
  }

  // Warm up as soon as the reader is actually looking at this tab.
  if (document.visibilityState === 'visible') {
    ensureChannel();
  } else {
    document.addEventListener('visibilitychange', function onVisible() {
      if (document.visibilityState === 'visible') {
        document.removeEventListener('visibilitychange', onVisible);
        ensureChannel();
      }
    });
  }

  // Echo mode (data-echo widgets): main is optional and invoked
  // reflectively; afterwards every non-static student field is reported
  // tester-style (`this.name = value`), with Pict/Raster fields rendered
  // as images via ImageIO_.show.
  // A run that throws still returns normally from cheerpjRunMain, so the
  // wrapper reports it: a sentinel line on stderr (which the worker
  // swallows) and then the exception continues on its way, trace intact.
  const FAILED = '\u0001__FAILED__\u0001';
  const GUARD_OPEN = 'class __Main { public static void main(String[] args) throws Throwable { try {';
  const GUARD_CLOSE = ' } catch (Throwable t) { System.err.println("' + FAILED + '"); throw t; } } }\n';

  const ECHO_MAIN = GUARD_OPEN
    + ' __Main.class.getClassLoader().setDefaultAssertionStatus(true);'
    + ' ImageIO_.__reset();'
    + ' __Prog p = new __Prog();'
    + ' try { java.lang.reflect.Method m = __Prog.class.getDeclaredMethod("main");'
    + ' m.setAccessible(true); m.invoke(p); }'
    + ' catch (NoSuchMethodException e) { /* fields-only program: just echo */ }'
    + ' catch (java.lang.reflect.InvocationTargetException e) {'
    + ' Throwable c = e.getCause();'
    + ' if (c instanceof RuntimeException r) throw r;'
    + ' if (c instanceof Error err) throw err;'
    + ' throw new Exception(c); }'
    + ' for (java.lang.reflect.Field f : __Prog.class.getDeclaredFields()) {'
    + ' if (f.isSynthetic() || java.lang.reflect.Modifier.isStatic(f.getModifiers())) continue;'
    + ' f.setAccessible(true); Object v = f.get(p);'
    + ' System.out.println(f.getName() + " = " + v);'
    + ' if (v instanceof Pict pic) ImageIO_.show(pic);'
    + ' else if (v instanceof Raster r) ImageIO_.show(r); }'
    + GUARD_CLOSE;

  const PLAIN_MAIN = GUARD_OPEN
    // assertions on for student code: must happen before __Prog loads
    + ' __Main.class.getClassLoader().setDefaultAssertionStatus(true);'
    + ' ImageIO_.__reset(); new __Prog().main();'
    + GUARD_CLOSE;

  // Wrap implicit-main student code: imports stay at the top of the unit,
  // everything else becomes the body of a class. Adds exactly one line in
  // front of the body — fixLineNumbers undoes that in error messages.
  function wrap(code, echo) {
    const lines = code.split('\n');
    let split = 0;
    while (split < lines.length && /^\s*(import\s|$)/.test(lines[split])) split++;
    const header = lines.slice(0, split);
    const body = lines.slice(split);
    return {
      source: header.join('\n') + (header.length ? '\n' : '')
        + 'import static org.junit.jupiter.api.Assertions.*; class __Prog {\n' + body.join('\n') + '\n}\n'
        + (echo ? ECHO_MAIN : PLAIN_MAIN),
      headerLines: split,
      studentLines: lines.length,
    };
  }

  // `name` is what the student thinks they are running: the file a chapter
  // named with #run(file: ...), or just "Program". The wrapper class has to
  // exist — CheerpJ tops out at Java 17, which has no implicit main — but
  // the reader should never meet it, so the compiler's own messages get its
  // name swapped for one the reader recognises.
  function fixLineNumbers(text, headerLines, name, studentLines) {
    const toStudentLine = (n) => (Number(n) > headerLines ? Number(n) - 1 : Number(n));
    // A complaint about the wrapper's own lines — "no main", say — maps past
    // the end of what the reader wrote. Citing a line they do not have is
    // worse than citing none, so that error loses its line and keeps its
    // message.
    const own = (n) => {
      const line = toStudentLine(n);
      return !studentLines || (line >= 1 && line <= studentLines);
    };
    return text
      // compile errors cite the full /str/ path
      .replace(/\/str\/Program\.java:(\d+):\s*/g,
        (m, n) => (own(n) ? `line ${toStudentLine(n)}: ` : ''))
      .replace(/\/str\/Program\.java:(\d+)/g, (m, n) => `line ${toStudentLine(n)}`)
      // runtime stack traces (e.g. a failed assert): CheerpJ reports frames
      // as "(Unknown Source)" — no line info at runtime — but the wrapper
      // frames are still noise to a student. Keep the filename rewrite too
      // in case a future CheerpJ starts reading LineNumberTable.
      .replace(/\s*at __Main\.main\([^)]*\)/g, '')
      // echo mode invokes main reflectively; those frames are also noise
      .replace(/\s*at (?:java\.base\/)?(?:jdk\.internal\.reflect|java\.lang\.reflect)\.[^\n]*/g, '')
      .replace(/\(Program\.java:(\d+)\)/g, (m, n) => `(line ${toStudentLine(n)})`)
      .replace(/\bat __Prog\./g, 'at ')
      // compiler messages reach student fields and methods through the
      // wrapper class ("Duplicate field __Prog.x"): drop the prefix, the
      // student never wrote it
      .replace(/\b__Prog\./g, '')
      // and where the class itself is the subject ("The method main() is
      // undefined for the type __Prog" — what a program with no main says)
      // it takes the name of the file the reader thinks they are running
      .replace(/\b__Prog\b/g, name || 'Program');
  }

  // ImageIO_.show prints one of these per image; the image itself arrives
  // with the result, and takes the marker's place in the output box.
  const SHOWN = /\u0001__SHOWN__(\d+)\u0001\n?/g;
  // The marker tools/capture-runs.js leaves where an image sat.
  const CAPTURED = /\[\[IMG:(\d+)\]\]/g;

  // Text carrying image markers becomes text nodes and <img>s. srcFor turns a
  // marker's index into a url: a blob for a live run, a file for a recording.
  function paintOutput(out, text, marker, srcFor) {
    out.replaceChildren();
    let last = 0;
    for (const m of text.matchAll(marker)) {
      out.append(text.slice(last, m.index));
      const src = srcFor(Number(m[1]));
      if (src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'shown image';
        out.append(img);
      }
      last = m.index + m[0].length;
    }
    out.append(text.slice(last));
  }

  // A widget whose chapter named a file (#run(file: ...)) shows its run as a
  // terminal session. The output box itself is untouched — it is wrapped in
  // the same .terminal markup #term emits, between a typed command and the
  // prompt coming back — so a run that prints nothing still shows that it
  // ran and that the shell returned.
  function promptLine(cmd) {
    const line = document.createElement('div');
    line.className = 'line in';
    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = '$ ';
    line.append(prompt);
    if (cmd) {
      const text = document.createElement('span');
      text.className = 'cmd';
      text.textContent = cmd;
      line.append(text);
    }
    return line;
  }

  function frameAsTerminal(widget) {
    const file = widget.dataset.file;
    const out = widget.querySelector('pre.out');
    if (!file || !out || out.closest('.terminal')) return;
    const frame = document.createElement('div');
    frame.className = 'terminal';
    frame.hidden = true;
    out.parentNode.insertBefore(frame, out);
    const waiting = promptLine(null);
    waiting.classList.add('waiting');
    frame.append(promptLine('java ' + file), out, waiting);
  }

  // phase: 'start' while the program runs (no prompt yet), 'done' once it
  // has finished and the shell has come back.
  function paintTerminal(out, phase) {
    const frame = out.parentElement;
    if (!frame || !frame.classList.contains('terminal')) return;
    frame.hidden = false;
    frame.lastElementChild.classList.toggle('waiting', phase !== 'done');
  }

  // A runaway loop prints faster than anyone can read, and re-rendering the
  // whole buffer on every message would wedge the page Stop is there to
  // rescue. So: keep the tail, and repaint at most once a frame.
  const MAX_OUTPUT = 100000;
  const DROPPED = '…earlier output dropped…\n';
  function appendOutput(job, text) {
    job.buffer += text;
    if (job.buffer.length <= MAX_OUTPUT) return;
    const from = job.buffer.length - MAX_OUTPUT;
    const nl = job.buffer.indexOf('\n', from);
    job.buffer = DROPPED + job.buffer.slice(nl < 0 ? from : nl + 1);
  }

  function scheduleRender(job) {
    if (job.frame) return;
    job.frame = requestAnimationFrame(() => { job.frame = 0; render(job); });
  }

  function render(job, images) {
    const text = fixLineNumbers(job.buffer, job.headerLines, job.name, job.studentLines);
    paintOutput(job.out, text, SHOWN, (n) => {
      const buf = images && images[n];
      return buf ? URL.createObjectURL(new Blob([buf], { type: 'image/png' })) : null;
    });
  }

  function onWorkerMessage(e) {
    const m = e.data;
    if (m.type === 'closing') {
      // The worker is going away — this tab's Stop, or another tab's.
      dropChannel();
      abandonJobs('stopped');
    } else if (m.type === 'state') {
      warmupState = m.label;
      // Progress is per-run once a job is active; before that, reflect the
      // warm-up phase on any widget the reader has already clicked.
      for (const job of jobs.values()) {
        job.state.textContent = m.label;
        // Only the program's own time is worth nudging about; the warm-up
        // before it is not the reader's fault.
        if (m.label === 'running…') armNudge(job);
      }
    } else if (m.type === 'console') {
      const job = jobs.get(m.id);
      if (!job) return;
      appendOutput(job, m.text);
      job.out.hidden = false;
      paintTerminal(job.out, 'start');
      scheduleRender(job);
    } else if (m.type === 'result') {
      const job = jobs.get(m.id);
      if (!job) return;
      jobs.delete(m.id);
      finishRun(job, m);
    }
  }

  function onWorkerFailure(message) {
    warmupState = 'Java setup failed: ' + message;
    for (const job of jobs.values()) {
      clearTimeout(job.nudge);
      job.state.textContent = warmupState;
      job.button.disabled = false;
      setRunning(job.widget, false);
      job.resolve({ ok: false, compileError: false, images: 0, output: warmupState });
      announce(job.widget);
    }
    jobs.clear();
  }

  // A run reached a terminal state and the reader has something to look at
  // — success, failure, or a runtime that never loaded. gate.js listens.
  function announce(widget) {
    widget.dispatchEvent(new CustomEvent('run-done', { bubbles: true }));
  }

  function finishRun(job, result) {
    clearTimeout(job.nudge);
    cancelAnimationFrame(job.frame);
    setRunning(job.widget, false);
    render(job, result.images);
    job.out.hidden = job.buffer.trim() === '';
    paintTerminal(job.out, 'done');
    if (!result.ok) job.out.classList.add('err');
    job.state.textContent =
      result.compileError ? 'compile error' : result.ok ? 'done' : 'failed';
    job.button.disabled = false;
    job.resolve({
      ok: result.ok, compileError: result.compileError,
      images: (result.images || []).length, output: job.out.textContent,
    });
    announce(job.widget);
  }

  // Run one program. The caller owns the UI it lands in: `button` is held
  // disabled for the duration, `state` shows progress, `out` receives
  // output and images, and `widget` gets the run-done event.
  // Resolves with {ok, compileError, output} — never rejects.
  function run({ source: student, echo, widget, button, state, out }) {
    return new Promise((resolve) => {
      const { source, headerLines, studentLines } = wrap(student, !!echo);
      const name = ((widget && widget.dataset.file) || '').replace(/\.java$/, '') || 'Program';
      button.disabled = true;
      setRunning(widget, true);
      out.hidden = true;
      out.textContent = '';
      out.classList.remove('err');
      paintTerminal(out, 'start');

      const id = nextId++;
      jobs.set(id, {
        widget, button, state, out, headerLines, studentLines, name,
        buffer: '', resolve, nudge: 0, frame: 0,
      });
      state.textContent = warmupState || 'queued…';
      ensureChannel().post({ type: 'run', id, source });
    });
  }

  // Paint a recording and report the run as finished, so gates and anything
  // else listening for run-done behave exactly as after a live run.
  function showCapture(widget, key, cap) {
    const out = widget.querySelector('pre.out');
    paintOutput(out, cap.text, CAPTURED, (n) =>
      new URL('../assets/prerender/' + key + '-' + n + '.png', document.baseURI).href);
    out.hidden = cap.text.trim() === '';
    paintTerminal(out, 'done');
    out.classList.toggle('err', cap.state !== 'done');
    widget.querySelector('.state').textContent = cap.state;
    announce(widget);
  }

  // A reader's first Run on code they have not touched is answered from the
  // recording, which is what it would have printed anyway. Every later run, and
  // anything they have edited, goes to the worker, which is warm by then.
  async function startRun(widget) {
    const source = widget.querySelector('textarea').value;
    const first = !widget.hasAttribute('data-ran');
    widget.setAttribute('data-ran', '');
    if (first) {
      const captures = await loadCaptures();
      const key = captures && captureKey(source, widget.dataset.file);
      if (key && captures[key]) return showCapture(widget, key, captures[key]);
    }
    run({
      source,
      echo: widget.hasAttribute('data-echo'),
      widget,
      button: widget.querySelector('button.run'),
      state: widget.querySelector('.state'),
      out: widget.querySelector('pre.out'),
    });
  }

  // Wire the runner widgets in `root` (a step's article, or the whole
  // document on first load). Idempotent: a widget is wired once. The
  // worker/channel above is never re-created, so stepping between pages
  // (nav.js) keeps the JVM warm.
  // Syntax colouring for the editable code. The textarea stays the source
  // of truth (and what the tests type into); a <pre> painted behind it
  // carries the colours, and the textarea's own text is transparent. The
  // palette and the token classes follow Typst's HTML export of a ```java
  // listing, so a widget and a prose listing look the same.
  const KEYWORDS = new Set(('abstract assert boolean break byte case catch char class const '
    + 'continue default do double else enum extends final finally float for goto if '
    + 'implements import instanceof int interface long native new package private '
    + 'protected public return short static strictfp super switch synchronized this '
    + 'throw throws transient try void volatile while var record sealed permits yield '
    + 'true false null').split(' '));
  const TOKEN = /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|("(?:[^"\\\n]|\\.)*"?|'(?:[^'\\\n]|\\.)*'?)|(@[A-Za-z_]\w*)|(\d\w*(?:\.\d\w*)?)|([A-Za-z_$][\w$]*)|([-+*\/%=!<>&|^~?:]+)|([\s\S])/gy;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Tokens, split so that no piece spans a newline: an array of lines, each
  // a list of [class-or-null, text] pieces.
  function tokenize(src) {
    const lines = [[]];
    TOKEN.lastIndex = 0;
    let m;
    while ((m = TOKEN.exec(src)) !== null) {
      const [text, cm, st, an, nu, id, op] = m;
      let cls = null;
      if (cm) cls = 'cm';
      else if (st) cls = 'st';
      else if (an) cls = 'an';
      else if (nu) cls = 'nu';
      else if (op) cls = 'kw';
      else if (id) {
        const next = src.slice(TOKEN.lastIndex).match(/^\s*(.)/);
        if (KEYWORDS.has(id)) cls = 'kw';
        else if (next && next[1] === '(') cls = 'ty';
        else if (/^[A-Z][A-Z0-9_]+$/.test(id)) cls = 'nu';
        else if (/^[A-Z]/.test(id)) cls = 'ty';
      }
      const parts = text.split('\n');
      parts.forEach((part, i) => {
        if (i > 0) lines.push([]);
        if (part) lines[lines.length - 1].push([cls, part]);
      });
    }
    return lines;
  }

  // One line's pieces to HTML; [a, b) is a character range to mark as
  // inserted (cut through tokens as needed), or null.
  function lineHtml(pieces, ins) {
    let html = '';
    let pos = 0;
    let open = false;
    const emit = (cls, text, marked) => {
      if (marked !== open) { html += marked ? '<span class="ins">' : '</span>'; open = marked; }
      html += cls ? '<span class="' + cls + '">' + esc(text) + '</span>' : esc(text);
    };
    for (const [cls, text] of pieces) {
      if (!ins) { emit(cls, text, false); continue; }
      let start = pos;
      const end = pos + text.length;
      // split the piece at the range boundaries that fall inside it
      for (const cut of [ins[0], ins[1]]) {
        if (cut > start && cut < end) {
          emit(cls, text.slice(start - pos, cut - pos), start >= ins[0] && start < ins[1]);
          start = cut;
        }
      }
      emit(cls, text.slice(start - pos), start >= ins[0] && start < ins[1]);
      pos = end;
    }
    if (open) html += '</span>';
    return html;
  }

  // Longest common subsequence over lines compared without leading
  // whitespace, so a re-indented line still pairs with its old self.
  function alignLines(before, after) {
    const key = (l) => l.replace(/^\s+/, '');
    const n = before.length, m = after.length;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        dp[i][j] = key(before[i]) === key(after[j])
          ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    // For each line of `after`: {same: true} (paired with an old line), or
    // {same: false, ins: [a, b) | null, deletedBefore: k} for a new line.
    const out = [];
    let i = 0, j = 0, deleted = 0;
    while (j < m) {
      if (i < n && key(before[i]) === key(after[j])) {
        out.push({ same: true, deletedBefore: deleted }); deleted = 0; i++; j++;
      } else if (i < n && dp[i + 1][j] >= dp[i][j + 1]) {
        deleted++; i++;
      } else {
        out.push({ same: false, deletedBefore: deleted }); deleted = 0; j++;
      }
    }
    // A new line that replaces a deleted one: mark only the changed span.
    // Walk deleted old lines alongside new lines in order and pair them.
    let di = 0;
    const olds = [];
    i = 0; j = 0;
    for (const o of out) {
      if (o.same) { i += o.deletedBefore + 1; olds.length = 0; j++; continue; }
      for (let k = 0; k < o.deletedBefore; k++) olds.push(before[i + k]);
      i += o.deletedBefore;
      const old = olds.length ? olds.shift() : null;
      if (old !== null) {
        // a replacement, not a deletion followed by an insertion
        if (o.deletedBefore > 0) o.deletedBefore--;
        const cur = after[j];
        let a = 0;
        while (a < old.length && a < cur.length && old[a] === cur[a]) a++;
        let b = 0;
        while (b < old.length - a && b < cur.length - a
          && old[old.length - 1 - b] === cur[cur.length - 1 - b]) b++;
        if (a < cur.length - b) o.ins = [a, cur.length - b];
      }
      j++;
    }
    return out;
  }

  function highlight(src, before) {
    const lines = tokenize(src);
    const srcLines = src.split('\n');
    const marks = before == null ? null : alignLines(before.split('\n'), srcLines);
    const html = lines.map((pieces, k) => {
      if (!marks) return lineHtml(pieces, null);
      const mk = marks[k] || { same: false };
      const cls = 'line ' + (mk.same ? 'same' : 'new')
        + (mk.deletedBefore ? ' del-before' : '');
      const ins = mk.same ? null : (mk.ins || null);
      return '<span class="' + cls + '">' + lineHtml(pieces, ins) + '</span>';
    }).join('\n');
    // A trailing newline needs something after it to occupy a line box the
    // way the textarea's does.
    return html + '\u200b';
  }

  function attachHighlighter(textarea, before) {
    const editor = document.createElement('div');
    editor.className = 'editor';
    const hl = document.createElement('pre');
    hl.className = 'hl';
    hl.setAttribute('aria-hidden', 'true');
    textarea.parentNode.insertBefore(editor, textarea);
    editor.append(hl, textarea);
    const original = textarea.value;
    // The edit marks describe the original listing; once the reader types,
    // the diff is against nothing and the marks go.
    const paint = () => {
      hl.innerHTML = highlight(textarea.value, textarea.value === original ? before : null);
    };
    const sync = () => { hl.scrollTop = textarea.scrollTop; hl.scrollLeft = textarea.scrollLeft; };
    textarea.addEventListener('input', paint);
    textarea.addEventListener('scroll', sync);
    paint();
    return paint;
  }

  function hydrate(root) {
    for (const widget of (root || document).querySelectorAll('.runner')) {
      if (widget.dataset.wired) continue;
      widget.dataset.wired = '1';
      const textarea = widget.querySelector('textarea');
      const original = textarea.value;
      const revert = widget.querySelector('button.revert');
      // An edit widget is diffed against the previous widget's original
      // code (data-original, kept by the hydration of that widget).
      let before = null;
      if (widget.hasAttribute('data-edit')) {
        const all = [...document.querySelectorAll('.runner')];
        const prev = all[all.indexOf(widget) - 1];
        if (prev) before = prev.dataset.original;
      }
      widget.dataset.original = original;
      frameAsTerminal(widget);
      const paint = attachHighlighter(textarea, before);
      // Nothing to revert to until the reader edits: disable it so its
      // resting state reads as "unchanged", not "ready".
      const syncRevert = () => { revert.disabled = textarea.value === original; };
      syncRevert();
      textarea.addEventListener('input', syncRevert);
      widget.querySelector('button.run').addEventListener('click', () => {
        if (!widget.querySelector('button.run').disabled) startRun(widget);
      });
      const stop = widget.querySelector('button.stop');
      if (stop) stop.addEventListener('click', () => stopAll('stopped'));
      revert.addEventListener('click', () => { textarea.value = original; paint(); syncRevert(); });
    }
  }

  // For other page scripts (exercise.js runs code exercises through it) and
  // the step router (nav.js re-hydrates swapped-in content).
  window.bookRunner = { run, hydrate, stop: () => stopAll('stopped') };
  hydrate(document);
})();

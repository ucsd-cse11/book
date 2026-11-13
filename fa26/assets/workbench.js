'use strict';

(function () {
  let live = null;
  const flat = new URLSearchParams(location.search).get('reveal') === 'all';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = matchMedia('(max-width: 900px)');

  function lcs(a, b) {
    const n = a.length, m = b.length;
    const L = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
    for (let i = n - 1; i >= 0; i--) {
      for (let j = m - 1; j >= 0; j--) {
        L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
      }
    }
    const runs = [];
    let i = 0, j = 0;
    while (i < n || j < m) {
      if (i < n && j < m && a[i] === b[j]) { runs.push({ same: a[i] }); i++; j++; continue; }
      const olds = [], news = [];
      while ((i < n || j < m) && !(i < n && j < m && a[i] === b[j])) {
        if (j >= m || (i < n && L[i + 1][j] >= L[i][j + 1])) olds.push(a[i++]);
        else news.push(b[j++]);
      }
      runs.push({ olds, news });
    }
    return runs;
  }

  function trimmed(at, olds, news) {
    let p = 0;
    while (p < olds.length && p < news.length && olds[p] === news[p]) p++;
    let q = 0;
    while (q < olds.length - p && q < news.length - p
      && olds[olds.length - 1 - q] === news[news.length - 1 - q]) q++;
    const del = olds.length - p - q;
    const ins = news.slice(p, news.length - q);
    return del || ins ? [{ at: at + p, del, ins }] : [];
  }

  const TOKENS = /[A-Za-z_$][\w$]*|\d+|\s+|[\s\S]/g;
  function lineEdits(at, old, cur) {
    const ops = [];
    for (const r of lcs(old.match(TOKENS) || [], cur.match(TOKENS) || [])) {
      if ('same' in r) { at += r.same.length; continue; }
      const olds = r.olds.join('');
      ops.push(...trimmed(at, olds, r.news.join('')));
      at += olds.length;
    }
    return ops;
  }

  function edits(from, to) {
    const ops = [];
    let at = 0;
    const lines = (t) => t.split('\n').map((l) => l + '\n');
    for (const r of lcs(lines(from), lines(to))) {
      if ('same' in r) { at += r.same.length; continue; }
      const k = Math.min(r.olds.length, r.news.length);
      for (let x = 0; x < k; x++) {
        ops.push(...lineEdits(at, r.olds[x], r.news[x]));
        at += r.olds[x].length;
      }
      const restOld = r.olds.slice(k).join('');
      const restNew = r.news.slice(k).join('');
      if (restOld || restNew) ops.push({ at, del: restOld.length, ins: restNew });
      at += restOld.length;
    }
    return ops;
  }

  function textAt(start, ops, u) {
    let s = start, shift = 0, caret = 0;
    for (const op of ops) {
      const at = op.at + shift;
      const size = op.del + op.ins.length;
      if (u >= size) {
        s = s.slice(0, at) + op.ins + s.slice(at + op.del);
        shift += op.ins.length - op.del;
        caret = at + op.ins.length;
        u -= size;
        continue;
      }
      if (u <= op.del) {
        s = s.slice(0, at + op.del - u) + s.slice(at + op.del);
        caret = at + op.del - u;
      } else {
        s = s.slice(0, at) + op.ins.slice(0, u - op.del) + s.slice(at + op.del);
        caret = at + u - op.del;
      }
      return { s, caret };
    }
    return { s, caret };
  }

  function typeOut(ta, from, to) {
    return new Promise((resolve) => {
      const ops = edits(from + '\n', to + '\n');
      const total = ops.reduce((t, op) => t + op.del + op.ins.length, 0);
      if (reduced || !total) { ta.value = to; ta.dispatchEvent(new Event('input', { bubbles: true })); resolve(); return; }
      const duration = Math.min(900, total * 35);
      const lh = parseFloat(getComputedStyle(ta).lineHeight) || 18;
      const t0 = performance.now();
      const frame = (now) => {
        const done = now - t0 >= duration;
        const u = done ? total : Math.floor(total * (now - t0) / duration);
        const { s, caret } = textAt(from + '\n', ops, u);
        ta.value = done ? to : s.slice(0, -1);
        const line = ta.value.slice(0, caret).split('\n').length - 1;
        const y = line * lh;
        if (y < ta.scrollTop || y > ta.scrollTop + ta.clientHeight - 2 * lh) ta.scrollTop = Math.max(0, y - ta.clientHeight / 3);
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        if (done) resolve(); else requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    });
  }

  const norm = (s) => s.split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').trim();

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function teardown() {
    if (!live) return;
    const { cols, article, onProgress } = live;
    document.removeEventListener('gate-progress', onProgress);
    const current = document.querySelector('article.prose') || article;
    cols.parentNode.insertBefore(current, cols);
    cols.remove();
    document.querySelector('main').classList.remove('wb-on');
    live = null;
  }

  function init(root) {
    teardown();
    if (flat) return;
    root = root || document;
    const article = (root.matches && root.matches('article.prose'))
      ? root : root.querySelector('article.prose');
    if (!article || !article.querySelector(':scope > .workbench')) return;
    const runners = [...article.querySelectorAll(':scope > .runner')];
    if (!runners.length) return;

    const main = article.closest('main');
    main.classList.add('wb-on');
    const cols = el('div', 'wb-cols');
    const bench = el('div', 'wb-bench');
    const chat = el('div', 'wb-chat');
    article.parentNode.insertBefore(cols, article);
    cols.append(chat, bench);
    chat.append(article);

    const head = el('div', 'wb-head');
    const where = el('span', 'wb-where');
    const mode = el('span', 'wb-mode', 'Experimenting: your version, not the book’s');
    const latest = el('button', 'wb-latest', 'Back to the latest version');
    latest.type = 'button';
    head.append(where, mode, latest);
    const empty = el('div', 'wb-empty', 'The code shows up here when you press Try it.');
    bench.append(head, empty);

    const yours = el('div', 'wb-yours');
    yours.hidden = true;
    const yoursHead = el('div', 'wb-yours-head');
    const yoursOut = el('pre', 'out');
    yours.append(yoursHead, yoursOut);
    let yourRuns = 0;
    const spacer = el('div', 'wb-spacer');
    chat.append(spacer);

    const beats = runners.map((widget, i) => {
      const beat = el('div', 'wb-beat');
      if (widget.hasAttribute('data-gate')) beat.setAttribute('data-gate', '');
      const label = widget.dataset.label;
      const chip = el('button', 'wb-chip', 'Version ' + (i + 1) + (label ? ': ' + label : ''));
      chip.type = 'button';
      const go = el('button', 'wb-try', 'Try it ▶');
      go.type = 'button';
      const state = el('span', 'wb-state');
      const row = el('div', 'wb-row');
      row.append(chip, go, state);
      beat.append(row);
      widget.replaceWith(beat);
      bench.append(widget);
      widget.hidden = true;
      const textarea = widget.querySelector('textarea');
      const original = norm(window.bookRunner.unfold(widget, textarea.value));
      const b = { widget, beat, chip, go, state, textarea, original, book: textarea.value, kind: 'book',
        start: widget.hasAttribute('data-start') };
      if (b.start) go.textContent = 'Run ▶';
      widget.bookOutTarget = () => (b.kind === 'mine' ? yoursOut : widget.querySelector('pre.out'));
      const copy = el('button', 'wb-copy', 'Copy');
      copy.type = 'button';
      copy.title = 'Copy the whole program to the clipboard';
      const bar = widget.querySelector('.bar');
      bar.insertBefore(copy, bar.querySelector('button.revert'));
      copy.addEventListener('click', () => {
        const text = window.bookRunner.unfold(widget, textarea.value);
        const done = () => { copy.textContent = 'Copied'; setTimeout(() => { copy.textContent = 'Copy'; }, 1500); };
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, () => {});
        else { textarea.select(); document.execCommand('copy'); done(); }
      });
      new MutationObserver(() => {
        if (b.kind !== 'book') return;
        const running = widget.hasAttribute('data-running');
        go.textContent = running ? 'Stop ■' : (b.start ? 'Run ▶' : 'Try it ▶');
        go.classList.toggle('wb-stop', running);
        state.textContent = running ? widget.querySelector('.state').textContent : '';
      }).observe(widget, { attributes: true, attributeFilter: ['data-running'], subtree: true, childList: true, characterData: true });
      return b;
    });
    bench.append(yours);

    let shown = null;
    let pinned = false;
    let animating = false;
    const experimenting = () => !animating && !!shown && norm(window.bookRunner.unfold(shown.widget, shown.textarea.value)) !== shown.original;
    const pending = (b) => b.beat.classList.contains('gate-frontier') && b.beat.dataset.gateNeed === 'run';
    const tried = (b) => !b.beat.classList.contains('gated') && !pending(b);
    const newest = () => { const t = beats.filter(tried); return t[t.length - 1] || null; };

    function syncMode() {
      const on = experimenting();
      cols.toggleAttribute('data-experiment', on);
      for (const b of beats) {
        b.chip.disabled = (on && b !== shown) || (!tried(b) && !pending(b));
        b.go.disabled = on || animating;
        b.go.title = on ? 'Revert to the book’s version to try it' : '';
      }
      if (shown) shown.widget.querySelector('button.run').textContent = 'Run mine ▶';
      if (!on) yours.hidden = true;
      latest.hidden = !shown || shown === newest() || pending(shown);
    }

    function show(b) {
      if (shown === b) { syncMode(); return; }
      if (shown) { shown.widget.hidden = true; shown.beat.classList.remove('wb-current'); }
      shown = b;
      empty.hidden = !!b;
      if (b) {
        b.widget.hidden = false;
        b.beat.classList.add('wb-current');
        const i = beats.indexOf(b);
        const label = b.widget.dataset.label;
        where.textContent = 'Version ' + (i + 1) + ' of ' + beats.length + (label ? ': ' + label : '');
      } else {
        where.textContent = '';
      }
      syncMode();
    }

    function runBook(b) {
      b.kind = 'book';
      b.widget.querySelector('button.run').click();
    }

    function view(b, run = true) {
      show(b);
      if (run && b && !b.widget.hasAttribute('data-ran') && !b.widget.hasAttribute('data-running')) runBook(b);
    }

    function follow() {
      if (experimenting()) { syncMode(); return; }
      if (!pinned && !(shown && pending(shown) && shown.widget.hasAttribute('data-running'))) {
        const b = newest();
        view(b, !(b && b.start));
      } else syncMode();
    }

    async function tryIt(b) {
      if (experimenting() || animating) return;
      if (b.widget.hasAttribute('data-running')) { window.bookRunner.stop(); return; }
      pinned = false;
      if (b.start) { view(b, false); runBook(b); return; }
      const i = beats.indexOf(b);
      const from = i > 0 ? beats[i - 1].book : '';
      animating = true;
      b.textarea.value = from;
      show(b);
      await typeOut(b.textarea, from, b.book);
      animating = false;
      syncMode();
      runBook(b);
    }

    function scrollToTurn(target) {
      const header = document.querySelector('header');
      let top = header ? header.getBoundingClientRect().bottom : 0;
      if (narrow.matches) top += bench.offsetHeight;
      top += 12;
      spacer.style.height = '0px';
      const want = target.getBoundingClientRect().top + window.scrollY - top;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (want > max) spacer.style.height = (want - max) + 'px';
      window.scrollTo({ top: want, behavior: reduced ? 'auto' : 'smooth' });
    }

    for (const b of beats) {
      b.go.addEventListener('click', () => tryIt(b));
      b.chip.addEventListener('click', () => {
        if (experimenting()) return;
        if (pending(b)) { tryIt(b); return; }
        if (!tried(b)) return;
        pinned = b !== newest();
        view(b);
      });
    }
    latest.addEventListener('click', () => {
      if (experimenting()) return;
      pinned = false;
      view(newest());
    });

    bench.addEventListener('input', syncMode);
    bench.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (!e.isTrusted || !button || !shown || !shown.widget.contains(button)) return;
      if (button.matches('button.run')) {
        shown.kind = experimenting() ? 'mine' : 'book';
        if (shown.kind === 'mine') {
          yourRuns++;
          yoursHead.textContent = 'Your run (' + yourRuns + ')';
          yours.hidden = false;
        }
      } else if (button.matches('button.revert')) {
        if (experimenting() && shown.widget.hasAttribute('data-running')) window.bookRunner.stop();
      }
    }, true);
    bench.addEventListener('click', (e) => {
      if (e.target.closest('.runner button')) syncMode();
    });
    bench.addEventListener('run-done', (e) => {
      const b = beats.find((x) => x.widget === e.target);
      if (!b || b.kind !== 'book') return;
      const was = pending(b);
      b.beat.dispatchEvent(new CustomEvent('run-done', { bubbles: true }));
      const next = b.beat.nextElementSibling;
      if (was && !pending(b) && next && !next.classList.contains('gated')) scrollToTurn(next);
    });

    const onProgress = () => { if (live && live.article === article) follow(); };
    document.addEventListener('gate-progress', onProgress);
    live = { cols, article, onProgress };
    show(null);
  }

  window.bookWorkbench = { init };
  init(document);
})();

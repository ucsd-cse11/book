'use strict';

(function () {
  const BASE = document.currentScript ? document.currentScript.src : document.baseURI;
  const ADDR = /@[0-9]{4}/g;

  function fnv(s) {
    let h = 2166136261;
    for (const b of new TextEncoder().encode(s)) {
      h = (h ^ b) >>> 0;
      h = Math.imul(h, 16777619) >>> 0;
    }
    return String(h);
  }

  function folds(widget) { return JSON.parse(widget.dataset.folds || '[]'); }

  function unfold(widget, text) {
    const fs = folds(widget);
    return text.split('\n').map((l) => {
      const f = fs.find((x) => x.line === l.replace(/\s+$/, ''));
      return f ? f.code : l;
    }).join('\n');
  }

  function shownLine(widget, text, line) {
    const fs = folds(widget);
    let full = 1;
    const shown = text.split('\n');
    for (let i = 0; i < shown.length; i++) {
      const f = fs.find((x) => x.line === shown[i].replace(/\s+$/, ''));
      const n = f ? f.code.split('\n').length : 1;
      if (line < full + n) return i + 1;
      full += n;
    }
    return shown.length;
  }

  function esc(s) {
    return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }

  const KEEP = 3;

  function push(hist, v) {
    return hist.length && hist[hist.length - 1] === v ? hist : [...hist, v].slice(-KEEP);
  }

  function callSteps(t) {
    const at = new Set([t.steps.length - 1]);
    for (const f of t.frames) {
      if (f.call === null) continue;
      for (const i of [f.enter, f.exit]) if (Number.isInteger(i)) at.add(i);
    }
    return [...at].sort((a, b) => a - b);
  }

  function sinceShown(heapAt, bindAt, keep) {
    const slots = (heap) => new Map(heap.flatMap((o) =>
      o.parts.map((p, k) => [o.a + '#' + (p.name === null ? k : p.name), p.hist])));
    keep.forEach((i, k) => {
      const prev = k > 0 ? keep[k - 1] : null;
      const before = prev === null ? new Map() : slots(heapAt[prev]);
      const was = new Set(prev === null ? [] : heapAt[prev].map((o) => o.a));
      heapAt[i] = heapAt[i].map((o) => ({ ...o, fresh: prev !== null && !was.has(o.a),
        parts: o.parts.map((p, n) => {
          const id = o.a + '#' + (p.name === null ? n : p.name);
          return { ...p, changed: prev !== null && before.get(id) !== p.hist };
        }) }));
      const view = {};
      for (const [id, bs] of Object.entries(bindAt[i])) {
        const old = prev === null ? undefined : bindAt[prev][id];
        view[id] = bs.map((b) => {
          const o = old && old.find((x) => x.name === b.name);
          return { ...b, changed: old !== undefined && (o ? o.hist : undefined) !== b.hist };
        });
      }
      bindAt[i] = view;
    });
  }

  function prepare(t, keep) {
    const heapAt = [];
    const outAt = [];
    const bindAt = [];
    let heap = [];
    let out = '';
    let hists = new Map();
    let binds = new Map();
    t.steps.forEach((s, i) => {
      if (s.heap) {
        const next = new Map();
        heap = s.heap.map(([a, obj]) => {
          const parts = (obj.items || obj.fields || []).map((p, k) => {
            const [name, v] = obj.items ? [null, p] : p;
            const id = a + '#' + (name === null ? k : name);
            const before = hists.get(id) || [];
            const hist = push(before, v);
            next.set(id, hist);
            return { name, hist, changed: i > 0 && hist !== before };
          });
          return { a, type: obj.type || null, list: !!obj.items, opaque: !obj.items && !obj.fields,
            parts, fresh: i > 0 && !hists.has(a) };
        });
        for (const [a] of s.heap) next.set(a, []);
        hists = next;
      } else {
        heap = heap.map((o) => ({ ...o, fresh: false, parts: o.parts.map((p) => ({ ...p, changed: false })) }));
      }
      if (s.out !== undefined) out = s.out;
      const nextBinds = new Map();
      const view = {};
      for (const [id, pairs] of Object.entries(s.names)) {
        const prev = binds.get(id);
        const mine = new Map();
        view[id] = pairs.map(([n, v]) => {
          const before = (prev && prev.get(n)) || [];
          const hist = push(before, v);
          mine.set(n, hist);
          return { name: n, hist, changed: prev !== undefined && hist !== before };
        });
        nextBinds.set(id, mine);
      }
      binds = nextBinds;
      heapAt.push(heap);
      outAt.push(out);
      bindAt.push(view);
    });
    sinceShown(heapAt, bindAt, keep);
    const addrs = [...new Set(t.steps.flatMap((s) => (s.heap || []).map(([a]) => a)))].sort();
    t = { ...t, bindAt };
    const kids = new Map(t.frames.map((f) => [f.id, []]));
    for (const f of t.frames) if (f.parent !== null) kids.get(f.parent).push(f);
    const placed = [];
    const place = (f, col, depth) => {
      let c = col;
      for (const k of kids.get(f.id)) c += place(k, c, depth + 1);
      const span = Math.max(1, c - col);
      placed.push({ f, col, span, depth });
      return span;
    };
    const cols = place(t.frames[0], 0, 0);
    const rows = Math.max(...placed.map((p) => p.depth)) + 1;
    return { ...t, heapAt, outAt, addrs, placed, cols, rows };
  }

  function addrSpan(t, a, slot) {
    const hue = (20 + Math.max(0, t.addrs.indexOf(a)) * 137) % 360;
    return `<span class="addr${slot ? ' slot' : ''}" data-addr="${a}" style="--hue: ${hue}">${a}</span>`;
  }

  function linked(t, s) {
    return esc(s).replace(ADDR, (a) => addrSpan(t, a, false));
  }

  function line(cls, body, changed) {
    return `<div class="${cls}${changed ? ' changed' : ''}"><code>${body}</code></div>`;
  }

  function valued(t, { hist, changed }) {
    const old = hist.slice(0, -1).map((v, i, all) =>
      `<del${i < all.length - 1 ? ' class="older"' : ''}>${linked(t, v)}</del> `).join('');
    const cur = linked(t, hist[hist.length - 1]);
    return old + (changed ? `<span class="changed">${cur}</span>` : cur);
  }

  function objectHtml(t, o) {
    if (o.list) return '[' + o.parts.map((p) => valued(t, p)).join(', ') + ']';
    if (o.opaque) return esc(o.type);
    return esc(o.type) + '[' + o.parts.map((p) => esc(p.name) + '=' + valued(t, p)).join(', ') + ']';
  }

  function frameHtml(t, f, now) {
    if (f.enter > now) return '';
    const step = t.steps[now];
    const head = f.call === null ? 'top level'
      : `<code>${esc(f.call)}</code>${f.on ? ' on ' + addrSpan(t, f.on, false) : ''}`;
    let state;
    let at;
    if (f.enter > now) state = 'future';
    else if (f.exit < now) { state = 'past'; at = f.exit; }
    else { state = step.frame === f.id ? 'active now' : 'active'; at = now; }
    let body = '';
    if (state !== 'future') {
      for (const b of t.bindAt[at][f.id] || []) {
        body += line('binding', esc(b.name) + ' = ' + valued(t, { ...b, changed: b.changed && at === now }), false);
      }
      const ret = t.steps[f.exit];
      if (f.threw && f.exit < now) body += line('returns', 'throws', false);
      else if (ret && ret.kind === 'return' && ret.frame === f.id && f.exit <= now) {
        body += line('returns', ret.returns === undefined ? 'returned' : 'returns ' + linked(t, ret.returns),
          f.exit === now);
      }
    }
    return `<div class="frame-head">${head}</div>${body}`;
  }

  function heapHtml(t, now) {
    let h = '<div class="mem-title">Heap</div>';
    for (const o of t.heapAt[now]) {
      h += line('slot-line', addrSpan(t, o.a, true) + ': ' + objectHtml(t, o), o.fresh);
    }
    return h;
  }

  function build(widget, t, count) {
    const panel = document.createElement('div');
    panel.className = 'trace';
    panel.tabIndex = 0;
    panel.innerHTML =
      '<div class="trace-bar">'
      + '<button class="trace-prev" type="button" aria-label="Back one step">◀</button>'
      + '<button class="trace-next" type="button" aria-label="Forward one step">▶</button>'
      + `<input class="trace-time" type="range" min="0" max="${count - 1}" value="0" aria-label="Step">`
      + '<span class="trace-pos"></span>'
      + '</div>'
      + '<div class="trace-hint"></div>'
      + '<div class="memory flame trace-view">'
      + '<div class="mem-title">Names (the stack), over time →</div>'
      + '<div class="flame-chart"><div class="flame-grid"></div></div>'
      + '<div class="mem-heap"></div>'
      + '</div>'
      + '<div class="trace-out-wrap" hidden><div class="mem-title">Output so far</div><pre class="trace-out"></pre></div>';
    widget.append(panel);
    const grid = panel.querySelector('.flame-grid');
    grid.style.setProperty('--cols', t.cols);
    grid.style.setProperty('--rows', t.rows);
    for (const p of t.placed) {
      const el = document.createElement('div');
      el.className = 'frame';
      el.dataset.frame = p.f.id;
      el.dataset.parent = p.f.parent === null ? '' : p.f.parent;
      el.style.gridColumn = `${p.col + 1} / span ${p.span}`;
      el.style.gridRow = String(t.rows - p.depth);
      el.style.setProperty('--span', p.span);
      el.innerHTML = '<div class="frame-inner"></div>';
      grid.append(el);
    }
    return panel;
  }

  function attach(widget, raw) {
    const keep = widget.dataset.traceSteps === 'calls' ? callSteps(raw) : raw.steps.map((_, i) => i);
    const last = keep.length - 1;
    const t = prepare(raw, keep);
    const panel = build(widget, t, keep.length);
    const textarea = widget.querySelector('textarea');
    panel.hidden = !!textarea && !widget.dataset.traceRan;
    const key = widget.dataset.trace;
    const editor = widget.querySelector('.editor');
    const mark = document.createElement('div');
    mark.className = 'trace-line';
    mark.hidden = true;
    if (editor) editor.prepend(mark);
    const slider = panel.querySelector('.trace-time');
    const chart = panel.querySelector('.flame-chart');
    const hint = panel.querySelector('.trace-hint');
    const outWrap = panel.querySelector('.trace-out-wrap');
    const hasOut = t.outAt.some((o) => o !== '');
    let pos = widget.dataset.traceOpen === 'end' ? last : 0;
    let now = keep[pos];
    let engaged = false;

    const stale = () => !!textarea && fnv(unfold(widget, textarea.value)) !== key;

    function placeMark() {
      const s = t.steps[now];
      const hl = editor && editor.querySelector('pre.hl');
      if (!hl || !s.line || stale() || panel.hidden) { mark.hidden = true; return; }
      const target = shownLine(widget, textarea.value, s.line);
      panel.dataset.line = String(target);
      const walker = document.createTreeWalker(hl, NodeFilter.SHOW_TEXT);
      let ln = 1;
      let start = null;
      let end = null;
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        for (let i = 0; i < n.data.length; i++) {
          if (ln === target && !start) start = [n, i];
          if (n.data[i] === '\n') {
            if (ln === target) { end = [n, i]; break; }
            ln++;
          }
        }
        if (end) break;
      }
      if (!start) { mark.hidden = true; return; }
      const r = document.createRange();
      r.setStart(start[0], start[1]);
      if (end) r.setEnd(end[0], end[1]); else r.setEnd(start[0], start[0].data.length);
      let rects = [...r.getClientRects()].filter((x) => x.height > 0 && x.width > 0);
      if (!rects.length && end) {
        r.setEnd(end[0], end[1] + 1);
        rects = [...r.getClientRects()].filter((x) => x.height > 0).slice(0, 1);
      }
      if (!rects.length) { mark.hidden = true; return; }
      const box = editor.getBoundingClientRect();
      const top = Math.min(...rects.map((x) => x.top));
      const bottom = Math.max(...rects.map((x) => x.bottom));
      const clipTop = Math.max(top, box.top);
      const clipBottom = Math.min(bottom, box.bottom);
      mark.hidden = clipBottom <= clipTop;
      mark.style.top = (clipTop - box.top) + 'px';
      mark.style.height = (clipBottom - clipTop) + 'px';
    }

    function render() {
      const s = t.steps[now];
      for (const el of grid().children) {
        const f = t.frames[Number(el.dataset.frame)];
        el.querySelector('.frame-inner').innerHTML = frameHtml(t, f, now);
        const state = f.enter > now ? 'future' : f.exit < now ? 'past'
          : s.frame === f.id ? 'active now' : 'active';
        el.className = 'frame ' + state;
      }
      for (const svg of panel.querySelectorAll('svg.mem-arrows')) svg.remove();
      panel.querySelector('.mem-heap').innerHTML = heapHtml(t, now);
      outWrap.hidden = !hasOut;
      const out = panel.querySelector('.trace-out');
      out.textContent = t.outAt[now];
      out.classList.toggle('changed', pos > 0 && t.outAt[now] !== t.outAt[keep[pos - 1]]);
      slider.value = String(pos);
      const where = s.kind === 'end' ? 'the program has finished'
        : s.kind === 'return' ? `line ${s.line}, returning` : `line ${s.line}`;
      panel.querySelector('.trace-pos').textContent = `step ${pos + 1} of ${keep.length} · ${where}`;
      panel.querySelector('.trace-prev').disabled = pos === 0;
      panel.querySelector('.trace-next').disabled = pos === last;
      panel.dataset.step = String(pos);
      follow();
      placeMark();
    }

    function grid() { return panel.querySelector('.flame-grid'); }

    function follow() {
      const el = panel.querySelector('.frame.now');
      if (!el) return;
      const c = chart.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      if (r.left < c.left || r.left > c.right - 40) {
        chart.scrollLeft += r.left - c.left - 16;
      }
    }

    function go(n) {
      const next = Math.max(0, Math.min(last, n));
      if (next === pos) return false;
      pos = next;
      now = keep[pos];
      render();
      return true;
    }

    function setHint() {
      hint.textContent = stale() ? 'This trace is of the original code. Revert to step through it.'
        : engaged ? 'Scroll to move through time. Esc lets the page scroll again.'
        : 'Click here, then scroll to move through time.';
    }

    function engage(on) {
      engaged = on && !stale();
      panel.classList.toggle('engaged', engaged);
      setHint();
    }

    function syncStale() {
      const s = stale();
      panel.classList.toggle('stale', s);
      for (const b of panel.querySelectorAll('button, input')) b.disabled = s;
      if (s) { engage(false); mark.hidden = true; } else render();
      setHint();
    }

    slider.addEventListener('input', () => go(Number(slider.value)));
    panel.querySelector('.trace-prev').addEventListener('click', () => go(pos - 1));
    panel.querySelector('.trace-next').addEventListener('click', () => go(pos + 1));
    panel.addEventListener('pointerdown', () => engage(true));
    panel.addEventListener('focusin', () => engage(true));
    panel.addEventListener('pointerleave', () => engage(false));
    panel.addEventListener('focusout', (e) => { if (!panel.contains(e.relatedTarget)) engage(false); });
    panel.addEventListener('keydown', (e) => {
      if (stale()) return;
      if (e.key === 'Escape') { engage(false); return; }
      if (e.target === slider) return;
      const to = { ArrowRight: pos + 1, ArrowLeft: pos - 1, Home: 0, End: last }[e.key];
      if (to !== undefined) { e.preventDefault(); go(to); }
    });
    let pending = 0;
    panel.addEventListener('wheel', (e) => {
      if (!engaged) return;
      const d = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if ((d < 0 && pos === 0) || (d > 0 && pos === last)) { pending = 0; return; }
      e.preventDefault();
      if (e.deltaMode !== 0) { go(pos + Math.sign(d)); return; }
      pending += d;
      while (Math.abs(pending) >= 40) {
        go(pos + Math.sign(pending));
        pending -= 40 * Math.sign(pending);
      }
    }, { passive: false });
    if (textarea) {
      textarea.addEventListener('input', syncStale);
      textarea.addEventListener('scroll', placeMark);
    }
    for (const b of widget.querySelectorAll('.bar button')) {
      b.addEventListener('click', () => setTimeout(syncStale, 0));
    }
    window.addEventListener('resize', placeMark);
    widget.addEventListener('run-done', () => {
      if (!panel.hidden) return;
      panel.hidden = false;
      syncStale();
    });
    syncStale();
  }

  function hydrate(root) {
    for (const widget of (root || document).querySelectorAll('.runner[data-trace], .trace-of[data-trace]')) {
      if (widget.dataset.traceWired) continue;
      widget.dataset.traceWired = '1';
      widget.addEventListener('run-done', () => { widget.dataset.traceRan = '1'; });
      fetch(new URL('traces/' + widget.dataset.trace + '.json', BASE))
        .then((r) => (r.ok ? r.json() : null))
        .then((t) => { if (t) attach(widget, t); })
        .catch(() => {});
    }
  }

  window.bookTrace = { hydrate };
  hydrate(document);
})();

'use strict';

(function () {
  const SVG = 'http://www.w3.org/2000/svg';
  let pinned = null;
  let shown = null;

  function visible(a) {
    const chart = a.closest('.flame-chart');
    if (!chart) return true;
    const r = a.getBoundingClientRect();
    const c = chart.getBoundingClientRect();
    return r.right > c.left && r.left < c.right;
  }

  function clear(diagram) {
    if (shown && shown.closest('.memory') === diagram) shown = null;
    for (const a of diagram.querySelectorAll('.addr.hot')) a.classList.remove('hot');
    const svg = diagram.querySelector('svg.mem-arrows');
    if (svg) svg.remove();
  }

  function arrow(svg, box, from, to, color) {
    const f = from.getBoundingClientRect();
    const t = to.getBoundingClientRect();
    const x2 = t.left - box.left - 3;
    const y2 = t.top + t.height / 2 - box.top;
    let d;
    if (f.right + 20 < t.left) {
      const x1 = f.right - box.left + 2;
      const y1 = f.top + f.height / 2 - box.top;
      const bend = Math.max(30, Math.abs(x2 - x1) / 2);
      d = `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
    } else {
      const x1 = f.left + f.width / 2 - box.left;
      const y1 = (y2 < f.top - box.top ? f.top : f.bottom) - box.top;
      const out = y2 < y1 ? -6 : 6;
      const gx = from.closest('.flame-chart') ? 7 : x2 - 14;
      d = `M ${x1} ${y1} C ${x1} ${y1 + out}, ${gx} ${y1 + out}, ${gx} ${(y1 + y2) / 2}`
        + ` S ${gx} ${y2}, ${x2} ${y2}`;
    }
    const path = document.createElementNS(SVG, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('marker-end', 'url(#mem-head)');
    svg.append(path);
  }

  function show(ref) {
    const diagram = ref.closest('.memory');
    clear(diagram);
    const addr = ref.dataset.addr;
    const same = [...diagram.querySelectorAll('.addr')].filter((a) => a.dataset.addr === addr);
    for (const a of same) a.classList.add('hot');
    const slot = same.find((a) => a.classList.contains('slot'));
    if (!slot || !visible(ref)) return;
    shown = ref;
    const color = getComputedStyle(ref).color;
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('class', 'mem-arrows');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = '<defs><marker id="mem-head" viewBox="0 0 10 10" refX="9" refY="5"'
      + ' markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
      + `<path d="M 0 0 L 10 5 L 0 10 z" fill="${color}"/></marker></defs>`;
    const box = diagram.getBoundingClientRect();
    const sources = ref === slot ? same.filter((a) => a !== slot && visible(a)) : [ref];
    for (const s of sources) arrow(svg, box, s, slot, color);
    diagram.append(svg);
  }

  document.addEventListener('pointerover', (e) => {
    if (pinned || e.pointerType === 'touch') return;
    const ref = e.target.closest && e.target.closest('.memory .addr');
    if (ref) show(ref);
  });
  document.addEventListener('pointerout', (e) => {
    if (pinned || e.pointerType === 'touch') return;
    const ref = e.target.closest && e.target.closest('.memory .addr');
    if (ref && !ref.contains(e.relatedTarget)) clear(ref.closest('.memory'));
  });
  document.addEventListener('scroll', (e) => {
    const chart = e.target.closest && e.target.closest('.flame-chart');
    if (!chart) return;
    const diagram = chart.closest('.memory');
    const ref = pinned && pinned.closest('.memory') === diagram ? pinned
      : shown && shown.closest('.memory') === diagram ? shown : null;
    if (ref) requestAnimationFrame(() => show(ref));
  }, true);
  document.addEventListener('click', (e) => {
    const ref = e.target.closest && e.target.closest('.memory .addr');
    if (pinned) clear(pinned.closest('.memory'));
    if (!ref || ref === pinned) { pinned = null; return; }
    pinned = ref;
    show(ref);
  });
})();

// Step router + progress indicator. A section is a directory of steps
// (build.py). Moving between steps of the same section swaps the <article>
// and pushes the new URL with the History API — no document reload — so the
// SharedWorker that owns the CheerpJ JVM (runner.js) stays warm. The
// swapped-in content is re-hydrated through the entry points the other
// scripts expose. Direct loads and no-JS still get a full page per step.
'use strict';

(function () {
  const bar = document.querySelector('nav.stepbar');
  const meta = document.querySelector('script[type="application/x-steps"]');
  if (!bar || !meta) return;
  let data = JSON.parse(meta.textContent);

  const isDone = (path) => {
    try { return localStorage.getItem('done:' + path) === '1'; } catch (e) { return false; }
  };

  function renderBar() {
    if (!data.steps || data.steps.length < 2) { bar.hidden = true; return; }
    bar.hidden = false;
    const dots = document.createElement('ol');
    dots.className = 'step-dots';
    data.steps.forEach((s, i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = s.url;
      a.className = 'step-dot';
      a.title = s.title;
      const done = isDone(new URL(s.url, location.href).pathname);
      if (i === data.current) { a.classList.add('current'); a.setAttribute('aria-current', 'step'); }
      else if (done) a.classList.add('done');
      a.textContent = (done && i !== data.current) ? '✓' : String(i + 1);
      li.append(a);
      dots.append(li);
    });
    const caption = document.createElement('div');
    caption.className = 'step-caption';
    caption.textContent =
      `Step ${data.current + 1} of ${data.steps.length}: ${data.steps[data.current].title}`;
    bar.replaceChildren(dots, caption);
  }

  // A step of the same section is a sibling file (no "../" in the href).
  const sameSection = (url) => !!url && !url.includes('../') && url.endsWith('.html');

  async function go(url, push) {
    let text;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      text = await res.text();
    } catch (e) { location.href = url; return; }
    const doc = new DOMParser().parseFromString(text, 'text/html');
    const newArticle = doc.querySelector('article.prose');
    const newMeta = doc.querySelector('script[type="application/x-steps"]');
    if (!newArticle || !newMeta) { location.href = url; return; }
    document.querySelector('article.prose').replaceWith(newArticle);
    const newNav = doc.querySelector('nav.pagenav');
    if (newNav) document.querySelector('nav.pagenav').replaceWith(newNav);
    data = JSON.parse(newMeta.textContent);
    document.title = doc.title;
    if (push) history.pushState({ step: url }, '', url);
    renderBar();
    wirePageNav();
    window.scrollTo(0, 0);
    // Re-hydrate the new content; the worker is never touched.
    if (window.bookRunner) window.bookRunner.hydrate(newArticle);
    if (window.bookExercises) window.bookExercises.hydrate(newArticle);
    if (window.bookGates) window.bookGates.init(newArticle);
  }

  bar.addEventListener('click', (e) => {
    const a = e.target.closest('a.step-dot');
    if (!a) return;
    e.preventDefault();
    go(a.getAttribute('href'), true);
  });

  function wirePageNav() {
    for (const a of document.querySelectorAll('nav.pagenav a')) {
      if (a.dataset.spa) continue;
      const url = a.getAttribute('href');
      if (sameSection(url)) {
        a.dataset.spa = '1';
        a.addEventListener('click', (e) => { e.preventDefault(); go(url, true); });
      }
    }
  }

  window.addEventListener('popstate', () => go(location.pathname + location.search, false));
  // A step marking itself done (gate.js) updates the ticks live.
  document.addEventListener('step-done', renderBar);

  renderBar();
  wirePageNav();
})();

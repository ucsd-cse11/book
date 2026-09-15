// Report mode: when a PrairieLearn question opens a step with
// `?report=<origin>`, the page posts its progress back to the window that
// opened it (see docs/exercise-contract.md, "Progress reports"). Without
// the parameter (or the opener) nothing here runs.
//
// What gets reported is the *section*, not the step. A reading assignment is
// "read chapter 1", and chapter 1 is a directory of steps (build.py); the
// reader walks them with nav.js, which swaps the <article> in place and never
// reloads the document. So this file must not hold on to anything nav.js
// replaces — the article is re-queried on every snapshot, and the observer
// watches a node that outlives the swap.
//
// Step completion is gate.js's `done:<pathname>` in localStorage, resolved the
// same way nav.js resolves it: each step's relative url against location, so
// it keeps working under any deploy prefix (/book/fa26/...). The `path` field
// in the x-steps metadata is site-root-relative and prefix-naive — don't use it.
'use strict';

(function () {
  const KEY = 'report:origin';
  let origin = null;
  const param = new URLSearchParams(location.search).get('report');
  if (param) {
    try { if (new URL(param).origin === param) origin = param; } catch (e) { /* not a URL */ }
    if (origin) try { sessionStorage.setItem(KEY, origin); } catch (e) { /* private mode */ }
  } else {
    try { origin = sessionStorage.getItem(KEY); } catch (e) { /* private mode */ }
  }
  if (!origin) return;

  const target = window.opener;
  const host = new URL(origin).host;
  const status = document.createElement('span');
  status.className = 'report-status';
  const header = document.querySelector('header');
  if (header) header.append(status);

  // nav.js rewrites its own copy of this metadata on a step swap but leaves the
  // element in the DOM alone. Only `current` differs between steps of a
  // section, and nothing here needs `current`, so reading it once is correct.
  let meta = null;
  const metaEl = document.querySelector('script[type="application/x-steps"]');
  if (metaEl) { try { meta = JSON.parse(metaEl.textContent); } catch (e) { meta = null; } }

  const isDone = (path) => {
    try { return localStorage.getItem('done:' + path) === '1'; } catch (e) { return false; }
  };
  const stepPath = (s) => new URL(s.url, location.href).pathname;

  function steps() {
    if (!meta || !Array.isArray(meta.steps) || !meta.steps.length) return { done: 0, total: 0 };
    return { done: meta.steps.filter((s) => isDone(stepPath(s))).length, total: meta.steps.length };
  }

  const snapshot = () => {
    const article = document.querySelector('article.prose');
    return {
      type: 'book-progress',
      v: 2,
      section: (meta && meta.section) || null,
      sectionTitle: (meta && meta.title) || document.title,
      page: location.pathname,
      title: document.title,
      steps: steps(),
      gates: {
        passed: parseInt((article && article.dataset.gatesPassed) || '0', 10),
        total: parseInt((article && article.dataset.gates) || '0', 10),
      },
      exercises: {
        answered: document.querySelectorAll('.exercise.done').length,
        total: document.querySelectorAll('.exercise').length,
      },
      at: new Date().toISOString(),
    };
  };

  let acked = false;
  function send() {
    if (!target || target.closed) {
      status.textContent = `Not reporting to ${host} — reopen this page from there to record progress`;
      status.classList.add('lost');
      return;
    }
    try { target.postMessage(snapshot(), origin); } catch (e) { /* opener navigated away */ }
    if (!acked) status.textContent = `Reporting progress to ${host}…`;
  }

  window.addEventListener('message', (e) => {
    if (e.origin !== origin || !e.data || e.data.type !== 'book-progress-ack') return;
    acked = true;
    const s = snapshot().steps;
    status.textContent = `Progress recorded at ${host}: ${s.done}/${s.total} steps`;
    status.classList.remove('lost');
  });

  document.addEventListener('gate-progress', send);
  document.addEventListener('exercise-answered', send);
  document.addEventListener('step-done', send);

  // An observer bound to the article goes deaf the moment nav.js swaps it, so
  // watch two things instead: the article's parent for the swap itself
  // (childList, not subtree — the article is replaced in place), and then the
  // live article for an exercise being answered. Re-scoped on every swap.
  //
  // Deliberately not one body-wide subtree observer: exercise.js and runner.js
  // churn the DOM during hydration, and reacting to all of it would fire send()
  // far more often than there is progress to report.
  let inner = null;
  function watchArticle() {
    const article = document.querySelector('article.prose');
    if (!article) return;
    if (inner) inner.disconnect();
    inner = new MutationObserver((muts) => {
      if (muts.some((m) => m.target.classList && m.target.classList.contains('exercise'))) send();
    });
    inner.observe(article, { attributes: true, attributeFilter: ['class'], subtree: true });
  }

  const mount = (document.querySelector('article.prose') || {}).parentElement;
  if (mount) {
    new MutationObserver(() => { watchArticle(); send(); }).observe(mount, { childList: true });
  }
  watchArticle();

  document.addEventListener('visibilitychange', () => { if (document.hidden) send(); });
  window.addEventListener('pagehide', send);
  send();
})();

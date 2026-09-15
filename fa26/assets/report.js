// Report mode: when a PrairieLearn question opens a chapter with
// `?report=<origin>`, the page posts its progress back to the window that
// opened it (see docs/exercise-contract.md, "Progress reports"). Without
// the parameter (or the opener) nothing here runs.
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
  const article = document.querySelector('article.prose');

  const snapshot = () => ({
    type: 'book-progress',
    v: 1,
    page: location.pathname,
    title: document.title,
    gates: {
      passed: parseInt((article && article.dataset.gatesPassed) || '0', 10),
      total: parseInt((article && article.dataset.gates) || '0', 10),
    },
    exercises: {
      answered: document.querySelectorAll('.exercise.done').length,
      total: document.querySelectorAll('.exercise').length,
    },
    at: new Date().toISOString(),
  });

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
    const g = snapshot().gates;
    status.textContent = `Progress recorded at ${host}: ${g.passed}/${g.total}`;
    status.classList.remove('lost');
  });

  document.addEventListener('gate-progress', send);
  document.addEventListener('exercise-answered', send);
  if (article) {
    new MutationObserver((muts) => {
      if (muts.some((m) => m.target.classList.contains('exercise'))) send();
    }).observe(article, { attributes: true, attributeFilter: ['class'], subtree: true });
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) send(); });
  window.addEventListener('pagehide', send);
  send();
})();

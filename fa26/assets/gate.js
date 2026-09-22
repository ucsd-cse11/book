// Conversation gating: content after each gating unit stays hidden until the
// reader engages with it — clicks Check, opens Show answer, runs a
// #run(gate: true) widget and sees what it does, or gets a code exercise
// to compile and run. The step unfolds like a chat you're taking part in,
// and the scrollbar grows as you go. Progress persists per page in
// localStorage; a step also records `done:<path>` once its last gate opens,
// which nav.js reads for the progress indicator. `?reveal=all` disables
// gating (returning readers, deep links, tests).
'use strict';

(function () {
  const revealAll = new URLSearchParams(location.search).get('reveal') === 'all';
  const TRIGGER = '.exercise, .runner[data-gate]';
  // The live step's gating state; nav.js re-inits on a swap, so the
  // document-level listeners below always act on the current step.
  let ctx = null;

  const markDone = () => {
    try { localStorage.setItem('done:' + location.pathname, '1'); } catch (e) { /* private mode */ }
    document.dispatchEvent(new CustomEvent('step-done'));
  };

  function init(root) {
    ctx = null;
    root = root || document;
    const article = (root.matches && root.matches('article.prose'))
      ? root : root.querySelector('article.prose');
    if (!article) return;

    // Chunk the step at each gating unit: a top-level child that is, or
    // contains (#innercise), a trigger. Gate i hides everything after unit
    // i, up to and including unit i+1. A unit opens once every trigger in
    // it has been engaged.
    const gates = [];
    let building = null;
    for (const node of article.children) {
      // The all-answered banner (exercise.js) is page chrome, not part of
      // the conversation: it shows itself when it is earned. Gating it
      // leaves a step whose last element is its only trigger with a gate
      // that hides nothing a reader could ever see.
      if (node.classList.contains('all-answered')) continue;
      if (building) building.nodes.push(node);
      const triggers = node.matches(TRIGGER)
        ? [node]
        : [...node.querySelectorAll(TRIGGER)];
      if (triggers.length) {
        building = { unit: node, triggers, engaged: new Set(), nodes: [] };
        gates.push(building);
      }
    }

    // report.js reads these; the event fires whenever they change.
    const progress = (passed) => {
      article.dataset.gates = gates.length;
      article.dataset.gatesPassed = passed;
      document.dispatchEvent(new CustomEvent('gate-progress'));
    };

    // Nothing to gate (reveal=all, or a step with no triggers): everything
    // is visible and the step counts as reachable/done on sight.
    if (revealAll || !gates.length) {
      progress(gates.length);
      markDone();
      return;
    }

    const key = 'gate:' + location.pathname;
    let passed = Math.min(parseInt(localStorage.getItem(key), 10) || 0, gates.length);
    progress(passed);

    gates.forEach((g, i) => {
      if (i >= passed) g.nodes.forEach((n) => n.classList.add('gated'));
    });
    // What the frontier is still waiting for. A run comes first: a unit that
    // pairs a blocking run with a question asks for the run, then the answer.
    const wantsRun = (t) => t.classList.contains('runner') || t.dataset.kind === 'code';
    const need = (g) => (
      g.triggers.some((t) => !g.engaged.has(t) && wantsRun(t)) ? 'run' : 'answer');
    const frontier = () => {
      for (const g of gates) {
        g.unit.classList.remove('gate-frontier');
        g.unit.removeAttribute('data-gate-need');
      }
      if (passed < gates.length && gates[passed].nodes.length) {
        gates[passed].unit.classList.add('gate-frontier');
        gates[passed].unit.setAttribute('data-gate-need', need(gates[passed]));
      }
    };
    frontier();
    if (passed >= gates.length) markDone();

    function engage(trigger) {
      if (passed >= gates.length) return;
      const g = gates[passed];
      if (!g.triggers.includes(trigger)) return;
      g.engaged.add(trigger);
      if (g.engaged.size < g.triggers.length) {
        frontier();
        return;
      }
      g.nodes.forEach((n) => {
        n.classList.remove('gated');
        n.classList.add('gate-open');
      });
      passed++;
      try { localStorage.setItem(key, passed); } catch (e) { /* private mode */ }
      frontier();
      progress(passed);
      if (passed >= gates.length) markDone();
    }

    ctx = { engage };
  }

  // One-time delegated listeners, always acting on the live step's gates.
  document.addEventListener('click', (e) => {
    if (!ctx) return;
    const hit = e.target.closest(
      '.exercise:not([data-kind="code"]) button.check, .exercise details.reveal summary');
    if (hit) ctx.engage(hit.closest('.exercise'));
  });
  // exercise.js fires this when an exercise is answered; for a code
  // exercise that is the run succeeding, which is what its gate waits for.
  document.addEventListener('exercise-answered', (e) => {
    if (!ctx) return;
    const ex = e.target.closest('.exercise[data-kind="code"]');
    if (ex) ctx.engage(ex);
  });
  // runner.js fires this when a run reaches a terminal state — the reader
  // has now seen what the code does, which is the point of a run gate.
  document.addEventListener('run-done', (e) => {
    if (!ctx) return;
    const widget = e.target.closest('.runner[data-gate]');
    if (widget) ctx.engage(widget);
  });

  window.bookGates = { init };
  init(document);
})();

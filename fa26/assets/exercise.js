// Hydrator for hand-authored exercises. The authoring toolchain emits
// semantic HTML (see docs/exercise-contract.md); this script adds the
// interactive layer: seeded shuffling, a Check button with verdict, and a
// Show-answer reveal. Answers live in data-* attributes — checking is
// purely local, and option/stem/feedback content is arbitrary HTML.
// The one exception is a code exercise (a cloze that is a program): its
// check assembles the holes into a source file and hands it to runner.js;
// correct means it compiled and ran clean.
'use strict';

(function () {
  // Deterministic shuffle (seed = data-seed) so a page always renders the
  // same way: stable tests, and reloading doesn't reshuffle under a student.
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleChildren(parent, rand) {
    const kids = [...parent.children];
    for (let i = kids.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [kids[i], kids[j]] = [kids[j], kids[i]];
    }
    for (const k of kids) parent.append(k);
  }

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'text') node.textContent = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const c of children) node.append(c);
    return node;
  }

  function norm(s, caseSensitive) {
    s = s.replace(/\s+/g, ' ').trim();
    return caseSensitive ? s : s.toLowerCase();
  }

  function markBlank(b, good) {
    b.classList.toggle('right', good);
    b.classList.toggle('wrong', !good);
  }

  // On reveal, annotate a blank with its (first) accepted answer.
  function annotate(b, text) {
    if (b.nextElementSibling && b.nextElementSibling.classList.contains('ans')) return;
    b.after(el('span', { class: 'ans', text }));
  }

  function prepareSelects(ex, rand) {
    for (const sel of ex.querySelectorAll('select.blank')) {
      shuffleChildren(sel, rand);
      sel.prepend(el('option', { text: '— choose —', value: '' }));
      sel.value = '';
    }
  }

  // Each kind returns {check(button): boolean | Promise<{ok, label}>,
  // reveal()?, buttonLabel?, footer?: [nodes], after?: [nodes]}.
  const kinds = {

    choice(ex, rand) {
      const list = ex.querySelector('.choices');
      const multi = ex.hasAttribute('data-multi');
      shuffleChildren(list, rand);
      const name = 'e' + Math.floor(rand() * 1e9);
      for (const li of list.children) {
        const input = el('input', { type: multi ? 'checkbox' : 'radio', name });
        li.prepend(input);
        // The whole row is a click target (labels can't wrap block content
        // like <pre> options), but leave links and the input itself alone.
        li.addEventListener('click', (ev) => {
          if (ev.target === input || ev.target.closest('a')) return;
          input.checked = multi ? !input.checked : true;
        });
      }
      return {
        check() {
          let ok = true;
          for (const li of list.children) {
            const want = li.hasAttribute('data-correct');
            const got = li.querySelector('input').checked;
            if (want !== got) ok = false;
            li.classList.remove('right', 'wrong');
            if (got) li.classList.add(want ? 'right' : 'wrong');
            li.classList.toggle('show-why', got && !want);
          }
          return ok;
        },
      };
    },

    blanks(ex, rand) {
      const cs = ex.hasAttribute('data-case-sensitive');
      prepareSelects(ex, rand);
      return {
        check() {
          let ok = true;
          for (const b of ex.querySelectorAll('.blank')) {
            const good = b.tagName === 'SELECT'
              ? !!(b.selectedOptions[0] && b.selectedOptions[0].hasAttribute('data-correct'))
              : b.dataset.answer.split('|').some((a) => norm(a, cs) === norm(b.value, cs));
            markBlank(b, good);
            if (!good) ok = false;
          }
          return ok;
        },
        reveal() {
          for (const b of ex.querySelectorAll('.blank')) {
            annotate(b, b.tagName === 'SELECT'
              ? [...b.options].find((o) => o.hasAttribute('data-correct')).textContent
              : b.dataset.answer.split('|')[0]);
          }
        },
      };
    },

    // A program with holes. The fixed text and the holes' contents are
    // assembled in document order into one source; runner.js compiles and
    // runs it. Every hole is marked by the outcome: the reader's part of
    // the program is what is being judged, wherever the compiler points.
    code(ex, rand) {
      const cloze = ex.querySelector('.cloze');
      const holes = [...ex.querySelectorAll('.blank')];
      prepareSelects(ex, rand);
      const state = el('span', { class: 'state' });
      const out = el('pre', { class: 'out' });
      out.hidden = true;

      function assemble() {
        let text = '';
        const walk = (node) => {
          for (const n of node.childNodes) {
            if (n.nodeType === Node.TEXT_NODE) text += n.textContent;
            else if (n.tagName === 'BR') text += '\n';
            else if (n.classList && n.classList.contains('blank')) text += n.value;
            else walk(n);
          }
        };
        walk(cloze);
        return text;
      }

      return {
        buttonLabel: 'Run ▶',
        footer: [state],
        after: [out],
        async check(button) {
          for (const h of holes) h.classList.remove('right', 'wrong');
          if (!window.bookRunner) {
            return { ok: false, label: 'Java is not available on this page' };
          }
          // A hidden postcondition (blanks(check: ...)): an assertion
          // appended after the reader's code, never shown in the cloze.
          // Assertions are on, so a false one fails the run; Java's
          // AssertionError carries only the author's message, not the
          // predicate, so `instanceof` stays out of sight.
          let source = assemble();
          if (ex.dataset.check) {
            const msg = ex.dataset.checkMessage
              || 'That runs, but it is not what the exercise asks for.';
            source += '\n{ assert (' + ex.dataset.check + ') : ' + JSON.stringify(msg) + '; }\n';
          }
          const r = await window.bookRunner.run({
            source, echo: ex.hasAttribute('data-echo'),
            widget: ex, button, state, out,
          });
          state.textContent = '';
          if (r.ok) {
            for (const h of holes) h.classList.add('right');
            return { ok: true, label: '✓ Compiles and runs' };
          }
          for (const h of holes) h.classList.add('wrong');
          return {
            ok: false,
            label: r.compileError ? '✗ Doesn\u2019t compile yet' : '✗ Ran, but failed',
          };
        },
        reveal() {
          for (const h of holes) {
            if (h.tagName === 'SELECT') {
              h.value = [...h.options].find((o) => o.hasAttribute('data-correct')).textContent;
            } else {
              h.value = h.dataset.answer.split('|')[0];
            }
          }
        },
      };
    },

    number(ex) {
      const b = ex.querySelector('input.blank');
      return {
        check() {
          const v = parseFloat(b.value.trim().replace(',', '.'));
          const ok = !Number.isNaN(v)
            && Math.abs(v - parseFloat(b.dataset.answer))
              <= parseFloat(b.dataset.tolerance || '0') + 1e-12;
          markBlank(b, ok);
          return ok;
        },
        reveal() { annotate(b, b.dataset.answer); },
      };
    },
  };

  // Hydrate the exercises in `root` (a step's article, or the whole
  // document on first load); idempotent per exercise. nav.js calls this on
  // swapped-in content.
  function hydrate(root) {
  root = root || document;
  // Answered = checked correct, or Show answer opened. When every exercise
  // on the page is answered, a banner at the end of the page says so.
  const exercises = [...root.querySelectorAll('.exercise')]
    .filter((ex) => kinds[ex.dataset.kind] && !ex.dataset.hydrated);
  const done = new Set();
  const banner = el('div', { class: 'all-answered', text: '✅ All questions answered!' });
  banner.hidden = true;
  function settle(ex, answered) {
    if (answered) done.add(ex); else done.delete(ex);
    ex.classList.toggle('done', answered);
    banner.hidden = done.size < exercises.length;
    // gate.js: a code exercise counts as engaged once it has run clean
    if (answered) ex.dispatchEvent(new CustomEvent('exercise-answered', { bubbles: true }));
  }

  for (const ex of exercises) {
    ex.dataset.hydrated = '1';
    const kind = kinds[ex.dataset.kind];
    const api = kind(ex, mulberry32(parseInt(ex.dataset.seed, 10) || 1));

    const verdict = el('div', { class: 'verdict' });
    const button = el('button', { type: 'button', class: 'check', text: api.buttonLabel || 'Check' });
    button.addEventListener('click', async () => {
      if (button.disabled) return;
      verdict.textContent = '';
      verdict.className = 'verdict';
      const r = await api.check(button);
      const ok = typeof r === 'boolean' ? r : r.ok;
      verdict.textContent = (r && r.label) || (ok ? '✓ Correct' : '✗ Not quite — try again');
      verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
      settle(ex, ok || reveal.open);
    });
    const footer = el('div', { class: 'exercise-footer' },
      [button, ...(api.footer || []), verdict]);
    const reveal = el('details', { class: 'reveal' },
      [el('summary', { text: 'Show answer' })]);
    reveal.addEventListener('toggle', () => {
      ex.classList.toggle('revealed', reveal.open);
      if (reveal.open && api.reveal) api.reveal();
      if (reveal.open) settle(ex, true);
    });
    // Everything the reader interacts with (options, blanks, Check, Show
    // answer) wraps in a .response, leaving .stem addressable on its own.
    const response = el('div', { class: 'response' },
      [...ex.children].filter((c) => !c.classList.contains('stem')));
    response.append(footer, ...(api.after || []), reveal);
    ex.append(response);
  }

  const article = (root.matches && root.matches('article.prose'))
    ? root : root.querySelector('article.prose');
  if (exercises.length && article) article.append(banner);
  }

  window.bookExercises = { hydrate };
  hydrate(document);
})();

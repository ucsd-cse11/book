// Client-side quiz renderers for the exported Stepik step types.
// Answers live in the embedded author-source JSON; checking is purely local.
'use strict';

(function () {
  // Deterministic shuffle so a page always renders the same way (stable tests,
  // and reloading doesn't reshuffle under the student).
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffled(arr, rand) {
    const a = arr.map((v, i) => [v, i]);
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a; // [value, originalIndex] pairs
  }

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'html') node.innerHTML = v;
      else if (k === 'text') node.textContent = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const c of children) node.append(c);
    return node;
  }

  function stripTags(html) {
    const d = document.createElement('div');
    d.innerHTML = html.replace(/<br\s*\/?>/g, ' ');
    return d.textContent.replace(/\s+/g, ' ').trim();
  }

  function norm(s, caseSensitive) {
    s = s.replace(/\s+/g, ' ').trim();
    return caseSensitive ? s : s.toLowerCase();
  }

  // Each renderer returns {check(): {ok, detail?}, answerHTML: string}
  const renderers = {

    choice(source, body, rand) {
      const multiple = source.is_multiple_choice;
      const options = source.preserve_order
        ? source.options.map((o, i) => [o, i])
        : shuffled(source.options, rand);
      const name = 'c' + Math.floor(rand() * 1e9);
      const list = el('div', { class: 'options' });
      for (const [opt] of options) {
        const input = el('input', { type: multiple ? 'checkbox' : 'radio', name });
        input._opt = opt;
        list.append(el('label', {}, [input, el('span', { html: opt.text })]));
      }
      body.append(list);
      return {
        check() {
          let ok = true;
          for (const input of list.querySelectorAll('input')) {
            if (input.checked !== input._opt.is_correct) ok = false;
            const label = input.closest('label');
            label.classList.remove('right', 'wrong');
            if (input.checked) {
              label.classList.add(input._opt.is_correct ? 'right' : 'wrong');
              if (input._opt.feedback) label.title = stripTags(input._opt.feedback);
            }
          }
          return { ok };
        },
        answerHTML: source.options.filter(o => o.is_correct)
          .map(o => `<div>✔ ${o.text}</div>`).join(''),
      };
    },

    'fill-blanks'(source, body, rand) {
      const cs = source.is_case_sensitive;
      const flow = el('div', { class: 'blanks' });
      const blanks = [];
      for (const comp of source.components) {
        if (comp.type === 'text') {
          flow.append(el('span', { html: comp.text }));
        } else if (comp.type === 'select') {
          const sel = el('select', {}, [el('option', { text: '— choose —', value: '' })]);
          for (const [opt] of shuffled(comp.options, rand)) {
            const o = el('option', { text: stripTags(opt.text) });
            o._correct = opt.is_correct;
            sel.append(o);
          }
          blanks.push(sel);
          flow.append(sel);
        } else { // input
          const inp = el('input', { type: 'text', class: 'blank' });
          inp._answers = comp.options.filter(o => o.is_correct).map(o => o.text);
          blanks.push(inp);
          flow.append(inp);
        }
      }
      body.append(flow);
      return {
        check() {
          let ok = true;
          for (const b of blanks) {
            let good;
            if (b.tagName === 'SELECT') {
              good = b.selectedOptions[0] && b.selectedOptions[0]._correct === true;
            } else {
              good = b._answers.some(a => norm(a, cs) === norm(b.value, cs));
            }
            b.classList.toggle('right', !!good);
            b.classList.toggle('wrong', !good);
            if (!good) ok = false;
          }
          return { ok };
        },
        answerHTML: source.components.filter(c => c.type !== 'text')
          .map((c, i) => {
            const right = c.options.filter(o => o.is_correct).map(o => stripTags(o.text));
            return `<div>blank ${i + 1}: <b>${right.join('</b> or <b>')}</b></div>`;
          }).join(''),
      };
    },

    string(source, body) {
      let expected = source.pattern;
      if (!expected && source.code) {
        const m = source.code.match(/answer\s*=\s*("(?:[^"\\]|\\.)*")/);
        if (m) expected = JSON.parse(m.group ? m.group(1) : m[1]);
      }
      const area = el('textarea', { class: 'string-answer', rows: 2 });
      body.append(area);
      const cs = source.case_sensitive;
      return {
        check() {
          const reply = norm(area.value, cs);
          const want = norm(expected || '', cs);
          let ok;
          if (source.use_re) ok = new RegExp(expected, cs ? '' : 'i').test(area.value);
          else if (source.match_substring) ok = reply.includes(want);
          else ok = reply === want;
          return { ok };
        },
        answerHTML: `<code>${expected ? expected.replace(/&/g, '&amp;').replace(/</g, '&lt;') : '(free response)'}</code>`,
      };
    },

    number(source, body) {
      const inp = el('input', { type: 'text', class: 'blank' });
      body.append(inp);
      const answers = source.options.map(o => ({
        value: parseFloat(o.answer), err: parseFloat(o.max_error || '0'),
      }));
      return {
        check() {
          const v = parseFloat(inp.value.trim().replace(',', '.'));
          const ok = !Number.isNaN(v) &&
            answers.some(a => Math.abs(v - a.value) <= a.err + 1e-12);
          inp.classList.toggle('right', ok);
          inp.classList.toggle('wrong', !ok);
          return { ok };
        },
        answerHTML: answers.map(a =>
          `<b>${a.value}</b>${a.err ? ` ± ${a.err}` : ''}`).join(' or '),
      };
    },

    matching(source, body, rand) {
      const firsts = source.pairs.map(p => stripTags(p.first));
      const rows = shuffled(source.pairs, rand);
      const table = el('table', { class: 'matching' });
      const selects = [];
      for (const [pair] of rows) {
        const sel = el('select', {}, [el('option', { text: '— choose —', value: '' })]);
        for (const f of firsts) sel.append(el('option', { text: f }));
        sel._want = stripTags(pair.first);
        selects.push(sel);
        table.append(el('tr', {}, [
          el('td', {}, [sel]),
          el('td', { html: pair.second }),
        ]));
      }
      body.append(table);
      return {
        check() {
          let ok = true;
          for (const sel of selects) {
            const good = sel.value === sel._want;
            sel.classList.toggle('right', good);
            sel.classList.toggle('wrong', !good);
            if (!good) ok = false;
          }
          return { ok };
        },
        answerHTML: source.pairs.map(p =>
          `<div><b>${stripTags(p.first)}</b> → ${p.second}</div>`).join(''),
      };
    },

    sorting(source, body, rand) {
      return orderingWidget(source.options.map(o => o.text), null, 0, body, rand);
    },

    parsons(source, body, rand) {
      return orderingWidget(
        source.lines.map(l => `<code>${l.text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</code>`),
        source.lines.map(l => l.level),
        source.indent || 4, body, rand);
    },
  };

  // Shared UI for sorting (order only) and parsons (order + indentation).
  function orderingWidget(itemsHTML, levels, indentSize, body, rand) {
    const list = el('div', { class: 'ordering' });
    const rows = shuffled(itemsHTML, rand).map(([htmlText, origIndex]) => {
      const row = el('div', { class: 'orow' });
      row._orig = origIndex;
      row._level = 0;
      const grip = el('span', { class: 'controls' });
      grip.append(
        el('button', { type: 'button', text: '↑', onclick: () => move(row, -1) }),
        el('button', { type: 'button', text: '↓', onclick: () => move(row, +1) }));
      if (levels) {
        grip.append(
          el('button', { type: 'button', text: '⇤', onclick: () => dent(row, -1) }),
          el('button', { type: 'button', text: '⇥', onclick: () => dent(row, +1) }));
      }
      row.append(grip, el('span', { class: 'content', html: htmlText }));
      return row;
    });
    rows.forEach(r => list.append(r));
    body.append(list);

    function move(row, delta) {
      const siblings = [...list.children];
      const i = siblings.indexOf(row);
      const j = i + delta;
      if (j < 0 || j >= siblings.length) return;
      list.insertBefore(row, delta < 0 ? siblings[j] : siblings[j].nextSibling);
    }
    function dent(row, delta) {
      row._level = Math.max(0, Math.min(6, row._level + delta));
      row.querySelector('.content').style.marginLeft = (row._level * indentSize * 0.6) + 'em';
      row.classList.remove('right', 'wrong');
    }

    return {
      check() {
        let ok = true;
        [...list.children].forEach((row, position) => {
          let good = row._orig === position;
          if (good && levels) good = row._level === levels[row._orig];
          row.classList.toggle('right', good);
          row.classList.toggle('wrong', !good);
          if (!good) ok = false;
        });
        return { ok };
      },
      answerHTML: itemsHTML.map((h, i) =>
        `<div style="margin-left:${levels ? levels[i] * indentSize * 0.6 : 0}em">${h}</div>`
      ).join(''),
    };
  }

  for (const quiz of document.querySelectorAll('.quiz')) {
    const payload = JSON.parse(quiz.querySelector('script').textContent);
    const body = quiz.querySelector('.quiz-body');
    const rand = mulberry32(parseInt(quiz.dataset.stepId, 10) || 1);
    const renderer = renderers[payload.type];
    if (!renderer || !payload.source) {
      body.append(el('p', { class: 'meta', text: `[${payload.type} exercise — source unavailable]` }));
      continue;
    }
    const api = renderer(payload.source, body, rand);

    const banner = el('div', { class: 'verdict' });
    const footer = el('div', { class: 'quiz-footer' }, [
      el('button', {
        type: 'button', class: 'check', text: 'Check',
        onclick: () => {
          const { ok } = api.check();
          banner.textContent = ok ? '✓ Correct' : '✗ Not quite — try again';
          banner.className = 'verdict ' + (ok ? 'ok' : 'no');
        },
      }),
      banner,
    ]);
    const reveal = el('details', { class: 'reveal' }, [
      el('summary', { text: 'Show answer' }),
      el('div', { class: 'answer', html: api.answerHTML }),
    ]);
    quiz.append(footer, reveal);
  }
})();

// Glossary previews: a term whose glossary entry is written (build.py
// links it, a.term-link) shows that entry on hover or keyboard focus. The
// entry is read out of glossary.html itself, fetched once, so the page
// stays the only copy. Touch has no hover: a tap follows the link.
// Listeners sit on the document, so a step nav.js swaps in needs no re-init.
'use strict';

(function () {
  let glossary = null;  // Promise<Document | null> for glossary.html
  let pop = null;       // the one preview element, made on first use
  let owner = null;     // the term link the preview is (or will be) for
  let timer = 0;

  function entryFor(a) {
    const url = new URL(a.getAttribute('href'), location.href);
    if (!glossary) {
      glossary = fetch(url.pathname)
        .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
        .then((t) => new DOMParser().parseFromString(t, 'text/html'))
        .catch(() => { glossary = null; return null; });  // retry on the next hover
    }
    return glossary.then((doc) => doc && doc.getElementById(url.hash.slice(1)));
  }

  function place(a) {
    const r = a.getBoundingClientRect();
    const margin = 8;
    const w = pop.offsetWidth, h = pop.offsetHeight;
    const left = Math.max(margin, Math.min(r.left, innerWidth - w - margin));
    const below = r.bottom + 6;
    const top = below + h > innerHeight - margin && r.top - 6 - h > margin
      ? r.top - 6 - h : below;
    pop.style.left = `${left + scrollX}px`;
    pop.style.top = `${top + scrollY}px`;
  }

  function show(a) {
    owner = a;
    entryFor(a).then((entry) => {
      if (owner !== a || !entry || !a.isConnected) return;
      if (!pop) {
        pop = document.createElement('div');
        pop.className = 'gloss-pop';
        pop.id = 'gloss-pop';
        pop.setAttribute('role', 'tooltip');
        document.body.append(pop);
      }
      const name = document.createElement('div');
      name.className = 'gloss-name';
      name.innerHTML = entry.querySelector('h2').innerHTML;
      const body = entry.querySelector('.gloss-body').cloneNode(true);
      pop.replaceChildren(name, body);
      pop.hidden = false;
      a.setAttribute('aria-describedby', pop.id);
      place(a);
    });
  }

  function hide() {
    if (owner) owner.removeAttribute('aria-describedby');
    owner = null;
    if (pop) pop.hidden = true;
  }

  const later = (f, ms) => { clearTimeout(timer); timer = setTimeout(f, ms); };
  const canHover = matchMedia('(hover: hover)');

  document.addEventListener('mouseover', (e) => {
    if (!canHover.matches) return;
    const a = e.target.closest('a.term-link');
    if (a) {
      if (a !== owner) later(() => show(a), 250);
      else clearTimeout(timer);
    } else if (pop && pop.contains(e.target)) {
      clearTimeout(timer);  // reading the preview keeps it open
    } else if (owner) {
      later(hide, 200);
    }
  });
  document.addEventListener('focusin', (e) => {
    const a = e.target.closest && e.target.closest('a.term-link');
    if (a) { clearTimeout(timer); show(a); }
  });
  document.addEventListener('focusout', (e) => {
    if (e.target === owner) hide();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && owner) hide();
  });
})();

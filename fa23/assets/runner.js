// In-browser Java runner: compiles with javac (tools.jar) and runs HtDC tester.Main
// via CheerpJ. JVM boots lazily on the first Run click; runs are serialized.
'use strict';

(function () {
  const consoleEl = document.getElementById('console');
  const encoder = new TextEncoder();
  // CheerpJ's /app/ maps to the *origin root*, so prefix with the site's base
  // path — keeps jar loading working when hosted under a subpath
  // (e.g. username.github.io/repo/).
  const ASSETS = '/app' + new URL('../assets/', document.baseURI).pathname;
  let jvmReady = null;
  let running = false;
  const queue = [];

  function initJvm() {
    if (!jvmReady) {
      jvmReady = cheerpjInit({ status: 'none' });
    }
    return jvmReady;
  }

  async function runWidget(widget) {
    const button = widget.querySelector('button.run');
    const state = widget.querySelector('.state');
    const out = widget.querySelector('pre.out');
    button.disabled = true;
    out.hidden = false;
    out.textContent = '';
    out.classList.remove('err');

    consoleEl.textContent = '';
    const relay = new MutationObserver(() => { out.textContent = consoleEl.innerText; });
    relay.observe(consoleEl, { childList: true, subtree: true, characterData: true });

    try {
      state.textContent = 'starting JVM…';
      await initJvm();
      const main = widget.dataset.main;
      const source = `/str/${main}.java`;
      cheerpjAddStringFile(source, encoder.encode(widget.querySelector('textarea').value));

      state.textContent = 'compiling…';
      const rc = await cheerpjRunMain(
        'com.sun.tools.javac.Main', ASSETS + 'tools.jar',
        '-cp', ASSETS + 'tester.jar:/files/', '-d', '/files/', '-nowarn', source);
      if (rc !== 0) {
        out.classList.add('err');
        state.textContent = 'compile error';
        return;
      }

      state.textContent = 'running…';
      const cp = ASSETS + 'tester.jar:/files/';
      if (widget.dataset.runner === 'cli') {
        const argsField = widget.querySelector('input.args');
        const args = argsField && argsField.value.trim()
          ? argsField.value.trim().split(/\s+/) : [];
        await cheerpjRunMain(main, cp, ...args);
      } else {
        await cheerpjRunMain('tester.Main', cp, main);
      }
      state.textContent = 'done';
    } catch (e) {
      out.classList.add('err');
      out.textContent += '\n[page error] ' + e;
      state.textContent = 'failed';
    } finally {
      relay.disconnect();
      out.textContent = consoleEl.innerText;
      button.disabled = false;
    }
  }

  async function drainQueue() {
    if (running) return;
    running = true;
    while (queue.length) await runWidget(queue.shift());
    running = false;
  }

  for (const widget of document.querySelectorAll('.runner')) {
    const textarea = widget.querySelector('textarea');
    const original = textarea.value;
    widget.querySelector('button.run').addEventListener('click', () => {
      if (!queue.includes(widget)) queue.push(widget);
      drainQueue();
    });
    widget.querySelector('button.revert').addEventListener('click', () => {
      textarea.value = original;
    });
  }
})();

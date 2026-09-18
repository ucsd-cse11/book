// Worksheet preview: student copy or key in one page. The choice rides in
// the hash so watch.py's reload lands back on the copy you were reading.
(function () {
  var frame = document.querySelector('iframe.sheet');
  if (!frame) return;
  var src = { student: frame.dataset.student, key: frame.dataset.key };
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.views button'));
  var raw = document.querySelector('.raw');

  function show(view) {
    if (!src[view]) view = 'student';
    if (frame.getAttribute('src') !== src[view]) frame.src = src[view];
    if (raw) raw.href = src[view];
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.view === view));
    });
  }

  function fromHash() { return location.hash === '#key' ? 'key' : 'student'; }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.view === 'key') location.hash = 'key';
      else history.replaceState(null, '', location.pathname);
      show(b.dataset.view);
    });
  });
  addEventListener('hashchange', function () { show(fromHash()); });
  show(fromHash());
})();

// Worker that owns the modern-Java toolchain: CheerpJ JVM (Java 17), the
// resident embedded-ECJ compiler (BookCompiler), and program runs. Living
// off the main thread keeps pages responsive, and lets the expensive
// one-time warm-up (runtime download + first read of the platform-classes
// jar) start at page load instead of on the first Run click.
//
// Loaded as a SharedWorker where supported (everything but Chrome for
// Android): all open book tabs then share one JVM and one warm-up, and
// their runs are serialized — which also keeps them from interleaving
// writes to the shared /files/ filesystem. Falls back to a dedicated
// Worker per page otherwise. Neither survives navigation: browsers kill a
// SharedWorker as soon as its last client disconnects.
//
// Protocol (worker -> page): {type:'state', label}   warm-up / phase progress
//                            {type:'console', id, text}  live program output
//                            {type:'result', id, ok, compileError, images}
//                            {type:'closing'}       this worker is going away
// (page -> worker):          {type:'run', id, source}
//                            {type:'stop'}          close, whatever you are doing
//
// There is no way to interrupt a running Java program here: CheerpJ only
// preempts at call sites, and nothing in the JVM's API can stop a thread
// from outside. So a reader's Stop is answered the only way it can be —
// the whole worker closes, JVM and all, and the page starts a new one.
// Closing is announced first so other tabs sharing this worker can fail
// their own in-flight runs instead of waiting on a port that is gone.
'use strict';

const IS_SHARED = typeof SharedWorkerGlobalScope !== 'undefined'
  && self instanceof SharedWorkerGlobalScope;
const ports = []; // shared mode: one per connected tab
let lastState = 'preparing Java…';

function broadcast(msg) {
  if (msg.type === 'state') lastState = msg.label;
  if (IS_SHARED) {
    for (const p of ports) p.postMessage(msg);
  } else {
    postMessage(msg);
  }
}

// CheerpJ routes System.out/err here (there is no DOM console element in a
// worker), so intercepting console gives a live output relay. It also emits
// its own diagnostics through console; filter the known ones.
let activeRun = null; // {id, post, failed}
const NOISE = /^(JIT failure|Deprecated:|CheerpJ)/;
// runner.js's wrapper prints this line when the program throws; the JVM
// itself returns normally either way (see runOne).
const FAILED = '\u0001__FAILED__\u0001';
for (const level of ['log', 'error', 'warn', 'info', 'debug']) {
  const orig = console[level].bind(console);
  console[level] = (...args) => {
    let text = args.join(' ');
    if (activeRun !== null && !NOISE.test(text)) {
      if (text.includes(FAILED)) {
        activeRun.failed = true;
        text = text.split(FAILED).join('');
        if (text.trim() === '') { orig(...args); return; }
      }
      activeRun.post({ type: 'console', id: activeRun.id, text });
    }
    orig(...args);
  };
}

importScripts('https://cjrtnc.leaningtech.com/4.3/loader.js');

const ASSETS = '/app' + self.location.pathname.replace(/[^/]*$/, '');
const COMPILER_CP = `${ASSETS}bookc.jar:${ASSETS}ecj.jar`;
const COMPILE_CP = `${ASSETS}platform17.jar:${ASSETS}pict17.jar:/files/`;
const RUN_CP = `${ASSETS}pict17.jar:/files/`;
// (resolved at call time: the loader defines these only once the JVM is up)
const addStringFile = (path, data) =>
  (self.cheerpOSAddStringFile || self.cheerpjAddStringFile)(path, data);
const encoder = new TextEncoder();

const queue = [];
let compiler = null;

async function compile(source) {
  addStringFile('/str/Program.java', encoder.encode(source));
  return await compiler.compileLine(`-d /files/ -cp ${COMPILE_CP} /str/Program.java`);
}

async function collectImages() {
  const images = [];
  for (let i = 0; ; i++) {
    let blob = null;
    try { blob = await cjFileBlob(`/files/.shown-${i}.png`); } catch (e) { /* absent */ }
    if (!blob || blob.size === 0) break;
    images.push(await blob.arrayBuffer());
  }
  return images;
}

async function runOne(job) {
  activeRun = job;
  try {
    job.post({ type: 'state', label: 'compiling…' });
    const rc = await compile(job.source);
    if (rc !== 0) {
      job.post({ type: 'result', id: job.id, ok: false, compileError: true, images: [] });
      return;
    }
    job.post({ type: 'state', label: 'running…' });
    job.failed = false;
    await cheerpjRunMain('__Main', RUN_CP);
    activeRun = null;
    const images = await collectImages();
    job.post({ type: 'result', id: job.id, ok: !job.failed, compileError: false, images },
      images);
  } catch (e) {
    job.post({ type: 'console', id: job.id, text: '[page error] ' + e });
    job.post({ type: 'result', id: job.id, ok: false, compileError: false, images: [] });
  } finally {
    activeRun = null;
  }
}

const ready = (async () => {
  broadcast({ type: 'state', label: 'downloading Java runtime…' });
  await cheerpjInit({ version: 17, status: 'none' });
  broadcast({ type: 'state', label: 'loading compiler…' });
  const lib = await cheerpjRunLibrary(COMPILER_CP);
  compiler = await lib.BookCompiler;
  // Warm-up: a throwaway compile pays the one-time platform-jar read, and a
  // throwaway run warms the launch path. It exercises the same surface as
  // the page's examples (Color, shapes, combinators, text, rendering) so
  // their symbols and code paths are already hot on the first real Run.
  broadcast({ type: 'state', label: 'warming up the compiler…' });
  addStringFile('/str/Warm.java', encoder.encode('import java.awt.Color;\n'
    + 'class __Prog { void main() {\n'
    + '  Pict p = new Overlay(new Circle(3, Color.RED),\n'
    + '    new Above(new Beside(new Rect(4, 4, Color.WHITE), new CircleOutline(3, Color.BLACK)),\n'
    + '      new Beside(new Triangle(4, 4, Color.BLUE), new Text("warm", 12, new Color(1, 2, 3)))));\n'
    + '  Raster r = p.render();\n'
    + '  if (r.width() < 0) System.out.println(r.colorAt(0, 0));\n'
    + '} }\n'
    + 'class __Main { public static void main(String[] args) throws Exception {'
    + ' __Main.class.getClassLoader().setDefaultAssertionStatus(true);'
    + ' ImageIO_.__reset(); new __Prog().main(); } }\n'));
  await compiler.compileLine(`-d /files/ -cp ${COMPILE_CP} /str/Warm.java`);
  await cheerpjRunMain('__Main', RUN_CP);
  broadcast({ type: 'state', label: '' });
})();
ready.catch((e) => broadcast({ type: 'state', label: 'Java setup failed: ' + e }));

let draining = false;
async function drain() {
  if (draining) return;
  draining = true;
  try {
    try {
      await ready;
    } catch (err) {
      while (queue.length) {
        const job = queue.shift();
        job.post({ type: 'console', id: job.id, text: '[page error] ' + err });
        job.post({ type: 'result', id: job.id, ok: false, compileError: false, images: [] });
      }
      return;
    }
    while (queue.length) await runOne(queue.shift());
  } finally {
    draining = false;
  }
}

function onRunMessage(post) {
  return (e) => {
    if (e.data.type === 'stop') {
      broadcast({ type: 'closing' });
      self.close();
      return;
    }
    if (e.data.type !== 'run') return;
    queue.push({ id: e.data.id, source: e.data.source, post });
    drain();
  };
}

if (IS_SHARED) {
  self.onconnect = (e) => {
    const port = e.ports[0];
    ports.push(port);
    port.postMessage({ type: 'state', label: lastState }); // catch late joiners up
    port.onmessage = onRunMessage((msg, transfer) => port.postMessage(msg, transfer || []));
  };
} else {
  self.onmessage = onRunMessage((msg, transfer) => postMessage(msg, transfer || []));
}

# Introduction to Programming and Computational Problem-Solving — the book

A static, self-contained regeneration of the Stepik course
"Introduction to Programming and Computational Problem-Solving" (course
100177). Quizzes are rendered and checked client-side, and the Java examples
are compiled and run **entirely in the browser** (CheerpJ + the HtDC
`tester.jar`) — no accounts, no login, no execution server.

Used across course offerings (FA26, WI27, …) from this single repo so that
fixes centralize instead of going stale in per-quarter copies.

By Joe Politz, Rachel Lim, Sunwoo Kim, Gerald Soosairaj, and Niema Moshiri.

## Layout

- `book/generate.py` — reads `stepik-export/` + `book/data/playground/` and
  writes the static site to `site/` (gitignored; fully derived).
- `book/data/playground/` — the Tech.io playground content
  (from github.com/IPCPS/playground-9dxcuq8k): every runnable example.
- `book/data/` also holds `tools.jar` (JDK 8 compiler), `tester.jar`, and
  offline caches for lesson titles and images.
- `book/mapping-report.txt` — audit of Tech.io widget → source file mapping.
- `stepik-export/` — the raw course export (all steps incl. author-side quiz
  sources) plus the `stepik_export.py` script that produced it
  (needs `STEPIK_CLIENT_ID`/`STEPIK_CLIENT_SECRET` to re-run).
- `serve.py` — local dev server on :8000. Plain `python -m http.server` will
  NOT work: CheerpJ requires HTTP Range support.
- `tests/` — Playwright suite (`npm test`; `--project=webkit` for a
  Safari-engine check).
- `prototype/` — the original single-page CheerpJ proof of concept.

## Common commands

```sh
python3 book/generate.py   # regenerate site/
python3 serve.py &         # serve on http://localhost:8000
npm test                   # Playwright suite (headless Chromium)
```

## Publishing

Pushes to `main` trigger `.github/workflows/pages.yml`, which regenerates the
site and publishes it to the `gh-pages` branch; GitHub Pages serves it at
https://ucsd-cse11.github.io/book/. The site is pure static files; the only
host requirements are HTTPS and HTTP Range support (GitHub Pages has both).
The CheerpJ runtime loads from Leaning Technologies' CDN per their Community
License.

Note: the published book (and this repo) necessarily contain the quiz answers
— checking is client-side by design. Don't point graded assessments at it.

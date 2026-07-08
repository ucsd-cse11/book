#!/usr/bin/env python3
"""Generate a static-site 'book' from the Stepik export + Tech.io playground repo.

Reads:
  ~/stepik-export/export/100177-*/        (Stepik course export incl. author sources)
  book/data/playground/                    (Tech.io playground: stubs + welcome.md)
Writes:
  site/                                    (static site, servable from any host)
  book/mapping-report.txt                  (widget mapping audit)

No server-side anything: quizzes are checked client-side (answers embedded in the
page), code widgets compile/run via CheerpJ in the browser.
"""

import glob
import hashlib
import html
import json
import os
import re
import shutil
import sys
import urllib.parse
import urllib.request
from pathlib import Path

BOOK = Path(__file__).resolve().parent
ROOT = BOOK.parent
SITE = ROOT / "site"
PLAYGROUND = BOOK / "data" / "playground"
IMG_CACHE = BOOK / "data" / "img-cache"
EXPORT_GLOB = str(ROOT / "stepik-export/export/100177-*")

STEP_TYPE_LABELS = {
    "text": "", "choice": "Quiz", "string": "Short answer", "number": "Number",
    "fill-blanks": "Fill in the blanks", "matching": "Matching",
    "sorting": "Put in order", "parsons": "Arrange the code",
}


# ---------------------------------------------------------------- data loading

def load_course():
    (export_dir,) = glob.glob(EXPORT_GLOB)
    export = Path(export_dir)
    course = json.loads((export / "course.json").read_text())
    sections = []
    for sdir in sorted(export.iterdir()):
        if not sdir.is_dir():
            continue
        spos = int(sdir.name.split("-", 1)[0])
        lessons = []
        for ldir in sorted(sdir.iterdir()):
            lpos = int(ldir.name.split("-", 1)[0])
            steps = []
            for sf in sorted(ldir.glob("step-*.json")):
                if sf.name.endswith(".source.json"):
                    continue
                step = json.loads(sf.read_text())
                srcf = sf.with_suffix("").with_suffix("")  # strip .json
                srcf = sf.parent / (sf.stem + ".source.json")
                step["_source"] = json.loads(srcf.read_text()) if srcf.exists() else None
                steps.append(step)
            steps.sort(key=lambda s: s["position"])
            lessons.append({
                "pos": lpos, "dirname": ldir.name, "steps": steps,
                "title": None,  # filled from lesson title inside steps' lesson field? use dirname
            })
        lessons.sort(key=lambda l: l["pos"])
        sections.append({"pos": spos, "dirname": sdir.name, "lessons": lessons})
    sections.sort(key=lambda s: s["pos"])
    return course, sections


def titleize(dirname):
    """Fallback when the API is unreachable: de-slug the export dirname."""
    return dirname.split("-", 1)[1].replace("--", ": ").replace("-", " ")


def fetch_titles(course, sections):
    """Real section/lesson titles from the public Stepik API, cached on disk."""
    cache_file = BOOK / "data" / "titles.json"
    if cache_file.exists():
        return json.loads(cache_file.read_text())
    titles = {"sections": {}, "lessons": {}}
    try:
        def api(endpoint, ids):
            out = []
            for i in range(0, len(ids), 20):
                q = "&".join(f"ids[]={x}" for x in ids[i:i + 20])
                with urllib.request.urlopen(f"https://stepik.org/api/{endpoint}?{q}", timeout=30) as r:
                    out.extend(json.load(r)[endpoint])
            return out
        for s in api("sections", course["sections"]):
            titles["sections"][str(s["position"])] = s["title"]
        lesson_ids = [l["steps"][0]["lesson"] for sec in sections for l in sec["lessons"] if l["steps"]]
        by_id = {l["id"]: l["title"] for l in api("lessons", lesson_ids)}
        for sec in sections:
            for l in sec["lessons"]:
                if l["steps"]:
                    key = f"{sec['pos']}.{l['pos']}"
                    titles["lessons"][key] = by_id.get(l["steps"][0]["lesson"])
        cache_file.write_text(json.dumps(titles, indent=1, ensure_ascii=False))
    except Exception as e:  # offline regeneration falls back to dirnames
        print(f"  (title fetch failed: {e}; using dirname fallbacks)")
    return titles


# ------------------------------------------------------------- widget mapping

DIRECTIVE_RE = re.compile(r'@\[([^\]]*)\]\(\{"stubs": \["([^"]+)"\], "command": "([^"]+)"\}\)')
IFRAME_RE = re.compile(r'<iframe[^>]*src="(https?://tech\.io/playground-widget/[^"]*)"[^>]*>\s*(?:</iframe>)?')


def parse_directives():
    md = (PLAYGROUND / "markdowns" / "welcome.md").read_text()
    directives = []
    for m in DIRECTIVE_RE.finditer(md):
        title, stub, command = m.groups()
        parts = command.split()
        # "sh run.sh Class dir" -> HtDC tester harness
        # "sh run-cli.sh Class dir" -> Tech.io opened a terminal; we approximate
        # with compile + `java Class <args>` and an editable args field
        runner = "cli" if parts[1] == "run-cli.sh" else "tester"
        directives.append({"title": title, "stub": stub, "main": parts[2],
                           "runner": runner, "used": 0})
    return directives


class WidgetMapper:
    """Maps the k-th course occurrence of a widget title to the k-th directive."""

    def __init__(self):
        self.directives = parse_directives()
        self.by_title = {}
        for d in self.directives:
            self.by_title.setdefault(d["title"], []).append(d)
        self.by_url = {}  # same URL re-embedded in several steps -> same widget
        self.report = []
        self.count = 0

    def lookup(self, url, where):
        if url in self.by_url:
            pick = self.by_url[url]
            self.count += 1
            self.report.append(f"ok  {where}: (re-embed) -> {pick['stub']}")
            return pick
        title = urllib.parse.unquote(url.rsplit("/", 1)[-1])
        title = title.split("#", 1)[0]
        candidates = self.by_title.get(title)
        if not candidates:
            self.report.append(f"UNMATCHED  {where}: title {title!r} url={url}")
            return None
        unused = [c for c in candidates if c["used"] == 0]
        pick = unused[0] if unused else candidates[0]
        pick["used"] += 1
        self.by_url[url] = pick
        self.count += 1
        self.report.append(f"ok  {where}: {title!r} -> {pick['stub']}")
        return pick

    def unused(self):
        return [d for d in self.directives if d["used"] == 0]


# ------------------------------------------------------------------- images

def localize_images(text):
    IMG_CACHE.mkdir(parents=True, exist_ok=True)
    (SITE / "assets" / "img").mkdir(parents=True, exist_ok=True)

    def fetch(url):
        key = hashlib.sha1(url.encode()).hexdigest()[:16]
        ext = os.path.splitext(urllib.parse.urlparse(url).path)[1] or ".png"
        cached = IMG_CACHE / (key + ext)
        if not cached.exists():
            print(f"  fetching image {url}")
            req = urllib.request.Request(url, headers={"User-Agent": "course-export"})
            cached.write_bytes(urllib.request.urlopen(req, timeout=30).read())
        dest = SITE / "assets" / "img" / cached.name
        if not dest.exists():
            shutil.copy(cached, dest)
        return "../assets/img/" + cached.name

    return re.sub(
        r'src="(https?://ucarecdn\.stepik\.net/[^"]+)"',
        lambda m: 'src="%s"' % fetch(m.group(1)),
        text,
    )


# ---------------------------------------------------------------- rendering

def esc(s):
    return html.escape(s, quote=True)


def render_runner(widget, wid):
    stubfile = PLAYGROUND / widget["stub"]
    code = stubfile.read_text() if stubfile.exists() else f"// missing stub {widget['stub']}"
    cli = ""
    if widget["runner"] == "cli":
        cli = (f'<label class="cli">$ java {esc(widget["main"])} '
               f'<input class="args" type="text" placeholder="command-line arguments"></label>')
    return f"""
<div class="runner" id="{wid}" data-main="{esc(widget['main'])}" data-runner="{widget['runner']}">
<textarea class="code" spellcheck="false" rows="{min(24, code.count(chr(10)) + 2)}">{esc(code)}</textarea>
<div class="bar">
  <button class="run">Run ▶</button>
  <button class="revert" title="Restore the original code">Revert</button>
  {cli}
  <span class="state"></span>
</div>
<pre class="out" hidden></pre>
</div>"""


def render_step_body(step, mapper, where, wid_counter):
    text = step["block"].get("text") or ""

    def replace_iframe(m):
        widget = mapper.lookup(m.group(1), where)
        if widget is None:
            return '<div class="missing-widget">[interactive example unavailable]</div>'
        wid_counter[0] += 1
        return render_runner(widget, f"w{wid_counter[0]}")

    text = IFRAME_RE.sub(replace_iframe, text)
    text = localize_images(text)

    kind = step["block"]["name"]
    if kind == "text":
        return text

    source = (step.get("_source") or {}).get("block", {}).get("source")
    payload = {"type": kind, "source": source}
    return f"""{text}
<div class="quiz" data-type="{kind}" data-step-id="{step['id']}">
<script type="application/json">{json.dumps(payload, ensure_ascii=False).replace("</", "<\\/")}</script>
<div class="quiz-body"></div>
</div>"""


PAGE_TMPL = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="../assets/book.css">
{katex}
</head>
<body>
<header>
  <a class="home" href="../index.html">☰ Contents</a>
  <span class="crumb">{crumb}</span>
</header>
<main>
<h1>{heading}</h1>
<nav class="stepnav">{stepnav}</nav>
{body}
<nav class="pagenav">{prev} {next}</nav>
</main>
<footer>Generated from the Stepik course export · runs Java in your browser via
<a href="https://cheerpj.com">CheerpJ</a> (Leaning Technologies)</footer>
<pre id="console"></pre>
<script src="https://cjrtnc.leaningtech.com/4.3/loader.js"></script>
<script src="../assets/runner.js"></script>
<script src="../assets/quiz.js"></script>
</body>
</html>"""

KATEX = """<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
  onload="renderMathInElement(document.body, {delimiters: [{left: '\\\\(', right: '\\\\)', display: false}, {left: '$$', right: '$$', display: true}]})"></script>"""


def lesson_filename(section, lesson):
    slug = re.sub(r"[^\w-]+", "-", lesson["dirname"].split("-", 1)[1])[:50].strip("-")
    return f"{section['pos']:02d}-{lesson['pos']:02d}-{slug}.html"


def generate():
    course, sections = load_course()
    titles = fetch_titles(course, sections)

    def section_title(section):
        return titles["sections"].get(str(section["pos"])) or titleize(section["dirname"])

    def lesson_title_of(section, lesson):
        return (titles["lessons"].get(f"{section['pos']}.{lesson['pos']}")
                or titleize(lesson["dirname"]))

    mapper = WidgetMapper()

    if SITE.exists():
        shutil.rmtree(SITE)
    (SITE / "lessons").mkdir(parents=True)
    (SITE / "assets").mkdir()

    # flat lesson list for prev/next
    flat = [(s, l) for s in sections for l in s["lessons"]]

    for i, (section, lesson) in enumerate(flat):
        lesson_title = lesson_title_of(section, lesson)
        where = f"{section['pos']}.{lesson['pos']}"
        wid_counter = [0]

        cards = []
        stepnav = []
        for step in lesson["steps"]:
            kind = step["block"]["name"]
            label = STEP_TYPE_LABELS.get(kind, kind)
            badge = f'<span class="badge">{label}</span>' if label else ""
            stepnav.append(
                f'<a href="#step{step["position"]}" class="t-{kind}" '
                f'title="{esc(label or "reading")}">{step["position"]}</a>')
            body = render_step_body(step, mapper, f"{where} step{step['position']}", wid_counter)
            cards.append(
                f'<section class="step t-{kind}" id="step{step["position"]}">'
                f'{badge}{body}</section>')

        prev_link = next_link = ""
        if i > 0:
            ps, pl = flat[i - 1]
            prev_link = (f'<a class="prev" href="{lesson_filename(ps, pl)}">'
                         f'← {ps["pos"]}.{pl["pos"]} {esc(lesson_title_of(ps, pl))}</a>')
        if i + 1 < len(flat):
            ns, nl = flat[i + 1]
            next_link = (f'<a class="next" href="{lesson_filename(ns, nl)}">'
                         f'{ns["pos"]}.{nl["pos"]} {esc(lesson_title_of(ns, nl))} →</a>')

        body = "\n".join(cards)
        page = PAGE_TMPL.format(
            title=f"{where} {lesson_title}",
            heading=f"{where} — {esc(lesson_title)}",
            crumb=f"{esc(section_title(section))}",
            stepnav="".join(stepnav),
            body=body,
            prev=prev_link,
            next=next_link,
            katex=KATEX if "math-tex" in body else "",
        )
        (SITE / "lessons" / lesson_filename(section, lesson)).write_text(page)

    # ---- table of contents
    toc = []
    for section in sections:
        toc.append(f'<h2>{section["pos"]}. {esc(section_title(section))}</h2>\n<ol>')
        for lesson in section["lessons"]:
            n_widgets = sum(
                1 for st in lesson["steps"]
                for _ in IFRAME_RE.finditer(st["block"].get("text") or ""))
            n_quiz = sum(1 for st in lesson["steps"] if st["block"]["name"] != "text")
            extras = []
            if n_widgets: extras.append(f"{n_widgets} runnable")
            if n_quiz: extras.append(f"{n_quiz} exercises")
            extra = f' <span class="meta">({", ".join(extras)})</span>' if extras else ""
            toc.append(
                f'<li><a href="lessons/{lesson_filename(section, lesson)}">'
                f'{esc(lesson_title_of(section, lesson))}</a>{extra}</li>')
        toc.append("</ol>")

    index = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(course["title"])}</title>
<link rel="stylesheet" href="assets/book.css">
</head>
<body class="toc">
<main>
<h1>{esc(course["title"])}</h1>
<p class="subtitle">{esc(course.get("summary") or "")}</p>
{"".join(toc)}
</main>
<footer>
<p class="authors">By Joe Politz, Rachel Lim, Sunwoo Kim, Gerald Soosairaj, and Niema Moshiri</p>
Generated from the Stepik course export · interactive Java powered by
<a href="https://cheerpj.com">CheerpJ</a></footer>
</body>
</html>"""
    (SITE / "index.html").write_text(index)

    # ---- static assets
    (SITE / ".nojekyll").write_text("")  # gh-pages: serve files verbatim
    for f in ("book.css", "quiz.js", "runner.js"):
        shutil.copy(BOOK / "static" / f, SITE / "assets" / f)
    shutil.copy(BOOK / "data" / "tester.jar", SITE / "assets" / "tester.jar")
    shutil.copy(BOOK / "data" / "tools.jar", SITE / "assets" / "tools.jar")

    # ---- mapping report
    unused = mapper.unused()
    report = [f"widgets mapped: {mapper.count}", f"directives unused: {len(unused)}"]
    report += [f"unused: {d['title']!r} -> {d['stub']}" for d in unused]
    report += sorted(l for l in mapper.report if l.startswith("UNMATCHED"))
    report += [""]
    report += mapper.report
    (BOOK / "mapping-report.txt").write_text("\n".join(report))
    print(f"{len(flat)} lessons, {mapper.count} widgets mapped, "
          f"{len(unused)} directives unused, "
          f"{sum(1 for l in mapper.report if l.startswith('UNMATCHED'))} unmatched")
    print(f"site written to {SITE}")


if __name__ == "__main__":
    generate()

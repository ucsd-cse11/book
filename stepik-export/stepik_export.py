#!/usr/bin/env python3
"""Export a Stepik course (structure, step content, quiz sources, video URLs).

Usage:
    export STEPIK_CLIENT_ID=...
    export STEPIK_CLIENT_SECRET=...
    python3 stepik_export.py COURSE_ID [--out DIR] [--download-videos]

Credentials come from an OAuth app you create (while logged in as the course
author) at https://stepik.org/oauth2/applications/ with:
    Client type          = confidential
    Authorization grant  = client credentials
The token then acts as *you*, so author-only data (step-sources with quiz
definitions and correct answers) is included when available.
"""

import argparse
import json
import os
import re
import sys
import time
from pathlib import Path

import requests

API = "https://stepik.org/api"


def unwrap(data, endpoint):
    """Stepik keys responses by endpoint name, sometimes hyphenated, sometimes not."""
    for key in (endpoint, endpoint.replace("-", "_"), endpoint.replace("_", "-")):
        if key in data:
            return data[key]
    raise KeyError(f"none of the expected keys for {endpoint!r} in {list(data)}")


def get_token(session: requests.Session) -> str:
    cid = os.environ.get("STEPIK_CLIENT_ID")
    secret = os.environ.get("STEPIK_CLIENT_SECRET")
    if not cid or not secret:
        sys.exit("Set STEPIK_CLIENT_ID and STEPIK_CLIENT_SECRET env vars "
                 "(create an app at https://stepik.org/oauth2/applications/).")
    resp = requests.post(
        "https://stepik.org/oauth2/token/",
        data={"grant_type": "client_credentials"},
        auth=(cid, secret),
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()["access_token"]


def fetch(session, endpoint, ids=None, params=None):
    """Fetch objects from an endpoint, batching ids and following pagination."""
    results = []
    if ids is not None:
        ids = list(ids)
        for i in range(0, len(ids), 20):
            chunk = ids[i:i + 20]
            r = session.get(f"{API}/{endpoint}", params=[("ids[]", x) for x in chunk], timeout=30)
            r.raise_for_status()
            results.extend(unwrap(r.json(), endpoint))
            time.sleep(0.2)  # be polite
        return results
    page = 1
    while True:
        p = dict(params or {})
        p["page"] = page
        r = session.get(f"{API}/{endpoint}", params=p, timeout=30)
        r.raise_for_status()
        data = r.json()
        results.extend(unwrap(data, endpoint))
        if not data["meta"]["has_next"]:
            return results
        page += 1
        time.sleep(0.2)


def slug(text, maxlen=60):
    s = re.sub(r"[^\w\- ]+", "", text).strip().replace(" ", "-")
    return s[:maxlen] or "untitled"


def render_step_md(step, source):
    block = step["block"]
    kind = block["name"]
    lines = [f"<!-- step {step['id']} | type: {kind} -->"]
    if kind == "text":
        lines.append(block.get("text", ""))
    elif kind == "video":
        video = block.get("video") or {}
        urls = video.get("urls") or []
        lines.append(f"**Video** (thumbnail: {video.get('thumbnail', 'n/a')})")
        for u in urls:
            lines.append(f"- [{u.get('quality', '?')}p]({u['url']})")
    else:  # quiz/exercise of some kind
        lines.append(f"**Quiz ({kind})**")
        if block.get("text"):
            lines.append(block["text"])
        if source is not None:
            lines.append("\n<details><summary>Author source (answers)</summary>\n")
            lines.append("```json\n" + json.dumps(source.get("block", {}).get("source", source), indent=2, ensure_ascii=False) + "\n```")
            lines.append("</details>")
    return "\n\n".join(lines)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("course_id", type=int)
    ap.add_argument("--out", default="export")
    ap.add_argument("--download-videos", action="store_true",
                    help="also download the highest-quality mp4 for video steps")
    args = ap.parse_args()

    session = requests.Session()
    session.headers["Authorization"] = "Bearer " + get_token(session)

    course = fetch(session, "courses", ids=[args.course_id])[0]
    print(f"Course: {course['title']!r} — {len(course['sections'])} sections")

    out = Path(args.out) / f"{course['id']}-{slug(course['title'])}"
    out.mkdir(parents=True, exist_ok=True)
    (out / "course.json").write_text(json.dumps(course, indent=2, ensure_ascii=False))

    sections = fetch(session, "sections", ids=course["sections"])
    all_unit_ids = [u for s in sections for u in s["units"]]
    units = {u["id"]: u for u in fetch(session, "units", ids=all_unit_ids)}
    lesson_ids = [u["lesson"] for u in units.values()]
    lessons = {l["id"]: l for l in fetch(session, "lessons", ids=lesson_ids)}
    all_step_ids = [sid for l in lessons.values() for sid in l["steps"]]
    print(f"{len(sections)} sections, {len(lessons)} lessons, {len(all_step_ids)} steps")

    steps = {s["id"]: s for s in fetch(session, "steps", ids=all_step_ids)}

    # Author-only quiz sources; skip silently for steps we can't author-read.
    step_sources = {}
    try:
        step_sources = {s["id"]: s for s in fetch(session, "step-sources", ids=all_step_ids)}
        print(f"Fetched {len(step_sources)} step-sources (author view incl. answers)")
    except (requests.HTTPError, KeyError) as e:
        print(f"step-sources unavailable ({e}); continuing with learner view only")

    for section in sorted(sections, key=lambda s: s["position"]):
        sdir = out / f"{section['position']:02d}-{slug(section['title'])}"
        sdir.mkdir(exist_ok=True)
        for uid in section["units"]:
            unit = units[uid]
            lesson = lessons[unit["lesson"]]
            ldir = sdir / f"{unit['position']:02d}-{slug(lesson['title'])}"
            ldir.mkdir(exist_ok=True)
            md_parts = [f"# {lesson['title']}\n"]
            for sid in lesson["steps"]:
                step = steps.get(sid)
                if step is None:
                    print(f"  ! step {sid} missing (no access?)")
                    continue
                (ldir / f"step-{step['position']:02d}-{sid}.json").write_text(
                    json.dumps(step, indent=2, ensure_ascii=False))
                src = step_sources.get(sid)
                if src is not None:
                    (ldir / f"step-{step['position']:02d}-{sid}.source.json").write_text(
                        json.dumps(src, indent=2, ensure_ascii=False))
                md_parts.append(render_step_md(step, src))
                if args.download_videos and step["block"]["name"] == "video":
                    urls = (step["block"].get("video") or {}).get("urls") or []
                    if urls:
                        best = max(urls, key=lambda u: int(u.get("quality") or 0))
                        dest = ldir / f"step-{step['position']:02d}-{sid}.mp4"
                        if not dest.exists():
                            print(f"  downloading video for step {sid} ({best.get('quality')}p)...")
                            with requests.get(best["url"], stream=True, timeout=60) as r:
                                r.raise_for_status()
                                with open(dest, "wb") as f:
                                    for chunk in r.iter_content(1 << 20):
                                        f.write(chunk)
            (ldir / "lesson.md").write_text("\n\n---\n\n".join(md_parts))
            print(f"  {ldir.relative_to(out)} ({len(lesson['steps'])} steps)")

    print(f"\nDone. Export written to {out}")


if __name__ == "__main__":
    main()

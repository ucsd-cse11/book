#!/usr/bin/env python3
"""Static file server with HTTP Range support (required by CheerpJ's jar reads)."""

import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

RANGE_RE = re.compile(r"bytes=(\d*)-(\d*)")


class RangeHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if os.path.isdir(path):
            for index in ("index.html", "index.htm"):
                candidate = os.path.join(path, index)
                if os.path.exists(candidate):
                    path = candidate
                    break
            else:
                return super().send_head()
        if not os.path.exists(path):
            return super().send_head()

        size = os.path.getsize(path)
        header = self.headers.get("Range")
        match = RANGE_RE.match(header or "")
        f = open(path, "rb")
        if not match:
            self.send_response(200)
            self.send_header("Accept-Ranges", "bytes")
            self.send_header("Content-Type", self.guess_type(path))
            self.send_header("Content-Length", str(size))
            self.end_headers()
            return f

        start_s, end_s = match.groups()
        if start_s:
            start = int(start_s)
            end = int(end_s) if end_s else size - 1
        else:  # suffix range: last N bytes
            start = max(0, size - int(end_s))
            end = size - 1
        end = min(end, size - 1)
        if start > end or start >= size:
            self.send_response(416)
            self.send_header("Content-Range", f"bytes */{size}")
            self.end_headers()
            f.close()
            return None

        length = end - start + 1
        self.send_response(206)
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(length))
        self.end_headers()
        f.seek(start)
        return _Slice(f, length)


class _Slice:
    """File-like wrapper that stops after `length` bytes (for copyfile)."""

    def __init__(self, f, length):
        self.f = f
        self.remaining = length

    def read(self, n=-1):
        if self.remaining <= 0:
            return b""
        if n < 0 or n > self.remaining:
            n = self.remaining
        data = self.f.read(n)
        self.remaining -= len(data)
        return data

    def close(self):
        self.f.close()


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    ThreadingHTTPServer(("0.0.0.0", 8000), RangeHandler).serve_forever()

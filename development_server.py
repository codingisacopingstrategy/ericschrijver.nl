#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class MultiViewHandler(SimpleHTTPRequestHandler):
    """
    This implementation is just like the standard
    SimpleHTTPRequestHandler, except that it emulates
    Apache MultiViews for local development.

    When a requested file is not found, it searches the
    same directory for files with the same basename plus
    any extension.

    Example:

        /blabla/bla/foo

    can resolve to:

        /blabla/bla/foo.png
        /blabla/bla/foo.html

    If multiple matches exist, the first match is returned.
    """

    def send_head(self):
        path = self.translate_path(self.path)

        if os.path.isdir(path):
            for index in ("index.html", "index.htm"):
                index_path = os.path.join(path, index)
                if os.path.exists(index_path):
                    path = index_path
                    break
            else:
                return self.list_directory(path)

        if not os.path.exists(path):
            search_dir, search_file = os.path.split(path)

            if os.path.isdir(search_dir):
                pattern = re.compile(r"^" + re.escape(search_file) + r"\.[^\.]+$")
                for entry in os.listdir(search_dir):
                    if pattern.match(entry):
                        path = os.path.join(search_dir, entry)
                        break

        if not os.path.exists(path):
            self.send_error(404, "File not found")
            return None

        ctype = self.guess_type(path)

        try:
            f = open(path, "rb")
        except OSError:
            self.send_error(404, "File not found")
            return None

        self.send_response(200)
        self.send_header("Content-type", ctype)
        self.end_headers()
        return f


PORT = 8000


def run():
    server_address = ("", PORT)
    httpd = ThreadingHTTPServer(server_address, MultiViewHandler)
    print(f"Serving at port {PORT}")
    httpd.serve_forever()


if __name__ == "__main__":
    run()

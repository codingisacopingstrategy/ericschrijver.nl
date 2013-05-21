#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import re
from SimpleHTTPServer import SimpleHTTPRequestHandler
import SocketServer

class MultiViewHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        """Common code for GET and HEAD commands.

        This sends the response code and MIME headers.

        Return value is either a file object (which has to be copied
        to the outputfile by the caller unless the command was HEAD,
        and must be closed by the caller under all circumstances), or
        None, in which case the caller has nothing further to do.

        This implementation is just like the method on the standard
        SimpleHTTPRequestHandler, except that it includes an emulation
        of Apache’s MultiViews: when it can’t find a file, it will
        look in the corresponding folder for a file with that name
        plus an extension.
        
        So
        
        /blabla/bla/foo
        
        can map to
        
        /blabla/bla/foo.png
        /blabla/bla/foo.html
        
        etc
        
        (If there’s multiple matches, this implementation returns the 1st)
        """
        path = self.translate_path(self.path)
        f = None
        if os.path.isdir(path):
            for index in "index.html", "index.htm":
                index = os.path.join(path, index)
                if os.path.exists(index):
                    path = index
                    break
            else:
                return self.list_directory(path)
        if not os.path.exists(path):
            search_dir, search_file = os.path.split(path)
            find_f = re.compile("^" + search_file + "\.[^\.]+$")
            for s in os.listdir(search_dir):
                if find_f.match(s):
                    path = os.path.join(search_dir, s)
                    break
        ctype = self.guess_type(path)
        if ctype.startswith('text/'):
            mode = 'r'
        else:
            mode = 'rb'
        try:
            f = open(path, mode)
        except IOError:
            self.send_error(404, "File not found")
            return None
        self.send_response(200)
        self.send_header("Content-type", ctype)
        self.end_headers()
        return f

PORT = 8000

Handler = MultiViewHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

if __name__ == "__main__":
    print "serving at port", PORT
    httpd.serve_forever()

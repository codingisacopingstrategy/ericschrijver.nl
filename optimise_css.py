#!/usr/bin/env python

"""
Optimise the css from the given url, displaying only the css actually affecting the page
First prints the css from external stylesheets, then from the inline stylesheets

adapted from https://github.com/peterbe/mincss/blob/master/example/run_mincss
by Peter Bengtsson, under the 3-clause BSD License

Requires the Mincss module, run `(sudo) pip install mincss` to install from the
Python Package Index

"""

from mincss.processor import Processor
from sys import argv, exit

URL = argv[1]

def run():
    p = Processor()
    p.process(URL)

    print "/* LINKS ".ljust(797, '-')
    for each in p.links:
        print ("/* On href %s */" % each.href)
        print
        print each.after
        print
    print

    print "/* INLINES ".ljust(77, '-') + "*/"
    for each in p.inlines:
        print ("/* On line %s */" % each.line)
        print
        print each.after
        print
    print


if __name__ == '__main__':
    if len(argv) != 2:
        exit("usage: minify_css URL")
    run()


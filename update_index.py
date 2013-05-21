#!/usr/bin/env python
# -*- coding: utf-8 -*-

from lxml import etree, html
import codecs

htmltree = html.parse('index.html')

with open('index.html', 'wb') as f:
    f.write(etree.tostring(htmltree, encoding='UTF-8', pretty_print=True))

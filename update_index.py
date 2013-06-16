#!/usr/bin/env python
# -*- coding: utf-8 -*-

from time import strftime
from lxml import etree, html
from lxml.cssselect import CSSSelector
import re
import codecs
import feedparser

htmltree = html.parse('index.html')

# Syndication for the design portfolio
a = feedparser.parse('http://schr.fr/feed')

# Syndication for the blog
b = feedparser.parse('http://i.liketightpants.net/and/feed/us/recent_entries.xml')

sel = CSSSelector(".pagina2 dl")
design_dl = sel(htmltree)[0]
design_dl.clear()

n = 0
for i in a['items']:
    if n == 5:
        break
    dt = html.fragment_fromstring('<dt><a href="%s">%s</a></dt>' % (i['link'], i['title']))
    try:
        img = html.fragment_fromstring(i.content[0].value, "div").cssselect('img')[0]
        img.attrib['src'] = re.sub("[0-9]+x[0-9]+", "150x150", img.attrib['src'])
        img.attrib['height'] = '150'
        img.attrib['width'] = '150'
        n += 1
    except:
        continue
    design_dl.append(dt)
    dd = html.Element('dd')
    link = html.Element('a')
    link.attrib['href'] = i['link']
    link.append(img)
    dd.append(link)
    design_dl.append(dd)
    
# print etree.tostring(design_dl, encoding='UTF-8', pretty_print=True)

sel = CSSSelector(".pagina3 dl")
pants_dl = sel(htmltree)[0]
pants_dl.clear()

n = 0
for i in b['items']:
    if n == 12:
        break
    dt = html.fragment_fromstring('<dt><a href="%s">%s</a></dt>' % (i['link'], i['title']))
    updated_formatted = strftime( '%B %d, %Y', i['updated_parsed'])
    dd = html.fragment_fromstring( '<dd>%s</dd>' % (updated_formatted) )
    pants_dl.append(dt)
    pants_dl.append(dd)
    n += 1
    
# print etree.tostring(pants_dl, encoding='UTF-8', pretty_print=True)




#print """<dt>%s</dt>\n<dd><a href="%s">%s</a></dd>""" % (i['link'], i['title'], img)
    #"<dt>%s</dt>\n" % i['title']
    #print html.fragment_fromstring( """<dd><a href="%s">%s</a></dd>""" % (i['link'], img) )

with open('index.html', 'wb') as f:
    f.write(etree.tostring(htmltree, encoding='UTF-8', pretty_print=True))
# print etree.tostring(htmltree, encoding='UTF-8', pretty_print=True)
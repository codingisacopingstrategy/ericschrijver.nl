# [ericschrijver.nl](http://ericschrijver.nl/)

This is the source code for my personal website. There is no CMS: I find that for this kind of site, which is not updated all that often, and that has to support a variety of visual styles, directly working with the HTML is the most efficient approach for me.

It is currently hosted through webfaction at <http://ericschrijver.nl>. In spite of what the repository name suggests, it doesn’t use Github pages—mainly because it uses rewrite rules in an .htaccess file. For local development, you can reproduce Apache’s behaviour with:

    python development_server.py

Next to linking to the pages of the site, the homepage pulls in articles from <http://schr.fr/> and <http://i.liketightpants.net/>. Launch this script with:

    python update_index.py

import subprocess

dates = ['2006-01-27.html', '2006-01-29.html', '2006-02-10.html', '2007-04-21.html', '2007-05-12.html', '2007-08-18.html', '2008-11-21.html']

for file in dates:
    subprocess.call(['git','mv',file,file.replace('-','')])
    

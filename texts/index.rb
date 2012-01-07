files = Dir.glob("*.html")
files.delete("index.html")

puts "<ul>"
files.each do |text|
  re = /<title>Texts @ ericschrijver.nl: ‘(.*)’<\/title>/
  txt = File.open(text,"r")
  link = text.sub(".html","")
  title = re.match(txt.read).captures[0]
  puts "  <li><a href=\"/texts/#{link}\">#{title}</a></li>"
end
puts "</ul>"

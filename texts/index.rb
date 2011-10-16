files = Dir.glob("*.html")
files.delete("index.html")

puts "<ul>"
files.each do |text|
  re = /<title>Texts @ ericschrijver.nl: ‘(.*)’<\/title>/
  txt = File.open(text,"r")
  title = re.match(txt.read).captures[0]
  puts "  <li><a href=\"/texts/#{text}\">#{title}</a></li>"
end
puts "</ul>"

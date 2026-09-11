import glob

for f in glob.glob('*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = content.replace('href="/about"', 'href="/our-story"')
    content = content.replace('About CubicEnhance', 'Our Story')
    content = content.replace('About Us', 'Our Story')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Updated links to /our-story in all HTML files.")

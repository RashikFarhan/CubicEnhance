import glob

for f in glob.glob('partner*.html'):
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Let's make it a solid green
    content = content.replace('text-bcg-light-green mb-4 opacity-50', 'text-bcg-green mb-4')
    content = content.replace('text-bcg-light-green mb-2', 'text-bcg-green mb-2')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print("Fixed numbers to solid green.")

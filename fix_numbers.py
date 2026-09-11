import glob

for filepath in glob.glob('partner-*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # The step numbers
    updated_content = content.replace('text-bcg-light-green mb-4 opacity-50', 'text-bcg-green mb-4')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated_content)

print("Replaced classes in partner-*.html")

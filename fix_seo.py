with open('seo-config.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(r'\n', '\n')

with open('seo-config.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed seo-config.js")

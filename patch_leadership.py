import re

with open('leadership.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix 1: Image Aspect Ratio
html = html.replace('aspect-[4/5] w-full', 'w-full')
html = html.replace('w-full overflow-hidden bg-gray-100 relative', 'w-full overflow-hidden bg-gray-100 relative" style="aspect-ratio: 4/5;"')

# Fix 2: Tab button JS
old_js = """buttons.forEach(b => {
                    b.classList.remove('bg-bcg-dark', 'text-white', 'shadow-md', 'active');
                    b.classList.add('bg-white', 'text-gray-600');
                });
                btn.classList.remove('bg-white', 'text-gray-600');
                btn.classList.add('bg-bcg-dark', 'text-white', 'shadow-md', 'active');"""

new_js = """buttons.forEach(b => {
                    b.classList.remove('bg-bcg-dark', 'text-white', 'shadow-md', 'active');
                    b.classList.add('bg-white', 'text-gray-600', 'hover:bg-gray-50', 'border', 'border-gray-200');
                });
                btn.classList.remove('bg-white', 'text-gray-600', 'hover:bg-gray-50', 'border', 'border-gray-200');
                btn.classList.add('bg-bcg-dark', 'text-white', 'shadow-md', 'active');"""

# The generated HTML might have minified the JS or slightly altered formatting. Let's do a more robust replace for JS in HTML.
html = re.sub(
    r't\.forEach\(\w+=>\{\w+\.classList\.remove\("bg-bcg-dark","text-white","shadow-md","active"\),\w+\.classList\.add\("bg-white","text-gray-600"\)\}\),\w+\.classList\.remove\("bg-white","text-gray-600"\),\w+\.classList\.add\("bg-bcg-dark","text-white","shadow-md","active"\)',
    r't.forEach(t=>{t.classList.remove("bg-bcg-dark","text-white","shadow-md","active"),t.classList.add("bg-white","text-gray-600","hover:bg-gray-50","border","border-gray-200")}),a.classList.remove("bg-white","text-gray-600","hover:bg-gray-50","border","border-gray-200"),a.classList.add("bg-bcg-dark","text-white","shadow-md","active")',
    html
)

# And also fix the unminified version if present
html = html.replace(old_js, new_js)

# Save leadership.html
with open('leadership.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("leadership.html patched successfully.")

import re

with open('build_leadership.py', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace('aspect-[4/5] w-full', 'w-full')
code = code.replace('w-full overflow-hidden bg-gray-100 relative', 'w-full overflow-hidden bg-gray-100 relative" style="aspect-ratio: 4/5;"')

code = code.replace("b.classList.add('bg-white', 'text-gray-600');", "b.classList.add('bg-white', 'text-gray-600', 'hover:bg-gray-50', 'border', 'border-gray-200');")
code = code.replace("btn.classList.remove('bg-white', 'text-gray-600');", "btn.classList.remove('bg-white', 'text-gray-600', 'hover:bg-gray-50', 'border', 'border-gray-200');")

with open('build_leadership.py', 'w', encoding='utf-8') as f:
    f.write(code)

print("build_leadership.py patched.")

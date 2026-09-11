import re

filepath = 'js/main.js'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add link to SECTIONS array
if '/leadership' not in content:
    content = content.replace(
        "{ href: '/how-we-work',  text: 'How We Work', preview: 'comp-how'   },",
        "{ href: '/how-we-work',  text: 'How We Work', preview: 'comp-how'   },\n                { href: '/leadership',  text: 'Leadership & Organization', preview: 'comp-leadership' },"
    )

    # Add preview data
    preview_html = """'comp-leadership': `
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Leadership">
              <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Leadership &amp; Organization</h3>
              <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Explore our multi-tiered leadership structure and interactive directory of our permanent core specialists.</p>
              <a href="/leadership" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
          `,
          'comp-how': `"""

    content = content.replace("'comp-how': `", preview_html)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated main.js with Leadership link.")
else:
    print("Leadership link already in main.js")

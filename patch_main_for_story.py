import re

with open('js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Update the SECTIONS array for "Our Company"
content = content.replace(
    "{ href: '/about',        text: 'About Us',    preview: 'comp-about' },",
    "{ href: '/our-story',        text: 'Our Story',    preview: 'comp-story' },"
)

# Replace the preview data for 'comp-about' with 'comp-story'
# We don't want to replace all of 'comp-about' if it's referenced elsewhere, so just add 'comp-story' to previewData
new_preview = """'comp-story': `
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Our Story">
              <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Our Story</h3>
              <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">From an agile freelance collective to an international managed remote operations partner. Discover how we built an accountable delivery infrastructure.</p>
              <a href="/our-story" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
          `,
          'comp-about': `"""

content = content.replace("'comp-about': `", new_preview)

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched main.js")

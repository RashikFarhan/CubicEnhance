import re

with open('js/main.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Add to SECTIONS array
# Look for:
# { href: '/our-story',        text: 'Our Story',    preview: 'comp-story' },
# { href: '/how-we-work',  text: 'How We Work', preview: 'comp-how'   },
# { href: '/leadership',  text: 'Leadership & Organization', preview: 'comp-leadership' },

content = content.replace(
    "{ href: '/leadership',  text: 'Leadership & Organization', preview: 'comp-leadership' },",
    "{ href: '/leadership',  text: 'Leadership & Organization', preview: 'comp-leadership' },\n                { href: '/culture',  text: 'Operating Principles & Culture', preview: 'comp-culture' },\n                { href: '/careers',  text: 'Talent Registry & Careers', preview: 'comp-careers' },"
)

# Add preview data
new_previews = """'comp-culture': `
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Culture">
              <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Operating Principles &amp; Culture</h3>
              <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Discover the non-negotiable operational standards, security protocols, and ethical governance that guide every workflow.</p>
              <a href="/culture" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
          `,
          'comp-careers': `
              <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Careers">
              <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Talent Registry &amp; Careers</h3>
              <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Join a high-discipline, global delivery network. Submit your credentials to our Global Talent Registry for future core team openings.</p>
              <a href="/careers" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
          `,
"""

content = content.replace("'comp-leadership': `", new_previews + "'comp-leadership': `")

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched main.js with Culture and Careers.")

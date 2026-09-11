import re

with open('careers.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Hiring Notice
old_notice = """<div class="bg-blue-50 border-l-4 border-bcg-green p-6 rounded-r-lg shadow-sm">
            <div class="flex items-start">
                <div class="flex-shrink-0">
                    <svg class="h-6 w-6 text-bcg-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="ml-4">
                    <h3 class="text-lg font-bold text-bcg-dark mb-2">Operational Capacity Notice &mdash; Talent Registry Open</h3>
                    <p class="text-sm text-gray-700 leading-relaxed">
                        CubicEnhance is currently operating at full capacity across our active client delivery pods and is not running open public recruitment rounds. However, because our enterprise engagements scale dynamically, our resource leads continually review exceptional candidates for future core team openings and specialized contractual deployments. We invite qualified operators to submit their credentials to our Global Talent Registry.
                    </p>
                </div>
            </div>
        </div>"""

new_notice = """<div class="bg-bcg-dark text-white p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden">
            <!-- Decorative background element -->
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-bcg-green/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
                <div class="flex items-start gap-5 flex-1">
                    <div class="flex-shrink-0 mt-1">
                        <div class="w-12 h-12 rounded-full bg-bcg-green/20 flex items-center justify-center border border-bcg-light-green/30">
                            <svg class="w-6 h-6 text-bcg-light-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                    </div>
                    <div>
                        <span class="inline-block px-3 py-1 bg-white/10 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-bcg-light-green mb-3">Current Status: Full Capacity</span>
                        <h3 class="text-2xl md:text-3xl font-serif font-bold text-white mb-3">No Active Open Positions</h3>
                        <p class="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl font-light">
                            CubicEnhance is currently operating at full capacity across our active client delivery pods. However, because our enterprise engagements scale dynamically, we continually review exceptional candidates for future core team openings and specialized contractual deployments.
                        </p>
                    </div>
                </div>
                <div class="flex-shrink-0 w-full md:w-auto">
                    <a href="#registry-form" class="inline-flex justify-center items-center px-8 py-4 bg-bcg-light-green text-bcg-dark font-bold text-sm rounded-full hover:bg-white transition-colors shadow-lg w-full uppercase tracking-wider">Join Talent Registry</a>
                </div>
            </div>
        </div>"""

content = content.replace(old_notice, new_notice)

# 2. Update Lock Icon in Form Footer
old_footer = """<svg class="w-3 h-3 inline-block mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>"""
new_footer = """<svg class="w-4 h-4 inline-block mr-1.5 text-bcg-green opacity-80 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="vertical-align: middle;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>"""

content = content.replace(old_footer, new_footer)

with open('careers.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated careers.html")

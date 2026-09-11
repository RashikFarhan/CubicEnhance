import json
import re

# Read shell
source_html = open('data-accounting.html', encoding='utf-8').read()
header_end_idx = source_html.find('</header>') + len('</header>')
footer_start_idx = source_html.find('<footer')
top_shell = source_html[:header_end_idx] + '\n<main>\n'
bottom_shell = '\n</main>\n' + source_html[footer_start_idx:]
top_shell = re.sub(r'<title>.*?</title>', '<title>Leadership & Organizational Structure | CubicEnhance</title>', top_shell)

# Load employees
with open('employees.json', 'r', encoding='utf-8') as f:
    depts = json.load(f)

# Build the directory HTML
# We'll assign a data-category to each card.
# Categories:
# 'data' for Data Operations & Internal Accounting
# 'docs' for Documentation & Back-Office Operations
# 'ai' for AI Automation, Web & QA Systems
# 'creative' for Creative Design & Media Post-Production
# 'exec' for Executive Leadership & Delivery Governance

cat_map = {
    'Executive Leadership & Delivery Governance': 'exec',
    'Data Operations & Internal Accounting': 'data',
    'Documentation & Back-Office Operations': 'docs',
    'AI Automation, Web & QA Systems': 'ai',
    'Creative Design & Media Post-Production': 'creative'
}

directory_cards = []
for dept_name, employees in depts.items():
    cat = cat_map.get(dept_name, 'all')
    for emp in employees:
        card = f"""
        <div class="directory-card {cat} bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex flex-col h-full">
                <div class="mb-3">
                    <h4 class="text-lg font-bold text-bcg-dark inline-block mr-2">{emp['name']}</h4>
                    <span class="inline-block px-2.5 py-1 bg-[#f0f7f9] text-bcg-green text-[10px] font-bold uppercase tracking-widest rounded-full align-middle">{emp['level']}</span>
                </div>
                <p class="text-sm font-medium text-bcg-dark/70 mb-3">{emp['role']}</p>
                <div class="mb-4">
                    <span class="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {emp['location']}
                    </span>
                </div>
                <p class="text-xs text-gray-600 leading-relaxed mt-auto border-t border-gray-50 pt-4">{emp['focus']}</p>
            </div>
        </div>
        """
        directory_cards.append(card)

cards_html = "\n".join(directory_cards)

content = f"""
<!-- 1. Informational Hero Section -->
<section class="pt-24 pb-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 text-center">
        <h1 class="font-serif text-5xl md:text-6xl text-bcg-dark mb-6 leading-tight max-w-5xl mx-auto">
            Operational Leadership & Global Workforce
        </h1>
        <p class="text-lg md:text-xl text-gray-600 font-light mb-12 max-w-4xl mx-auto">
            Built on accountability, process governance, and verified execution. Our multi-tiered leadership structure pairs on-the-ground operational control at our Dhaka delivery headquarters with a distributed international network of specialized operators.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <a href="/how-we-work" class="inline-flex justify-center items-center px-8 py-4 bg-bcg-dark text-white font-bold text-sm rounded-full hover:bg-bcg-green transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Explore Our Operating Model</a>
            <a href="/contact" class="inline-flex justify-center items-center px-8 py-4 bg-white text-bcg-dark font-bold text-sm rounded-full hover:bg-gray-50 border border-gray-200 transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Contact Leadership</a>
        </div>
        
        <div class="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl mx-auto border border-gray-100">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" alt="Operational Center" class="w-full h-full object-cover">
        </div>
    </div>
</section>

<!-- 2. Workforce Scale Benchmark Banner -->
<section class="py-16 bg-bcg-dark border-y border-gray-800">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-700">
            <div class="p-6 text-center">
                <h3 class="text-5xl font-black text-white mb-2 font-serif">57</h3>
                <h4 class="text-sm font-bold uppercase tracking-widest text-bcg-light-green mb-3">Core Permanent Staff</h4>
                <p class="text-gray-400 text-xs leading-relaxed">Full-time specialists across engineering, data, and back-office operations.</p>
            </div>
            <div class="p-6 text-center">
                <h3 class="text-5xl font-black text-white mb-2 font-serif">210+</h3>
                <h4 class="text-sm font-bold uppercase tracking-widest text-bcg-light-green mb-3">Extended Specialist Fleet</h4>
                <p class="text-gray-400 text-xs leading-relaxed">Vetted contractual operators on standby for seasonal surge capacity.</p>
            </div>
            <div class="p-6 text-center">
                <h3 class="text-5xl font-black text-white mb-2 font-serif">38 <span class="text-3xl text-gray-500">/</span> 19</h3>
                <h4 class="text-sm font-bold uppercase tracking-widest text-bcg-light-green mb-3">Delivery Footprint</h4>
                <p class="text-gray-400 text-xs leading-relaxed">38 stationed at Dhaka Delivery HQ; 19 distributed globally across 12 countries.</p>
            </div>
            <div class="p-6 text-center">
                <h3 class="text-5xl font-black text-white mb-2 font-serif">100%</h3>
                <h4 class="text-sm font-bold uppercase tracking-widest text-bcg-light-green mb-3">Process Ownership</h4>
                <p class="text-gray-400 text-xs leading-relaxed">Zero unmanaged freelancers; all output governed by internal SOPs and QA leads.</p>
            </div>
        </div>
    </div>
</section>

<!-- 3. The Executive Managing Partners -->
<section class="py-24 bg-[#fcfdfd] border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
            <span class="inline-block px-4 py-1.5 rounded-full bg-[#e8f3f8] text-bcg-green text-xs font-bold uppercase tracking-widest mb-4">Founders Tier</span>
            <h2 class="font-serif text-4xl md:text-5xl text-bcg-dark">Executive Managing Partners</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Partner 1 -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                <div class="w-full overflow-hidden bg-gray-100 relative" style="aspect-ratio: 4/5;"">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" alt="Tanvir Hasan" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-2xl font-bold text-bcg-dark mb-1">Tanvir Hasan</h3>
                    <p class="text-sm font-medium text-bcg-green mb-4">Managing Partner & Head of Global Delivery</p>
                    <span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-md mb-6 w-max">Dhaka HQ</span>
                    <p class="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">Oversees day-to-day delivery governance, Standard Operating Procedure (SOP) compliance, and cross-departmental SLA fulfillment. Ensures enterprise workflows meet strict accuracy and turnaround benchmarks.</p>
                    <div class="flex gap-3 mt-auto">
                        <a href="#" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-bcg-dark hover:bg-bcg-green hover:text-white transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    </div>
                </div>
            </div>
            
            <!-- Partner 2 -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                <div class="w-full overflow-hidden bg-gray-100 relative" style="aspect-ratio: 4/5;"">
                    <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80" alt="Abrar Chowdhury" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-2xl font-bold text-bcg-dark mb-1">Abrar Chowdhury</h3>
                    <p class="text-sm font-medium text-bcg-green mb-4">Managing Partner & Head of Systems Architecture</p>
                    <span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-md mb-6 w-max">Dhaka HQ</span>
                    <p class="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">Directs internal automation pipelines, n8n workflow integrations, technical infrastructure, and operational data security protocols across client environments.</p>
                    <div class="flex gap-3 mt-auto">
                        <a href="#" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-bcg-dark hover:bg-bcg-green hover:text-white transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    </div>
                </div>
            </div>
            
            <!-- Partner 3 -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                <div class="w-full overflow-hidden bg-gray-100 relative" style="aspect-ratio: 4/5;"">
                    <img src="https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=800&q=80" alt="Marcus Vance" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <h3 class="text-2xl font-bold text-bcg-dark mb-1">Marcus Vance</h3>
                    <p class="text-sm font-medium text-bcg-green mb-4">Managing Partner & Head of Client Strategy</p>
                    <span class="inline-block px-3 py-1 bg-[#e8f3f8] text-bcg-green text-xs font-bold uppercase tracking-wider rounded-md mb-6 w-max">Remote — United States</span>
                    <p class="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">Leads international enterprise client onboarding, commercial partnership frameworks, and global account strategy across North American and European markets.</p>
                    <div class="flex gap-3 mt-auto">
                        <a href="#" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-bcg-dark hover:bg-bcg-green hover:text-white transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 4. Operational Governance & Compliance Leads -->
<section class="py-16 bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Lead 1 -->
            <div class="bg-[#fcfdfd] border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-bcg-dark mb-1">Farhana Rahman</h3>
                <p class="text-sm font-medium text-gray-500 mb-4">Director of Operational Quality & Compliance</p>
                <span class="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Dhaka HQ</span>
                <p class="text-sm text-gray-600 leading-relaxed">Leads multi-tier exception handling, human-in-the-loop QA benchmarks, and client security compliance audits.</p>
            </div>
            <!-- Lead 2 -->
            <div class="bg-[#fcfdfd] border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-bcg-dark mb-1">Kazi Arifuzzaman</h3>
                <p class="text-sm font-medium text-gray-500 mb-4">Operations Integration Lead</p>
                <span class="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Dhaka HQ</span>
                <p class="text-sm text-gray-600 leading-relaxed">Structures low-risk client pilots, maps operational workflows into repeatable SOPs, and supervises tooling handoffs.</p>
            </div>
            <!-- Lead 3 -->
            <div class="bg-[#fcfdfd] border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-bcg-dark mb-1">Sarah Jenkins</h3>
                <p class="text-sm font-medium text-gray-500 mb-4">Global Talent & Resource Director</p>
                <span class="inline-block px-2.5 py-1 bg-[#e8f3f8] text-bcg-green text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Remote — United Kingdom</span>
                <p class="text-sm text-gray-600 leading-relaxed">Directs international vetting, technical skill assessments, and specialized contractor deployment across the extended fleet.</p>
            </div>
        </div>
    </div>
</section>

<!-- 5. Departmental Workforce Directory (Interactive Tabbed Grid) -->
<section class="py-24 bg-[#fcfdfd] border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
            <h2 class="font-serif text-4xl text-bcg-dark mb-6">Core Workforce Directory</h2>
            
            <!-- Tabs -->
            <div class="flex flex-wrap justify-center gap-3" id="directory-tabs">
                <button class="tab-btn active px-5 py-2.5 bg-bcg-dark text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-colors" data-filter="all">All Departments</button>
                <button class="tab-btn px-5 py-2.5 bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider rounded-full transition-colors" data-filter="data">Data & Internal Accounting (13)</button>
                <button class="tab-btn px-5 py-2.5 bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider rounded-full transition-colors" data-filter="docs">Documentation & Back-Office (14)</button>
                <button class="tab-btn px-5 py-2.5 bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider rounded-full transition-colors" data-filter="ai">AI, Web & QA Systems (11)</button>
                <button class="tab-btn px-5 py-2.5 bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider rounded-full transition-colors" data-filter="creative">Creative & Media Production (13)</button>
            </div>
        </div>
        
        <!-- Directory Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="directory-grid">
            {cards_html}
        </div>
    </div>
</section>

<!-- 6. Extended Contractual Specialist Fleet (Capacity Showcase Block) -->
<section class="py-24 bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="bg-bcg-dark rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <!-- Left Side (The Model) -->
            <div class="lg:w-1/2 p-12 md:p-16 flex flex-col justify-center relative">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80')] opacity-5 bg-cover bg-center"></div>
                <div class="relative z-10">
                    <span class="inline-block px-3 py-1 bg-white/10 backdrop-blur text-bcg-light-green text-xs font-bold uppercase tracking-widest rounded-full mb-6">Global Scale</span>
                    <h2 class="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">Dynamic Capacity on Demand</h2>
                    <p class="text-gray-300 text-lg leading-relaxed mb-6">
                        Beyond our core full-time staff, CubicEnhance maintains a vetted network of over <strong class="text-white">210 active contractual specialists</strong>.
                    </p>
                    <p class="text-gray-400 text-sm leading-relaxed">
                        This enables us to deploy instant surge capacity for seasonal catalog updates, high-volume data backlogs, and multi-language operations without compromising delivery quality. Every contractual specialist operates strictly under our internal SOPs and human QA leads.
                    </p>
                </div>
            </div>
            
            <!-- Right Side (The Fleet Distribution Cards) -->
            <div class="lg:w-1/2 p-8 md:p-12 bg-[#1a252f] border-l border-gray-800">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="bg-bcg-dark border border-gray-700 p-6 rounded-xl hover:border-bcg-green/50 transition-colors">
                        <h4 class="text-xl font-bold text-white mb-2">Data & Accounting</h4>
                        <span class="block text-bcg-light-green text-xs font-bold uppercase tracking-wider mb-4">45+ Specialists</span>
                        <p class="text-xs text-gray-400 leading-relaxed">Invoice backlogs, peak tax reconciliation, localized ledgers.</p>
                    </div>
                    <div class="bg-bcg-dark border border-gray-700 p-6 rounded-xl hover:border-bcg-green/50 transition-colors">
                        <h4 class="text-xl font-bold text-white mb-2">Back-Office & Compliance</h4>
                        <span class="block text-bcg-light-green text-xs font-bold uppercase tracking-wider mb-4">60+ Specialists</span>
                        <p class="text-xs text-gray-400 leading-relaxed">Multilingual indexing, vendor compliance tracking, document conversion.</p>
                    </div>
                    <div class="bg-bcg-dark border border-gray-700 p-6 rounded-xl hover:border-bcg-green/50 transition-colors">
                        <h4 class="text-xl font-bold text-white mb-2">AI Annotation & QA</h4>
                        <span class="block text-bcg-light-green text-xs font-bold uppercase tracking-wider mb-4">40+ Specialists</span>
                        <p class="text-xs text-gray-400 leading-relaxed">RLHF labeling, manual regression testing, model output verification.</p>
                    </div>
                    <div class="bg-bcg-dark border border-gray-700 p-6 rounded-xl hover:border-bcg-green/50 transition-colors">
                        <h4 class="text-xl font-bold text-white mb-2">Creative & Media</h4>
                        <span class="block text-bcg-light-green text-xs font-bold uppercase tracking-wider mb-4">65+ Specialists</span>
                        <p class="text-xs text-gray-400 leading-relaxed">Seasonal e-commerce image clipping, burst video editing, print adaptations.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 7. Universal Final CTA -->
<section class="py-24 bg-bcg-green">
    <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">Ready to scale your operations with a dedicated team?</h2>
        <p class="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">Let's discuss your required workflows, map your operational scope, and assign the right specialists to your account.</p>
        <div class="flex justify-center items-center">
            <a href="/contact" class="inline-flex justify-center items-center px-8 py-4 bg-white text-bcg-dark font-bold text-sm rounded-full hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Book a Workflow Discovery Call &rarr;</a>
        </div>
    </div>
</section>

<!-- Filtering Script -->
<script>
    document.addEventListener('DOMContentLoaded', () => {{
        const buttons = document.querySelectorAll('.tab-btn');
        const cards = document.querySelectorAll('.directory-card');
        
        buttons.forEach(btn => {{
            btn.addEventListener('click', () => {{
                // Update button styles
                buttons.forEach(b => {{
                    b.classList.remove('bg-bcg-dark', 'text-white', 'shadow-md', 'active');
                    b.classList.add('bg-white', 'text-gray-600', 'hover:bg-gray-50', 'border', 'border-gray-200');
                }});
                btn.classList.remove('bg-white', 'text-gray-600', 'hover:bg-gray-50', 'border', 'border-gray-200');
                btn.classList.add('bg-bcg-dark', 'text-white', 'shadow-md', 'active');
                
                // Filter cards
                const filter = btn.getAttribute('data-filter');
                cards.forEach(card => {{
                    if (filter === 'all' || card.classList.contains(filter)) {{
                        card.style.display = 'block';
                    }} else {{
                        card.style.display = 'none';
                    }}
                }});
            }});
        }});
    }});
</script>
"""

with open('leadership.html', 'w', encoding='utf-8') as f:
    f.write(top_shell + content + bottom_shell)

print("Generated leadership.html")

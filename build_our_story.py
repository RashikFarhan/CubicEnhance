import re

# Read shell
source_html = open('data-accounting.html', encoding='utf-8').read()
header_end_idx = source_html.find('</header>') + len('</header>')
footer_start_idx = source_html.find('<footer')
top_shell = source_html[:header_end_idx] + '\n<main>\n'
bottom_shell = '\n</main>\n' + source_html[footer_start_idx:]
top_shell = re.sub(r'<title>.*?</title>', '<title>Our Story | CubicEnhance</title>', top_shell)

content = """
<!-- 1. Narrative Hero & Content Image -->
<section class="pt-24 pb-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 text-center">
        <h1 class="font-serif text-5xl md:text-6xl text-bcg-dark mb-6 leading-tight max-w-5xl mx-auto">
            From Agile Execution to Managed Operational Discipline
        </h1>
        <p class="text-lg md:text-xl text-gray-600 font-light mb-12 max-w-4xl mx-auto leading-relaxed">
            Founded on the belief that scaling businesses deserve predictable, accountable operational capacity. We replaced the chaotic world of disconnected freelancing with documented SOPs, specialized teams, and an AI-first delivery infrastructure.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <a href="/how-we-work" class="inline-flex justify-center items-center px-8 py-4 bg-bcg-dark text-white font-bold text-sm rounded-full hover:bg-bcg-green transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Explore Our Operating Model</a>
            <a href="/leadership" class="inline-flex justify-center items-center px-8 py-4 bg-white text-bcg-dark font-bold text-sm rounded-full hover:bg-gray-50 border border-gray-200 transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Meet Our Leadership</a>
        </div>
        
        <div class="w-full max-w-[1200px] mx-auto overflow-hidden rounded-2xl bg-gray-100 relative shadow-xl border border-gray-100" style="aspect-ratio: 16/9;">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="CubicEnhance Collaboration" class="w-full h-full object-cover">
        </div>
    </div>
</section>

<!-- 2. The Narrative Anchor: The Problem We Set Out to Solve -->
<section class="py-24 bg-[#fcfdfd] border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <!-- Left Column (The Core Narrative) -->
            <div class="lg:col-span-3">
                <span class="inline-block px-3 py-1 bg-[#e8f3f8] text-bcg-green text-xs font-bold uppercase tracking-widest rounded-full mb-4">The Catalyst</span>
                <h2 class="font-serif text-4xl text-bcg-dark mb-6">The Outsourcing Breakdown</h2>
                <div class="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                    <p>
                        For decades, growing companies faced an unsustainable operational dilemma: either inflate local payroll with heavy overhead to manage repetitive back-office tasks, or turn to unmanaged freelance marketplaces where quality was inconsistent, turnover was high, and accountability was nonexistent.
                    </p>
                    <p>
                        Businesses did not need another job board or another individual virtual assistant juggling 10 different clients. They needed an operational partner who took complete ownership of the process—designing the workflow, establishing the Standard Operating Procedures (SOPs), and supervising the people executing the work every single day.
                    </p>
                </div>
            </div>
            
            <!-- Right Column (Highlight Pull-Quote Card) -->
            <div class="lg:col-span-2 relative">
                <!-- Decorative background blob (optional) -->
                <div class="absolute -inset-4 bg-bcg-light-green/20 rounded-[3rem] blur-xl -z-10"></div>
                <div class="bg-bcg-dark p-10 rounded-2xl shadow-2xl border border-gray-800 text-white flex flex-col justify-center h-full relative z-10">
                    <svg class="w-12 h-12 text-bcg-green mb-6 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                    <blockquote class="text-xl md:text-2xl font-serif leading-snug mb-8">
                        "We didn't set out to build another agency or another freelance middleman. We set out to build an operational engine that takes full accountability for the outcome, not just the hours logged."
                    </blockquote>
                    <p class="text-sm font-bold uppercase tracking-widest text-bcg-light-green">— Executive Partners, CubicEnhance</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 3. Chronological Evolution Timeline (Interactive Milestone Track) -->
<section class="py-24 bg-white border-t border-gray-100">
    <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-20">
            <h2 class="font-serif text-4xl md:text-5xl text-bcg-dark mb-4">The Evolution of CubicEnhance</h2>
            <p class="text-lg text-gray-600 font-light max-w-2xl mx-auto">From an independent execution collective to a comprehensive managed operations partner.</p>
        </div>
        
        <!-- Vertical Timeline Container -->
        <div class="relative border-l-2 border-bcg-green/30 ml-4 md:ml-6 space-y-16 pb-8">
            
            <!-- Milestone 1 -->
            <div class="relative pl-10 md:pl-16">
                <!-- Marker -->
                <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-bcg-green ring-4 ring-white shadow-sm"></div>
                <!-- Content -->
                <div class="bg-[#fcfdfd] border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <span class="inline-block text-xs font-bold uppercase tracking-widest text-bcg-green mb-3">2018 &mdash; The Foundation</span>
                    <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-4">Testing Real-World Workflows</h3>
                    <p class="text-gray-600 leading-relaxed font-light">
                        Long before CubicEnhance was incorporated, the three co-founders began working collaboratively as an independent execution collective. Handling technical design, data extraction, and workflow support for regional and overseas clients, this phase served as the real-world proving ground. It revealed the fundamental friction point in digital operations: businesses were wasting valuable executive hours constantly reviewing, correcting, and managing task-based work.
                    </p>
                </div>
            </div>

            <!-- Milestone 2 -->
            <div class="relative pl-10 md:pl-16">
                <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-bcg-green ring-4 ring-white shadow-sm"></div>
                <div class="bg-[#fcfdfd] border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <span class="inline-block text-xs font-bold uppercase tracking-widest text-bcg-green mb-3">February 2021 &mdash; Formal Inception</span>
                    <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-4">Incorporating CubicEnhance</h3>
                    <p class="text-gray-600 leading-relaxed font-light">
                        In February 2021, CubicEnhance was officially incorporated as a dedicated online-based operations firm. Moving away from ad-hoc task fulfillment, the company established its core framework: taking structured operational ownership of back-office, document, and administrative workflows. The firm onboarded its first wave of long-term contract partners across North America and Europe.
                    </p>
                </div>
            </div>

            <!-- Milestone 3 -->
            <div class="relative pl-10 md:pl-16">
                <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-bcg-green ring-4 ring-white shadow-sm"></div>
                <div class="bg-[#fcfdfd] border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <span class="inline-block text-xs font-bold uppercase tracking-widest text-bcg-green mb-3">2022–2023 &mdash; Operational Scaling</span>
                    <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-4">Establishing the Central Delivery Headquarters</h3>
                    <p class="text-gray-600 leading-relaxed font-light">
                        To ensure absolute quality control and compliance, CubicEnhance transitioned from a purely decentralized collective to a hybrid enterprise structure. The company established its centralized operational delivery headquarters in Dhaka, Bangladesh, anchoring core governance and security on-site while deploying a global remote fleet for around-the-clock coverage. Standard Operating Procedures (SOPs) and multi-tier QA oversight were instituted across every workflow.
                    </p>
                </div>
            </div>

            <!-- Milestone 4 -->
            <div class="relative pl-10 md:pl-16">
                <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-bcg-green ring-4 ring-white shadow-sm"></div>
                <div class="bg-bcg-dark border border-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                    <span class="inline-block text-xs font-bold uppercase tracking-widest text-bcg-light-green mb-3">Present Day &mdash; Intelligent Automation</span>
                    <h3 class="text-2xl font-serif font-bold text-white mb-4">Combining AI with Human Oversight</h3>
                    <p class="text-gray-300 leading-relaxed font-light">
                        Today, CubicEnhance operates as an end-to-end managed partner for over 90 enterprise and high-growth accounts worldwide. By weaving automated AI pipelines (OCR parsing, ticket routing, and content structuring) directly into our human-led execution teams, we provide international clients with faster delivery cycles, institutional reliability, and guaranteed data accuracy.
                    </p>
                </div>
            </div>

        </div>
    </div>
</section>

<!-- 4. Physical Hub & Global Delivery Footprint (Split Showcase Block) -->
<section class="py-24 bg-[#fcfdfd] border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="font-serif text-4xl md:text-5xl text-bcg-dark mb-6">Our Delivery Infrastructure</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <!-- Left Side — Central Delivery Headquarters -->
            <div class="flex flex-col">
                <div class="w-full bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200 mb-6 shadow-sm" style="aspect-ratio: 4/3;">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" alt="CubicEnhance Delivery Hub" class="w-full h-full object-cover">
                    <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-bcg-dark uppercase tracking-wider shadow-sm">
                        CubicEnhance Delivery Hub, Dhanmondi Office
                    </div>
                </div>
                <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-2">Centralized Delivery Headquarters</h3>
                <span class="inline-block text-xs font-bold uppercase tracking-widest text-bcg-green mb-6">Dhanmondi, Dhaka, Bangladesh</span>
                <p class="text-gray-600 leading-relaxed font-light flex-grow">
                    Our physical operations center serves as the core engine of our delivery governance. Stationing 38 full-time specialists across data architecture, compliance, and systems engineering in one facility allows us to enforce strict physical and network security, run live supervisor audits, and maintain unbroken team cohesion.
                </p>
            </div>
            
            <!-- Right Side — The Distributed Specialist Network -->
            <div class="flex flex-col">
                <div class="w-full bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200 mb-6 shadow-sm" style="aspect-ratio: 4/3;">
                    <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Global Delivery Network Map" class="w-full h-full object-cover">
                    <div class="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-bcg-dark uppercase tracking-wider shadow-sm">
                        Global Delivery Map & Remote Fleet
                    </div>
                </div>
                <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-2">Global Coverage & Specialized Perspective</h3>
                <span class="inline-block text-xs font-bold uppercase tracking-widest text-bcg-green mb-6">12+ Countries Worldwide</span>
                <p class="text-gray-600 leading-relaxed font-light flex-grow">
                    Operational bottlenecks don't sleep. Complementing our central headquarters is a distributed network of full-time remote associates and an on-demand fleet of over 210 contractual specialists across Europe, the Americas, and Asia. This geographic diversity guarantees seamless multi-timezone coordination and language fluency for international enterprise accounts.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- 5. Guiding Operational Pillars (3-Column Minimal Grid) -->
<section class="py-24 bg-white border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="font-serif text-4xl md:text-5xl text-bcg-dark">Guiding Operational Pillars</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Card 1 -->
            <div class="bg-[#fcfdfd] p-10 rounded-2xl border border-gray-100 hover:border-bcg-green/30 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <div class="w-12 h-12 bg-[#e8f3f8] text-bcg-green rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Outcome Ownership Over Hourly Bouts</h3>
                <p class="text-sm text-gray-600 leading-relaxed">Traditional models sell headcount or hours, leaving the risk on the client. We sell managed outcomes. If a workflow fails QA or hits a bottleneck, our internal supervisors step in to resolve it without client intervention.</p>
            </div>
            <!-- Card 2 -->
            <div class="bg-[#fcfdfd] p-10 rounded-2xl border border-gray-100 hover:border-bcg-green/30 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <div class="w-12 h-12 bg-[#e8f3f8] text-bcg-green rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Automation with Human Judgment</h3>
                <p class="text-sm text-gray-600 leading-relaxed">We reject the hype of "unmonitored AI." We deploy automated models for high-speed extraction, synthesis, and processing, but enforce mandatory human verification for every client deliverable. Speed never compromises integrity.</p>
            </div>
            <!-- Card 3 -->
            <div class="bg-[#fcfdfd] p-10 rounded-2xl border border-gray-100 hover:border-bcg-green/30 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <div class="w-12 h-12 bg-[#e8f3f8] text-bcg-green rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Institutional Confidentiality</h3>
                <p class="text-sm text-gray-600 leading-relaxed">Trust is our primary currency. Every workflow is cordoned off behind strict role-based access, two-factor authentication, non-disclosure agreements, and segmented data environments.</p>
            </div>
        </div>
    </div>
</section>

<!-- 6. Universal Final CTA -->
<section class="py-24 bg-bcg-green">
    <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">Put your operations on a solid foundation.</h2>
        <p class="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">Let's discuss your administrative and digital bottlenecks and build a dedicated team that treats your business like their own.</p>
        <div class="flex justify-center items-center">
            <a href="/contact" class="inline-flex justify-center items-center px-8 py-4 bg-white text-bcg-dark font-bold text-sm rounded-full hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Book a Workflow Discovery Call &rarr;</a>
        </div>
    </div>
</section>
"""

with open('our-story.html', 'w', encoding='utf-8') as f:
    f.write(top_shell + content + bottom_shell)

print("Generated our-story.html")

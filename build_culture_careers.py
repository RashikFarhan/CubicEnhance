import re

# Read shell
source_html = open('data-accounting.html', encoding='utf-8').read()
header_end_idx = source_html.find('</header>') + len('</header>')
footer_start_idx = source_html.find('<footer')
top_shell = source_html[:header_end_idx] + '\n<main>\n'
bottom_shell = '\n</main>\n' + source_html[footer_start_idx:]
top_shell_culture = re.sub(r'<title>.*?</title>', '<title>Operating Principles & Culture | CubicEnhance</title>', top_shell)
top_shell_careers = re.sub(r'<title>.*?</title>', '<title>Talent Registry & Careers | CubicEnhance</title>', top_shell)

# ===============================
# BUILD CULTURE PAGE
# ===============================
content_culture = """
<!-- 1. Informational Hero Section -->
<section class="pt-24 pb-20 bg-white">
    <div class="max-w-7xl mx-auto px-6 text-center">
        <h1 class="font-serif text-5xl md:text-6xl text-bcg-dark mb-6 leading-tight max-w-5xl mx-auto">
            Principles That Govern Managed Execution
        </h1>
        <p class="text-lg md:text-xl text-gray-600 font-light mb-12 max-w-4xl mx-auto leading-relaxed">
            Operational reliability is not an accident; it is the direct result of shared values, disciplined execution, and strict governance. Discover the operational standards and cultural pillars that guide every workflow we manage.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <a href="/our-story" class="inline-flex justify-center items-center px-8 py-4 bg-bcg-dark text-white font-bold text-sm rounded-full hover:bg-bcg-green transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Explore Our Story</a>
            <a href="/leadership" class="inline-flex justify-center items-center px-8 py-4 bg-white text-bcg-dark font-bold text-sm rounded-full hover:bg-gray-50 border border-gray-200 transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Meet Our Leadership</a>
        </div>
        
        <div class="w-full max-w-[1200px] mx-auto overflow-hidden rounded-2xl bg-gray-100 relative shadow-xl border border-gray-100" style="aspect-ratio: 16/9;">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" alt="CubicEnhance Focused Team" class="w-full h-full object-cover">
        </div>
    </div>
</section>

<!-- 2. The Four Core Operating Pillars -->
<section class="py-24 bg-[#fcfdfd] border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="font-serif text-4xl md:text-5xl text-bcg-dark mb-4">Our Core Operating Pillars</h2>
            <p class="text-lg text-gray-600 font-light max-w-2xl mx-auto">The non-negotiable principles behind every SOP, delivery pod, and client interaction.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Card 1 -->
            <div class="bg-white p-8 rounded-2xl border border-gray-100 hover:border-bcg-green/30 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col">
                <span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-md mb-4 w-max">Ownership Over Hours</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-4">End-to-End Operational Ownership</h3>
                <p class="text-sm text-gray-600 leading-relaxed flex-grow">We reject the passive mindset of traditional outsourcing. We do not pass off half-completed tasks or blame external variables. Our delivery leads take complete ownership of process mapping, execution, quality control, and exception resolution from start to finish.</p>
            </div>
            <!-- Card 2 -->
            <div class="bg-white p-8 rounded-2xl border border-gray-100 hover:border-bcg-green/30 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col">
                <span class="inline-block px-3 py-1 bg-[#e8f3f8] text-bcg-green text-xs font-bold uppercase tracking-wider rounded-md mb-4 w-max">Verified Automation</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Human-in-the-Loop Integrity</h3>
                <p class="text-sm text-gray-600 leading-relaxed flex-grow">AI drives speed; human judgment guarantees accuracy. We deliberately embed trained human operators into every automated pipeline to review exceptions, evaluate model outputs, and ensure that technology serves reliability rather than introducing unmonitored errors.</p>
            </div>
            <!-- Card 3 -->
            <div class="bg-white p-8 rounded-2xl border border-gray-100 hover:border-bcg-green/30 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col">
                <span class="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-md mb-4 w-max">Zero-Compromise Security</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Binary Security & Confidentiality</h3>
                <p class="text-sm text-gray-600 leading-relaxed flex-grow">Confidentiality is absolute. We enforce strict role-based data compartmentalization, enterprise-grade access management, mandatory two-factor authentication, and legally binding non-disclosure agreements across both our central headquarters and our global remote fleet.</p>
            </div>
            <!-- Card 4 -->
            <div class="bg-white p-8 rounded-2xl border border-gray-100 hover:border-bcg-green/30 hover:-translate-y-1 transition-all duration-300 shadow-sm flex flex-col">
                <span class="inline-block px-3 py-1 bg-[#e8f3f8] text-bcg-green text-xs font-bold uppercase tracking-wider rounded-md mb-4 w-max">Talent Without Borders</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Merit-Driven Global Diversity</h3>
                <p class="text-sm text-gray-600 leading-relaxed flex-grow">Operational excellence knows no geographic boundaries. By combining a centralized physical delivery headquarters in Dhaka with distributed specialists across North America, Europe, Latin America, and Asia, we build resilient, multi-timezone delivery teams united by merit and technical capability.</p>
            </div>
        </div>
    </div>
</section>

<!-- 3. Cultural Standards in Daily Practice (Split-Screen Feature Block) -->
<section class="py-24 bg-white border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <!-- Left Side -->
            <div>
                <h2 class="font-serif text-4xl text-bcg-dark mb-6 leading-tight">Structured Discipline Over Firefighting</h2>
                <div class="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                    <p>
                        Chaos in business operations usually stems from ambiguous processes. At CubicEnhance, we do not expect individual operators to guess their way through complex tasks. Every recurring workflow is codified into clear Standard Operating Procedures (SOPs), complete with edge-case protocols and explicit escalation paths.
                    </p>
                    <p>
                        This structured foundation creates a calm, deliberate working environment where our specialists can execute with high precision, continuous learning, and clear accountability.
                    </p>
                </div>
            </div>
            <!-- Right Side (Cultural Metrics Grid) -->
            <div class="space-y-4">
                <div class="bg-bcg-dark p-6 rounded-xl flex items-start gap-4">
                    <div class="w-10 h-10 bg-bcg-green/20 rounded-lg flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5 text-bcg-light-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-1">Documented Clarity</h4>
                        <p class="text-gray-400 text-sm leading-relaxed">Every recurring workflow is anchored by an active, audited SOP.</p>
                    </div>
                </div>
                <div class="bg-bcg-dark p-6 rounded-xl flex items-start gap-4">
                    <div class="w-10 h-10 bg-bcg-green/20 rounded-lg flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5 text-bcg-light-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-1">Continuous Upskilling</h4>
                        <p class="text-gray-400 text-sm leading-relaxed">Ongoing internal training in workflow automation (n8n, Make), database logic, and specialized toolsets.</p>
                    </div>
                </div>
                <div class="bg-bcg-dark p-6 rounded-xl flex items-start gap-4">
                    <div class="w-10 h-10 bg-bcg-green/20 rounded-lg flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5 text-bcg-light-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <div>
                        <h4 class="text-white font-bold mb-1">Radical Transparency</h4>
                        <p class="text-gray-400 text-sm leading-relaxed">Direct, metric-driven operational reporting with zero hidden delays or obscured errors.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- 4. Ethical & Workplace Commitment -->
<section class="py-20 bg-bcg-green text-white">
    <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="font-serif text-4xl mb-6">Fair Employment & Responsible Governance</h2>
        <p class="text-lg text-white/90 leading-relaxed font-light">
            We believe that sustainable B2B delivery starts with fair workforce standards. CubicEnhance is committed to providing competitive, above-market compensation, ergonomic and secure physical facilities at our Dhaka delivery hub, predictable working hours, and equal opportunities across our distributed global network. We build long-term relationships with our specialists so our clients benefit from institutional memory and minimal turnover.
        </p>
    </div>
</section>

<!-- 5. Universal Final CTA -->
<section class="py-24 bg-bcg-dark">
    <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">Partner with an operations team built on accountability.</h2>
        <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">Let's discuss your administrative and specialized workflows and align on a delivery model tailored to your standards.</p>
        <div class="flex justify-center items-center">
            <a href="/contact" class="inline-flex justify-center items-center px-8 py-4 bg-bcg-light-green text-bcg-dark font-bold text-sm rounded-full hover:bg-white transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Book a Workflow Discovery Call &rarr;</a>
        </div>
    </div>
</section>
"""

with open('culture.html', 'w', encoding='utf-8') as f:
    f.write(top_shell_culture + content_culture + bottom_shell)


# ===============================
# BUILD CAREERS PAGE
# ===============================
content_careers = """
<!-- 1. Informational Hero Section -->
<section class="pt-24 pb-12 bg-white">
    <div class="max-w-7xl mx-auto px-6 text-center">
        <h1 class="font-serif text-5xl md:text-6xl text-bcg-dark mb-6 leading-tight max-w-5xl mx-auto">
            Build the Future of Managed Operations
        </h1>
        <p class="text-lg md:text-xl text-gray-600 font-light mb-12 max-w-4xl mx-auto leading-relaxed">
            Join a high-discipline, global delivery network. We connect specialized operators, data specialists, and automation engineers with growing international enterprises through structured, managed workflows.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16">
            <a href="#registry-form" class="inline-flex justify-center items-center px-8 py-4 bg-bcg-dark text-white font-bold text-sm rounded-full hover:bg-bcg-green transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Join the Talent Registry</a>
            <a href="/culture" class="inline-flex justify-center items-center px-8 py-4 bg-white text-bcg-dark font-bold text-sm rounded-full hover:bg-gray-50 border border-gray-200 transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Explore Our Culture</a>
        </div>
        
        <div class="w-full max-w-[1200px] mx-auto overflow-hidden rounded-2xl bg-gray-100 relative shadow-xl border border-gray-100" style="aspect-ratio: 21/9;">
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80" alt="CubicEnhance Careers" class="w-full h-full object-cover">
        </div>
    </div>
</section>

<!-- 2. Current Hiring Status Notice (Alert Box) -->
<section class="pb-20 bg-white">
    <div class="max-w-4xl mx-auto px-6">
        <div class="bg-blue-50 border-l-4 border-bcg-green p-6 rounded-r-lg shadow-sm">
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
        </div>
    </div>
</section>

<!-- 3. Why High-Performing Operators Choose CubicEnhance -->
<section class="py-24 bg-[#fcfdfd] border-y border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="font-serif text-4xl text-bcg-dark mb-4">What It Means to Work With Us</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Card 1 -->
            <div class="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
                <div class="w-12 h-12 bg-[#e8f3f8] text-bcg-green rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Structured Pods, Not Isolated Chaos</h3>
                <p class="text-sm text-gray-600 leading-relaxed">Unlike unmanaged freelancing where you juggle clients in isolation, CubicEnhance places you inside structured delivery pods backed by dedicated team leads, documented SOPs, and clear expectations.</p>
            </div>
            <!-- Card 2 -->
            <div class="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
                <div class="w-12 h-12 bg-[#e8f3f8] text-bcg-green rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Advanced Tooling & Automation Fluency</h3>
                <p class="text-sm text-gray-600 leading-relaxed">Work alongside cutting-edge operational technology. You will gain hands-on experience integrating AI workflows, managing n8n and API pipelines, and working inside enterprise-grade data platforms.</p>
            </div>
            <!-- Card 3 -->
            <div class="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
                <div class="w-12 h-12 bg-[#e8f3f8] text-bcg-green rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Long-Term Stability & Fair Compensation</h3>
                <p class="text-sm text-gray-600 leading-relaxed">We value retention and institutional knowledge. We offer stable, predictable contracts, above-market compensation, and clear pathways to senior operational and governance roles.</p>
            </div>
        </div>
    </div>
</section>

<!-- 4. The Global Talent Registry Intake Form -->
<section id="registry-form" class="py-24 bg-white scroll-mt-20">
    <div class="max-w-3xl mx-auto px-6">
        <div class="text-center mb-12">
            <h2 class="font-serif text-4xl text-bcg-dark mb-4">Join the CubicEnhance Talent Registry</h2>
            <p class="text-lg text-gray-600 font-light">Submit your background. When a client engagement matches your operational strengths, our resource management team will reach out directly.</p>
        </div>
        
        <div class="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg">
            <form action="#" method="POST" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Full Name -->
                    <div>
                        <label for="fullName" class="block text-sm font-bold text-bcg-dark mb-2">Full Name <span class="text-red-500">*</span></label>
                        <input type="text" id="fullName" name="fullName" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                    </div>
                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-sm font-bold text-bcg-dark mb-2">Email Address <span class="text-red-500">*</span></label>
                        <input type="email" id="email" name="email" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Location -->
                    <div>
                        <label for="location" class="block text-sm font-bold text-bcg-dark mb-2">Location & Country <span class="text-red-500">*</span></label>
                        <input type="text" id="location" name="location" required placeholder="e.g., Dhaka, Bangladesh" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                    </div>
                    <!-- Domain -->
                    <div>
                        <label for="domain" class="block text-sm font-bold text-bcg-dark mb-2">Primary Operational Domain <span class="text-red-500">*</span></label>
                        <select id="domain" name="domain" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                            <option value="" disabled selected>Select your domain</option>
                            <option value="data_accounting">Data & Internal Accounting</option>
                            <option value="docs_backoffice">Documentation & Back-Office Operations</option>
                            <option value="ai_automation">AI Workflow Automation & Integration</option>
                            <option value="qa_web">Software QA & Web Maintenance</option>
                            <option value="graphic_3d">Graphic Design & 3D Visualization</option>
                            <option value="video_media">Video Post-Production & Media Editing</option>
                            <option value="exec_governance">Executive Operational Governance</option>
                        </select>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- LinkedIn -->
                    <div>
                        <label for="linkedin" class="block text-sm font-bold text-bcg-dark mb-2">LinkedIn / Portfolio URL <span class="text-red-500">*</span></label>
                        <input type="url" id="linkedin" name="linkedin" required placeholder="https://..." class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                    </div>
                    <!-- Resume -->
                    <div>
                        <label for="resume" class="block text-sm font-bold text-bcg-dark mb-2">Resume / CV Link <span class="text-red-500">*</span></label>
                        <input type="url" id="resume" name="resume" required placeholder="Link to PDF or Google Doc" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                    </div>
                </div>
                
                <!-- Summary -->
                <div>
                    <label for="summary" class="block text-sm font-bold text-bcg-dark mb-2">Brief Operational Summary</label>
                    <textarea id="summary" name="summary" rows="4" placeholder="Describe the complex workflows, databases, or tools you manage with confidence." class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark"></textarea>
                </div>
                
                <!-- Submit -->
                <div class="pt-4">
                    <button type="submit" class="w-full bg-bcg-dark text-white font-bold py-4 rounded-lg hover:bg-bcg-green transition-colors shadow-md uppercase tracking-wider text-sm">
                        Submit Application to Talent Registry
                    </button>
                </div>
                
                <!-- Footnote -->
                <div class="text-center pt-2">
                    <p class="text-xs text-gray-500 italic">
                        <svg class="w-3 h-3 inline-block mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                        Your information is stored securely and reviewed exclusively by our internal operational leads. We never share or sell candidate data.
                    </p>
                </div>
            </form>
        </div>
    </div>
</section>

<!-- 5. Our 3-Stage Evaluation Process -->
<section class="py-24 bg-[#fcfdfd] border-t border-gray-100">
    <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
            <h2 class="font-serif text-4xl text-bcg-dark mb-4">How We Evaluate Candidates</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <!-- Connecting line (desktop only) -->
            <div class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
            
            <!-- Step 01 -->
            <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative text-center flex flex-col items-center">
                <div class="w-12 h-12 bg-bcg-green text-white font-serif text-xl rounded-full flex items-center justify-center mb-6 shadow-md ring-4 ring-white">01</div>
                <h3 class="text-lg font-bold text-bcg-dark mb-4">Portfolio & Profile Review</h3>
                <p class="text-sm text-gray-600 leading-relaxed">Our talent leads review your submitted workflow background, technical skills, and past operational responsibilities.</p>
            </div>
            
            <!-- Step 02 -->
            <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative text-center flex flex-col items-center">
                <div class="w-12 h-12 bg-bcg-green text-white font-serif text-xl rounded-full flex items-center justify-center mb-6 shadow-md ring-4 ring-white">02</div>
                <h3 class="text-lg font-bold text-bcg-dark mb-4">Practical Workflow Assessment</h3>
                <p class="text-sm text-gray-600 leading-relaxed">Shortlisted candidates complete a timed, practical scenario evaluating SOP comprehension, data accuracy, and problem-solving.</p>
            </div>
            
            <!-- Step 03 -->
            <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative text-center flex flex-col items-center">
                <div class="w-12 h-12 bg-bcg-green text-white font-serif text-xl rounded-full flex items-center justify-center mb-6 shadow-md ring-4 ring-white">03</div>
                <h3 class="text-lg font-bold text-bcg-dark mb-4">Governance & Pod Alignment</h3>
                <p class="text-sm text-gray-600 leading-relaxed">A structured conversation with our operational directors to evaluate communication discipline, security habits, and team fit.</p>
            </div>
        </div>
    </div>
</section>

<!-- 6. Universal Final CTA -->
<section class="py-24 bg-bcg-green">
    <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">Have questions about our operational network?</h2>
        <p class="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light">Reach out to our management team to learn more about how we structure and deploy remote teams.</p>
        <div class="flex justify-center items-center">
            <a href="/contact" class="inline-flex justify-center items-center px-8 py-4 bg-white text-bcg-dark font-bold text-sm rounded-full hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto uppercase tracking-wider">Contact Our Team &rarr;</a>
        </div>
    </div>
</section>
"""

with open('careers.html', 'w', encoding='utf-8') as f:
    f.write(top_shell_careers + content_careers + bottom_shell)

print("Generated culture.html and careers.html")

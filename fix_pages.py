import re

# We will read data-accounting.html directly to get a clean shell
source_html = open('data-accounting.html', encoding='utf-8').read()

header_end_idx = source_html.find('</header>') + len('</header>')
footer_start_idx = source_html.find('<footer')

top_shell = source_html[:header_end_idx] + '\n<main>\n'
bottom_shell = '\n</main>\n' + source_html[footer_start_idx:]

def generate_page(filename, title, content):
    # Fix the title
    page_top = re.sub(r'<title>.*?</title>', f'<title>{title} | CubicEnhance</title>', top_shell)
    
    html = page_top + content + bottom_shell
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html)

# -------------------------------------------------------------
# PAGE 1: /partnerships (Main Hub)
# -------------------------------------------------------------
p1_content = """
<!-- Hero Section -->
<section class="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center fade-in-up">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-bcg-dark mb-6 leading-tight">
        A Partnership Structure Built Around Your Business Requirement
    </h1>
    <p class="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
        CubicEnhance offers four engagement models designed around the way work needs to be delivered. Whether you need an ongoing operational function managed, additional delivery capacity, a dedicated remote team, or managed project execution, we structure the relationship around your requirement.
    </p>
    <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/contact" class="px-8 py-4 bg-bcg-dark text-white rounded-lg font-bold uppercase tracking-wider hover:bg-bcg-green transition-all shadow-md">Discuss Your Requirements</a>
        <a href="#comparison" class="px-8 py-4 bg-gray-100 text-bcg-dark rounded-lg font-bold uppercase tracking-wider hover:bg-gray-200 transition-all border border-gray-200">Compare Models</a>
    </div>
</section>

<section class="pb-20 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto fade-in-up">
    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" alt="Partnership Strategy" class="w-full h-auto rounded-2xl shadow-xl object-cover max-h-[500px]">
</section>

<!-- The 4-Model Comparison Matrix -->
<section id="comparison" class="py-20 bg-gray-50 border-t border-gray-200">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-bcg-dark mb-12 text-center fade-in-up">Compare Our Partnership Models</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-up">
            <!-- Col 1 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover-lift">
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Embedded Operations Partnership</h3>
                <div class="mb-4">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Best Suited For</span>
                    <p class="text-sm text-gray-600">Ongoing operational functions requiring deeper integration.</p>
                </div>
                <div class="mb-4">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Operating Structure</span>
                    <p class="text-sm text-gray-600">CubicEnhance operates as a managed extension of the client’s operation.</p>
                </div>
                <div class="mb-8 flex-grow">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Typical Requirement</span>
                    <p class="text-sm text-gray-600">An operational function managed as part of the client's broader business structure.</p>
                </div>
                <a href="/partner-embedded" class="mt-auto block text-center py-3 bg-bcg-light-green text-bcg-dark font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-bcg-green hover:text-white transition-colors">Explore Embedded Model &rarr;</a>
            </div>
            
            <!-- Col 2 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover-lift">
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Agency Delivery Partnership</h3>
                <div class="mb-4">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Best Suited For</span>
                    <p class="text-sm text-gray-600">Agencies requiring additional delivery capacity.</p>
                </div>
                <div class="mb-4">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Operating Structure</span>
                    <p class="text-sm text-gray-600">Agency manages the client relationship while CubicEnhance supports agreed delivery.</p>
                </div>
                <div class="mb-8 flex-grow">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Typical Requirement</span>
                    <p class="text-sm text-gray-600">Additional capacity to accept or deliver more client work without overhead.</p>
                </div>
                <a href="/partner-agency" class="mt-auto block text-center py-3 bg-bcg-light-green text-bcg-dark font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-bcg-green hover:text-white transition-colors">Explore Agency Model &rarr;</a>
            </div>
            
            <!-- Col 3 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover-lift">
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Dedicated Operations Support</h3>
                <div class="mb-4">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Best Suited For</span>
                    <p class="text-sm text-gray-600">Recurring operational workloads.</p>
                </div>
                <div class="mb-4">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Operating Structure</span>
                    <p class="text-sm text-gray-600">CubicEnhance provides continuing capacity for a defined workload or function.</p>
                </div>
                <div class="mb-8 flex-grow">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Typical Requirement</span>
                    <p class="text-sm text-gray-600">Ongoing operational support without building the entire function internally.</p>
                </div>
                <a href="/partner-dedicated" class="mt-auto block text-center py-3 bg-bcg-light-green text-bcg-dark font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-bcg-green hover:text-white transition-colors">Explore Dedicated Model &rarr;</a>
            </div>
            
            <!-- Col 4 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover-lift">
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Project-Based Delivery</h3>
                <div class="mb-4">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Best Suited For</span>
                    <p class="text-sm text-gray-600">Defined projects with a clear scope.</p>
                </div>
                <div class="mb-4">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Operating Structure</span>
                    <p class="text-sm text-gray-600">CubicEnhance plans, organizes, executes, and supervises the agreed project.</p>
                </div>
                <div class="mb-8 flex-grow">
                    <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-1">Typical Requirement</span>
                    <p class="text-sm text-gray-600">Managed execution for a specific initiative with a defined endpoint.</p>
                </div>
                <a href="/partner-project" class="mt-auto block text-center py-3 bg-bcg-light-green text-bcg-dark font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-bcg-green hover:text-white transition-colors">Explore Project Model &rarr;</a>
            </div>
        </div>
    </div>
</section>

<!-- Decision Framework (4-Block Dark Theme Grid) -->
<section class="py-24 bg-bcg-dark">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center fade-in-up">Selecting the Appropriate Structure</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in-up">
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Nature of the Work</h3>
                <p class="text-gray-300 leading-relaxed">Defined projects suit Project-Based Delivery, while recurring workloads belong in Dedicated Operations Support.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Level of Integration</h3>
                <p class="text-gray-300 leading-relaxed">When CubicEnhance needs to operate as a deeper extension of your business function, Embedded Operations provides the right framework.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Agency Requirements</h3>
                <p class="text-gray-300 leading-relaxed">When an agency needs execution capacity behind its own client-facing team, Agency Delivery provides white-label fulfillment.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Duration &amp; Evolution</h3>
                <p class="text-gray-300 leading-relaxed">Engagements can develop over time—a single project can transition into ongoing dedicated or embedded support as volume grows.</p>
            </div>
        </div>
    </div>
</section>

<!-- Universal Final CTA -->
<section class="py-24 bg-bcg-green relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 fade-in-up">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">Build the Right Partnership with CubicEnhance</h2>
        <p class="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Discuss your requirements with CubicEnhance and determine the partnership model that best supports your operation, capacity, and growth objectives.</p>
        <a href="/contact" class="inline-block px-10 py-5 bg-white text-bcg-dark rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-bcg-light-green transition-all shadow-xl hover:scale-105">Discuss Your Requirements</a>
    </div>
</section>
"""

# -------------------------------------------------------------
# PAGE 2: /partner-embedded (Embedded Operations Partnership)
# -------------------------------------------------------------
p2_content = """
<!-- Hero Section -->
<section class="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center fade-in-up">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-bcg-dark mb-6 leading-tight">
        Extend Your Operational Capacity with CubicEnhance
    </h1>
    <p class="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
        A managed extension of your business. We integrate alongside your existing organization to manage an agreed operational function, taking responsibility for planning, resource allocation, execution, and ongoing supervision.
    </p>
    <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/contact" class="px-8 py-4 bg-bcg-dark text-white rounded-lg font-bold uppercase tracking-wider hover:bg-bcg-green transition-all shadow-md">Discuss an Embedded Partnership</a>
        <a href="/partnerships" class="px-8 py-4 bg-gray-100 text-bcg-dark rounded-lg font-bold uppercase tracking-wider hover:bg-gray-200 transition-all border border-gray-200">Explore All Models</a>
    </div>
</section>

<section class="pb-20 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto fade-in-up">
    <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80" alt="Embedded Operations" class="w-full h-auto rounded-2xl shadow-xl object-cover max-h-[500px]">
</section>

<!-- The Core Difference (Split-Screen Block) -->
<section class="py-20 bg-gray-50 border-t border-gray-200">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 fade-in-up">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-4">Beyond Task Outsourcing</h3>
                <p class="text-gray-600 leading-relaxed">Traditional task-based outsourcing focuses on individual, disconnected assignments. An Embedded Operations Partnership is built around broader operational responsibility. Rather than receiving isolated tasks, CubicEnhance manages the entire operational workflow surrounding an agreed business function.</p>
            </div>
            <div>
                <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-4">Built Around Your Existing Operation</h3>
                <p class="text-gray-600 leading-relaxed">We do not force your business into rigid, pre-packaged services. We coordinate directly with your existing workflows, management hierarchy, and reporting tools so the managed function fits naturally into your wider company.</p>
            </div>
        </div>
    </div>
</section>

<!-- 5-Step Operating Structure (Step Card Grid) -->
<section class="py-24 bg-white border-t border-gray-200">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-bcg-dark mb-12 text-center fade-in-up">How We Structure the Operation</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 fade-in-up">
            <!-- Step 1 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">01</span>
                <h3 class="text-lg font-bold text-bcg-dark mb-3">Requirement Understanding</h3>
                <p class="text-sm text-gray-600">Establishing the workload, expected responsibilities, and operational relationship with your team.</p>
            </div>
            <!-- Step 2 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">02</span>
                <h3 class="text-lg font-bold text-bcg-dark mb-3">Process &amp; Work Organization</h3>
                <p class="text-sm text-gray-600">Structuring the work into a standardized operating process with clear responsibilities.</p>
            </div>
            <!-- Step 3 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">03</span>
                <h3 class="text-lg font-bold text-bcg-dark mb-3">Resource Allocation</h3>
                <p class="text-sm text-gray-600">Assigning vetted contractual and operational specialists based on workload volume.</p>
            </div>
            <!-- Step 4 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">04</span>
                <h3 class="text-lg font-bold text-bcg-dark mb-3">Managed Execution</h3>
                <p class="text-sm text-gray-600">Carrying out the agreed work while CubicEnhance coordinates and supervises day-to-day operations.</p>
            </div>
            <!-- Step 5 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">05</span>
                <h3 class="text-lg font-bold text-bcg-dark mb-3">Ongoing Oversight</h3>
                <p class="text-sm text-gray-600">Continuously monitoring delivery quality, managing exceptions, and aligning with changing business needs.</p>
            </div>
        </div>
    </div>
</section>

<!-- Value Drivers (Dark Theme 4-Block Grid) -->
<section class="py-24 bg-bcg-dark">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center fade-in-up">Value Drivers</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in-up">
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Scalable Capacity</h3>
                <p class="text-gray-300 leading-relaxed">Expand the volume of work your company handles without building equivalent internal departments.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Reduced Management Load</h3>
                <p class="text-gray-300 leading-relaxed">We supervise the workers and workflow, eliminating administrative coordination for your leadership.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Focused Core Team</h3>
                <p class="text-gray-300 leading-relaxed">Keep internal staff 100% focused on strategy, revenue, and client relationships.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Flexible Adaptation</h3>
                <p class="text-gray-300 leading-relaxed">Adjust the team capacity and operational scope as your business demands change.</p>
            </div>
        </div>
    </div>
</section>

<!-- Universal Final CTA -->
<section class="py-24 bg-bcg-green relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 fade-in-up">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">Ready to Embed Managed Capacity into Your Operation?</h2>
        <p class="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Tell us about your operational bottlenecks and explore how an Embedded Operations Partnership can take ownership of the workload.</p>
        <a href="/contact" class="inline-block px-10 py-5 bg-white text-bcg-dark rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-bcg-light-green transition-all shadow-xl hover:scale-105">Discuss an Embedded Operations Partnership</a>
    </div>
</section>
"""

# -------------------------------------------------------------
# PAGE 3: /partner-agency (Agency Delivery Partnership)
# -------------------------------------------------------------
p3_content = """
<!-- Hero Section -->
<section class="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center fade-in-up">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-bcg-dark mb-6 leading-tight">
        Expand Your Delivery Capacity with CubicEnhance
    </h1>
    <p class="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
        Your Clients. Your Agency. Our Delivery Capacity. We function as the backend execution engine for digital, creative, and consulting agencies, handling operational delivery while you focus on client relationships and strategy.
    </p>
    <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/contact" class="px-8 py-4 bg-bcg-dark text-white rounded-lg font-bold uppercase tracking-wider hover:bg-bcg-green transition-all shadow-md">Discuss an Agency Partnership</a>
        <a href="/partnerships" class="px-8 py-4 bg-gray-100 text-bcg-dark rounded-lg font-bold uppercase tracking-wider hover:bg-gray-200 transition-all border border-gray-200">Explore All Models</a>
    </div>
</section>

<section class="pb-20 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto fade-in-up">
    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Agency Operations" class="w-full h-auto rounded-2xl shadow-xl object-cover max-h-[500px]">
</section>

<!-- Clear Division of Responsibilities (Two-Column Comparative Box) -->
<section class="py-20 bg-gray-50 border-t border-gray-200">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 fade-in-up">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-bcg-dark mb-12 text-center">A Structured Division of Responsibilities</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left Column -->
            <div class="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-6 border-b border-gray-100 pb-4">Your Agency (Client &amp; Direction)</h3>
                <ul class="space-y-4 text-gray-600">
                    <li class="flex items-start gap-3"><span class="text-bcg-green font-bold">&check;</span> Primary client relationship and communication</li>
                    <li class="flex items-start gap-3"><span class="text-bcg-green font-bold">&check;</span> Brand strategy and creative direction</li>
                    <li class="flex items-start gap-3"><span class="text-bcg-green font-bold">&check;</span> Account management and client retention</li>
                    <li class="flex items-start gap-3"><span class="text-bcg-green font-bold">&check;</span> Final client-facing approval and project ownership</li>
                </ul>
            </div>
            <!-- Right Column -->
            <div class="bg-white p-10 rounded-2xl shadow-sm border border-bcg-green border-opacity-30 bg-[#f7faf8]">
                <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-6 border-b border-gray-200 pb-4">CubicEnhance (Managed Execution)</h3>
                <ul class="space-y-4 text-gray-600">
                    <li class="flex items-start gap-3"><span class="text-bcg-green font-bold">&check;</span> Agreed backend operational delivery</li>
                    <li class="flex items-start gap-3"><span class="text-bcg-green font-bold">&check;</span> Task execution across data, CMS, design, and QA</li>
                    <li class="flex items-start gap-3"><span class="text-bcg-green font-bold">&check;</span> Resource organization and contractor management</li>
                    <li class="flex items-start gap-3"><span class="text-bcg-green font-bold">&check;</span> Delivery supervision and quality control</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- 6-Step Agency Workflow (Timeline or Numbered Grid) -->
<section class="py-24 bg-white border-t border-gray-200">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-bcg-dark mb-12 text-center fade-in-up">How the Agency Partnership Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in-up">
            <!-- Step 1 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">01</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-3">Understand the Requirement</h3>
                <p class="text-sm text-gray-600">Reviewing your client deliverables, project scope, and workload pressure points.</p>
            </div>
            <!-- Step 2 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">02</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-3">Define Delivery Scope</h3>
                <p class="text-sm text-gray-600">Establishing exactly which backend deliverables CubicEnhance executes.</p>
            </div>
            <!-- Step 3 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">03</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-3">Organize Resources</h3>
                <p class="text-sm text-gray-600">Assigning dedicated remote specialists matched to the project requirements.</p>
            </div>
            <!-- Step 4 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">04</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-3">Execute the Work</h3>
                <p class="text-sm text-gray-600">Executing the technical, data, or creative tasks under documented SOPs.</p>
            </div>
            <!-- Step 5 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">05</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-3">Supervise Delivery</h3>
                <p class="text-sm text-gray-600">Enforcing quality control and deadline adherence before output reaches your desk.</p>
            </div>
            <!-- Step 6 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">06</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-3">Deliver to the Agency</h3>
                <p class="text-sm text-gray-600">Providing completed assets to your account managers for seamless client presentation.</p>
            </div>
        </div>
    </div>
</section>

<!-- Strategic Agency Benefits (Dark Theme 3-Block Grid) -->
<section class="py-24 bg-bcg-dark">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center fade-in-up">Strategic Agency Benefits</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-up">
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Break the Fulfillment Trap</h3>
                <p class="text-gray-300 leading-relaxed">Accept and pitch larger client contracts without being constrained by internal staff capacity.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Protect Senior Talent</h3>
                <p class="text-gray-300 leading-relaxed">Stop wasting high-cost strategists on routine CMS formatting, data updates, or asset resizing.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Strict White-Label Confidentiality</h3>
                <p class="text-gray-300 leading-relaxed">Complete brand protection backed by robust non-disclosure and non-compete agreements.</p>
            </div>
        </div>
    </div>
</section>

<!-- Universal Final CTA -->
<section class="py-24 bg-bcg-green relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 fade-in-up">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">Build More Delivery Capacity Around Your Agency</h2>
        <p class="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Stop letting capacity limits cap your agency's revenue. Partner with a managed operations team built for scale.</p>
        <a href="/contact" class="inline-block px-10 py-5 bg-white text-bcg-dark rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-bcg-light-green transition-all shadow-xl hover:scale-105">Discuss an Agency Delivery Partnership</a>
    </div>
</section>
"""

# -------------------------------------------------------------
# PAGE 4: /partner-dedicated (Dedicated Operations Support)
# -------------------------------------------------------------
p4_content = """
<!-- Hero Section -->
<section class="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center fade-in-up">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-bcg-dark mb-6 leading-tight">
        Continuous Operational Capacity for Growing Businesses
    </h1>
    <p class="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
        Ongoing, reliable capacity for recurring administrative, document, and digital workflows without the overhead of internal department hiring.
    </p>
    <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/contact" class="px-8 py-4 bg-bcg-dark text-white rounded-lg font-bold uppercase tracking-wider hover:bg-bcg-green transition-all shadow-md">Discuss Dedicated Support</a>
        <a href="/partnerships" class="px-8 py-4 bg-gray-100 text-bcg-dark rounded-lg font-bold uppercase tracking-wider hover:bg-gray-200 transition-all border border-gray-200">Explore All Models</a>
    </div>
</section>

<section class="pb-20 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto fade-in-up">
    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" alt="Dedicated Operations Support" class="w-full h-auto rounded-2xl shadow-xl object-cover max-h-[500px]">
</section>

<!-- Dedicated Support vs. Alternatives (Comparative Split Block) -->
<section class="py-20 bg-gray-50 border-t border-gray-200">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 fade-in-up">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-4">Dedicated Support vs. Project Delivery</h3>
                <p class="text-gray-600 leading-relaxed">Projects have a fixed endpoint; Dedicated Support is structured around continuity. It provides reliable, month-over-month capacity for recurring business workflows that never truly stop.</p>
            </div>
            <div>
                <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-4">Dedicated Support vs. Embedded Operations</h3>
                <p class="text-gray-600 leading-relaxed">Embedded operations integrates deeply with an entire department. Dedicated Support provides focused, managed capacity for a defined recurring workload without requiring deep structural reorganization.</p>
            </div>
        </div>
    </div>
</section>

<!-- Supported Recurring Workflows (4-Column Grid) -->
<section class="py-24 bg-white border-t border-gray-200">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-bcg-dark mb-12 text-center fade-in-up">Supported Recurring Workflows</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-up">
            <!-- Card 1 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Administrative Operations</h3>
                <p class="text-sm text-gray-600">Email management, scheduling, and routine business coordination.</p>
            </div>
            <!-- Card 2 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Data &amp; Document Handling</h3>
                <p class="text-sm text-gray-600">Ongoing record updates, invoice data extraction, and document processing.</p>
            </div>
            <!-- Card 3 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Digital &amp; Creative Maintenance</h3>
                <p class="text-sm text-gray-600">Routine social scheduling, asset preparation, and basic graphic production.</p>
            </div>
            <!-- Card 4 -->
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <h3 class="text-xl font-bold text-bcg-dark mb-4">Software &amp; Web Operations</h3>
                <p class="text-sm text-gray-600">Ongoing CMS content posting, basic manual testing, and internal tool upkeep.</p>
            </div>
        </div>
    </div>
</section>

<!-- Operating Lifecycle (Numbered Step Cards) -->
<section class="py-24 bg-gray-50 border-t border-gray-200">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-bcg-dark mb-12 text-center fade-in-up">Structuring Dedicated Capacity</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 fade-in-up">
            <!-- Step 1 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-lift">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">01</span>
                <h3 class="text-lg font-bold text-bcg-dark mb-3">Understand Ongoing Requirement</h3>
                <p class="text-sm text-gray-600">Evaluating monthly volume, required skills, and output frequency.</p>
            </div>
            <!-- Step 2 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-lift">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">02</span>
                <h3 class="text-lg font-bold text-bcg-dark mb-3">Define Scope &amp; SOPs</h3>
                <p class="text-sm text-gray-600">Documenting standard operating procedures and acceptable turnaround times.</p>
            </div>
            <!-- Step 3 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-lift">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">03</span>
                <h3 class="text-lg font-bold text-bcg-dark mb-3">Allocate Dedicated Resources</h3>
                <p class="text-sm text-gray-600">Assembling the appropriate remote operators and team leads.</p>
            </div>
            <!-- Step 4 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-lift">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">04</span>
                <h3 class="text-lg font-bold text-bcg-dark mb-3">Continuous Execution &amp; QA</h3>
                <p class="text-sm text-gray-600">Executing ongoing work with human verification and supervisor oversight.</p>
            </div>
            <!-- Step 5 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover-lift">
                <span class="block text-4xl font-black text-bcg-light-green mb-4 opacity-50">05</span>
                <h3 class="text-lg font-bold text-bcg-dark mb-3">Dynamic Capacity Adjustment</h3>
                <p class="text-sm text-gray-600">Scaling dedicated team hours up or down based on seasonal volume shifts.</p>
            </div>
        </div>
    </div>
</section>

<!-- Universal Final CTA -->
<section class="py-24 bg-bcg-green relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 fade-in-up">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">Build Reliable Capacity Around Your Business</h2>
        <p class="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Eliminate the recurring administrative burden holding your company back. Put a managed remote team behind your workflow.</p>
        <a href="/contact" class="inline-block px-10 py-5 bg-white text-bcg-dark rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-bcg-light-green transition-all shadow-xl hover:scale-105">Discuss Dedicated Operations Support</a>
    </div>
</section>
"""

# -------------------------------------------------------------
# PAGE 5: /partner-project (Project-Based Delivery)
# -------------------------------------------------------------
p5_content = """
<!-- Hero Section -->
<section class="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center fade-in-up">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-bcg-dark mb-6 leading-tight">
        Complete Project Delivery Managed by CubicEnhance
    </h1>
    <p class="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
        Managed operational capacity for defined business initiatives. We plan, resource, coordinate, and supervise your project from initial requirements through final delivery.
    </p>
    <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="/contact" class="px-8 py-4 bg-bcg-dark text-white rounded-lg font-bold uppercase tracking-wider hover:bg-bcg-green transition-all shadow-md">Discuss a Project</a>
        <a href="/partnerships" class="px-8 py-4 bg-gray-100 text-bcg-dark rounded-lg font-bold uppercase tracking-wider hover:bg-gray-200 transition-all border border-gray-200">Explore All Models</a>
    </div>
</section>

<section class="pb-20 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto fade-in-up">
    <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" alt="Project Delivery" class="w-full h-auto rounded-2xl shadow-xl object-cover max-h-[500px]">
</section>

<!-- Project Lifecycle Engine (Horizontal or Zigzag Step Progression) -->
<section class="py-24 bg-gray-50 border-t border-gray-200">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-bcg-dark mb-12 text-center fade-in-up">From Requirement to Delivery</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 fade-in-up">
            <!-- Phase 1 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
                <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-2">Phase 1</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-3">Understand &amp; Plan</h3>
                <p class="text-sm text-gray-600">We review project objectives, required outputs, and scope, structuring the initiative into clear milestones.</p>
                <div class="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gray-200"></div>
            </div>
            <!-- Phase 2 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
                <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-2">Phase 2</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-3">Allocate &amp; Organize</h3>
                <p class="text-sm text-gray-600">We assemble qualified specialists and divide responsibilities across a centralized delivery workflow.</p>
                <div class="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gray-200"></div>
            </div>
            <!-- Phase 3 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
                <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-2">Phase 3</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-3">Execute &amp; Coordinate</h3>
                <p class="text-sm text-gray-600">Our team performs the work while CubicEnhance management supervises daily execution against the agreed timeline.</p>
                <div class="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gray-200"></div>
            </div>
            <!-- Phase 4 -->
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <span class="block text-xs font-bold uppercase tracking-widest text-bcg-green mb-2">Phase 4</span>
                <h3 class="text-xl font-bold text-bcg-dark mb-3">Complete &amp; Deliver</h3>
                <p class="text-sm text-gray-600">Deliverables are reviewed against quality standards and handed over cleanly according to the project specifications.</p>
            </div>
        </div>
    </div>
</section>

<!-- Ideal Use Cases (Dark Theme 4-Block Grid) -->
<section class="py-24 bg-bcg-dark">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-serif font-bold text-white mb-12 text-center fade-in-up">Ideal Use Cases</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in-up">
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Data Migration Initiatives</h3>
                <p class="text-gray-300 leading-relaxed">Reorganizing, validating, and migrating legacy files or spreadsheets into modern cloud databases.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Large-Scale Document Indexing</h3>
                <p class="text-gray-300 leading-relaxed">Digitizing, categorizing, and structuring extensive archives of technical, compliance, or project records.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Pre-Launch Software QA</h3>
                <p class="text-gray-300 leading-relaxed">Executing structured manual testing scripts across devices prior to a major platform or feature release.</p>
            </div>
            <div class="bg-white/10 p-10 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                <h3 class="text-xl font-bold text-bcg-light-green mb-3 font-serif">Surge Production Workloads</h3>
                <p class="text-gray-300 leading-relaxed">Providing temporary burst capacity for seasonal catalog updates, marketing pushes, or asset rebranding.</p>
            </div>
        </div>
    </div>
</section>

<!-- The Single Managed Structure (Split-Screen Text Block) -->
<section class="py-20 bg-white border-t border-gray-200">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 fade-in-up">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-4">The Problem of Ad-Hoc Projects</h3>
                <p class="text-gray-600 leading-relaxed">Projects stall when internal managers have to coordinate multiple disconnected contractors or pull internal staff away from daily revenue work.</p>
            </div>
            <div>
                <h3 class="text-2xl font-serif font-bold text-bcg-dark mb-4">The CubicEnhance Solution</h3>
                <p class="text-gray-600 leading-relaxed">You define the business requirements and approve milestones. CubicEnhance acts as the single managed delivery partner, handling all resource allocation, supervision, and execution until the project is delivered.</p>
            </div>
        </div>
    </div>
</section>

<!-- Universal Final CTA -->
<section class="py-24 bg-bcg-green relative overflow-hidden">
    <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=2000&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 fade-in-up">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">Turn Defined Projects Into Managed Delivery</h2>
        <p class="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Tell us about your upcoming project scope and discover how our managed delivery framework guarantees timely execution.</p>
        <a href="/contact" class="inline-block px-10 py-5 bg-white text-bcg-dark rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-bcg-light-green transition-all shadow-xl hover:scale-105">Discuss a Project</a>
    </div>
</section>
"""

# -------------------------------------------------------------
# Generate Files
# -------------------------------------------------------------
generate_page('partnerships.html', 'Partnership Models', p1_content)
generate_page('partner-embedded.html', 'Embedded Operations Partnership', p2_content)
generate_page('partner-agency.html', 'Agency Delivery Partnership', p3_content)
generate_page('partner-dedicated.html', 'Dedicated Operations Support', p4_content)
generate_page('partner-project.html', 'Project-Based Delivery', p5_content)

print("Pages regenerated successfully.")

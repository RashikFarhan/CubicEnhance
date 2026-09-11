import re

# Read shell
source_html = open('data-accounting.html', encoding='utf-8').read()
header_end_idx = source_html.find('</header>') + len('</header>')
footer_start_idx = source_html.find('<footer')
top_shell = source_html[:header_end_idx] + '\n<main>\n'
bottom_shell = '\n</main>\n' + source_html[footer_start_idx:]

# ===============================
# BUILD PRIVACY PAGE
# ===============================
top_shell_privacy = re.sub(r'<title>.*?</title>', '<title>Privacy Policy & Data Governance | CubicEnhance</title>', top_shell)

content_privacy = """
<section class="pt-32 pb-24 bg-[#fcfdfd]">
    <div class="max-w-4xl mx-auto px-6">
        <h1 class="font-serif text-4xl md:text-5xl text-bcg-dark mb-6">Privacy Policy &amp; Data Governance</h1>
        <p class="text-sm text-gray-500 uppercase tracking-widest font-bold mb-12">Last Updated: September 2026</p>
        
        <div class="prose prose-lg text-gray-600 font-light leading-relaxed max-w-none">
            <h2 class="text-2xl font-bold text-bcg-dark mt-10 mb-4 font-serif">1. Confidentiality Framework</h2>
            <p>At CubicEnhance, data privacy is treated as a core operational requirement. All client workflows, proprietary data, and internal documentation are cordoned off behind strict role-based access controls and encrypted environments. We operate under legally binding Non-Disclosure Agreements (NDAs) at both the corporate and individual specialist level.</p>
            
            <h2 class="text-2xl font-bold text-bcg-dark mt-10 mb-4 font-serif">2. Enterprise-Grade Access Management</h2>
            <p>We mandate Two-Factor Authentication (2FA) across all internal and client-facing platforms. Our centralized delivery hub enforces physical security protocols, including clean-desk policies and restricted device access, to ensure sensitive B2B data remains insulated.</p>
            
            <h2 class="text-2xl font-bold text-bcg-dark mt-10 mb-4 font-serif">3. Information Collection &amp; Processing</h2>
            <p>We collect and process operational data strictly for the fulfillment of managed workflows. We do not aggregate, sell, or independently monetize client data. Upon the termination of a delivery pod or workflow, all associated internal client data is securely sanitized according to mutually agreed SLAs.</p>
            
            <h2 class="text-2xl font-bold text-bcg-dark mt-10 mb-4 font-serif">4. Candidate &amp; Talent Registry Data</h2>
            <p>Information submitted to the CubicEnhance Global Talent Registry is used exclusively for internal resource planning and capability mapping. Candidate data is stored in secure, internal HR pipelines and is never shared with external recruiting agencies.</p>
        </div>
    </div>
</section>
"""

with open('privacy.html', 'w', encoding='utf-8') as f:
    f.write(top_shell_privacy + content_privacy + bottom_shell)


# ===============================
# BUILD TERMS PAGE
# ===============================
top_shell_terms = re.sub(r'<title>.*?</title>', '<title>Terms of Service | CubicEnhance</title>', top_shell)

content_terms = """
<section class="pt-32 pb-24 bg-[#fcfdfd]">
    <div class="max-w-4xl mx-auto px-6">
        <h1 class="font-serif text-4xl md:text-5xl text-bcg-dark mb-6">Terms of Service &amp; Operational Scope</h1>
        <p class="text-sm text-gray-500 uppercase tracking-widest font-bold mb-12">Last Updated: September 2026</p>
        
        <div class="prose prose-lg text-gray-600 font-light leading-relaxed max-w-none">
            <h2 class="text-2xl font-bold text-bcg-dark mt-10 mb-4 font-serif">1. Managed Operational Scope</h2>
            <p>CubicEnhance acts as an independent managed operations partner. Our engagements are defined by specific Statements of Work (SOW) or active subscriptions detailing the workflows, required specialist capacity, and expected Service Level Agreements (SLAs). We maintain full administrative control over our personnel and internal Standard Operating Procedures (SOPs).</p>
            
            <h2 class="text-2xl font-bold text-bcg-dark mt-10 mb-4 font-serif">2. Intellectual Property Rights</h2>
            <p>All client materials, databases, software environments, and finalized deliverables remain the exclusive intellectual property of the client. Any proprietary automation scripts, internal SOPs, and governance frameworks developed by CubicEnhance to fulfill the workflow remain the intellectual property of CubicEnhance, unless explicitly transferred in a custom SOW.</p>
            
            <h2 class="text-2xl font-bold text-bcg-dark mt-10 mb-4 font-serif">3. Service Level Expectations &amp; QA</h2>
            <p>We deploy a "Human-in-the-Loop" quality assurance model. While we integrate automation pipelines for speed, final deliverables are subject to our internal QA leads. In the event of an operational exception or bottleneck, our team leads intervene to restore SLAs without requiring client micromanagement.</p>
            
            <h2 class="text-2xl font-bold text-bcg-dark mt-10 mb-4 font-serif">4. Liability &amp; Indemnification</h2>
            <p>While we execute workflows with strict professional diligence, CubicEnhance is not liable for indirect, incidental, or consequential damages arising from the use of our services, beyond the limitations expressly outlined in the Master Services Agreement (MSA) signed by both parties at the commencement of an engagement.</p>
        </div>
    </div>
</section>
"""

with open('terms.html', 'w', encoding='utf-8') as f:
    f.write(top_shell_terms + content_terms + bottom_shell)

print("Generated privacy.html and terms.html")

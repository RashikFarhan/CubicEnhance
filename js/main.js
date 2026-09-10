document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const megaMenu = document.getElementById('mega-menu');
    const level1Links = document.querySelectorAll('.level1-link');
    const pane2 = document.getElementById('pane2');
    const pane2Content = document.getElementById('pane2-content');
    const pane3 = document.getElementById('pane3');
    const pane3Content = document.getElementById('pane3-content');

    // ── MENU DATA (injected into pane2) ───────────────────────────────────────
    const pane2Data = {
        'solutions': `
            <div class="mb-10">
                <h2 class="text-[32px] font-bold mb-2 text-black">Managed Solutions</h2>
                <p class="text-[15px] text-gray-500 mb-8">Discover our core workflow solutions.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <a href="/data-accounting" class="level2-link block p-3 -m-3 rounded-lg text-[15px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="sol-data-acct">Data &amp; Internal Accounting</a>
                    <a href="/docs-backoffice" class="level2-link block p-3 -m-3 rounded-lg text-[15px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="sol-docs-back">Documentation &amp; Back-Office Operations</a>
                    <a href="/ai-automation" class="level2-link block p-3 -m-3 rounded-lg text-[15px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="sol-ai-auto">AI Workflow &amp; Automation</a>
                    <a href="/social-marketing" class="level2-link block p-3 -m-3 rounded-lg text-[15px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="sol-social-mkt">Social Media Management &amp; Marketing</a>
                    <a href="/web-design" class="level2-link block p-3 -m-3 rounded-lg text-[15px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="sol-web-design">Website Design &amp; Maintenance</a>
                    <a href="/graphics-design" class="level2-link block p-3 -m-3 rounded-lg text-[15px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="sol-graphics">Graphics Design</a>
                    <a href="/media-production" class="level2-link block p-3 -m-3 rounded-lg text-[15px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="sol-media-prod">Photos &amp; Videos Production/Editing</a>
                </div>
            </div>
        `,
        'industries': `
            <div class="mb-10">
                <h2 class="text-[32px] font-bold mb-2 text-black">Industries</h2>
                <p class="text-[15px] text-gray-500 mb-8">Learn how we draw on industry expertise to make companies more competitive.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <a href="/industries/agencies" class="level2-link block p-3 -m-3 rounded-lg text-[16px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="ind-agen">Digital &amp; Marketing Agencies</a>
                    <a href="/industries/ecommerce" class="level2-link block p-3 -m-3 rounded-lg text-[16px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="ind-ecom">E-Commerce &amp; Retail</a>
                    <a href="/industries/construction" class="level2-link block p-3 -m-3 rounded-lg text-[16px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="ind-cons">Construction &amp; Engineering Support</a>
                    <a href="/industries/startups" class="level2-link block p-3 -m-3 rounded-lg text-[16px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="ind-start">Startups &amp; SaaS</a>
                </div>
            </div>
        `,
        'partnerships': `
            <div class="mb-10">
                <h2 class="text-[32px] font-bold mb-2 text-black">Partnerships</h2>
                <p class="text-[15px] text-gray-500 mb-8">Explore our flexible collaboration models.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <a href="/partnerships/embedded" class="level2-link block p-3 -m-3 rounded-lg text-[16px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="part-embed">Embedded Operations Partnership</a>
                    <a href="/partnerships/agency" class="level2-link block p-3 -m-3 rounded-lg text-[16px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="part-agen">Agency Delivery Partnership</a>
                    <a href="/partnerships/dedicated" class="level2-link block p-3 -m-3 rounded-lg text-[16px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="part-dedic">Dedicated Operations Support</a>
                    <a href="/partnerships/project" class="level2-link block p-3 -m-3 rounded-lg text-[16px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="part-proj">Project-Based Delivery</a>
                </div>
            </div>
        `,
        'company': `
            <div class="mb-10">
                <h2 class="text-[32px] font-bold mb-2 text-black">Our Company</h2>
                <p class="text-[15px] text-gray-500 mb-8">Learn about our firm and how we work.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <a href="/about" class="level2-link block p-3 -m-3 rounded-lg text-[16px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="comp-about">About Us</a>
                    <a href="/how-we-work" class="level2-link block p-3 -m-3 rounded-lg text-[16px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="comp-how">How We Work</a>
                </div>
            </div>
        `
    };

    const previewData = {
        'sol-data-acct': `
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Data Accounting">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Data &amp; Internal Accounting</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Turn raw numbers into actionable insights. We manage high-volume data extraction, database updates, and routine accounting support with human-verified accuracy.</p>
            <a href="/data-accounting" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'sol-docs-back': `
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Documentation">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Documentation &amp; Back-Office Operations</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Scale your administration seamlessly. We take ownership of document control, compliance tracking, and routine back-office workflows.</p>
            <a href="/docs-backoffice" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'sol-ai-auto': `
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="AI Automation">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">AI Workflow &amp; Automation</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Integrate intelligent automation into your daily operations. We build and manage AI-assisted workflows to eliminate repetitive manual tasks.</p>
            <a href="/ai-automation" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'sol-social-mkt': `
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Social Marketing">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Social Media Management &amp; Marketing</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Elevate your brand presence. We provide dedicated remote teams to manage content scheduling, community engagement, and digital campaigns.</p>
            <a href="/social-marketing" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'sol-web-design': `
            <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Web Design">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Website Design &amp; Maintenance</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Keep your digital storefront flawless. We manage ongoing CMS updates, technical maintenance, and professional web design workflows.</p>
            <a href="/web-design" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'sol-graphics': `
            <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Graphics Design">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Graphics Design</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Professional visual assets on demand. We manage the production of high-quality graphics, marketing collateral, and brand assets.</p>
            <a href="/graphics-design" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'sol-media-prod': `
            <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Media Production">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Photos &amp; Videos Production/Editing</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Streamline your media pipeline. We provide dedicated post-production teams for bulk photo editing, video formatting, and media preparation.</p>
            <a href="/media-production" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'ind-agen': `
            <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Agencies">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Digital &amp; Marketing Agencies</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Scale your agency margins by shifting routine campaign setup, reporting, and ad-ops to a dedicated managed team.</p>
            <a href="/industries/agencies" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'ind-ecom': `
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="E-Commerce">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">E-Commerce &amp; Retail</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Maintain flawless product catalogs, manage inventory data securely, and resolve order discrepancies quickly.</p>
            <a href="/industries/ecommerce" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'ind-cons': `
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Construction">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Construction &amp; Engineering Support</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Process complex estimating files, handle compliance documentation, and accelerate project administration workflows.</p>
            <a href="/industries/construction" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'ind-start': `
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Startups">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Startups &amp; SaaS</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Extend your runway by outsourcing operational overhead. Let our teams handle the repetitive scaling tasks while you build product.</p>
            <a href="/industries/startups" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'part-embed': `
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Embedded">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Embedded Operations Partnership</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Fully integrate our teams into your daily Slack channels and systems as a continuous, managed extension of your company.</p>
            <a href="/partnerships/embedded" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'part-agen': `
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Agency Partner">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Agency Delivery Partnership</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">White-label our operations under your brand to increase margins and deliver flawless campaigns to your clients.</p>
            <a href="/partnerships/agency" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'part-dedic': `
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Dedicated">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Dedicated Operations Support</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Gain a fixed, committed headcount of remote specialists focused entirely on your proprietary workflows.</p>
            <a href="/partnerships/dedicated" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'part-proj': `
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Project Based">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Project-Based Delivery</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Execute one-off data migrations, backlog clearouts, or rapid system audits quickly with a specialized team.</p>
            <a href="/partnerships/project" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'comp-about': `
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="About Us">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">About Us</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Learn about our mission to combine AI precision with dedicated human judgment to unlock operational freedom.</p>
            <a href="/about" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'comp-how': `
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="How We Work">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">How We Work</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Discover our 14-day rapid deployment model, dedicated account managers, and rigorous SOP creation framework.</p>
            <a href="/how-we-work" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `
    };

    // ── DETECT ACTIVE SECTION based on current URL ────────────────────────────
    // Maps URL path segments to a level1 data-target value
    function getActiveSection() {
        const path = window.location.pathname;
        const pathMap = {
            '/data-accounting':       'solutions',
            '/docs-backoffice':       'solutions',
            '/ai-automation':         'solutions',
            '/social-marketing':      'solutions',
            '/web-design':            'solutions',
            '/graphics-design':       'solutions',
            '/media-production':      'solutions',
            '/solutions':             'solutions',
            '/industries':            'industries',
            '/industries/agencies':   'industries',
            '/industries/ecommerce':  'industries',
            '/industries/construction':'industries',
            '/industries/startups':   'industries',
            '/partnerships':          'partnerships',
            '/partnerships/embedded': 'partnerships',
            '/partnerships/agency':   'partnerships',
            '/partnerships/dedicated':'partnerships',
            '/partnerships/project':  'partnerships',
            '/about':                 'company',
            '/how-we-work':           'company',
        };
        return pathMap[path] || null;
    }

    // Get the level2 preview key matching the current URL
    function getActivePreviewKey() {
        const path = window.location.pathname;
        const previewMap = {
            '/data-accounting':        'sol-data-acct',
            '/docs-backoffice':        'sol-docs-back',
            '/ai-automation':          'sol-ai-auto',
            '/social-marketing':       'sol-social-mkt',
            '/web-design':             'sol-web-design',
            '/graphics-design':        'sol-graphics',
            '/media-production':       'sol-media-prod',
            '/industries/agencies':    'ind-agen',
            '/industries/ecommerce':   'ind-ecom',
            '/industries/construction':'ind-cons',
            '/industries/startups':    'ind-start',
            '/partnerships/embedded':  'part-embed',
            '/partnerships/agency':    'part-agen',
            '/partnerships/dedicated': 'part-dedic',
            '/partnerships/project':   'part-proj',
            '/about':                  'comp-about',
            '/how-we-work':            'comp-how',
        };
        return previewMap[path] || null;
    }

    // ── BIND LEVEL 2 LINKS (desktop only) ─────────────────────────────────────
    function bindLevel2Links() {
        const l2Links = pane2Content.querySelectorAll('.level2-link');
        l2Links.forEach(link => {
            link.addEventListener('click', (e) => {
                const isAlreadyActive = link.classList.contains('active-l2');
                // Second click on an already-active link navigates to the page
                if (isAlreadyActive) {
                    window.location.href = link.getAttribute('href');
                    return;
                }
                e.preventDefault();
                // Update active styling
                l2Links.forEach(l => l.classList.remove('bg-gray-100', 'font-bold', 'active-l2'));
                link.classList.add('bg-gray-100', 'font-bold', 'active-l2');
                // Show preview pane
                const previewTarget = link.getAttribute('data-preview');
                if (previewTarget && previewData[previewTarget]) {
                    if (pane3 && pane3Content) {
                        pane3Content.innerHTML = previewData[previewTarget];
                        pane3.classList.remove('hidden');
                    }
                }
            });
        });
    }

    // ── ACTIVATE A LEVEL1 SECTION (desktop only) ──────────────────────────────
    // Highlights the section, populates pane2, and optionally pre-selects a level2 item
    function activateLevel1(link, previewKeyToHighlight) {
        const target = link.getAttribute('data-target');
        if (!target || !pane2Data[target]) return;

        // Update level1 highlight
        level1Links.forEach(l => {
            l.classList.remove('active', 'bg-[#eaf1e8]', 'font-semibold', 'text-black', 'rounded-lg');
            l.classList.add('text-gray-700');
            const arrow = l.querySelector('.arrow-icon');
            if (arrow) arrow.classList.add('hidden');
        });
        link.classList.remove('text-gray-700');
        link.classList.add('active', 'bg-[#eaf1e8]', 'font-semibold', 'text-black', 'rounded-lg');
        const arrow = link.querySelector('.arrow-icon');
        if (arrow) arrow.classList.remove('hidden');

        // Populate pane2
        if (pane2Content) pane2Content.innerHTML = pane2Data[target];
        if (pane2) pane2.classList.remove('hidden');
        bindLevel2Links();

        // Choose which level2 link to pre-highlight
        const allL2 = pane2Content.querySelectorAll('.level2-link');
        let targetL2 = null;
        if (previewKeyToHighlight) {
            targetL2 = Array.from(allL2).find(l => l.getAttribute('data-preview') === previewKeyToHighlight);
        }
        if (!targetL2) targetL2 = allL2[0]; // fallback to first item

        if (targetL2) {
            targetL2.click();
        } else {
            if (pane3) pane3.classList.add('hidden');
        }
    }

    // ── HAMBURGER OPEN BUTTON ─────────────────────────────────────────────────
    if (menuToggle && megaMenu && closeMenu) {
        menuToggle.addEventListener('click', (e) => {
            // CRITICAL: stop the click from bubbling so it doesn't immediately re-close the menu
            e.stopPropagation();

            megaMenu.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Desktop only: auto-open the section relevant to the current page
            if (window.innerWidth >= 768) {
                const activeSection = getActiveSection();
                const activePreview = getActivePreviewKey();
                let sectionLink = null;
                if (activeSection) {
                    sectionLink = Array.from(level1Links).find(l => l.getAttribute('data-target') === activeSection);
                }
                // If no match (e.g. homepage), default to first section
                if (!sectionLink) sectionLink = level1Links[0];
                if (sectionLink) activateLevel1(sectionLink, activePreview);
            }
            // Mobile: just show pane1 — the user taps a link directly to navigate
        });

        closeMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            megaMenu.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && megaMenu.classList.contains('active')) {
                megaMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ── LEVEL 1 LINK CLICKS ───────────────────────────────────────────────────
    level1Links.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('data-target');
            if (!target) return;

            // MOBILE: let the browser navigate to the link's href normally.
            // The level1 links point to section index pages (e.g. /solutions, /industries).
            if (window.innerWidth < 768) {
                // Close the menu overlay and let natural navigation happen
                megaMenu.classList.remove('active');
                document.body.style.overflow = '';
                return; // href navigation proceeds
            }

            // DESKTOP: show pane2 preview, do not navigate yet
            e.preventDefault();
            activateLevel1(link, null);
        });
    });
});

// ── INTERSECTION OBSERVER for scroll-in animations ────────────────────────────
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

// ── TRANSPARENT HEADER scroll behavior ────────────────────────────────────────
const mainHeader = document.querySelector('header');
if (mainHeader && mainHeader.classList.contains('transparent-header')) {
    const menuToggle = document.getElementById('menu-toggle');
    const headerNavLinks = mainHeader.querySelectorAll('a:not([href="/"]):not([href="#contact"]), span.nav-item');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    mainHeader.classList.remove('bg-gradient-to-b', 'from-black/40', 'via-black/15', 'to-transparent', 'py-5');
                    mainHeader.classList.add('bg-white/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'py-3.5', 'shadow-sm');
                    if (menuToggle) {
                        menuToggle.classList.remove('text-white', 'hover:bg-white/20');
                        menuToggle.classList.add('text-bcg-dark', 'hover:bg-gray-100');
                    }
                    headerNavLinks.forEach(link => {
                        link.classList.remove('text-white', 'text-gray-100');
                        link.classList.add('text-bcg-dark');
                    });
                } else {
                    mainHeader.classList.add('bg-gradient-to-b', 'from-black/40', 'via-black/15', 'to-transparent', 'py-5');
                    mainHeader.classList.remove('bg-white/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'py-3.5', 'shadow-sm');
                    if (menuToggle) {
                        menuToggle.classList.add('text-white', 'hover:bg-white/20');
                        menuToggle.classList.remove('text-bcg-dark', 'hover:bg-gray-100');
                    }
                    headerNavLinks.forEach(link => {
                        link.classList.add('text-white');
                        link.classList.remove('text-bcg-dark');
                    });
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

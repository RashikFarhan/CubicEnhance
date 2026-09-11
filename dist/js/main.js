document.addEventListener('DOMContentLoaded', () => {

    // ── ELEMENT REFS ──────────────────────────────────────────────────────────
    const menuToggle    = document.getElementById('menu-toggle');
    const closeMenu     = document.getElementById('close-menu');
    const megaMenu      = document.getElementById('mega-menu');
    const level1Links   = document.querySelectorAll('.level1-link');
    const pane2         = document.getElementById('pane2');
    const pane2Content  = document.getElementById('pane2-content');
    const pane3         = document.getElementById('pane3');
    const pane3Content  = document.getElementById('pane3-content');

    // The desktop 3-pane body div — we'll hide this on mobile
    const desktopPaneBody = megaMenu
        ? megaMenu.querySelector('.flex.flex-1.overflow-hidden')
        : null;

    // ── ALL MENU SECTIONS + PAGES ─────────────────────────────────────────────
    // Single source of truth used by both the mobile flat-list and the desktop pane2 data
    const SECTIONS = [
        {
            id: 'solutions',
            label: 'Managed Solutions',
            pages: [
                { href: '/data-accounting',   text: 'Data & Internal Accounting',            preview: 'sol-data-acct' },
                { href: '/docs-backoffice',    text: 'Documentation & Back-Office Operations', preview: 'sol-docs-back' },
                { href: '/ai-automation',      text: 'AI Workflow & Automation',              preview: 'sol-ai-auto'  },
                { href: '/social-marketing',   text: 'Social Media Management & Marketing',   preview: 'sol-social-mkt'},
                { href: '/web-design',         text: 'Website Design & Maintenance',          preview: 'sol-web-design'},
                { href: '/graphics-design',    text: 'Graphics Design',                       preview: 'sol-graphics' },
                { href: '/media-production',   text: 'Photos & Videos Production/Editing',    preview: 'sol-media-prod'},
            ]
        },
        {
            id: 'industries',
            label: 'Industries',
            pages: [
                { href: '/industries/agencies',    text: 'Digital & Marketing Agencies',       preview: 'ind-agen'  },
                { href: '/industries/ecommerce',   text: 'E-Commerce & Retail',                preview: 'ind-ecom'  },
                { href: '/industries/construction',text: 'Construction & Engineering Support', preview: 'ind-cons'  },
                { href: '/industries/startups',    text: 'Startups & SaaS',                    preview: 'ind-start' },
            ]
        },
        {
            id: 'partnerships',
            label: 'Partnerships',
            pages: [
                { href: '/partnerships/embedded',  text: 'Embedded Operations Partnership', preview: 'part-embed' },
                { href: '/partnerships/agency',    text: 'Agency Delivery Partnership',     preview: 'part-agen'  },
                { href: '/partnerships/dedicated', text: 'Dedicated Operations Support',    preview: 'part-dedic' },
                { href: '/partnerships/project',   text: 'Project-Based Delivery',          preview: 'part-proj'  },
            ]
        },
        {
            id: 'company',
            label: 'Our Company',
            pages: [
                { href: '/our-story',        text: 'Our Story',    preview: 'comp-story' },
                { href: '/how-we-work',  text: 'How We Work', preview: 'comp-how'   },
                { href: '/leadership',  text: 'Leadership & Organization', preview: 'comp-leadership' },
            ]
        }
    ];

    // ── PREVIEW DATA (desktop pane3) ──────────────────────────────────────────
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
        'comp-story': `
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Our Story">
              <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Our Story</h3>
              <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">From an agile freelance collective to an international managed remote operations partner. Discover how we built an accountable delivery infrastructure.</p>
              <a href="/our-story" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
          `,
          'comp-about': `
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="About Us">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">About Us</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Learn about our mission to combine AI precision with dedicated human judgment to unlock operational freedom.</p>
            <a href="/about" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `,
        'comp-leadership': `
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="Leadership">
              <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">Leadership &amp; Organization</h3>
              <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Explore our multi-tiered leadership structure and interactive directory of our permanent core specialists.</p>
              <a href="/leadership" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
          `,
          'comp-how': `
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" class="w-full h-[220px] object-cover rounded-xl mb-6 shadow-sm" alt="How We Work">
            <h3 class="text-[28px] text-black font-sans mb-3 font-semibold leading-tight">How We Work</h3>
            <p class="text-[14px] text-gray-600 mb-8 leading-relaxed">Discover our 14-day rapid deployment model, dedicated account managers, and rigorous SOP creation framework.</p>
            <a href="/how-we-work" class="inline-block px-6 py-3 bg-[#9cf076] text-black font-bold text-[13px] rounded hover:bg-[#8ee565] transition-colors shadow-sm">VISIT PAGE &rarr;</a>
        `
    };

    // ── DESKTOP: pane2 HTML generated from SECTIONS data ─────────────────────
    const pane2Data = {};
    SECTIONS.forEach(section => {
        const links = section.pages.map(p =>
            `<a href="${p.href}" class="level2-link block p-3 -m-3 rounded-lg text-[15px] text-gray-800 hover:bg-gray-100 transition-colors" data-preview="${p.preview}">${p.text}</a>`
        ).join('\n                    ');
        pane2Data[section.id] = `
            <div class="mb-10">
                <h2 class="text-[32px] font-bold mb-2 text-black">${section.label}</h2>
                <p class="text-[15px] text-gray-500 mb-8">Discover our offerings.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    ${links}
                </div>
            </div>
        `;
    });

    // ── URL HELPERS ───────────────────────────────────────────────────────────
    // Normalize the browser's current pathname to match our SECTIONS href values.
    // Handles: trailing slashes, /index.html suffixes (for localhost dev server)
    function normalizePath(path) {
        // Strip /index.html
        if (path.endsWith('/index.html')) path = path.slice(0, -'/index.html'.length);
        // Strip trailing slash (but preserve root /)
        if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
        return path || '/';
    }

    function getCurrentPath() {
        return normalizePath(window.location.pathname);
    }

    // Find which SECTION and PAGE the current URL belongs to
    function detectCurrentPage() {
        const path = getCurrentPath();
        for (const section of SECTIONS) {
            for (const page of section.pages) {
                if (page.href === path) {
                    return { section, page };
                }
            }
        }
        return null;
    }

    // ── MOBILE MENU ───────────────────────────────────────────────────────────
    // Build a full flat-list mobile nav element (created once, cached)
    let mobileNavEl = null;

    function buildMobileNav() {
        if (mobileNavEl) return mobileNavEl; // already built — just reuse

        const currentPath = getCurrentPath();
        const el = document.createElement('div');
        el.id = 'mobile-nav';
        el.setAttribute('aria-label', 'Mobile Navigation');

        // Build the inner HTML using inline styles so Tailwind purging can't remove them
        let inner = '<div style="padding:8px 16px 32px;overflow-y:auto;flex:1;">';

        SECTIONS.forEach(section => {
            inner += `<div style="margin-bottom:28px;">`;
            // Section label — not a link, just a heading
            inner += `<p style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;` +
                     `letter-spacing:0.12em;padding:18px 10px 10px;border-bottom:1px solid #f3f4f6;margin-bottom:4px;">` +
                     `${section.label}</p>`;

            section.pages.forEach(page => {
                const isActive = page.href === currentPath;
                const activeStyle = isActive
                    ? 'background:#eaf1e8;color:#30495f;font-weight:600;'
                    : 'color:#1f2937;';
                const arrow = isActive
                    ? '<span style="color:#9cf076;font-size:20px;line-height:1;flex-shrink:0;">&#10003;</span>'
                    : '<span style="color:#d1d5db;font-size:18px;line-height:1;flex-shrink:0;">&#8250;</span>';

                inner += `<a href="${page.href}" ` +
                    `style="display:flex;align-items:center;justify-content:space-between;` +
                    `padding:13px 10px;border-radius:10px;font-size:15px;font-family:inherit;` +
                    `text-decoration:none;margin-bottom:2px;${activeStyle}" ` +
                    `onclick="this.closest('#mega-menu').classList.remove('active');document.body.style.overflow='';">` +
                    `<span>${page.text}</span>${arrow}</a>`;
            });

            inner += `</div>`;
        });

        // CTA at bottom
        inner += `<div style="padding:12px 10px 16px;">` +
            `<a href="/contact" ` +
            `style="display:block;width:100%;padding:15px 10px;border-radius:12px;` +
            `background:#30495f;color:#fff;font-weight:700;font-size:13px;` +
            `letter-spacing:0.1em;text-transform:uppercase;text-align:center;text-decoration:none;" ` +
            `onclick="document.body.style.overflow='';">` +
            `Book a Discovery Call</a></div>`;

        inner += '</div>';

        el.style.cssText = 'flex:1;overflow-y:auto;display:flex;flex-direction:column;';
        el.innerHTML = inner;
        mobileNavEl = el;
        return el;
    }

    function openMobileMenu() {
        if (!megaMenu) return;
        // Hide desktop 3-pane body
        if (desktopPaneBody) desktopPaneBody.style.display = 'none';
        // Build (or reuse) and show mobile nav
        const nav = buildMobileNav();
        if (!megaMenu.contains(nav)) megaMenu.appendChild(nav);
        nav.style.display = 'flex';
    }

    function closeMobileMenu() {
        if (desktopPaneBody) desktopPaneBody.style.display = '';
        if (mobileNavEl) mobileNavEl.style.display = 'none';
    }

    // ── DESKTOP: bind level2 links inside pane2 ───────────────────────────────
    function bindLevel2Links() {
        const l2Links = pane2Content.querySelectorAll('.level2-link');
        l2Links.forEach(link => {
            link.addEventListener('click', (e) => {
                const alreadyActive = link.classList.contains('active-l2');
                // Second click navigates
                if (alreadyActive) {
                    window.location.href = link.getAttribute('href');
                    return;
                }
                e.preventDefault();
                l2Links.forEach(l => l.classList.remove('bg-gray-100', 'font-bold', 'active-l2'));
                link.classList.add('bg-gray-100', 'font-bold', 'active-l2');

                const key = link.getAttribute('data-preview');
                if (key && previewData[key] && pane3 && pane3Content) {
                    pane3Content.innerHTML = previewData[key];
                    pane3.classList.remove('hidden');
                }
            });
        });
    }

    // ── DESKTOP: activate a level1 section, optionally pre-select a page ──────
    function activateDesktopSection(sectionId, previewKey) {
        if (!pane2Data[sectionId]) return;

        // Highlight the correct level1 link
        level1Links.forEach(l => {
            l.classList.remove('active', 'bg-[#eaf1e8]', 'font-semibold', 'text-black', 'rounded-lg');
            l.classList.add('text-gray-700');
            const arrow = l.querySelector('.arrow-icon');
            if (arrow) arrow.classList.add('hidden');
        });
        const activeL1 = Array.from(level1Links).find(l => l.getAttribute('data-target') === sectionId);
        if (activeL1) {
            activeL1.classList.remove('text-gray-700');
            activeL1.classList.add('active', 'bg-[#eaf1e8]', 'font-semibold', 'text-black', 'rounded-lg');
            const arrow = activeL1.querySelector('.arrow-icon');
            if (arrow) arrow.classList.remove('hidden');
        }

        // Populate pane2
        if (pane2Content) pane2Content.innerHTML = pane2Data[sectionId];
        if (pane2) pane2.classList.remove('hidden');
        bindLevel2Links();

        // Pre-select the matching level2 item (or fall back to first)
        const allL2 = pane2Content.querySelectorAll('.level2-link');
        let targetL2 = previewKey
            ? Array.from(allL2).find(l => l.getAttribute('data-preview') === previewKey)
            : null;
        if (!targetL2 && allL2.length) targetL2 = allL2[0];
        if (targetL2) targetL2.click();
    }

    // ── HAMBURGER BUTTON ──────────────────────────────────────────────────────
    if (menuToggle && megaMenu && closeMenu) {
        menuToggle.addEventListener('click', (e) => {
            // Prevent the click from bubbling to document and immediately closing the menu
            e.stopPropagation();

            megaMenu.classList.add('active');
            document.body.style.overflow = 'hidden';

            const isMobile = window.innerWidth < 768;

            if (isMobile) {
                openMobileMenu();
            } else {
                closeMobileMenu(); // make sure mobile overlay is hidden on desktop
                // Auto-open the correct section for the current page
                const match = detectCurrentPage();
                if (match) {
                    activateDesktopSection(match.section.id, match.page.preview);
                } else {
                    // Home page or unknown page: default to first section
                    activateDesktopSection(SECTIONS[0].id, null);
                }
            }
        });

        closeMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            megaMenu.classList.remove('active');
            document.body.style.overflow = '';
            if (window.innerWidth < 768) closeMobileMenu();
        });

        // Escape key closes menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && megaMenu.classList.contains('active')) {
                megaMenu.classList.remove('active');
                document.body.style.overflow = '';
                if (window.innerWidth < 768) closeMobileMenu();
            }
        });
    }

    // ── DESKTOP: level1 link clicks ───────────────────────────────────────────
    level1Links.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('data-target');
            if (!target) return;
            // On mobile pane1 is hidden; if somehow clicked, navigate the href
            if (window.innerWidth < 768) return;
            e.preventDefault();
            activateDesktopSection(target, null);
        });
    });

});

// ── INTERSECTION OBSERVER (scroll-reveal animations) ─────────────────────────
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

// ── TRANSPARENT HEADER: scroll-to-solid behavior ──────────────────────────────
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
                    headerNavLinks.forEach(l => {
                        l.classList.remove('text-white', 'text-gray-100');
                        l.classList.add('text-bcg-dark');
                    });
                } else {
                    mainHeader.classList.add('bg-gradient-to-b', 'from-black/40', 'via-black/15', 'to-transparent', 'py-5');
                    mainHeader.classList.remove('bg-white/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'py-3.5', 'shadow-sm');
                    if (menuToggle) {
                        menuToggle.classList.add('text-white', 'hover:bg-white/20');
                        menuToggle.classList.remove('text-bcg-dark', 'hover:bg-gray-100');
                    }
                    headerNavLinks.forEach(l => {
                        l.classList.add('text-white');
                        l.classList.remove('text-bcg-dark');
                    });
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

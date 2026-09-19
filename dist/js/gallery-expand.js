document.addEventListener('DOMContentLoaded', () => {
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => {
        // Find if this grid has insight-cards
        const cards = grid.querySelectorAll('.insight-card');
        if (cards.length === 0) return;

        // Create the expander container for this grid
        const expander = document.createElement('div');
        // Seamless 3D style per requirements
        expander.className = 'col-span-full hidden overflow-hidden transition-all duration-500 ease-in-out relative rounded-2xl bg-gradient-to-br from-white to-[#f4f7f8] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-200 mt-4 mb-8 transform origin-top';
        
        const expanderContent = document.createElement('div');
        expanderContent.className = 'p-8 md:p-12 relative z-10';
        
        // Add a subtle 3D highlight
        const highlight = document.createElement('div');
        highlight.className = 'absolute inset-0 bg-gradient-to-b from-white/60 to-transparent pointer-events-none rounded-2xl';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        closeBtn.className = 'absolute top-6 right-6 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white shadow-sm border border-gray-100 transition-all cursor-pointer z-20';
        
        const contentBody = document.createElement('div');
        contentBody.className = 'max-w-4xl mx-auto';
        
        expanderContent.appendChild(closeBtn);
        expanderContent.appendChild(contentBody);
        expander.appendChild(highlight);
        expander.appendChild(expanderContent);
        
        let activeCard = null;

        const closeExpander = () => {
            expander.style.maxHeight = '0px';
            expander.style.opacity = '0';
            expander.style.transform = 'scaleY(0.95)';
            if (activeCard) {
                const btn = activeCard.querySelector('.btn-expand');
                if (btn) btn.innerHTML = 'Read More';
            }
            setTimeout(() => {
                expander.classList.add('hidden');
                activeCard = null;
            }, 500);
        };

        closeBtn.addEventListener('click', closeExpander);

        cards.forEach(card => {
            const btn = card.querySelector('.btn-expand');
            if (!btn) return;
            
            const details = card.querySelector('.insight-details');
            if (!details) return;

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // If clicking the same card, toggle it off
                if (activeCard === card) {
                    closeExpander();
                    return;
                }
                
                // Reset previous active card button text
                if (activeCard) {
                    const prevBtn = activeCard.querySelector('.btn-expand');
                    if (prevBtn) prevBtn.innerHTML = 'Read More';
                }
                
                activeCard = card;
                btn.innerHTML = 'Close Info';

                // Find the last card in this row dynamically by offsetTop
                let lastInRow = card;
                while (lastInRow.nextElementSibling && lastInRow.nextElementSibling.classList.contains('insight-card')) {
                    if (lastInRow.nextElementSibling.offsetTop === card.offsetTop) {
                        lastInRow = lastInRow.nextElementSibling;
                    } else {
                        break;
                    }
                }

                // Close it temporarily if it's open, move it, then reopen
                expander.classList.add('hidden');
                expander.style.maxHeight = '0px';
                expander.style.opacity = '0';
                expander.style.transform = 'scaleY(0.95)';
                
                // Insert expander after lastInRow
                lastInRow.parentNode.insertBefore(expander, lastInRow.nextSibling);

                // Populate content
                contentBody.innerHTML = details.innerHTML;
                
                // Add some elegant animations to the inner elements
                const heading = contentBody.querySelector('h3');
                if(heading) heading.className = "font-serif text-3xl md:text-4xl text-bcg-dark mb-6 tracking-tight";
                
                const paras = contentBody.querySelectorAll('p');
                paras.forEach(p => p.className = "text-gray-600 mb-8 text-lg leading-relaxed");
                
                const uls = contentBody.querySelectorAll('ul');
                uls.forEach(ul => ul.className = "grid grid-cols-1 md:grid-cols-2 gap-6");
                
                const lis = contentBody.querySelectorAll('li');
                lis.forEach(li => {
                    li.className = "flex items-start gap-4 text-base text-gray-700 bg-white p-4 rounded-xl shadow-sm border border-gray-50";
                    const iconWrap = li.querySelector('div');
                    if (iconWrap) iconWrap.className = "w-6 h-6 rounded-full bg-bcg-dark text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md";
                });

                // Show it
                expander.classList.remove('hidden');
                
                // Trigger reflow
                void expander.offsetWidth;
                
                // Animate in seamlessly
                expander.style.maxHeight = contentBody.scrollHeight + 150 + 'px';
                expander.style.opacity = '1';
                expander.style.transform = 'scaleY(1)';
                
                // Scroll into view gently
                setTimeout(() => {
                    const rect = expander.getBoundingClientRect();
                    const cardRect = card.getBoundingClientRect();
                    
                    if (rect.bottom > window.innerHeight) {
                        window.scrollBy({ top: rect.bottom - window.innerHeight + 40, behavior: 'smooth' });
                    }
                    else if (cardRect.top < 0) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 150);
            });
        });
        
        window.addEventListener('resize', () => {
            if (activeCard && !expander.classList.contains('hidden')) {
                expander.style.maxHeight = contentBody.scrollHeight + 150 + 'px';
                closeExpander();
            }
        });
    });
});

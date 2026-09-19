const fs = require('fs');

let mainJs = fs.readFileSync('js/main.js', 'utf8');

const waWidgetCode = `
    // Inject WhatsApp Floating Widget
    if (!document.getElementById('wa-widget')) {
        const waContainer = document.createElement('div');
        waContainer.id = 'wa-widget';
        waContainer.className = 'fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none';
        
        // Notification Bubble
        const waTooltip = document.createElement('div');
        waTooltip.className = 'bg-white text-gray-800 text-sm p-3 rounded-2xl shadow-xl border border-gray-100 max-w-[200px] transform transition-all duration-500 origin-bottom-right opacity-0 scale-95 pointer-events-auto shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)]';
        waTooltip.innerHTML = '👋 <strong>Need help?</strong><br/><span class="text-xs text-gray-500 mt-1 block">Message us for any type of queries 24/7.</span>';
        
        // WhatsApp Button
        const waLink = document.createElement('a');
        waLink.href = 'https://wa.me/8801846408737';
        waLink.target = '_blank';
        waLink.rel = 'noopener noreferrer';
        waLink.className = 'w-14 h-14 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 pointer-events-auto relative group';
        waLink.innerHTML = \`
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"></path></svg>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        \`;
        
        waContainer.appendChild(waTooltip);
        waContainer.appendChild(waLink);
        document.body.appendChild(waContainer);
        
        // Show tooltip on load after 3 seconds, then bounce it
        setTimeout(() => {
            waTooltip.classList.remove('opacity-0', 'scale-95');
            waTooltip.classList.add('opacity-100', 'scale-100');
        }, 2000);
        
        // Close tooltip if they hover over the button
        waLink.addEventListener('mouseenter', () => {
            waTooltip.classList.add('opacity-0', 'scale-95');
            waTooltip.classList.remove('opacity-100', 'scale-100');
        });
    }
`;

// Inject right after DOMContentLoaded
mainJs = mainJs.replace("document.addEventListener('DOMContentLoaded', () => {", "document.addEventListener('DOMContentLoaded', () => {\n" + waWidgetCode);

fs.writeFileSync('js/main.js', mainJs);
console.log('Fixed js/main.js - WhatsApp widget added');

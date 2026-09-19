const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const socialHtml = `
            <!-- Social Follow -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <span class="text-sm font-bold tracking-widest text-[#70CFFF] uppercase">FOLLOW US</span>
                <div class="flex items-center gap-5">
                    <!-- Instagram -->
                    <a href="https://www.instagram.com/cubicenhance?stkn=MXQ4ZHV0aXNsenphYg==" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <!-- Facebook -->
                    <a href="https://www.facebook.com/share/1JUVDfCqAi/" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                    </a>
                    <!-- Threads (Using generic at symbol as a stand-in for threads) -->
                    <a href="https://www.threads.com/@cubicenhance" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.905 0c-6.52 0-11.905 5.253-11.905 11.956 0 6.64 5.385 11.957 11.905 11.957h2.296v-2.18h-2.296c-5.327 0-9.61-4.283-9.61-9.777 0-5.547 4.283-9.776 9.61-9.776 5.328 0 9.777 4.23 9.777 9.776v2.179c0 1.93-1.008 2.802-2.193 2.802-1.045 0-1.782-.647-1.782-1.87v-9.52h-2.193v1.396c-.71-.99-1.968-1.543-3.298-1.543-2.903 0-5.46 2.39-5.46 6.012 0 3.518 2.502 5.908 5.38 5.908 1.464 0 2.894-.741 3.585-2.008v.794c0 2.274 1.543 3.673 3.972 3.673 2.568 0 4.417-1.517 4.417-4.66v-4.102c0-6.702-5.385-11.955-12.21-11.955zm-1.04 15.011c-2.072 0-3.615-1.57-3.615-3.82 0-2.3 1.597-3.873 3.668-3.873 1.996 0 3.562 1.487 3.562 3.794 0 2.306-1.516 3.899-3.615 3.899z"/></svg>
                    </a>
                    <!-- WhatsApp -->
                    <a href="https://wa.me/8801846408737" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"></path></svg>
                    </a>
                    <!-- Email -->
                    <a href="mailto:admin@cubicenhance.com" class="text-gray-400 hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg>
                    </a>
                </div>
            </div>`;

htmlFiles.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    
    // Check if we already injected it
    if (!html.includes('<!-- Social Follow -->')) {
        const insertionPoint = '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/20';
        html = html.replace(insertionPoint, socialHtml + '\n\n              ' + insertionPoint);
        fs.writeFileSync(f, html);
        console.log(`Injected footer into ${f}`);
    }
});

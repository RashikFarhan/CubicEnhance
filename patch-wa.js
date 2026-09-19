const fs = require('fs');
let mainJs = fs.readFileSync('js/main.js', 'utf8');

// Replace the className
mainJs = mainJs.replace(/waLink\.className = '[^']+';/, "waLink.className = 'w-[56px] h-[56px] flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 pointer-events-auto relative group';");

// Replace the innerHTML block
const newHTML = `waLink.innerHTML = \`
    <dotlottie-player src="/logo/whatsapp-loop.lottie" background="transparent" speed="1" style="width: 56px; height: 56px;" loop autoplay></dotlottie-player>
    <div class="absolute -top-1 right-0 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse z-10"></div>
\`;`;

mainJs = mainJs.replace(/waLink\.innerHTML = `[\s\S]*?animate-pulse"><\/div>\s*`;/, newHTML);

// Ensure Lottie script is loaded
const lottieLoader = `
    if (!document.querySelector('script[src*="dotlottie-player"]')) {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
        script.type = "module";
        document.head.appendChild(script);
    }
`;

if (!mainJs.includes('dotlottie-player.mjs')) {
    mainJs = mainJs.replace("if (!document.getElementById('wa-widget')) {", lottieLoader + "\n    if (!document.getElementById('wa-widget')) {");
}

fs.writeFileSync('js/main.js', mainJs);
console.log('Patched main.js with Lottie WA widget');

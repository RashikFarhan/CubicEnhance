import glob
import re

html_files = glob.glob('*.html')

preloader_snippet = """<style>
#preloader {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: #fcfdfd; z-index: 999999;
    display: flex; justify-content: center; align-items: center;
    transition: opacity 0.5s ease, visibility 0.5s ease;
}
.loader-spinner {
    width: 40px; height: 40px;
    border: 4px solid #e2e8f0; border-top: 4px solid #30495f;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>
<div id="preloader"><div class="loader-spinner"></div></div>
<script>
window.addEventListener('load', function() {
    var p = document.getElementById('preloader');
    if(p) { p.style.opacity = '0'; p.style.visibility = 'hidden'; setTimeout(() => p.remove(), 500); }
});
setTimeout(() => {
    var p = document.getElementById('preloader');
    if(p) { p.style.opacity = '0'; p.style.visibility = 'hidden'; setTimeout(() => p.remove(), 500); }
}, 3000);
</script>"""

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Preloader
    if 'id="preloader"' not in content:
        content = re.sub(
            r'(<body[^>]*>)',
            r'\1\n' + preloader_snippet,
            content
        )

    # 2. Mega Menu Search Bar Overflow Fix
    content = content.replace(
        'class="ml-4 flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-64 md:w-80 shadow-sm"',
        'class="ml-4 flex-1 max-w-sm flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm"'
    )

    # 3. Footer Fixes
    # We will look for the exact chunk of footer HTML
    footer_regex = r'<div class="flex items-center gap-4 mb-4 md:mb-0">\s*<img src="[^"]*logo/only logo\.png"[^>]*>\s*<span class="opacity-50">\|</span>\s*<a href="[^"]*" class="hover:text-white">Privacy Policy</a>\s*<a href="[^"]*" class="hover:text-white">Terms of Use</a>\s*<a href="[^"]*" class="hover:text-white">Sitemap</a>\s*</div>'
    
    new_footer_div = """<div class="flex flex-col sm:flex-row items-center gap-4 mb-4 md:mb-0">
                <a href="/" class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white shadow-sm border border-white/80 transition-transform hover:scale-105">
                    <img src="/logo/only logo.png" alt="CubicEnhance Logo" class="h-6 md:h-7 object-contain">
                    <span class="font-serif font-bold text-sm md:text-base text-black" style="color: #000 !important;">CubicEnhance</span>
                </a>
                <span class="opacity-50 hidden sm:inline">|</span>
                <div class="flex items-center gap-4">
                    <a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms" class="hover:text-white transition-colors">Terms of Use</a>
                </div>
            </div>"""
    
    content = re.sub(footer_regex, new_footer_div, content, flags=re.IGNORECASE)
    
    # Just in case they had slightly different spaces, let's also do a hardcoded replace for the img and sitemap specifically if regex fails
    if 'class="h-6 filter invert"' in content:
        content = content.replace('<img src="logo/only logo.png" alt="Logo" class="h-6 filter invert">', '<a href="/" class="flex items-center gap-2 px-2 py-1 rounded bg-white"><img src="/logo/only logo.png" alt="CubicEnhance" class="h-6 object-contain"><span class="font-serif font-bold text-xs text-black">CubicEnhance</span></a>')
        content = content.replace('<a href="#" class="hover:text-white">Sitemap</a>', '')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Global HTML patches applied.")

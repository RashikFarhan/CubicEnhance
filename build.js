/**
 * build.js - CubicEnhance Production Build Pipeline
 *
 * Usage: node build.js
 * Output: /dist folder ready for deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { minify: minifyHTML } = require('html-minifier-terser');
const { minify: minifyJS } = require('terser');

const seoConfig = require('./seo-config.js');
const DOMAIN = 'https://cubicenhance.com';
const BUILD_TS = Date.now(); // used for cache-busting the JS URL on each deploy

// URL rewrite map: old href value -> new clean href
const URL_MAP = {};
for (const [file, cfg] of Object.entries(seoConfig)) {
  const slug = cfg.slug;
  const cleanHref = slug === '' ? '/' : `/${slug}`;
  URL_MAP[file] = cleanHref;
  URL_MAP[`./${file}`] = cleanHref;
}

// Aliases for any legacy or card links
URL_MAP['specialized-operations.html'] = '/ai-automation';
URL_MAP['data-operations.html'] = '/data-accounting';
URL_MAP['back-office.html'] = '/docs-backoffice';
URL_MAP['customer-operations.html'] = '/social-marketing';
URL_MAP['services.html'] = '/solutions';
URL_MAP['./services.html'] = '/solutions';

// Resource hints to inject into every <head>
const GTM_HEAD = `
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K66XJFDH');</script>
<!-- End Google Tag Manager -->
`;

const GTM_BODY = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K66XJFDH"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
`;

const GA_HEAD = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3JP2540X8C"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3JP2540X8C');
</script>
`;

const META_PIXEL = `
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1626661235479036');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1626661235479036&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`;

const RESOURCE_HINTS = `
    <link rel="preconnect" href="https://www.youtube.com">
    <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
    <link rel="dns-prefetch" href="https://www.youtube.com">
    <link rel="dns-prefetch" href="https://images.unsplash.com">`;

// ─────────────────────────────────────────────
// Step 1: Compile Tailwind CSS
// ─────────────────────────────────────────────
function compileTailwind() {
  console.log('[1/6] Compiling Tailwind CSS (purged)...');
  try {
    execSync(
      'npx @tailwindcss/cli -i ./css/tailwind-input.css -o ./dist/css/main.css --minify',
      { stdio: 'inherit' }
    );
    // Also append existing custom styles into dist
    if (fs.existsSync('./css/style.css')) {
      const customCSS = fs.readFileSync('./css/style.css', 'utf-8');
      fs.appendFileSync('./dist/css/main.css', '\n' + customCSS);
    }
    console.log('    ✓ Tailwind CSS compiled and merged with style.css');
  } catch (e) {
    console.error('    ✗ Tailwind compile failed:', e.message);
  }
}

// ─────────────────────────────────────────────
// Step 2: Minify JS
// ─────────────────────────────────────────────
async function minifyJSFile() {
  console.log('[2/6] Minifying main.js...');
  const src = fs.readFileSync('./js/main.js', 'utf-8');
  const result = await minifyJS(src, { compress: true, mangle: true });
  fs.mkdirSync('./dist/js', { recursive: true });
  fs.writeFileSync('./dist/js/main.min.js', result.code, 'utf-8');
  // Also copy unminified main.js for fallbacks
  fs.writeFileSync('./dist/js/main.js', src, 'utf-8');
  const orig = src.length;
  const min = result.code.length;
  console.log(`    ✓ main.js: ${(orig/1024).toFixed(1)} KB → ${(min/1024).toFixed(1)} KB (saved ${Math.round((1-min/orig)*100)}%)`);
}

// ─────────────────────────────────────────────
// Step 3: Build SEO <head> injection
// ─────────────────────────────────────────────
function buildSEOHead(file, cfg) {
  const slug = cfg.slug || '';
  const url = slug === '' ? DOMAIN + '/' : `${DOMAIN}/${slug}`;
  const schemaBlock = cfg.schema
    ? `\n    <script type="application/ld+json">${JSON.stringify(cfg.schema, null, 0)}</script>`
    : '';

  return `
    <meta name="description" content="${cfg.description}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${url}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="CubicEnhance">
    <meta property="og:title" content="${cfg.title}">
    <meta property="og:description" content="${cfg.description}">
    <meta property="og:image" content="${cfg.ogImage || DOMAIN + '/logo/only%20logo.png'}">
    <meta property="og:url" content="${url}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${cfg.title}">
    <meta name="twitter:description" content="${cfg.description}">
    <meta name="twitter:image" content="${cfg.ogImage || DOMAIN + '/logo/only%20logo.png'}">${schemaBlock}`;
}

// ─────────────────────────────────────────────
// Step 4: Transform a single HTML file
// ─────────────────────────────────────────────
async function transformHTML(srcFile, cfg) {
  let html = fs.readFileSync(srcFile, 'utf-8');

  // 4a. Update <title>
  html = html.replace(/<title>.*?<\/title>/s, `<title>${cfg.title}</title>`);

  // 4b. Remove CDN Tailwind script tag and inline tailwind.config block
  html = html.replace(
    /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*/g,
    ''
  );
  html = html.replace(
    /<script>\s*tailwind\.config\s*=[\s\S]*?<\/script>\s*/,
    ''
  );

  // 4c. Replace inline Tailwind config with link to compiled CSS (after charset meta)
  const cssLink = `\n    <link rel="stylesheet" href="/css/main.css">`;
  html = html.replace(/(<meta charset="UTF-8">)/, `$1${cssLink}`);

  // 4d. Inject SEO tags after </title>
  const seoHead = buildSEOHead(srcFile, cfg);
  html = html.replace(/<\/title>/, `</title>${seoHead}`);

  // Inject GTM Head
  html = html.replace(/(<head[^>]*>)/i, `$1\n${GA_HEAD}`);

  html = html.replace(/(<head[^>]*>)/i, `$1\n${GTM_HEAD}`);

  // 4e. Inject resource hints before </head>
  html = html.replace(/<\/head>/, `${RESOURCE_HINTS}\n${META_PIXEL}\n</head>`);

  // 4f. Rewrite .html internal links to clean URLs
  for (const [oldHref, newHref] of Object.entries(URL_MAP)) {
    const escaped = oldHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(
      new RegExp(`href=["']${escaped}(#[^"']*)?["']`, 'g'),
      (match, anchor) => `href="${newHref}${anchor || ''}"`
    );
  }

  // 4g. Make all relative local assets root-relative so subpages never 404
  html = html.replace(/src=["']logo\/([^"']+)["']/g, 'src="/logo/$1"');
  html = html.replace(/href=["']css\/clash-display\.css["']/g, 'href="/css/clash-display.css"');
  html = html.replace(/href=["']css\/style\.css(\?[^"']*)?["']/g, 'href="/css/main.css"');
  html = html.replace(/src=["']js\/main\.js(\?v=[^"']*)?["']/g, `src="/js/main.min.js?v=${BUILD_TS}"`);
  html = html.replace(/src=["']js\/main\.min\.js["']/g, `src="/js/main.min.js?v=${BUILD_TS}"`);
  html = html.replace(/src=["']js\/firebase-hybrid\.js(\?v=[^"']*)?["']/g, `src="/js/firebase-hybrid.js?v=${BUILD_TS}"`);
  html = html.replace(/fetch\(["']companies\.json["']\)/g, "fetch('/companies.json')");
  html = html.replace(/fetch\(["']reviews\.json["']\)/g, "fetch('/reviews.json')");

  // 4h. Add lazy loading to non-hero images
  // Inject GTM Body
  html = html.replace(/(<body[^>]*>)/i, `$1\n${GTM_BODY}`);

  let imgCount = 0;
  html = html.replace(/<img\s/g, (match) => {
    imgCount++;
    if (imgCount === 1) return match;
    return '<img loading="lazy" ';
  });

  // 4i. Minify HTML
  const minified = await minifyHTML(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
  });

  return minified;
}

// ─────────────────────────────────────────────
// Step 5: Generate sitemap.xml
// ─────────────────────────────────────────────
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = Object.values(seoConfig).map((cfg) => {
    const slug = cfg.slug || '';
    const url = slug === '' ? DOMAIN + '/' : `${DOMAIN}/${slug}`;
    const priority = slug === '' ? '1.0' : slug.includes('/') ? '0.7' : '0.8';
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// ─────────────────────────────────────────────
// Step 6: Generate robots.txt
// ─────────────────────────────────────────────
function generateRobots() {
  return `User-agent: *
Allow: /
Disallow: /data/
Disallow: /companies.json
Disallow: /reviews.json
Sitemap: ${DOMAIN}/sitemap.xml`;
}

// ─────────────────────────────────────────────
// Step 7: Generate security headers file
// ─────────────────────────────────────────────
function generateHeaders() {
  return `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.youtube.com https://s.ytimg.com https://www.youtube-nocookie.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://images.unsplash.com https://i.ytimg.com https://img.youtube.com; frame-src https://www.youtube.com https://www.youtube-nocookie.com; connect-src 'self'; font-src 'self'; object-src 'none';

/css/*
  Cache-Control: public, max-age=31536000, immutable

/js/*
  Cache-Control: public, max-age=31536000, immutable

/logo/*
  Cache-Control: public, max-age=31536000, immutable
`;
}

// ─────────────────────────────────────────────
// Step 8: Copy static assets
// ─────────────────────────────────────────────
function copyAssets() {
  const dirs = ['logo', 'data', 'css/fonts'];
  for (const dir of dirs) {
    if (fs.existsSync(dir)) {
      fs.cpSync(dir, path.join('dist', dir), { recursive: true, force: true });
    }
  }
  if (fs.existsSync('css/clash-display.css')) {
    fs.copyFileSync('css/clash-display.css', 'dist/css/clash-display.css');
  }
  if (fs.existsSync('css/style.css')) {
    fs.copyFileSync('css/style.css', 'dist/css/style.css');
  }
  if (fs.existsSync('companies.json')) fs.copyFileSync('companies.json', 'dist/companies.json');
  if (fs.existsSync('reviews.json')) fs.copyFileSync('reviews.json', 'dist/reviews.json');
  // Copy Firebase JS modules to dist/js/ (critical — without this, firebase-hybrid.js 404s in production)
  if (fs.existsSync('js/firebase-hybrid.js')) fs.copyFileSync('js/firebase-hybrid.js', 'dist/js/firebase-hybrid.js');
  if (fs.existsSync('js/firebase-init.js')) fs.copyFileSync('js/firebase-init.js', 'dist/js/firebase-init.js');
  console.log('    ✓ Static assets copied (incl. Firebase JS modules)');
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
async function main() {
  console.log('\n🔨 CubicEnhance — Production Build\n' + '='.repeat(40));

  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist', { recursive: true });
  fs.mkdirSync('dist/css', { recursive: true });
  fs.mkdirSync('dist/js', { recursive: true });

  // Step 1
  compileTailwind();

  // Step 2
  await minifyJSFile();

  // Steps 3-4: Process all HTML files
  console.log('[3/6] Processing HTML files...');
  let processed = 0;
  let totalSaved = 0;

  for (const [file, cfg] of Object.entries(seoConfig)) {
    if (!fs.existsSync(file)) {
      console.log(`    ⚠ Skipping ${file} (not found)`);
      continue;
    }

    const slug = cfg.slug || '';
    const outDir = slug === ''
      ? 'dist'
      : slug.includes('/')
        ? `dist/${slug.split('/')[0]}/${slug.split('/')[1]}`
        : `dist/${slug}`;

    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'index.html');

    const transformed = await transformHTML(file, cfg);
    fs.writeFileSync(outFile, transformed, 'utf-8');

    // DUAL COMPATIBILITY: Also write the .html version at root of dist
    // so both /about and /about.html or direct .html links work seamlessly!
    if (file !== 'index.html') {
      fs.writeFileSync(path.join('dist', file), transformed, 'utf-8');
    }

    const origSize = fs.statSync(file).size;
    const newSize = Buffer.byteLength(transformed, 'utf-8');
    const saved = origSize - newSize;
    totalSaved += saved;
    console.log(`    ✓ ${file} → /${slug || ''} (${(origSize/1024).toFixed(0)} KB → ${(newSize/1024).toFixed(0)} KB, -${(saved/1024).toFixed(0)} KB)`);
    processed++;
  }

  // Create explicit aliases for card links
  const aliases = [
    ['specialized-operations.html', 'dist/ai-automation/index.html'],
    ['data-operations.html', 'dist/data-accounting/index.html'],
    ['back-office.html', 'dist/docs-backoffice/index.html'],
    ['customer-operations.html', 'dist/social-marketing/index.html'],
    ['services.html', 'dist/solutions/index.html']
  ];
  for (const [aliasName, targetPath] of aliases) {
    if (fs.existsSync(targetPath)) {
      fs.copyFileSync(targetPath, path.join('dist', aliasName));
    }
  }
  console.log('    ✓ Legacy / card fallback aliases created');

  console.log(`\n    Total: ${processed} pages processed, ${(totalSaved/1024).toFixed(0)} KB saved from HTML alone`);

  // Step 5: Generate sitemap & robots
  console.log('[4/6] Generating sitemap.xml and robots.txt...');
  fs.writeFileSync('dist/sitemap.xml', generateSitemap(), 'utf-8');
  fs.writeFileSync('dist/robots.txt', generateRobots(), 'utf-8');
  console.log('    ✓ sitemap.xml generated');
  console.log('    ✓ robots.txt generated');

  // Step 6: Generate security headers
  console.log('[5/6] Generating security headers...');
  fs.writeFileSync('dist/_headers', generateHeaders(), 'utf-8');
  console.log('    ✓ _headers file generated (Cloudflare Pages / Netlify)');

  // Step 7: Copy static assets
  console.log('[6/6] Copying static assets...');
  copyAssets();

  // Summary
  const distSize = getDirSize('dist');
  console.log('\n' + '='.repeat(40));
  console.log(`✅ Build complete! Output: /dist (${(distSize/1024/1024).toFixed(2)} MB)`);
  console.log('   Deploy the /dist folder to your hosting provider.');
}

function getDirSize(dir) {
  let size = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) size += getDirSize(full);
    else size += fs.statSync(full).size;
  }
  return size;
}

main().catch(console.error);

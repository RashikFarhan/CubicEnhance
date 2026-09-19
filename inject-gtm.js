const fs = require('fs');
let code = fs.readFileSync('build.js', 'utf8');

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

if (!code.includes('GTM_HEAD')) {
    console.log("Injecting GTM code definitions...");
    code = code.replace(
        "const META_PIXEL",
        `const GTM_HEAD = \`${GTM_HEAD}\`;\n\nconst GTM_BODY = \`${GTM_BODY}\`;\n\nconst META_PIXEL`
    );

    console.log("Injecting GTM replacements...");
    // Inject GTM_HEAD right after <head>
    code = code.replace(
        /html = html\.replace\(\/<\/title>\/, `<\/title>\$\{seoHead\}`\);/,
        `html = html.replace(/<\\/title>/, \`<\\/title>\${seoHead}\`);\n\n  // Inject GTM Head\n  html = html.replace(/(<head[^>]*>)/i, \`$1\\n\${GTM_HEAD}\`);`
    );

    // Inject GTM_BODY right after <body>
    code = code.replace(
        /let imgCount = 0;/,
        `// Inject GTM Body\n  html = html.replace(/(<body[^>]*>)/i, \`$1\\n\${GTM_BODY}\`);\n\n  let imgCount = 0;`
    );

    fs.writeFileSync('build.js', code);
    console.log("Successfully injected Google Tag Manager into build.js");
} else {
    console.log("GTM already injected.");
}

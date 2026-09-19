const fs = require('fs');
let code = fs.readFileSync('build.js', 'utf8');

const GA_HEAD = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XNZS8WZ22B"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XNZS8WZ22B');
</script>
`;

if (!code.includes('GA_HEAD')) {
    code = code.replace(
        "const META_PIXEL",
        `const GA_HEAD = \`${GA_HEAD}\`;\n\nconst META_PIXEL`
    );
}

// Fix GTM_HEAD injection if it's missing from the body of the function
if (!code.includes('${GTM_HEAD}')) {
    code = code.replace(
        "html = html.replace(/<\\/title>/, `</title>${seoHead}`);",
        "html = html.replace(/<\\/title>/, `</title>${seoHead}`);\n\n  // Inject GTM Head\n  html = html.replace(/(<head[^>]*>)/i, `$1\\n${GTM_HEAD}`);"
    );
}

// Inject GA_HEAD
if (!code.includes('${GA_HEAD}')) {
    code = code.replace(
        "// Inject GTM Head",
        "// Inject GTM Head\n  html = html.replace(/(<head[^>]*>)/i, `$1\\n${GA_HEAD}`);\n"
    );
}

fs.writeFileSync('build.js', code);
console.log("Successfully injected GA tag into build.js");

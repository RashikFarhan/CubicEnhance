const fs = require('fs');
let build = fs.readFileSync('build.js', 'utf8');
build = build.replace(
    "if (fs.existsSync('js/firebase-init.js')) fs.copyFileSync('js/firebase-init.js', 'dist/js/firebase-init.js');",
    "if (fs.existsSync('js/firebase-init.js')) fs.copyFileSync('js/firebase-init.js', 'dist/js/firebase-init.js');\n  if (fs.existsSync('js/gallery-expand.js')) fs.copyFileSync('js/gallery-expand.js', 'dist/js/gallery-expand.js');"
);
fs.writeFileSync('build.js', build);
console.log('Updated build.js to include gallery-expand.js');

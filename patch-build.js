const fs = require('fs');
let build = fs.readFileSync('build.js', 'utf8');
if (!build.includes('whatsapp-loop.lottie')) {
    build = build.replace(
        "if (fs.existsSync('logo/only logo.png')) fs.copyFileSync('logo/only logo.png', 'dist/logo/only logo.png');",
        "if (fs.existsSync('logo/only logo.png')) fs.copyFileSync('logo/only logo.png', 'dist/logo/only logo.png');\n    if (fs.existsSync('logo/whatsapp-loop.lottie')) fs.copyFileSync('logo/whatsapp-loop.lottie', 'dist/logo/whatsapp-loop.lottie');"
    );
    fs.writeFileSync('build.js', build);
}

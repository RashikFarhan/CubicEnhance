const fs = require('fs');
let code = fs.readFileSync('build.js', 'utf8');

if (!code.includes('META_PIXEL')) {
    console.log("Adding META_PIXEL...");
    // Replace the specific line that injects RESOURCE_HINTS
    code = code.replace(
        "html = html.replace(/<\\/head>/, `${RESOURCE_HINTS}\\n</head>`);",
        "html = html.replace(/<\\/head>/, `${RESOURCE_HINTS}\\n${META_PIXEL}\\n</head>`);"
    );
    fs.writeFileSync('build.js', code);
    console.log("Done");
} else {
    // If it already includes META_PIXEL, it might just need the injection replacement
    if (!code.includes('${META_PIXEL}')) {
        console.log("Updating injection logic...");
        code = code.replace(
            "html = html.replace(/<\\/head>/, `${RESOURCE_HINTS}\\n</head>`);",
            "html = html.replace(/<\\/head>/, `${RESOURCE_HINTS}\\n${META_PIXEL}\\n</head>`);"
        );
        fs.writeFileSync('build.js', code);
        console.log("Done");
    }
}

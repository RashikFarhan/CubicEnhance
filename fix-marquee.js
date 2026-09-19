const fs = require('fs');
let js = fs.readFileSync('js/firebase-hybrid.js', 'utf8');

const regex = /topHalf\.forEach\(c => topTrack\.innerHTML \+= buildCard\(c\)\);\s*bottomHalf\.forEach\(c => bottomTrack\.innerHTML \+= buildCard\(c\)\);/;

if (regex.test(js)) {
    js = js.replace(regex, `// Duplicate cards to ensure smooth infinite marquee scroll
    for (let i = 0; i < 4; i++) {
        topHalf.forEach(c => topTrack.innerHTML += buildCard(c));
        bottomHalf.forEach(c => bottomTrack.innerHTML += buildCard(c));
    }`);
    fs.writeFileSync('js/firebase-hybrid.js', js);
    console.log("Updated marquee duplicator in firebase-hybrid.js");
} else {
    console.log("Could not find the forEach loop in firebase-hybrid.js");
}

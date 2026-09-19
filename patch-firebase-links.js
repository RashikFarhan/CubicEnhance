const fs = require('fs');

let js = fs.readFileSync('js/firebase-hybrid.js', 'utf8');

const linkFetchCode = `
        // Fetch custom links
        try {
            const linksDoc = await getDoc(doc(db, 'site_config', 'links'));
            if (linksDoc.exists()) {
                const linksData = linksDoc.data();
                if (linksData.footer_discovery) {
                    const el = document.getElementById('footer-discovery-link');
                    if (el) el.setAttribute('href', linksData.footer_discovery);
                }
            }
        } catch (e) {
            console.error("Could not fetch footer link:", e);
        }
`;

// Insert it right after the metrics are handled.
// Wait, I can just insert it before "const snapshot = await getDocs(collection(db, 'companies'));"
js = js.replace("const snapshot = await getDocs(collection(db, 'companies'));", linkFetchCode + "\n        const snapshot = await getDocs(collection(db, 'companies'));");

fs.writeFileSync('js/firebase-hybrid.js', js);
console.log('Patched firebase-hybrid.js with footer link fetching');

const fs = require('fs');

let js = fs.readFileSync('js/firebase-hybrid.js', 'utf8');

const socialsFetchCode = `
        // Fetch custom socials
        try {
            const socialsDoc = await getDoc(doc(db, 'site_config', 'socials'));
            if (socialsDoc.exists()) {
                const sData = socialsDoc.data();
                const updateLink = (id, val) => {
                    if (val) {
                        document.querySelectorAll(id).forEach(el => el.setAttribute('href', val));
                    }
                };
                updateLink('.social-ig', sData.instagram);
                updateLink('.social-fb', sData.facebook);
                updateLink('.social-th', sData.threads);
                updateLink('.social-wa', sData.whatsapp);
                updateLink('.social-em', sData.gmail);
                
                // Update the floating WA widget specifically
                if (sData.whatsapp) {
                    const waWidget = document.querySelector('#wa-widget a');
                    if (waWidget) waWidget.setAttribute('href', sData.whatsapp);
                }
            }
        } catch (e) {
            console.error("Could not fetch socials:", e);
        }
`;

// Insert it right after the footer link is handled.
if (!js.includes('socialsDoc.exists')) {
    js = js.replace("} catch (e) {\n            console.error(\"Could not fetch footer link:\", e);\n        }", "} catch (e) {\n            console.error(\"Could not fetch footer link:\", e);\n        }\n" + socialsFetchCode);
}

fs.writeFileSync('js/firebase-hybrid.js', js);
console.log('Patched firebase-hybrid.js with socials link fetching');

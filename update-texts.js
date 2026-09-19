const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    
    // Replace "Book discovery call" in 3-bar menu (or anywhere) with "Contact Us"
    html = html.replace(/>\s*Book Discovery Call\s*</gi, '>Contact Us<');

    // Replace "Consultant an Expert" or "Consult an Expert" with "Contact Us"
    html = html.replace(/Consult(?:ant)? an Expert/gi, 'Contact Us');

    // Change href="contact.html" to href="contact.html#discovery-call" ONLY for the "Book Your Free Discovery Call" buttons
    // To do this safely globally, I'll just change ALL href="contact.html" to href="contact.html#discovery-call" if the text contains "Book" or "Contact Us".
    // Actually, any link to contact page can go to the top, EXCEPT the discovery call ones.
    // I'll regex the whole anchor tag.
    html = html.replace(/<a[^>]*href="contact\.html"[^>]*>([\s\S]*?)<\/a>/gi, (match, innerText) => {
        if (innerText.includes('Book Your Free Discovery Call')) {
            return match.replace('href="contact.html"', 'href="contact.html#discovery-call"');
        }
        return match;
    });

    fs.writeFileSync(f, html);
});
console.log('Done replacing strings.');

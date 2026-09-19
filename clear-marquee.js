const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="marquee-track flex whitespace-nowrap pause-on-hover relative z-10 hover:z-50" style="width: max-content; animation: marquee-left 200s linear infinite;">[\s\S]*?<\/div>\s*<!-- Bottom Row \(Left to Right\) -->/m;

if (regex.test(html)) {
    html = html.replace(regex, `<div id="trusted-by-track-top" class="marquee-track flex whitespace-nowrap pause-on-hover relative z-10 hover:z-50" style="width: max-content; animation: marquee-left 200s linear infinite;"></div>
                <!-- Bottom Row (Left to Right) -->`);
}

const regexBottom = /<!-- Bottom Row \(Left to Right\) -->\s*<div class="marquee-track flex whitespace-nowrap pause-on-hover relative z-10 hover:z-50" style="width: max-content; animation: marquee-right 200s linear infinite;">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/m;

if (regexBottom.test(html)) {
    html = html.replace(regexBottom, `<!-- Bottom Row (Left to Right) -->
                <div id="trusted-by-track-bottom" class="marquee-track flex whitespace-nowrap pause-on-hover relative z-10 hover:z-50" style="width: max-content; animation: marquee-right 200s linear infinite;"></div>
            </div>
        </section>`);
    console.log("Cleared marquee tracks.");
}

fs.writeFileSync('index.html', html);

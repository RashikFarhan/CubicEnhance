import fs from 'fs';
import { JSDOM } from 'jsdom';

const html = fs.readFileSync('dist/index.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;
const window = dom.window;

// Mock fetch
global.fetch = async (url) => {
    if (url === '/companies.json') return { json: async () => JSON.parse(fs.readFileSync('dist/companies.json', 'utf8')) };
    if (url === '/reviews.json') return { json: async () => JSON.parse(fs.readFileSync('dist/reviews.json', 'utf8')) };
    throw new Error('404');
};

const data = JSON.parse(fs.readFileSync('dist/reviews.json', 'utf8'));

// Copy renderReviews from firebase-hybrid.js
function renderReviews(data) {
    const totalReviews = data.length;
    const avgScore = totalReviews > 0 ? (data.reduce((sum, rev) => sum + (Number(rev.rating) || 5), 0) / totalReviews).toFixed(2) : "0.00";
    
    if(document.getElementById('agg-score')) {
        document.getElementById('agg-score').innerText = avgScore;
        document.getElementById('agg-count-text').innerText = `Based on ${totalReviews} Verified International Reviews`;
        
        let starsHTML = '';
        const fullStars = Math.floor(Number(avgScore));
        const hasHalfStar = (Number(avgScore) % 1) >= 0.5;
        for(let i=0; i<5; i++) {
            if(i < fullStars) {
                starsHTML += `<svg class="w-7 h-7 text-bcg-light-green fill-current drop-shadow-sm" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
            } else if(i === fullStars && hasHalfStar) {
                starsHTML += `<svg class="w-7 h-7 text-bcg-light-green fill-current drop-shadow-sm" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>`;
            } else {
                starsHTML += `<svg class="w-7 h-7 text-gray-600 fill-current" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z"/></svg>`;
            }
        }
        document.getElementById('agg-stars').innerHTML = starsHTML;
    }
    
    const reviewsTrack = document.getElementById('reviews-track');
    if(!reviewsTrack) return;
    reviewsTrack.innerHTML = ''; // clear existing
    data.forEach(rev => {
        const card = document.createElement('div');
        card.className = 'w-full md:w-1/3 flex-shrink-0 px-4 group';
        let rstars = '';
        for(let i=0; i<5; i++) {
            rstars += i < (Number(rev.rating) || 5) 
                ? `<svg class="w-4 h-4 text-bcg-light-green fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>` 
                : `<svg class="w-4 h-4 text-gray-600 fill-current" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z"/></svg>`;
        }
        
        const reviewerInitial = (rev.reviewer_name || '?').charAt(0).toUpperCase();
        const reviewerName = rev.reviewer_name || 'Anonymous';
        const reviewerCountry = rev.country || 'Unknown';
        
        card.innerHTML = `
            <div class="bg-[#1a2b3c] rounded-2xl p-8 border border-gray-700 h-full flex flex-col hover:border-bcg-green transition-colors">
                <div class="flex gap-1 mb-4">${rstars}</div>
                <p class="text-gray-300 text-[0.95rem] leading-relaxed mb-8 flex-grow font-light text-left">"${rev.text || ''}"</p>
                <div class="flex items-center gap-3 pt-6 border-t border-gray-700 mt-auto">
                    <div class="w-8 h-8 rounded-full bg-bcg-dark flex items-center justify-center flex-shrink-0 border border-gray-600">
                        <span class="text-xs font-bold text-gray-400">${reviewerInitial}</span>
                    </div>
                    <div>
                        <p class="text-white text-xs font-bold capitalize tracking-wider">${reviewerName}</p>
                        <p class="text-bcg-green text-[10px] uppercase tracking-widest font-bold mt-0.5">${reviewerCountry}</p>
                    </div>
                </div>
            </div>`;
        reviewsTrack.appendChild(card);
    });
    console.log("Rendered reviews:", reviewsTrack.children.length);
}

try {
    renderReviews(data);
    console.log("Success! avg score:", document.getElementById('agg-score').innerText);
} catch (e) {
    console.error(e);
}

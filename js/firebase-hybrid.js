import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-3kMD8Cc6mqBGm3xWKhuisO2Wa5VimeI",
    authDomain: "cubicenhance-5fbf8.firebaseapp.com",
    projectId: "cubicenhance-5fbf8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Hybrid Fetch for Metrics
async function fetchCompaniesMetrics() {
    try {
        // Try getting site_config/metrics first
        const metricsDoc = await getDoc(doc(db, 'site_config', 'metrics'));
        if (metricsDoc.exists()) {
            const data = metricsDoc.data();
            if (data.total_clients) document.getElementById('metric-clients')?.setAttribute('data-target', data.total_clients);
            if (data.contractual_accounts) document.getElementById('metric-retention')?.setAttribute('data-target', data.contractual_accounts);
            if (data.years_operational) document.getElementById('metric-years')?.setAttribute('data-target', data.years_operational);
            if(window.initCounters) window.initCounters();
            return;
        }
        
        // Fallback to manual counting if metrics doc doesn't exist
        const snapshot = await getDocs(collection(db, 'companies'));
        if(snapshot.empty) throw new Error('Firestore empty');
        const totalCompanies = snapshot.size;
        const contractual = snapshot.docs.filter(d => {
            const r = d.data().revenue_code;
            return typeof r === 'number' && r > 0;
        }).length;
        
        document.getElementById('metric-clients')?.setAttribute('data-target', totalCompanies);
        document.getElementById('metric-retention')?.setAttribute('data-target', contractual);
        if(window.initCounters) window.initCounters();
    } catch(err) {
        console.warn('Firebase companies fetch failed, falling back to JSON:', err);
        fetch('/companies.json').then(res => res.json()).then(data => {
            const totalCompanies = data.length;
            const contractual = data.filter(c => c.r_code > 0).length;
            document.getElementById('metric-clients')?.setAttribute('data-target', totalCompanies);
            document.getElementById('metric-retention')?.setAttribute('data-target', contractual);
            if(window.initCounters) window.initCounters();
        }).catch(e => {
            if(window.initCounters) window.initCounters();
        });
    }
}

// Hybrid Fetch for Reviews
async function fetchReviewsData() {
    try {
        // Must use 'where' because Firestore rules block fetching all reviews
        const reviewsQuery = query(collection(db, 'reviews'), where('is_published', '==', true));
        const snapshot = await getDocs(reviewsQuery);
        if(snapshot.empty) throw new Error('Firestore empty');
        const data = snapshot.docs.map(d => d.data());
        renderReviews(data);
    } catch(err) {
        console.warn('Firebase reviews fetch failed, falling back to JSON:', err);
        fetch('/reviews.json').then(res => res.json()).then(data => renderReviews(data));
    }
}

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
        document.getElementById('agg-stars-container').innerHTML = starsHTML;
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
    
    // Resume carousel logic here
    if(window.setupCarousel) window.setupCarousel();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCompaniesMetrics();
    if(document.getElementById('reviews-track')) {
        fetchReviewsData();
    }
});

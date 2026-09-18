import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-3kMD8Cc6mqBGm3xWKhuisO2Wa5VimeI",
    authDomain: "cubicenhance-5fbf8.firebaseapp.com",
    projectId: "cubicenhance-5fbf8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Hybrid Fetch for Companies (Metrics only)
async function fetchCompaniesMetrics() {
    try {
        const snapshot = await getDocs(collection(db, 'companies'));
        if(snapshot.empty) throw new Error('Firestore empty');
        const totalCompanies = snapshot.size;
        const contractual = snapshot.docs.filter(d => d.data().revenue_code > 0).length;
        
        document.getElementById('metric-clients').setAttribute('data-target', totalCompanies);
        document.getElementById('metric-retention').setAttribute('data-target', contractual);
        if(window.initCounters) window.initCounters();
    } catch(err) {
        console.warn('Firebase companies fetch failed, falling back to JSON:', err);
        fetch('/companies.json').then(res => res.json()).then(data => {
            const totalCompanies = data.length;
            const contractual = data.filter(c => c.r_code > 0).length;
            document.getElementById('metric-clients').setAttribute('data-target', totalCompanies);
            document.getElementById('metric-retention').setAttribute('data-target', contractual);
            if(window.initCounters) window.initCounters();
        }).catch(e => {
            if(window.initCounters) window.initCounters();
        });
    }
}

// Hybrid Fetch for Reviews
async function fetchReviewsData() {
    try {
        const snapshot = await getDocs(collection(db, 'reviews'));
        if(snapshot.empty) throw new Error('Firestore empty');
        const data = snapshot.docs.map(d => d.data()).filter(d => d.is_published !== false);
        renderReviews(data);
    } catch(err) {
        console.warn('Firebase reviews fetch failed, falling back to JSON:', err);
        fetch('/reviews.json').then(res => res.json()).then(data => renderReviews(data));
    }
}

function renderReviews(data) {
    const totalReviews = data.length;
    const avgScore = totalReviews > 0 ? (data.reduce((sum, rev) => sum + rev.rating, 0) / totalReviews).toFixed(2) : 0;
    
    if(document.getElementById('agg-score')) {
        document.getElementById('agg-score').innerText = avgScore;
        document.getElementById('agg-count-text').innerText = `Based on ${totalReviews} Verified International Reviews`;
        
        let starsHTML = '';
        const fullStars = Math.floor(avgScore);
        const hasHalfStar = (avgScore % 1) >= 0.5;
        for(let i=0; i<5; i++) {
            if(i < fullStars) {
                starsHTML += <svg class="w-7 h-7 text-bcg-light-green fill-current drop-shadow-sm" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>;
            } else if(i === fullStars && hasHalfStar) {
                starsHTML += <svg class="w-7 h-7 text-bcg-light-green fill-current drop-shadow-sm" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>;
            } else {
                starsHTML += <svg class="w-7 h-7 text-gray-600 fill-current" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z"/></svg>;
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
            rstars += i < rev.rating ? <svg class="w-4 h-4 text-bcg-light-green fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg> : <svg class="w-4 h-4 text-gray-600 fill-current" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z"/></svg>;
        }
        card.innerHTML = <div class="bg-[#1a2b3c] rounded-2xl p-8 border border-gray-700 h-full flex flex-col hover:border-bcg-green transition-colors"><div class="flex gap-1 mb-4"></div><p class="text-gray-300 text-[0.95rem] leading-relaxed mb-8 flex-grow font-light text-left">""</p><div class="flex items-center gap-3 pt-6 border-t border-gray-700 mt-auto"><div class="w-8 h-8 rounded-full bg-bcg-dark flex items-center justify-center flex-shrink-0 border border-gray-600"><span class="text-xs font-bold text-gray-400"></span></div><div><p class="text-white text-xs font-bold capitalize tracking-wider"></p><p class="text-bcg-green text-[10px] uppercase tracking-widest font-bold mt-0.5"></p></div></div></div>;
        reviewsTrack.appendChild(card);
    });
    
    // Resume carousel logic here (simplified for this injection)
    if(window.setupCarousel) window.setupCarousel();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCompaniesMetrics();
    if(document.getElementById('reviews-track')) {
        fetchReviewsData();
    }
});

const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacement = `<script>
    document.addEventListener('DOMContentLoaded', () => {
        // SECTION 1: Metrics Counter
        const metricsSection = document.getElementById('metrics-section');
        if(metricsSection) {
            window.initCounters = function() {
                const counters = document.querySelectorAll('#metrics-section [data-target]');
                if(!counters || counters.length === 0) return;
                
                let animated = false;
                
                const animateCounters = () => {
                    if (animated) return;
                    animated = true;
                    
                    counters.forEach(target => {
                        const endValue = parseInt(target.getAttribute('data-target')) || 0;
                        const duration = 1800;
                        const startTime = performance.now();

                        function updateCounter(currentTime) {
                            const elapsedTime = currentTime - startTime;
                            const progress = Math.min(elapsedTime / duration, 1);
                            const easeOut = 1 - Math.pow(1 - progress, 4);
                            const currentVal = Math.floor(easeOut * endValue);

                            target.innerText = currentVal + '+';

                            if (progress < 1) {
                                requestAnimationFrame(updateCounter);
                            } else {
                                target.innerText = endValue + '+';
                            }
                        }
                        requestAnimationFrame(updateCounter);
                    });
                };

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            animateCounters();
                            observer.disconnect();
                        }
                    });
                }, { threshold: 0.1 });

                counters.forEach(c => observer.observe(c));
                
                setTimeout(() => {
                    if (!animated) animateCounters();
                }, 3000);
            }
        }

        // SECTION 2: Reviews Carousel
        const reviewsTrack = document.getElementById('reviews-track');
        if(reviewsTrack) {
            window.setupCarousel = () => {
                const reviewsTrack = document.getElementById('reviews-track');
                if(!reviewsTrack) return;
                
                const cards = reviewsTrack.children;
                if(cards.length === 0) return;
                
                let currentIndex = 0;
                let cardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
                
                const btnPrev = document.getElementById('review-prev');
                const btnNext = document.getElementById('review-next');
                
                const updateButtons = () => {
                    const maxIndex = cards.length - cardsPerView;
                    if(btnPrev) btnPrev.disabled = currentIndex === 0;
                    if(btnNext) btnNext.disabled = currentIndex >= maxIndex;
                };

                const updateCarousel = () => {
                    const maxIndex = cards.length - cardsPerView;
                    if(currentIndex > maxIndex) currentIndex = maxIndex;
                    if(currentIndex < 0) currentIndex = 0;

                    const percentage = -(currentIndex * (100 / cardsPerView));
                    reviewsTrack.style.transform = \`translateX(\${percentage}%)\`;
                    updateButtons();
                };

                if(btnNext) {
                    btnNext.addEventListener('click', () => {
                        if (currentIndex < cards.length - cardsPerView) {
                            currentIndex++;
                            updateCarousel();
                        }
                    });
                }

                if(btnPrev) {
                    btnPrev.addEventListener('click', () => {
                        if (currentIndex > 0) {
                            currentIndex--;
                            updateCarousel();
                        }
                    });
                }

                let autoPlayInterval;
                const startAutoPlay = () => {
                    autoPlayInterval = setInterval(() => {
                        if (currentIndex < cards.length - cardsPerView) {
                            currentIndex++;
                        } else {
                            currentIndex = 0;
                        }
                        updateCarousel();
                    }, 4000);
                };
                const stopAutoPlay = () => clearInterval(autoPlayInterval);

                reviewsTrack.addEventListener('mouseenter', stopAutoPlay);
                reviewsTrack.addEventListener('mouseleave', startAutoPlay);

                if(btnNext) {
                    btnNext.addEventListener('mouseenter', stopAutoPlay);
                    btnNext.addEventListener('mouseleave', startAutoPlay);
                }
                if(btnPrev) {
                    btnPrev.addEventListener('mouseenter', stopAutoPlay);
                    btnPrev.addEventListener('mouseleave', startAutoPlay);
                }

                startAutoPlay();

                window.addEventListener('resize', () => {
                    cardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
                    updateCarousel();
                });

                updateButtons();

                const modal = document.getElementById('review-modal');
                const modalClose = document.getElementById('close-review-modal');

                if(modal) {
                    document.querySelectorAll('.read-more-btn').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            const card = e.target.closest('.group');
                            if(!card) return;
                            
                            const text = card.querySelector('p').innerText;
                            const starsHtml = card.querySelector('.flex.gap-1').innerHTML;
                            const spans = card.querySelectorAll('span');
                            const id = spans[0].innerText;
                            const country = spans[2].innerText;
                            const service = spans[3].innerText;
                            
                            const filledCount = (starsHtml.match(/text-bcg-light-green/g) || []).length;
                            let modalStars = '';
                            for(let i=0; i<5; i++) {
                                if(i < filledCount) {
                                    modalStars += \`<svg class="w-6 h-6 text-bcg-light-green fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>\`;
                                } else {
                                    modalStars += \`<svg class="w-6 h-6 text-gray-600 fill-current" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z"/></svg>\`;
                                }
                            }

                            document.getElementById('modal-review-stars').innerHTML = modalStars;
                            document.getElementById('modal-review-text').innerText = text;
                            document.getElementById('modal-review-id').innerText = id;
                            document.getElementById('modal-review-country').innerText = country;
                            document.getElementById('modal-review-service').innerText = service;

                            modal.classList.remove('opacity-0', 'pointer-events-none');
                            modal.querySelector('div').classList.remove('scale-95');
                        });
                    });

                    if (modalClose) {
                        modalClose.addEventListener('click', () => {
                            modal.classList.add('opacity-0', 'pointer-events-none');
                            modal.querySelector('div').classList.add('scale-95');
                        });
                    }

                    modal.addEventListener('click', (e) => {
                        if(e.target === modal && modalClose) {
                            modalClose.click();
                        }
                    });
                }
            };
        }
    });
</script>`;

html = html.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/, replacement);
fs.writeFileSync('index.html', html);
console.log('Successfully replaced block');

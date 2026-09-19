const fs = require('fs');

let html = fs.readFileSync('contact.html', 'utf8');

const newMain = `<main class="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col justify-center">
        <!-- Section 1: Direct Contact -->
        <div class="text-center mb-16">
            <span class="inline-block px-4 py-1.5 rounded-full bg-[#e8f3f8] text-bcg-green text-xs font-bold uppercase tracking-widest mb-4">
                Reach Out
            </span>
            <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl text-bcg-dark mb-6 leading-tight">
                Contact Us
            </h1>
            <p class="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-8">
                Contact us for any type of queries directly on mail or WhatsApp.
            </p>
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
                <a href="mailto:admin@cubicenhance.com" class="social-em flex items-center justify-center gap-3 w-full sm:w-1/2 px-6 py-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all group">
                    <svg class="w-6 h-6 text-gray-400 group-hover:text-bcg-dark transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg>
                    <span class="font-bold text-gray-700 group-hover:text-bcg-dark">Email Us</span>
                </a>
                <a href="https://wa.me/message/TTWXPOAAZUDJB1" class="social-wa flex items-center justify-center gap-3 w-full sm:w-1/2 px-6 py-4 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl shadow-sm hover:shadow-md hover:bg-[#25D366]/20 transition-all group" target="_blank" rel="noopener">
                    <svg class="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span class="font-bold text-[#25D366]">WhatsApp</span>
                </a>
            </div>
        </div>

        <div class="flex items-center justify-center w-full max-w-2xl mx-auto gap-4 mb-16">
            <div class="flex-grow h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-gray-200"></div>
            <span class="text-xs uppercase tracking-widest text-gray-400 font-bold">OR</span>
            <div class="flex-grow h-[1px] bg-gradient-to-l from-transparent via-gray-200 to-gray-200"></div>
        </div>

        <!-- Section 2: Book Your Free Discovery Call -->
        <div id="discovery-call" class="text-center mb-8 scroll-mt-24">
            <h2 class="font-serif text-3xl md:text-4xl text-bcg-dark mb-4 leading-tight">
                Book your free discovery call
            </h2>
            <p class="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-12">
                Schedule a free meeting with our representatives. We will discuss and brief you on how you can seamlessly integrate our managed operations and what tailored solutions we can provide for your business growth.
            </p>
            
            <div class="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-left">
                <form id="contact-form" class="space-y-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                            <input type="text" id="contact-name" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bcg-green focus:border-transparent text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                            <input type="email" id="contact-email" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bcg-green focus:border-transparent text-sm">
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Preferred Meeting Date / Types of Company *</label>
                            <input type="text" id="contact-date-company" placeholder="E.g., Tech Startup, available Next Tuesday" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bcg-green focus:border-transparent text-sm">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Time Zone *</label>
                            <select id="contact-timezone" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bcg-green focus:border-transparent text-sm text-gray-700">
                                <option value="" disabled selected>Select your time zone...</option>
                                <option value="EST">Eastern Time (EST/EDT)</option>
                                <option value="CST">Central Time (CST/CDT)</option>
                                <option value="MST">Mountain Time (MST/MDT)</option>
                                <option value="PST">Pacific Time (PST/PDT)</option>
                                <option value="GMT">Greenwich Mean Time (GMT)</option>
                                <option value="CET">Central European Time (CET/CEST)</option>
                                <option value="IST">Indian Standard Time (IST)</option>
                                <option value="AEST">Australian Eastern Time (AEST/AEDT)</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Additional Details (Optional)</label>
                        <textarea id="contact-details" rows="3" placeholder="Website URL, current bottlenecks, or specific operations you want to outsource..." class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bcg-green focus:border-transparent text-sm resize-none"></textarea>
                    </div>

                    <div id="contact-status" class="hidden rounded-lg p-4 text-sm font-bold text-center"></div>
                    
                    <button type="submit" id="contact-submit" class="w-full py-4 bg-bcg-dark text-white font-bold text-sm rounded-lg hover:bg-bcg-green transition-colors disabled:opacity-50">
                        Submit &rarr;
                    </button>
                </form>
            </div>
            
            <script type="module">
                import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
                import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
                
                const firebaseConfig = {
                    apiKey: "AIzaSyD-3kMD8Cc6mqBGm3xWKhuisO2Wa5VimeI",
                    authDomain: "cubicenhance-5fbf8.firebaseapp.com",
                    projectId: "cubicenhance-5fbf8"
                };
                
                const app = initializeApp(firebaseConfig);
                const db = getFirestore(app);
                
                const form = document.getElementById('contact-form');
                const submitBtn = document.getElementById('contact-submit');
                const statusDiv = document.getElementById('contact-status');

                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = 'Submitting...';
                    statusDiv.classList.add('hidden');
                    
                    try {
                        const data = {
                            name: document.getElementById('contact-name').value,
                            email: document.getElementById('contact-email').value,
                            preferred_date: document.getElementById('contact-date-company').value,
                            timezone: document.getElementById('contact-timezone').value,
                            message: document.getElementById('contact-details').value,
                            inquiry_type: 'discovery_call',
                            status: 'new',
                            created_at: serverTimestamp()
                        };
                        
                        await addDoc(collection(db, 'inquiries'), data);
                        
                        statusDiv.classList.remove('hidden');
                        statusDiv.className = 'rounded-lg p-4 text-sm font-bold text-center bg-green-50 text-green-700 border border-green-200 mt-4';
                        statusDiv.innerText = 'Your item has been submitted. We would contact you shortly.';
                        form.reset();
                    } catch (error) {
                        console.error('Firebase Error:', error);
                        statusDiv.classList.remove('hidden');
                        statusDiv.className = 'rounded-lg p-4 text-sm font-bold text-center bg-red-50 text-red-700 border border-red-200 mt-4';
                        statusDiv.innerText = 'Failed to submit. Please ensure your connection is stable and try again. Error: ' + error.message;
                    } finally {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Submit &rarr;';
                    }
                });
            </script>
        </div>
    </main>`;

const oldMainRegex = /<main[\s\S]*?<\/main>/;
html = html.replace(oldMainRegex, newMain);
fs.writeFileSync('contact.html', html);
console.log('contact.html updated');

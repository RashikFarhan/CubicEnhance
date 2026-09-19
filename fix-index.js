const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newMetrics = `
                      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 divide-y md:divide-y-0 md:divide-x lg:divide-y-0 lg:divide-x divide-white/20">
                          <!-- Column 1 -->
                          <div class="lg:px-6 xl:px-8 first:lg:pl-0 last:lg:pr-0 text-center flex flex-col items-center">
                              <div id="metric-tasks" class="text-5xl lg:text-6xl font-bold text-[#70CFFF] mb-3 font-serif" data-target="0">0+</div>
                              <h3 class="text-white font-bold uppercase tracking-[1.5px] mb-4 text-sm">TOTAL TASKS COMPLETED</h3>
                              <p class="text-gray-400 text-[0.9rem] leading-[1.5] max-w-sm">Successfully completed a wide range of contractual and non-contractual work for diverse companies worldwide, spanning multiple criteria and industries.</p>
                          </div>
                          <!-- Column 2 -->
                          <div class="lg:px-6 xl:px-8 py-10 md:py-0 lg:py-0 text-center flex flex-col items-center">
                              <div id="metric-contractual" class="text-5xl lg:text-6xl font-bold text-[#70CFFF] mb-3 font-serif" data-target="0">0+</div>
                              <h3 class="text-white font-bold uppercase tracking-[1.5px] mb-4 text-sm">CONTRACTUAL MANAGED ACCOUNTS</h3>
                              <p class="text-gray-400 text-[0.9rem] leading-[1.5] max-w-sm">Long-term client partnerships operating under dedicated Standard Operating Procedures (SOPs), SLAs, and ongoing operational ownership.</p>
                          </div>
                          <!-- Column 3 -->
                          <div class="lg:px-6 xl:px-8 py-10 md:py-0 lg:py-0 text-center flex flex-col items-center">
                              <div id="metric-years" class="text-5xl lg:text-6xl font-bold text-[#70CFFF] mb-3 font-serif" data-target="0">0+</div>
                              <h3 class="text-white font-bold uppercase tracking-[1.5px] mb-4 text-sm">YEARS IN OPERATION</h3>
                              <p class="text-gray-400 text-[0.9rem] leading-[1.5] max-w-sm">Operating and serving our clients globally since we started in 2025.</p>
                          </div>
                          <!-- Column 4 -->
                          <div class="lg:px-6 xl:px-8 pt-10 md:pt-0 lg:pt-0 text-center flex flex-col items-center">
                              <div id="metric-experience" class="text-5xl lg:text-6xl font-bold text-[#70CFFF] mb-3 font-serif" data-target="0">0+</div>
                              <h3 class="text-white font-bold uppercase tracking-[1.5px] mb-4 text-sm">YEARS EMPLOYEE EXPERIENCE</h3>
                              <p class="text-gray-400 text-[0.9rem] leading-[1.5] max-w-sm">Every professional on our team brings at least 4+ years of proven experience working directly with clients.</p>
                          </div>
                      </div>`;

html = html.replace(/<section id="metrics-section"[\s\S]*?<div class="grid grid-cols-1 md:grid-cols-3[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/, 
    '<section id="metrics-section" class="py-24 bg-bcg-dark relative">\n              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">\n                  <div class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 lg:p-12 shadow-2xl">\n' + newMetrics + '\n                  </div>\n              </div>\n          </section>');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html metrics structure.');

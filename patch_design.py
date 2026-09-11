with open('design.html', 'r', encoding='utf-8') as f:
    content = f.read()

form_html = """
<section class="py-24 bg-gray-50 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-3xl font-serif font-bold text-bcg-dark mb-12 border-b pb-4">Talent Registry Intake Form</h2>
        
        <div class="max-w-3xl bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-lg">
            <form action="#" method="POST" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="fullName_d" class="block text-sm font-bold text-bcg-dark mb-2">Full Name <span class="text-red-500">*</span></label>
                        <input type="text" id="fullName_d" name="fullName" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                    </div>
                    <div>
                        <label for="email_d" class="block text-sm font-bold text-bcg-dark mb-2">Email Address <span class="text-red-500">*</span></label>
                        <input type="email" id="email_d" name="email" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="location_d" class="block text-sm font-bold text-bcg-dark mb-2">Location & Country <span class="text-red-500">*</span></label>
                        <input type="text" id="location_d" name="location" required placeholder="e.g., Dhaka, Bangladesh" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                    </div>
                    <div>
                        <label for="domain_d" class="block text-sm font-bold text-bcg-dark mb-2">Primary Operational Domain <span class="text-red-500">*</span></label>
                        <select id="domain_d" name="domain" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                            <option value="" disabled selected>Select your domain</option>
                            <option value="data_accounting">Data & Internal Accounting</option>
                            <option value="docs_backoffice">Documentation & Back-Office Operations</option>
                            <option value="ai_automation">AI Workflow Automation & Integration</option>
                            <option value="qa_web">Software QA & Web Maintenance</option>
                            <option value="graphic_3d">Graphic Design & 3D Visualization</option>
                            <option value="video_media">Video Post-Production & Media Editing</option>
                            <option value="exec_governance">Executive Operational Governance</option>
                        </select>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="linkedin_d" class="block text-sm font-bold text-bcg-dark mb-2">LinkedIn / Portfolio URL <span class="text-red-500">*</span></label>
                        <input type="url" id="linkedin_d" name="linkedin" required placeholder="https://..." class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                    </div>
                    <div>
                        <label for="resume_d" class="block text-sm font-bold text-bcg-dark mb-2">Resume / CV Link <span class="text-red-500">*</span></label>
                        <input type="url" id="resume_d" name="resume" required placeholder="Link to PDF or Google Doc" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark">
                    </div>
                </div>
                
                <div>
                    <label for="summary_d" class="block text-sm font-bold text-bcg-dark mb-2">Brief Operational Summary</label>
                    <textarea id="summary_d" name="summary" rows="4" placeholder="Describe the complex workflows, databases, or tools you manage with confidence." class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors bg-gray-50 text-bcg-dark"></textarea>
                </div>
                
                <div class="pt-4">
                    <button type="submit" class="w-full bg-bcg-dark text-white font-bold py-4 rounded-lg hover:bg-bcg-green transition-colors shadow-md uppercase tracking-wider text-sm">
                        Submit Application to Talent Registry
                    </button>
                </div>
                
                <div class="text-center pt-2">
                    <p class="text-xs text-gray-500 italic">
                        <svg class="w-3 h-3 inline-block mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path></svg>
                        Your information is stored securely and reviewed exclusively by our internal operational leads. We never share or sell candidate data.
                    </p>
                </div>
            </form>
        </div>
    </div>
</section>
"""

content = content.replace('</body>', form_html + '\n</body>')

with open('design.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Appended form to design.html")

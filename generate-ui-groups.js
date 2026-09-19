const fs = require('fs');

const d = require('./pageImages.json');

const pageTitles = {
  "index.html": "Homepage",
  "ai-automation.html": "Services: AI & Automation",
  "data-accounting.html": "Services: Data & Accounting",
  "docs-backoffice.html": "Services: Docs & Back-Office",
  "graphics-design.html": "Services: Graphics Design",
  "media-production.html": "Services: Media Production",
  "social-marketing.html": "Services: Social Marketing",
  "web-design.html": "Services: Web Design",
  "our-story.html": "Company: Our Story",
  "leadership.html": "Company: Leadership",
  "culture.html": "Company: Culture",
  "careers.html": "Company: Careers",
  "how-we-work.html": "Company: How We Work",
  "partner-agency.html": "Partnerships: Agency",
  "partner-dedicated.html": "Partnerships: Dedicated",
  "partner-embedded.html": "Partnerships: Embedded",
  "partner-project.html": "Partnerships: Project",
  "partnerships.html": "Partnerships: Overview",
  "industry-agencies.html": "Industries: Agencies",
  "industry-construction.html": "Industries: Construction",
  "industry-ecommerce.html": "Industries: E-Commerce",
  "industry-startups.html": "Industries: Startups"
};

const GLOBAL_KEYS = ["Remote Operations Team"];
const INDUSTRY_KEYS = ["Industry Header"];

// Force Trust Section Background into index.html
if (d["index.html"] && !d["index.html"].find(img => img.alt === "Trust Section Background")) {
    d["index.html"].push({ alt: "Trust Section Background", url: "" });
}

const groups = [];
const seenKeys = new Set([...GLOBAL_KEYS, ...INDUSTRY_KEYS]);

// 1. Homepage (always first)
const indexArray = d["index.html"].map(img => img.alt);
const indexKeys = [...new Set(indexArray.filter(k => !seenKeys.has(k)))];
indexKeys.forEach(k => seenKeys.add(k));
groups.push({
    title: "Homepage",
    keys: indexKeys
});

// 2. Global Group
groups.push({
    title: "Global & Shared",
    keys: [...GLOBAL_KEYS]
});

// 3. Shared Industries
groups.push({
    title: "Industries (Shared Headers)",
    keys: [...INDUSTRY_KEYS]
});

// 4. Group by page
for (const [page, images] of Object.entries(d)) {
    if (page === 'index.html') continue; // already handled
    const title = pageTitles[page];
    if (!title || title.startsWith('Industries')) continue; // skip unmapped pages or industries since they share the header
    
    const uniqueKeys = [...new Set(images.map(img => img.alt))];
    const pageKeys = uniqueKeys.filter(k => !seenKeys.has(k));
    
    const finalKeys = [];
    pageKeys.forEach(k => {
        finalKeys.push(k);
        seenKeys.add(k);
    });
    
    if (finalKeys.length > 0) {
        groups.push({
            title,
            keys: finalKeys
        });
    }
}

// Any remaining images? Add an "Other" group
const defaultImages = JSON.parse(fs.readFileSync('admin-dashboard/app/(admin)/site/images/defaultImages.json', 'utf8'));
const allKeys = Object.keys(defaultImages);
const unusedKeys = allKeys.filter(k => !seenKeys.has(k));
if (unusedKeys.length > 0) {
    groups.push({
        title: "Other Uncategorized Elements",
        keys: unusedKeys
    });
}

// Sort the groups so Services are together, Company together, etc.
groups.sort((a, b) => {
    // Keep Homepage, Global, Shared at the top
    const topTier = ["Homepage", "Global & Shared", "Industries (Shared Headers)"];
    let aTop = topTier.indexOf(a.title);
    let bTop = topTier.indexOf(b.title);
    if (aTop > -1 && bTop > -1) return aTop - bTop;
    if (aTop > -1) return -1;
    if (bTop > -1) return 1;
    
    // Sort the rest alphabetically
    return a.title.localeCompare(b.title);
});


// Map the alt keys to nice titles
const keyToNiceTitle = {};
groups.forEach(g => {
    g.keys.forEach(k => {
        let niceTitle = k;
        if (g.title === "Homepage") {
            if (k === "Enterprise Security") niceTitle = "Trust Section: Enterprise Security Image";
            else if (k === "Trust Section Background") niceTitle = "Trust Section: Background Gradient";
            else niceTitle = "Service Card: " + k;
        } else if (g.title.startsWith("Services:")) {
            if (k === "Main Display" || k.includes("Management") || k === "Website Design & Maintenance") niceTitle = "Hero Image: " + k;
            else niceTitle = "Detail Image: " + k;
        } else if (g.title.startsWith("Company:")) {
            niceTitle = "Section Image: " + k;
        } else if (g.title.startsWith("Partnerships:")) {
            niceTitle = "Header Image: " + k;
        } else if (g.title === "Global & Shared") {
            niceTitle = "Call-to-Action Background: " + k;
        } else {
            niceTitle = k;
        }
        
        keyToNiceTitle[k] = niceTitle;
    });
});

console.log(JSON.stringify({ groups, keyToNiceTitle }, null, 2));

const formCode = `'use client';
import { useState } from 'react';
import { adminUpdate } from '@/lib/utils';

const IMAGE_GROUPS = ${JSON.stringify(groups, null, 2)};
const KEY_TO_TITLE = ${JSON.stringify(keyToNiceTitle, null, 2)};

export default function ImagesForm({ initialImages }: { initialImages: Record<string, string> }) {
  const [images, setImages] = useState(initialImages);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await adminUpdate('site_config', 'images', images as any);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    }
    setSaving(false);
  }

  const isMatch = (key: string) => {
      const niceTitle = KEY_TO_TITLE[key as keyof typeof KEY_TO_TITLE] || key;
      return niceTitle.toLowerCase().includes(searchTerm.toLowerCase()) || key.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col max-h-[800px]">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-10 shadow-sm">
         <input 
            type="text" 
            placeholder="Search images by name or keyword..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c829c]"
         />
         <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
             {error && <span className="text-red-600 text-sm font-bold">{error}</span>}
             {saved && <span className="text-green-700 text-sm font-bold bg-green-100 px-3 py-1.5 rounded-full border border-green-200 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Saved</span>}
             <button onClick={handleSave} disabled={saving} className="px-6 py-2.5 bg-[#30495f] text-white font-bold text-sm rounded-lg hover:bg-[#203242] transition-colors disabled:opacity-60 shadow-sm flex items-center gap-2">
                {saving ? (
                    <><svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Saving...</>
                ) : 'Save All Changes'}
             </button>
         </div>
      </div>
      
      <div className="overflow-y-auto p-4 md:p-8 space-y-10 flex-1 bg-gray-50/50">
          {IMAGE_GROUPS.map((group, groupIdx) => {
              const visibleKeys = group.keys.filter(isMatch);
              if (visibleKeys.length === 0) return null;

              return (
                  <div key={groupIdx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                          <h2 className="text-[17px] font-bold text-[#30495f]">{group.title}</h2>
                          <span className="text-xs font-bold text-gray-500 bg-gray-200/80 px-2.5 py-1 rounded-full border border-gray-300">{visibleKeys.length} images</span>
                      </div>
                      <div className="p-4 md:p-6 divide-y divide-gray-100">
                          {visibleKeys.map(key => {
                              const url = images[key] || '';
                              const niceTitle = KEY_TO_TITLE[key as keyof typeof KEY_TO_TITLE] || key;
                              return (
                                <div key={key} className="flex flex-col md:flex-row gap-6 items-start py-6 first:pt-0 last:pb-0">
                                   <div className="w-full md:w-56 h-36 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 relative group shadow-sm">
                                       {/* eslint-disable-next-line @next/next/no-img-element */}
                                       <img src={url} alt={niceTitle} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL')} />
                                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
                                   </div>
                                   <div className="flex-1 w-full">
                                      <label className="block text-[15px] font-bold text-gray-900 mb-1.5">{niceTitle}</label>
                                      <div className="flex items-center gap-2 mb-4">
                                          <span className="text-[11px] font-bold tracking-wide uppercase text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">System ID</span>
                                          <span className="text-xs text-gray-600 font-mono">{key}</span>
                                      </div>
                                      <div className="relative">
                                          <input
                                            type="url"
                                            value={url}
                                            onChange={e => setImages(prev => ({ ...prev, [key]: e.target.value }))}
                                            className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c829c] focus:border-transparent bg-white transition-all shadow-inner text-gray-700 font-mono"
                                            placeholder="https://..."
                                          />
                                          {url && (
                                              <a href={url} target="_blank" rel="noreferrer" className="absolute right-3 top-3 text-gray-400 hover:text-[#5c829c] bg-white rounded p-0.5 transition-colors" title="Open original image">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                              </a>
                                          )}
                                      </div>
                                   </div>
                                </div>
                              );
                          })}
                      </div>
                  </div>
              );
          })}
          
          {IMAGE_GROUPS.every(g => g.keys.filter(isMatch).length === 0) && (
              <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">No images found</h3>
                  <p className="text-gray-500">Try adjusting your search keywords.</p>
              </div>
          )}
      </div>
    </div>
  );
}`;

fs.writeFileSync('admin-dashboard/app/(admin)/site/images/ImagesForm.tsx', formCode);
console.log("ImagesForm.tsx brilliantly updated with perfect categorization and naming!");

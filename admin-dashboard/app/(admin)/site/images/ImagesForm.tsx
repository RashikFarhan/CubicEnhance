'use client';
import { useState } from 'react';
import { adminUpdate } from '@/lib/utils';

const IMAGE_GROUPS = [
  {
    "title": "Homepage",
    "keys": [
      "Data & Internal Accounting",
      "Documentation & Back-Office Operations",
      "Social Media Management & Marketing",
      "AI Workflow & Automation",
      "Website Design & Maintenance",
      "Graphics Design",
      "Photos & Videos Production/Editing",
      "Enterprise Security",
      "Trust Section Background"
    ]
  },
  {
    "title": "Global & Shared",
    "keys": [
      "Remote Operations Team"
    ]
  },
  {
    "title": "Industries (Shared Headers)",
    "keys": [
      "Industry Header"
    ]
  },
  {
    "title": "Company: Careers",
    "keys": [
      "CubicEnhance Careers"
    ]
  },
  {
    "title": "Company: Culture",
    "keys": [
      "CubicEnhance Focused Team"
    ]
  },
  {
    "title": "Company: How We Work",
    "keys": [
      "CubicEnhance Operational Team",
      "AI and Human Collaboration"
    ]
  },
  {
    "title": "Company: Leadership",
    "keys": [
      "Operational Center",
      "Tanvir Hasan",
      "Abrar Chowdhury",
      "Marcus Vance"
    ]
  },
  {
    "title": "Company: Our Story",
    "keys": [
      "CubicEnhance Collaboration",
      "CubicEnhance Delivery Hub",
      "Global Delivery Network Map"
    ]
  },
  {
    "title": "Partnerships: Agency",
    "keys": [
      "Agency Operations"
    ]
  },
  {
    "title": "Partnerships: Dedicated",
    "keys": [
      "Dedicated Operations Support"
    ]
  },
  {
    "title": "Partnerships: Embedded",
    "keys": [
      "Embedded Operations"
    ]
  },
  {
    "title": "Partnerships: Overview",
    "keys": [
      "Partnership Strategy"
    ]
  },
  {
    "title": "Partnerships: Project",
    "keys": [
      "Project Delivery"
    ]
  },
  {
    "title": "Services: AI & Automation",
    "keys": [
      "End-to-End Workflow Automation",
      "Human-in-the-Loop AI Operations",
      "AI Dataset Preparation & Labeling",
      "Intelligent Back-Office Assistants"
    ]
  },
  {
    "title": "Services: Data & Accounting",
    "keys": [
      "Document Processing",
      "CRM & Database",
      "AP/AR Management",
      "Financial Reporting"
    ]
  },
  {
    "title": "Services: Docs & Back-Office",
    "keys": [
      "Digital Archive Organization",
      "Compliance & Expiry Tracking",
      "CRM & Sales Operations",
      "Routine Administrative Workflows",
      "Construction & Engineering",
      "Digital & Marketing Agencies",
      "Startups & General B2B",
      "E-Commerce & Retail"
    ]
  },
  {
    "title": "Services: Graphics Design",
    "keys": [
      "Graphic Design & Visualization",
      "Digital & Social Media Assets",
      "Large-Format & Print Design",
      "3D Modeling & Rendering",
      "Brand Asset Management",
      "Social Media 1",
      "Print 1",
      "3D 1",
      "Social Media 2",
      "Print 2",
      "3D 2"
    ]
  },
  {
    "title": "Services: Media Production",
    "keys": [
      "Photo & Video Post-Production",
      "Video Post-Production & Editing",
      "Product Reviews & UGC Edits",
      "Bulk Photo Retouching & E-Commerce",
      "Transcription & Media Prep",
      "Main Display"
    ]
  },
  {
    "title": "Services: Social Marketing",
    "keys": [
      "Social Media Management",
      "Content Scheduling & Formatting",
      "Digital Asset Organization",
      "AI-Assisted Content Production",
      "Campaign Analytics & CRM"
    ]
  },
  {
    "title": "Services: Web Design",
    "keys": [
      "Professional Web Design",
      "E-Commerce & CMS Management",
      "Security & Maintenance Updates",
      "Software QA & Bug Reporting"
    ]
  }
];
const KEY_TO_TITLE = {
  "Data & Internal Accounting": "Service Card: Data & Internal Accounting",
  "Documentation & Back-Office Operations": "Service Card: Documentation & Back-Office Operations",
  "Social Media Management & Marketing": "Service Card: Social Media Management & Marketing",
  "AI Workflow & Automation": "Service Card: AI Workflow & Automation",
  "Website Design & Maintenance": "Service Card: Website Design & Maintenance",
  "Graphics Design": "Service Card: Graphics Design",
  "Photos & Videos Production/Editing": "Service Card: Photos & Videos Production/Editing",
  "Enterprise Security": "Trust Section: Enterprise Security Image",
  "Trust Section Background": "Trust Section: Background Gradient",
  "Remote Operations Team": "Call-to-Action Background: Remote Operations Team",
  "Industry Header": "Industry Header",
  "CubicEnhance Careers": "Section Image: CubicEnhance Careers",
  "CubicEnhance Focused Team": "Section Image: CubicEnhance Focused Team",
  "CubicEnhance Operational Team": "Section Image: CubicEnhance Operational Team",
  "AI and Human Collaboration": "Section Image: AI and Human Collaboration",
  "Operational Center": "Section Image: Operational Center",
  "Tanvir Hasan": "Section Image: Tanvir Hasan",
  "Abrar Chowdhury": "Section Image: Abrar Chowdhury",
  "Marcus Vance": "Section Image: Marcus Vance",
  "CubicEnhance Collaboration": "Section Image: CubicEnhance Collaboration",
  "CubicEnhance Delivery Hub": "Section Image: CubicEnhance Delivery Hub",
  "Global Delivery Network Map": "Section Image: Global Delivery Network Map",
  "Agency Operations": "Header Image: Agency Operations",
  "Dedicated Operations Support": "Header Image: Dedicated Operations Support",
  "Embedded Operations": "Header Image: Embedded Operations",
  "Partnership Strategy": "Header Image: Partnership Strategy",
  "Project Delivery": "Header Image: Project Delivery",
  "End-to-End Workflow Automation": "Detail Image: End-to-End Workflow Automation",
  "Human-in-the-Loop AI Operations": "Detail Image: Human-in-the-Loop AI Operations",
  "AI Dataset Preparation & Labeling": "Detail Image: AI Dataset Preparation & Labeling",
  "Intelligent Back-Office Assistants": "Detail Image: Intelligent Back-Office Assistants",
  "Document Processing": "Detail Image: Document Processing",
  "CRM & Database": "Detail Image: CRM & Database",
  "AP/AR Management": "Hero Image: AP/AR Management",
  "Financial Reporting": "Detail Image: Financial Reporting",
  "Digital Archive Organization": "Detail Image: Digital Archive Organization",
  "Compliance & Expiry Tracking": "Detail Image: Compliance & Expiry Tracking",
  "CRM & Sales Operations": "Detail Image: CRM & Sales Operations",
  "Routine Administrative Workflows": "Detail Image: Routine Administrative Workflows",
  "Construction & Engineering": "Detail Image: Construction & Engineering",
  "Digital & Marketing Agencies": "Detail Image: Digital & Marketing Agencies",
  "Startups & General B2B": "Detail Image: Startups & General B2B",
  "E-Commerce & Retail": "Detail Image: E-Commerce & Retail",
  "Graphic Design & Visualization": "Detail Image: Graphic Design & Visualization",
  "Digital & Social Media Assets": "Detail Image: Digital & Social Media Assets",
  "Large-Format & Print Design": "Detail Image: Large-Format & Print Design",
  "3D Modeling & Rendering": "Detail Image: 3D Modeling & Rendering",
  "Brand Asset Management": "Hero Image: Brand Asset Management",
  "Social Media 1": "Detail Image: Social Media 1",
  "Print 1": "Detail Image: Print 1",
  "3D 1": "Detail Image: 3D 1",
  "Social Media 2": "Detail Image: Social Media 2",
  "Print 2": "Detail Image: Print 2",
  "3D 2": "Detail Image: 3D 2",
  "Photo & Video Post-Production": "Detail Image: Photo & Video Post-Production",
  "Video Post-Production & Editing": "Detail Image: Video Post-Production & Editing",
  "Product Reviews & UGC Edits": "Detail Image: Product Reviews & UGC Edits",
  "Bulk Photo Retouching & E-Commerce": "Detail Image: Bulk Photo Retouching & E-Commerce",
  "Transcription & Media Prep": "Detail Image: Transcription & Media Prep",
  "Main Display": "Hero Image: Main Display",
  "Social Media Management": "Hero Image: Social Media Management",
  "Content Scheduling & Formatting": "Detail Image: Content Scheduling & Formatting",
  "Digital Asset Organization": "Detail Image: Digital Asset Organization",
  "AI-Assisted Content Production": "Detail Image: AI-Assisted Content Production",
  "Campaign Analytics & CRM": "Detail Image: Campaign Analytics & CRM",
  "Professional Web Design": "Detail Image: Professional Web Design",
  "E-Commerce & CMS Management": "Hero Image: E-Commerce & CMS Management",
  "Security & Maintenance Updates": "Detail Image: Security & Maintenance Updates",
  "Software QA & Bug Reporting": "Detail Image: Software QA & Bug Reporting"
};

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
}
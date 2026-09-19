'use client';
import { useState } from 'react';
import { adminUpdate } from '@/lib/utils';
import Image from 'next/image';

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
      // Just save the entire object
      await adminUpdate('site_config', 'images', images as any);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    }
    setSaving(false);
  }
  
  const entries = Object.entries(images).filter(([key]) => key.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col max-h-[800px]">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
         <input 
            type="text" 
            placeholder="Search images by name or alt text..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-sm px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c829c]"
         />
         <div className="flex items-center gap-4">
             {error && <span className="text-red-600 text-sm font-bold">{error}</span>}
             {saved && <span className="text-green-600 text-sm font-bold">Saved!</span>}
             <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-[#30495f] text-white font-bold text-sm rounded-lg hover:bg-[#5c829c] transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save All Changes'}
             </button>
         </div>
      </div>
      
      <div className="overflow-y-auto p-8 space-y-8 flex-1">
          {entries.map(([key, url]) => (
            <div key={key} className="flex gap-6 items-start border-b border-gray-100 pb-8 last:border-0 last:pb-0">
               <div className="w-48 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 relative">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={url} alt={key} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300?text=Invalid+Image+URL')} />
               </div>
               <div className="flex-1">
                  <label className="block text-sm font-bold text-gray-800 mb-1">{key}</label>
                  <p className="text-xs text-gray-500 mb-3">Linked dynamically via alt tag: "{key}"</p>
                  <input
                    type="url"
                    value={url}
                    onChange={e => setImages(prev => ({ ...prev, [key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#5c829c]"
                    placeholder="https://"
                  />
               </div>
            </div>
          ))}
          
          {entries.length === 0 && (
              <div className="text-center py-12 text-gray-500 italic">No images match your search.</div>
          )}
      </div>
    </div>
  );
}

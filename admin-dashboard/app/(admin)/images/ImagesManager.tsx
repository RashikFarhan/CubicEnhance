'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase/client';
import { doc, updateDoc, setDoc } from 'firebase/firestore';

export default function ImagesManager({ initialGroups }: { initialGroups: Record<string, any[]> }) {
  const [groups, setGroups] = useState(initialGroups);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const pages = Object.keys(groups);

  async function handleSave(page: string, id: string) {
    if (!editUrl.trim()) return;
    setIsSaving(true);
    try {
      const ref = doc(db, 'site_images', id);
      await setDoc(ref, { url: editUrl, page }, { merge: true });
      
      const updated = { ...groups };
      const imgIndex = updated[page].findIndex(i => i.id === id);
      if (imgIndex > -1) {
        updated[page][imgIndex].url = editUrl;
      }
      setGroups(updated);
      setEditingId(null);
    } catch (err) {
      alert('Failed to save image: ' + (err as any).message);
    }
    setIsSaving(false);
  }

  return (
    <div className="space-y-12">
      {pages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No images configured yet.</p>
        </div>
      )}

      {pages.map(page => (
        <div key={page} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#f8fafc] px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#30495f]">{page}</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups[page].map((img: any) => (
              <div key={img.id} className="border border-gray-100 rounded-lg overflow-hidden bg-gray-50">
                <div className="aspect-video bg-gray-200 relative">
                  {img.url ? (
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">No Image</div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{img.name || img.id}</h3>
                  <p className="text-xs text-gray-500 mb-4">{img.description || 'Linked to site layout'}</p>
                  
                  {editingId === img.id ? (
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={editUrl} 
                        onChange={e => setEditUrl(e.target.value)}
                        className="w-full text-sm p-2 border rounded"
                        placeholder="Paste new image URL..."
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleSave(page, img.id)} disabled={isSaving} className="flex-1 bg-green-600 text-white text-xs py-2 rounded font-medium disabled:opacity-50">Save</button>
                        <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-200 text-gray-800 text-xs py-2 rounded font-medium">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => {
                        setEditingId(img.id);
                        setEditUrl(img.url || '');
                      }}
                      className="w-full bg-[#30495f] text-white text-sm py-2 rounded font-medium hover:bg-[#5c829c] transition-colors"
                    >
                      Update Link
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase/client';
import { doc, updateDoc } from 'firebase/firestore';
import { cn, formatShortDate } from '@/lib/utils';
import type { Review } from '@/lib/firebase/schema';
import { Pencil } from 'lucide-react';

export default function ReviewsTable({ initialData }: { initialData: (Review & { id: string })[] }) {
  const [reviews, setReviews] = useState(initialData);
  const [search, setSearch] = useState('');
  
  const [editingReview, setEditingReview] = useState<(Review & { id: string }) | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filtered = reviews.filter(r =>
    r.text.toLowerCase().includes(search.toLowerCase()) ||
    r.country.toLowerCase().includes(search.toLowerCase()) ||
    r.service.toLowerCase().includes(search.toLowerCase())
  );

  async function togglePublished(id: string, current: boolean) {
    await updateDoc(doc(db, 'reviews', id), { is_published: !current });
    setReviews(prev => prev.map(r => r.id === id ? { ...r, is_published: !current } : r));
  }

  const stars = (n: number) => '⭐'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingReview) return;
    setIsSaving(true);
    try {
      const ref = doc(db, 'reviews', editingReview.id);
      const dataToSave = {
        text: editingReview.text,
        country: editingReview.country,
        service: editingReview.service,
        rating: editingReview.rating,
      };
      await updateDoc(ref, dataToSave);
      setReviews(prev => prev.map(c => c.id === editingReview.id ? { ...c, ...dataToSave } : c));
      setEditingReview(null);
    } catch (err) {
      alert('Failed to save: ' + (err as any).message);
    }
    setIsSaving(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
      <div className="p-4 border-b border-gray-100">
        <input
          type="text" placeholder="Search reviews by text, country, or service..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c829c]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 font-medium">Review snippet</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium">Country / Service</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Published</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-gray-900 text-sm italic max-w-md line-clamp-2">"{r.text}"</p>
                </td>
                <td className="px-4 py-3 text-[#30495f] text-xs tracking-widest">{stars(r.rating)}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">
                  <span className="font-semibold">{r.country}</span> &bull; {r.service}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{formatShortDate(r.created_at)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => togglePublished(r.id!, r.is_published)}
                    className={cn('w-10 h-5 rounded-full transition-colors relative',
                      r.is_published ? 'bg-green-500' : 'bg-gray-300'
                    )}>
                    <span className={cn('absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                      r.is_published ? 'translate-x-5' : 'translate-x-0.5'
                    )} />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setEditingReview(r)}
                    className="p-1.5 text-gray-500 hover:text-[#5c829c] hover:bg-[#5c829c]/10 rounded-md transition-colors"
                    title="Edit Review"
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">No reviews match your search</div>
        )}
      </div>

      {editingReview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#30495f]">Edit Review</h2>
              <button onClick={() => setEditingReview(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review Text</label>
                <textarea value={editingReview.text} onChange={e => setEditingReview({...editingReview, text: e.target.value})} className="w-full border p-2 rounded" rows={4} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input type="text" value={editingReview.country} onChange={e => setEditingReview({...editingReview, country: e.target.value})} className="w-full border p-2 rounded" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <input type="text" value={editingReview.service} onChange={e => setEditingReview({...editingReview, service: e.target.value})} className="w-full border p-2 rounded" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <input type="number" step="0.5" min="1" max="5" value={editingReview.rating} onChange={e => setEditingReview({...editingReview, rating: parseFloat(e.target.value)})} className="w-full border p-2 rounded" required />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingReview(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-4 py-2 text-sm text-white bg-[#5c829c] hover:bg-[#30495f] rounded-lg disabled:opacity-50">
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

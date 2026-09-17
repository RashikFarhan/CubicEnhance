'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase/client';
import { doc, updateDoc } from 'firebase/firestore';
import { cn, formatShortDate } from '@/lib/utils';
import type { Review } from '@/lib/firebase/schema';

export default function ReviewsTable({ initialData }: { initialData: (Review & { id: string })[] }) {
  const [reviews, setReviews] = useState(initialData);
  const [search, setSearch] = useState('');

  const filtered = reviews.filter(r =>
    r.text.toLowerCase().includes(search.toLowerCase()) ||
    r.country.toLowerCase().includes(search.toLowerCase()) ||
    r.service.toLowerCase().includes(search.toLowerCase())
  );

  async function togglePublished(id: string, current: boolean) {
    await updateDoc(doc(db, 'reviews', id), { is_published: !current });
    setReviews(prev => prev.map(r => r.id === id ? { ...r, is_published: !current } : r));
  }

  const stars = (n: number) => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex gap-3">
        <input type="text" placeholder="Search reviews..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c829c]" />
        <span className="self-center text-sm text-gray-500">{filtered.length} results</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{['Rating', 'Review', 'Country', 'Service', 'Date', 'Published'].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(r => (
              <tr key={r.id} className={cn('hover:bg-gray-50 transition-colors', !r.is_published && 'opacity-50')}>
                <td className="px-4 py-3">
                  <span className="text-yellow-500 font-bold text-base">{stars(r.rating)}</span>
                  <span className="block text-xs text-gray-500">{r.rating}/5</span>
                </td>
                <td className="px-4 py-3 max-w-sm">
                  <p className="text-gray-700 text-xs leading-relaxed line-clamp-3">{r.text}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs font-bold text-gray-600">{r.country_code}</span>
                  <span className="block text-xs text-gray-400">{r.country}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">{r.service}</span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                  {formatShortDate(r.created_at as any)}
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => togglePublished(r.id!, r.is_published)}
                    className={cn('w-10 h-5 rounded-full transition-colors relative', r.is_published ? 'bg-green-500' : 'bg-gray-300')}>
                    <span className={cn('absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', r.is_published ? 'translate-x-5' : 'translate-x-0.5')} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No reviews found</div>}
      </div>
    </div>
  );
}

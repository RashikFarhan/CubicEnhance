'use client';
// app/(admin)/content/companies/CompaniesTable.tsx

import { useState } from 'react';
import { db } from '@/lib/firebase/client';
import { doc, updateDoc } from 'firebase/firestore';
import { cn, STATUS_COLORS } from '@/lib/utils';
import type { Company } from '@/lib/firebase/schema';

const CATEGORY_LABELS: Record<string, string> = {
  C1: 'Agencies', C2: 'E-Commerce', C3: 'Construction', C4: 'Startups',
};
const SERVICE_LABELS: Record<string, string> = {
  S1: 'Data & Accounting', S2: 'Docs & Back-Office', S3: 'AI Automation',
  S4: 'Social & Marketing', S5: 'Web Design', S6: 'Graphics', S7: 'Media',
};

export default function CompaniesTable({ initialData }: { initialData: (Company & { id: string })[] }) {
  const [companies, setCompanies] = useState(initialData);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const filtered = companies.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || c.category_code === filterCat;
    return matchSearch && matchCat;
  });

  async function toggleFeatured(id: string, current: boolean) {
    await updateDoc(doc(db, 'companies', id), { is_featured: !current });
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, is_featured: !current } : c));
  }

  async function toggleActive(id: string, current: boolean) {
    await updateDoc(doc(db, 'companies', id), { is_active: !current });
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, is_active: !current } : c));
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
        <input
          type="text" placeholder="Search by name or country..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c829c]"
        />
        <select
          value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c829c]"
        >
          <option value="all">All Categories</option>
          {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <span className="self-center text-sm text-gray-500 whitespace-nowrap">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Company', 'Country', 'Category', 'Service', 'Tier', 'Featured', 'Active'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-900">{c.name}</p>
                  <p className="text-gray-500 text-xs truncate max-w-xs">{c.description}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{c.country}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">
                    {CATEGORY_LABELS[c.category_code] || c.category_code}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">{SERVICE_LABELS[c.service_code] || c.service_code}</td>
                <td className="px-4 py-3">
                  <span className="text-gray-600 font-mono text-xs">{c.revenue_code}</span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleFeatured(c.id!, c.is_featured)}
                    className={cn('w-10 h-5 rounded-full transition-colors relative',
                      c.is_featured ? 'bg-[#30495f]' : 'bg-gray-300'
                    )}>
                    <span className={cn('absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                      c.is_featured ? 'translate-x-5' : 'translate-x-0.5'
                    )} />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(c.id!, c.is_active)}
                    className={cn('w-10 h-5 rounded-full transition-colors relative',
                      c.is_active ? 'bg-green-500' : 'bg-gray-300'
                    )}>
                    <span className={cn('absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform',
                      c.is_active ? 'translate-x-5' : 'translate-x-0.5'
                    )} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">No companies match your search</div>
        )}
      </div>
    </div>
  );
}

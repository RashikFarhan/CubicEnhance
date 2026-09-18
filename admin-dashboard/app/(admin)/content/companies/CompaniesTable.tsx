'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase/client';
import { doc, updateDoc } from 'firebase/firestore';
import { cn, STATUS_COLORS } from '@/lib/utils';
import type { Company } from '@/lib/firebase/schema';
import { Pencil } from 'lucide-react';

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
  
  const [editingCompany, setEditingCompany] = useState<(Company & { id: string }) | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCompany) return;
    setIsSaving(true);
    try {
      const ref = doc(db, 'companies', editingCompany.id);
      const dataToSave = {
        name: editingCompany.name,
        description: editingCompany.description,
        country: editingCompany.country,
        category_code: editingCompany.category_code,
        service_code: editingCompany.service_code,
        revenue_code: editingCompany.revenue_code,
        logo_url: editingCompany.logo_url
      };
      await updateDoc(ref, dataToSave);
      setCompanies(prev => prev.map(c => c.id === editingCompany.id ? { ...c, ...dataToSave } : c));
      setEditingCompany(null);
    } catch (err) {
      alert('Failed to save: ' + (err as any).message);
    }
    setIsSaving(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
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
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Country</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Active</th>
              <th className="px-4 py-3 font-medium">Actions</th>
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
                <td className="px-4 py-3">
                  <button
                    onClick={() => setEditingCompany(c)}
                    className="p-1.5 text-gray-500 hover:text-[#5c829c] hover:bg-[#5c829c]/10 rounded-md transition-colors"
                    title="Edit Company"
                  >
                    <Pencil size={16} />
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

      {/* Edit Modal */}
      {editingCompany && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#30495f]">Edit Company: {editingCompany.name}</h2>
              <button onClick={() => setEditingCompany(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input type="text" value={editingCompany.name} onChange={e => setEditingCompany({...editingCompany, name: e.target.value})} className="w-full border p-2 rounded" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input type="text" value={editingCompany.country} onChange={e => setEditingCompany({...editingCompany, country: e.target.value})} className="w-full border p-2 rounded" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={editingCompany.description} onChange={e => setEditingCompany({...editingCompany, description: e.target.value})} className="w-full border p-2 rounded" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                <input type="url" value={editingCompany.logo_url} onChange={e => setEditingCompany({...editingCompany, logo_url: e.target.value})} className="w-full border p-2 rounded" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category Code</label>
                  <input type="text" value={editingCompany.category_code} onChange={e => setEditingCompany({...editingCompany, category_code: e.target.value})} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Code</label>
                  <input type="text" value={editingCompany.service_code} onChange={e => setEditingCompany({...editingCompany, service_code: e.target.value})} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Code</label>
                  <input type="number" value={editingCompany.revenue_code} onChange={e => setEditingCompany({...editingCompany, revenue_code: parseInt(e.target.value) || 0})} className="w-full border p-2 rounded" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingCompany(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
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


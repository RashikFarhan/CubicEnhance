'use client';

import { useState } from 'react';
import { adminUpdate } from '@/lib/utils';
import { Pencil } from 'lucide-react';
import type { Employee } from '@/lib/firebase/schema';

export default function EmployeesTable({ initialData }: { initialData: (Employee & { id: string })[] }) {
  const [employees, setEmployees] = useState(initialData);
  const [search, setSearch] = useState('');
  
  const [editingEmp, setEditingEmp] = useState<(Employee & { id: string }) | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filtered = employees.filter(e => (e.name || '').toLowerCase().includes(search.toLowerCase()));

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingEmp) return;
    setIsSaving(true);
    try {
      const dataToSave = {
        name: editingEmp.name,
        role: editingEmp.role,
        department: editingEmp.department,
        location: editingEmp.location,
        level: editingEmp.level,
        focus: editingEmp.focus,
        photo_url: editingEmp.photo_url || '',
      };
      await adminUpdate('employees', editingEmp.id, dataToSave);
      setEmployees(prev => prev.map(c => c.id === editingEmp.id ? { ...c, ...dataToSave } : c));
      setEditingEmp(null);
    } catch (err: any) {
      alert('Failed to save: ' + err.message);
    }
    setIsSaving(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
      <div className="p-4 border-b border-gray-100">
        <input
          type="text" placeholder="Search by name..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c829c]"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Location / Dept</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(e => (
              <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-900">{e.name}</td>
                <td className="px-4 py-3 text-gray-600">{e.role}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {e.location} &bull; {e.department}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setEditingEmp(e)}
                    className="p-1.5 text-gray-500 hover:text-[#5c829c] hover:bg-[#5c829c]/10 rounded-md transition-colors"
                    title="Edit Employee"
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">No employees match your search</div>
        )}
      </div>

      {editingEmp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#30495f]">Edit Employee</h2>
              <button onClick={() => setEditingEmp(null)} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" value={editingEmp.name} onChange={e => setEditingEmp({...editingEmp, name: e.target.value})} className="w-full border p-2 rounded" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title</label>
                  <input type="text" value={editingEmp.role} onChange={e => setEditingEmp({...editingEmp, role: e.target.value})} className="w-full border p-2 rounded" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input type="text" value={editingEmp.department} onChange={e => setEditingEmp({...editingEmp, department: e.target.value})} className="w-full border p-2 rounded" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" value={editingEmp.location} onChange={e => setEditingEmp({...editingEmp, location: e.target.value})} className="w-full border p-2 rounded" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <input type="text" value={editingEmp.level} onChange={e => setEditingEmp({...editingEmp, level: e.target.value})} className="w-full border p-2 rounded" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Focus</label>
                  <input type="text" value={editingEmp.focus} onChange={e => setEditingEmp({...editingEmp, focus: e.target.value})} className="w-full border p-2 rounded" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                <input type="url" value={editingEmp.photo_url || ''} onChange={e => setEditingEmp({...editingEmp, photo_url: e.target.value})} className="w-full border p-2 rounded" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingEmp(null)} className="px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg">Cancel</button>
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

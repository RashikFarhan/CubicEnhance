'use client';
import { useState } from 'react';
import { adminUpdate, cn, formatDate, STATUS_COLORS } from '@/lib/utils';
import type { TalentApplication, TalentStatus } from '@/lib/firebase/schema';

const STATUSES: TalentStatus[] = ['pending', 'reviewed', 'shortlisted', 'rejected'];

export default function TalentTable({ initialData }: { initialData: (TalentApplication & { id: string })[] }) {
  const [apps, setApps] = useState(initialData);
  const [selected, setSelected] = useState<(TalentApplication & { id: string }) | null>(null);
  const [notes, setNotes] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filtered = apps.filter(a => filterStatus === 'all' || a.status === filterStatus);

  async function updateStatus(id: string, status: TalentStatus) {
    try {
      await adminUpdate('talent_registry', id, { status });
      setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  }

  async function saveNotes(id: string) {
    try {
      await adminUpdate('talent_registry', id, { reviewer_notes: notes });
      setApps(prev => prev.map(a => a.id === id ? { ...a, reviewer_notes: notes } : a));
      alert('Notes saved!');
    } catch (err: any) {
      alert('Failed to save notes: ' + err.message);
    }
  }

  return (
    <div className="flex gap-6">
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-3">
          {['all', ...STATUSES].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={cn('px-3 py-1.5 rounded-full text-xs font-bold transition-colors capitalize',
                filterStatus === s ? 'bg-[#30495f] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
              {s}
            </button>
          ))}
          <span className="self-center text-sm text-gray-500 ml-auto">{filtered.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Name', 'Location', 'Domain', 'Status', 'Date'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(app => (
                <tr key={app.id}
                  onClick={() => { setSelected(app); setNotes(app.reviewer_notes || ''); }}
                  className={cn('cursor-pointer hover:bg-blue-50 transition-colors', selected?.id === app.id && 'bg-blue-50')}>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">{app.full_name}</p>
                    <p className="text-xs text-gray-500">{app.email}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{app.location}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-full">{app.domain?.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select value={app.status}
                      onChange={e => { e.stopPropagation(); updateStatus(app.id!, e.target.value as TalentStatus); }}
                      onClick={e => e.stopPropagation()}
                      className={cn('text-xs font-bold rounded-full px-2 py-1 border-0 cursor-pointer', STATUS_COLORS[app.status])}>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{typeof app.created_at === 'string' ? new Date(app.created_at).toLocaleDateString() : formatDate(app.created_at as any)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-400">No applications match</div>}
        </div>
      </div>

      {selected && (
        <div className="w-80 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex-shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Applicant Detail</h3>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700">&times;</button>
          </div>
          <div className="space-y-3 text-sm">
            <div><span className="text-xs font-bold text-gray-400 uppercase">Name</span><p className="font-semibold">{selected.full_name}</p></div>
            <div><span className="text-xs font-bold text-gray-400 uppercase">Email</span><p className="text-gray-600">{selected.email}</p></div>
            <div><span className="text-xs font-bold text-gray-400 uppercase">Location</span><p className="text-gray-600">{selected.location}</p></div>
            <div><span className="text-xs font-bold text-gray-400 uppercase">Domain</span><p className="text-gray-600">{selected.domain}</p></div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">LinkedIn</span>
              <a href={selected.linkedin_url} target="_blank" rel="noopener noreferrer" className="block text-[#5c829c] hover:underline text-xs truncate">{selected.linkedin_url}</a>
            </div>
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase">Resume</span>
              <a href={selected.resume_url} target="_blank" rel="noopener noreferrer" className="block text-[#5c829c] hover:underline text-xs truncate">{selected.resume_url}</a>
            </div>
            {selected.summary && <div><span className="text-xs font-bold text-gray-400 uppercase">Summary</span><p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-xs mt-1 leading-relaxed">{selected.summary}</p></div>}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Reviewer Notes</label>
            <textarea rows={4} value={notes} onChange={e => setNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5c829c] resize-none" />
            <button onClick={() => saveNotes(selected.id!)}
              className="mt-2 w-full py-2 bg-[#30495f] text-white text-xs font-bold rounded-lg hover:bg-[#5c829c] transition-colors">
              Save Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

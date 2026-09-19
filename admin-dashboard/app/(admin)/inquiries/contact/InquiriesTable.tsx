'use client';
import { useState } from 'react';
import { adminUpdate, cn, formatDate, STATUS_COLORS } from '@/lib/utils';
import type { Inquiry, InquiryStatus } from '@/lib/firebase/schema';

const STATUSES: InquiryStatus[] = ['new', 'in_review', 'responded', 'closed'];

export default function InquiriesTable({ initialData }: { initialData: (Inquiry & { id: string })[] }) {
  const [inquiries, setInquiries] = useState(initialData);
  const [selected, setSelected] = useState<(Inquiry & { id: string }) | null>(null);
  const [notes, setNotes] = useState('');

  async function updateStatus(id: string, status: InquiryStatus) {
    try {
      await adminUpdate('inquiries', id, { status });
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  }

  async function saveNotes(id: string) {
    try {
      await adminUpdate('inquiries', id, { admin_notes: notes });
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, admin_notes: notes } : i));
      alert('Notes saved!');
    } catch (err: any) {
      alert('Failed to save notes: ' + err.message);
    }
  }

  return (
    <div className="flex gap-6">
      {/* Table */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>{['Name', 'Email', 'Company', 'Type', 'Status', 'Date'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inquiries.map(inq => (
                <tr key={inq.id}
                  onClick={() => { setSelected(inq); setNotes(inq.admin_notes || ''); }}
                  className={cn('cursor-pointer hover:bg-blue-50 transition-colors', selected?.id === inq.id && 'bg-blue-50')}>
                  <td className="px-4 py-3 font-semibold text-gray-900">{inq.name}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{inq.email}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{inq.company || '-'}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">{inq.inquiry_type?.replace('_', ' ')}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select value={inq.status}
                      onChange={e => { e.stopPropagation(); updateStatus(inq.id!, e.target.value as InquiryStatus); }}
                      onClick={e => e.stopPropagation()}
                      className={cn('text-xs font-bold rounded-full px-2 py-1 border-0 cursor-pointer', STATUS_COLORS[inq.status])}>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{typeof inq.created_at === 'string' ? new Date(inq.created_at).toLocaleDateString() : formatDate(inq.created_at as any)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {inquiries.length === 0 && <div className="text-center py-12 text-gray-400">No inquiries yet</div>}
        </div>
      </div>

      {/* Detail Pane */}
      {selected && (
        <div className="w-80 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex-shrink-0 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Inquiry Detail</h3>
            <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700">&times;</button>
          </div>
          <div className="space-y-3 text-sm">
            <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Name</span><p className="font-semibold text-gray-800">{selected.name}</p></div>
            <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Email</span><p className="text-gray-600">{selected.email}</p></div>
            {selected.company && <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Company</span><p className="text-gray-600">{selected.company}</p></div>}
            {selected.service_interest && <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Service</span><p className="text-gray-600">{selected.service_interest}</p></div>}
            {selected.preferred_date && <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Preferred Date / Company Type</span><p className="text-gray-600">{selected.preferred_date}</p></div>}
            {selected.timezone && <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Time Zone</span><p className="text-gray-600">{selected.timezone}</p></div>}
            {selected.budget && <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Budget</span><p className="text-gray-600">{selected.budget}</p></div>}
            <div><span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Message</span><p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg text-xs mt-1">{selected.message}</p></div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Admin Notes</label>
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

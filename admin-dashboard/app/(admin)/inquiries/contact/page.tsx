// app/(admin)/inquiries/contact/page.tsx
import { adminDb } from '@/lib/firebase/admin';
import InquiriesTable from './InquiriesTable';

export default async function ContactInquiriesPage() {
  const snap = await adminDb.collection('inquiries').orderBy('created_at', 'desc').get();
  const inquiries = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Inquiries</h1>
        <p className="text-gray-500 mt-1 text-sm">{inquiries.length} total submissions</p>
      </div>
      <InquiriesTable initialData={inquiries as any[]} />
    </div>
  );
}

// app/(admin)/inquiries/talent/page.tsx
import { adminDb } from '@/lib/firebase/admin';
import TalentTable from './TalentTable';

export default async function TalentPage() {
  const snap = await adminDb.collection('talent_registry').orderBy('created_at', 'desc').get();
  const applications = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Talent Registry</h1>
        <p className="text-gray-500 mt-1 text-sm">{applications.length} total applications</p>
      </div>
      <TalentTable initialData={applications as any[]} />
    </div>
  );
}

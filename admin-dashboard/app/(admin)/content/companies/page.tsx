export const dynamic = 'force-dynamic';
// app/(admin)/content/companies/page.tsx
import { adminDb } from '@/lib/firebase/admin';
import CompaniesTable from './CompaniesTable';

export default async function CompaniesPage() {
  const snap = await adminDb.collection('companies').orderBy('name').get();
  const companies = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-500 mt-1 text-sm">{companies.length} client companies in the database</p>
        </div>
      </div>
      <CompaniesTable initialData={companies as any[]} />
    </div>
  );
}


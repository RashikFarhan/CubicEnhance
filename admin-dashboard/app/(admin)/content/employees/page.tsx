export const dynamic = 'force-dynamic';
import { adminDb } from '@/lib/firebase/admin';
import { toSerializable } from '@/lib/utils';
import EmployeesTable from './EmployeesTable';

export default async function EmployeesPage() {
  const snap = await adminDb.collection('employees').orderBy('sort_order').get();
  const employees = toSerializable(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-500 mt-1 text-sm">{employees.length} team members in the database</p>
        </div>
      </div>
      <EmployeesTable initialData={employees as any[]} />
    </div>
  );
}

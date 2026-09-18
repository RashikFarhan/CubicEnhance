// app/(admin)/users/page.tsx
export const dynamic = 'force-dynamic';
import { adminDb } from '@/lib/firebase/admin';

export default async function UsersPage() {
  const snap = await adminDb.collection('users').get();
  const users = snap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users & Roles</h1>
        <p className="text-gray-500 mt-1 text-sm">{users.length} user(s) registered</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-medium">UID</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-400 font-mono">{u.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{u.email || '—'}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 bg-[#30495f] text-white text-xs font-bold rounded-full">
                      {u.role || 'unknown'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {u.is_active === false ? '❌' : '✅'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-12 text-gray-400">No users found</div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
        <strong>Note:</strong> To add or remove admin users, use the Firebase Authentication console and manually set their <code>role</code> field in the <code>users</code> Firestore collection.
      </div>
    </div>
  );
}

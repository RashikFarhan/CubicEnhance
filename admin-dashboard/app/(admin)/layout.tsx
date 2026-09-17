// app/(admin)/layout.tsx
// Protected admin layout — verifies session before rendering

import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth/session';
import Sidebar from '@/components/admin/Sidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect('/auth/login');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

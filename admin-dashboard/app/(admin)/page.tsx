export const dynamic = 'force-dynamic';
// app/(admin)/page.tsx — Dashboard Overview
import { adminDb } from '@/lib/firebase/admin';
import { formatDate } from '@/lib/utils';

async function getStats() {
  const [companies, reviews, employees, inquiries, talent] = await Promise.all([
    adminDb.collection('companies').count().get(),
    adminDb.collection('reviews').count().get(),
    adminDb.collection('employees').count().get(),
    adminDb.collection('inquiries').where('status', '==', 'new').count().get(),
    adminDb.collection('talent_registry').where('status', '==', 'pending').count().get(),
  ]);

  const recentInquiries = await adminDb.collection('inquiries')
    .orderBy('created_at', 'desc').limit(5).get();

  const metricsDoc = await adminDb.collection('site_config').doc('metrics').get();

  return {
    companies: companies.data().count,
    reviews: reviews.data().count,
    employees: employees.data().count,
    newInquiries: inquiries.data().count,
    pendingTalent: talent.data().count,
    recentInquiries: recentInquiries.docs.map(d => ({ id: d.id, ...d.data() })),
    metrics: metricsDoc.data(),
  };
}

export default async function DashboardPage() {
  const stats = await getStats();

  const STAT_CARDS = [
    { label: 'Companies', value: stats.companies, icon: '🏢', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700', href: '/content/companies' },
    { label: 'Published Reviews', value: stats.reviews, icon: '⭐', color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-700', href: '/content/reviews' },
    { label: 'Employees', value: stats.employees, icon: '👥', color: 'bg-green-50 border-green-200', textColor: 'text-green-700', href: '/content/employees' },
    { label: 'New Inquiries', value: stats.newInquiries, icon: '📨', color: 'bg-red-50 border-red-200', textColor: 'text-red-700', href: '/inquiries/contact' },
    { label: 'Pending Talent', value: stats.pendingTalent, icon: '🎯', color: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700', href: '/inquiries/talent' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">CubicEnhance Operations Overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {STAT_CARDS.map(card => (
          <a key={card.label} href={card.href}
            className={`block p-5 rounded-xl border ${card.color} hover:shadow-md transition-shadow group`}>
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className={`text-3xl font-black ${card.textColor} mb-1`}>{card.value}</div>
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{card.label}</div>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Recent Contact Inquiries</h2>
            <a href="/inquiries/contact" className="text-xs text-[#5c829c] hover:underline font-semibold">View all →</a>
          </div>
          {stats.recentInquiries.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-400 text-sm">No inquiries yet</div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {(stats.recentInquiries as any[]).map((inq) => (
                <li key={inq.id} className="px-6 py-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{inq.name}</p>
                    <p className="text-xs text-gray-500 truncate">{inq.email}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider
                      ${inq.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                      {inq.status}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1">{formatDate(inq.created_at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Site Metrics Snapshot */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Live Site Metrics</h2>
            <a href="/site/metrics" className="text-xs text-[#5c829c] hover:underline font-semibold">Edit →</a>
          </div>
          {stats.metrics ? (
            <div className="p-6 grid grid-cols-2 gap-4">
              {Object.entries(stats.metrics).filter(([k]) => k !== 'updated_at').map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-black text-[#30495f]">{String(value)}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1 font-semibold">
                    {key.replace(/_/g, ' ')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center text-gray-400 text-sm">Metrics not configured yet</div>
          )}
        </div>
      </div>
    </div>
  );
}


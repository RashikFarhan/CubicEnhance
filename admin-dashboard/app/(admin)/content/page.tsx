import Link from 'next/link';
import { Building2, MessageSquare, Users2 } from 'lucide-react';

export default function ContentListsPage() {
  const lists = [
    { title: 'Companies', description: 'Manage client companies and partners', href: '/content/companies', icon: <Building2 size={40} className="text-[#30495f]" /> },
    { title: 'Reviews', description: 'Manage client testimonials and reviews', href: '/content/reviews', icon: <MessageSquare size={40} className="text-[#30495f]" /> },
    { title: 'Employees', description: 'Manage team members and leadership', href: '/content/employees', icon: <Users2 size={40} className="text-[#30495f]" /> },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Lists</h1>
      <p className="text-gray-500 mb-8">Select a list to view and edit its records.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lists.map(list => (
          <Link key={list.href} href={list.href} className="block group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md hover:border-[#5c829c]">
              <div className="mb-4">{list.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#30495f] transition-colors">{list.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{list.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

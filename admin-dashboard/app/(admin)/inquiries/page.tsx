import Link from 'next/link';
import { Mail, Users } from 'lucide-react';

export default function InquiriesIndexPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Inquiries</h1>
      <p className="text-gray-500 mb-8">Review form submissions from the public website.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/inquiries/contact" className="block group">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md hover:border-[#5c829c]">
            <Mail className="text-[#30495f] mb-4" size={40} />
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#30495f]">Contact Forms</h2>
            <p className="text-sm text-gray-500 mt-2">Business inquiries, quote requests, and discovery call bookings</p>
          </div>
        </Link>
        <Link href="/inquiries/talent" className="block group">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md hover:border-[#5c829c]">
            <Users className="text-[#30495f] mb-4" size={40} />
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#30495f]">Talent Registry</h2>
            <p className="text-sm text-gray-500 mt-2">Job applications and talent expressions of interest</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

// components/admin/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { href: '/', label: 'Dashboard', icon: '⬜' },
    ],
  },
  {
    label: 'Content',
    items: [
      { href: '/content/companies', label: 'Companies', icon: '🏢' },
      { href: '/content/reviews', label: 'Reviews', icon: '⭐' },
      { href: '/content/employees', label: 'Employees', icon: '👥' },
    ],
  },
  {
    label: 'Site Config',
    items: [
      { href: '/site/metrics', label: 'Metrics', icon: '📊' },
    ],
  },
  {
    label: 'Inquiries',
    items: [
      { href: '/inquiries/contact', label: 'Contact Forms', icon: '📨' },
      { href: '/inquiries/talent', label: 'Talent Registry', icon: '🎯' },
    ],
  },
  {
    label: 'Access',
    items: [
      { href: '/users', label: 'Users & Roles', icon: '🔐' },
    ],
  },
  {
    label: 'Integrations',
    items: [
      { href: '/settings', label: 'Settings', icon: '⚙️' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch('/api/auth/session', { method: 'DELETE' });
    router.push('/auth/login');
  }

  return (
    <aside className="w-64 min-h-screen bg-[#30495f] text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">CubicEnhance</p>
            <p className="text-white/50 text-[10px] uppercase tracking-widest">Admin Console</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2 px-3">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                        isActive
                          ? 'bg-white/15 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <a
          href="https://cubicenhance.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-white/50 hover:text-white text-xs transition-colors mb-2"
        >
          <span>🌐</span> View Public Site
        </a>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-300 text-sm transition-colors disabled:opacity-50"
        >
          <span>🚪</span> {isLoggingOut ? 'Signing out…' : 'Sign Out'}
        </button>
      </div>
    </aside>
  );
}

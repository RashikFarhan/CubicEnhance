'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { LayoutDashboard, List, Image, Activity, Mail, Users, Settings, ExternalLink, LogOut } from 'lucide-react';

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { href: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    ],
  },
  {
    label: 'Content Management',
    items: [
      { href: '/content', label: 'Lists (Companies, Reviews)', icon: <List size={20} /> },
      { href: '/images', label: 'Images & Assets', icon: <Image size={20} /> },
    ],
  },
  {
    label: 'Site Config',
    items: [
      { href: '/site/metrics', label: 'Metrics', icon: <Activity size={20} /> },
    ],
  },
  {
    label: 'Inquiries',
    items: [
      { href: '/inquiries/contact', label: 'Contact Forms', icon: <Mail size={20} /> },
      { href: '/inquiries/talent', label: 'Talent Registry', icon: <Users size={20} /> },
    ],
  },
  {
    label: 'Access & Integrations',
    items: [
      { href: '/users', label: 'Users & Roles', icon: <Settings size={20} /> },
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
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">CubicEnhance</p>
            <p className="text-white/50 text-[10px] uppercase tracking-widest">Admin Console</p>
          </div>
        </div>
      </div>

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
                      <span className="text-base flex-shrink-0">{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-white/50 hover:text-white text-xs transition-colors mb-2"
        >
          <ExternalLink size={16} /> View Public Site
        </a>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:bg-red-500/20 hover:text-red-300 text-sm transition-colors disabled:opacity-50"
        >
          <LogOut size={16} /> {isLoggingOut ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    </aside>
  );
}

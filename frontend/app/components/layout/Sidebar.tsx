'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isMentor = user?.roles?.includes('ROLE_MENTOR');
  const userName = user?.email?.split('@')[0] || 'User';

  // Define role-based navigation items
  const navItems = isMentor
    ? [
        { href: '/dashboard', label: 'Overview', icon: 'dashboard' },
        { href: '/dashboard/availability', label: 'My Availability', icon: 'calendar_month' },
        { href: '/dashboard/sessions', label: 'My Sessions', icon: 'video_call' },
        { href: '/dashboard/settings', label: 'Settings', icon: 'settings' },
      ]
    : [
        { href: '/dashboard', label: 'Overview', icon: 'dashboard' },
        { href: '/mentors', label: 'Mentor Network', icon: 'group' },
        { href: '/dashboard/sessions', label: 'My Sessions', icon: 'calendar_today' },
        { href: '#', label: 'Growth Plan', icon: 'insights' },
        { href: '/dashboard/settings', label: 'Settings', icon: 'settings' },
      ];

  const isActive = (href: string) => {
    if (href === '#') return false;
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <aside className="h-[calc(100vh-64px)] w-64 fixed left-0 top-16 bg-[#F3F3F3] dark:bg-slate-900 flex flex-col p-6 space-y-2 border-none bg-gradient-to-r from-transparent to-[#F3F3F3] z-40">
      <div className="flex items-center space-x-3 mb-8 p-2">
        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-headline font-bold text-sm">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-body text-sm font-semibold text-[#0A2156]">{userName}</p>
          <p className="font-body text-[10px] text-slate-500 uppercase tracking-widest">
            {isMentor ? 'Mentor' : 'Candidate'}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-transform duration-200
                ${active
                  ? 'bg-white dark:bg-slate-800 text-[#0A2156] dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:translate-x-1'
                }
              `}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="font-body text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800">
        <Link href="/mentors">
          <Button className="w-full mb-6">
            {isMentor ? 'View Profile' : 'Book Session'}
          </Button>
        </Link>
        <div className="space-y-1">
          <Link href="#" className="flex items-center space-x-3 px-4 py-2 text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">help</span>
            <span className="font-body text-xs">Help Center</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-2 text-slate-500 hover:text-red-500 transition-colors w-full cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="font-body text-xs">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

interface SidebarProps {
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  userName = "Alex Rodriguez",
  userRole = "Senior Full-Stack Engineer",
  avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBdU1bIHVD-3RexI_j7sekfZ2A4JJ2wYdbfOLYvN9FculhQyP4ZpcCoGOdBUZ-Iu9vqf5CZrBJ8vH49yt19LcaYWXS-GbdrhMYX5GEDUtaf89S2DXbWnKlTCPdIgVeauBDpDavaEP5azSwso5HlkThE53nOS8PB9Pz_qAmlrWmj2kgsUhDlN4HDmBoKywz3DkJlkSuXqUk0QCcS6UaB011Ogw1mauPGnAubiYLNs_LwaUi1vVuJgFhz2dj3JsA1z3IX-UZ9GWi9NFXq"
}) => {
  return (
    <aside className="h-[calc(100vh-64px)] w-64 fixed left-0 top-16 bg-[#F3F3F3] dark:bg-slate-900 flex flex-col p-6 space-y-2 border-none bg-gradient-to-r from-transparent to-[#F3F3F3] z-40">
      <div className="flex items-center space-x-3 mb-8 p-2">
        <img 
          alt={userName} 
          className="w-10 h-10 rounded-xl object-cover" 
          src={avatarUrl}
        />
        <div>
          <p className="font-body text-sm font-semibold text-[#0A2156]">{userName}</p>
          <p className="font-body text-[10px] text-slate-500 uppercase tracking-widest">{userRole}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <Link href="/dashboard/candidate" className="flex items-center space-x-3 px-4 py-3 bg-white dark:bg-slate-800 text-[#0A2156] dark:text-white rounded-lg shadow-sm font-semibold transition-transform duration-200">
          <span className="material-symbols-outlined text-xl">dashboard</span>
          <span className="font-body text-sm font-medium">Overview</span>
        </Link>
        <Link href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg hover:translate-x-1 transition-transform duration-200">
          <span className="material-symbols-outlined text-xl">calendar_today</span>
          <span className="font-body text-sm font-medium">My Sessions</span>
        </Link>
        <Link href="/mentors" className="flex items-center space-x-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg hover:translate-x-1 transition-transform duration-200">
          <span className="material-symbols-outlined text-xl">group</span>
          <span className="font-body text-sm font-medium">Mentor Network</span>
        </Link>
        <Link href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg hover:translate-x-1 transition-transform duration-200">
          <span className="material-symbols-outlined text-xl">insights</span>
          <span className="font-body text-sm font-medium">Growth Plan</span>
        </Link>
        <Link href="#" className="flex items-center space-x-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg hover:translate-x-1 transition-transform duration-200">
          <span className="material-symbols-outlined text-xl">settings</span>
          <span className="font-body text-sm font-medium">Settings</span>
        </Link>
      </nav>

      <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800">
        <Button fullWidth className="mb-6">Book Session</Button>
        <div className="space-y-1">
          <Link href="#" className="flex items-center space-x-3 px-4 py-2 text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">help</span>
            <span className="font-body text-xs">Help Center</span>
          </Link>
          <Link href="#" className="flex items-center space-x-3 px-4 py-2 text-slate-500 hover:text-error transition-colors">
            <span className="material-symbols-outlined text-xl">logout</span>
            <span className="font-body text-xs">Logout</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

'use client';
import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const linkClass = (path: string) => `
    font-headline tracking-tight font-bold text-sm transition-all relative py-1
    ${isActive(path) 
      ? 'text-primary' 
      : 'text-slate-500 hover:text-[#0A2156]'
    }
  `;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/55 backdrop-blur-xl shadow-sm flex justify-between items-center px-8 h-16 max-w-full">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt={`${siteConfig.name} Logo`} className="w-10 h-10 object-contain rounded-md" />
          <span className="text-xl font-headline font-bold tracking-tighter text-[#0A2156]">{siteConfig.name}</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated && (
            <Link href="/dashboard" className={linkClass('/dashboard')}>
              Dashboard
              {isActive('/dashboard') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />}
            </Link>
          )}
          <Link href="/mentors" className={linkClass('/mentors')}>
            Mentors
            {isActive('/mentors') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />}
          </Link>
          <Link href="/practice" className={linkClass('/practice')}>
            Practice
            {isActive('/practice') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />}
          </Link>
          <Link href="/resources" className={linkClass('/resources')}>
            Resources
            {isActive('/resources') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />}
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="hidden md:block font-headline tracking-tight font-bold text-sm text-slate-500 hover:text-[#0A2156] transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link href="/register" className="bg-gradient-to-r from-primary to-primary-container text-white px-6 py-2 rounded-full font-headline font-bold text-sm shadow-md hover:opacity-90 transition-all active:scale-[0.98]">
              Get Started
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden md:block font-headline tracking-tight font-bold text-sm text-slate-500 hover:text-[#0A2156] transition-colors px-4 py-2">
              My Profile
            </Link>
            <button 
              onClick={logout}
              className="bg-slate-100 text-slate-700 px-6 py-2 rounded-full font-headline font-bold text-sm hover:bg-slate-200 transition-all active:scale-[0.98]"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

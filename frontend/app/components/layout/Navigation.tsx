import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/55 backdrop-blur-xl shadow-sm flex justify-between items-center px-8 h-16 max-w-full">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt={`${siteConfig.name} Logo`} className="w-10 h-10 object-contain rounded-md" />
          <span className="text-xl font-headline font-bold tracking-tighter text-[#0A2156]">{siteConfig.name}</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard/candidate" className="font-headline tracking-tight font-bold text-sm text-slate-500 hover:text-[#0A2156] transition-colors">
            Dashboard
          </Link>
          <Link href="/mentors" className="font-headline tracking-tight font-bold text-sm text-slate-500 hover:text-[#0A2156] transition-colors">
            Mentors
          </Link>
          <Link href="/practice" className="font-headline tracking-tight font-bold text-sm text-slate-500 hover:text-[#0A2156] transition-colors">
            Practice
          </Link>
          <Link href="/resources" className="font-headline tracking-tight font-bold text-sm text-slate-500 hover:text-[#0A2156] transition-colors">
            Resources
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="hidden md:block font-headline tracking-tight font-bold text-sm text-slate-500 hover:text-[#0A2156] transition-colors px-4 py-2">
          Sign In
        </Link>
        <Link href="/register" className="bg-gradient-to-r from-primary to-primary-container text-white px-6 py-2 rounded-full font-headline font-bold text-sm shadow-md hover:opacity-90 transition-all active:scale-[0.98]">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

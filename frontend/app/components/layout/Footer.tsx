import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#F3F3F3] bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto py-16 px-8 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-6">
            <img src="/logo.png" alt={`${siteConfig.name} Logo`} className="w-10 h-10 object-contain rounded-md" />
            <span className="font-headline font-bold text-2xl text-[#0A2156]">{siteConfig.name}</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">{siteConfig.description} Built for clarity, powered by human expertise.</p>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">public</span>
            <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">chat</span>
            <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">mail</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-headline font-bold text-[#0A2156] mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" href="/dashboard/candidate">Dashboard</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/mentors">Mentors</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="/interview">Practice Rooms</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Growth Plans</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold text-[#0A2156] mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" href="#">About Us</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Success Stories</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Press Kit</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-bold text-[#0A2156] mb-6 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" href="#">Privacy Policy</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Terms of Service</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Cookie Policy</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Support</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-8 px-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-inter text-xs tracking-wide text-slate-400">© 2024 {siteConfig.name}. {siteConfig.description}</p>
        <div className="flex gap-6 text-xs text-slate-400">
          <span>Designed for focus</span>
          <span>•</span>
          <span>Secured with AES-256</span>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-outline-variant/15 bg-surface">
      <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="max-w-xs">
          <span className="font-headline font-bold text-2xl text-primary block mb-6">
            HiringGround
          </span>
          <p className="text-body-sm text-on-surface-variant leading-relaxed mb-6">
            Editorial Grade Interview Prep for the modern professional. Built for clarity, powered by human expertise.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="sr-only">Website</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 011-1h12a1 1 0 011 1v2h2a1 1 0 011 1v14a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1h2V1z" />
              </svg>
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3.5a2 2 0 100 4 2 2 0 000-4zM2.006 11a2 2 0 012-2h.01a2 2 0 012 2v5.04a.996.996 0 01-.996 1H4a1 1 0 01-1-.996V11zM14 3a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="sr-only">Email</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="font-headline font-bold text-label-lg text-on-surface uppercase tracking-widest mb-6">
            Platform
          </h4>
          <ul className="space-y-4 text-label-md">
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Dashboard</Link></li>
            <li><Link href="/mentors" className="text-on-surface-variant hover:text-primary transition-colors">Mentors</Link></li>
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Practice Rooms</Link></li>
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Growth Plans</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-headline font-bold text-label-lg text-on-surface uppercase tracking-widest mb-6">
            Company
          </h4>
          <ul className="space-y-4 text-label-md">
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Careers</Link></li>
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Success Stories</Link></li>
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Press Kit</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-headline font-bold text-label-lg text-on-surface uppercase tracking-widest mb-6">
            Legal
          </h4>
          <ul className="space-y-4 text-label-md">
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Cookie Policy</Link></li>
            <li><Link href="#" className="text-on-surface-variant hover:text-primary transition-colors">Support</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto py-8 px-6 border-t border-outline-variant/15 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-label-sm text-on-surface-variant">
          © 2024 HiringGround. Editorial Grade Interview Prep.
        </p>
        <div className="flex gap-6 text-label-sm text-on-surface-variant">
          <span>Designed for focus</span>
          <span>•</span>
          <span>Secured with AES-256</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

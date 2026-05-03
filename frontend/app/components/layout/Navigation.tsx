'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/app/components/ui/Button';

interface NavigationProps {
  isAuthenticated?: boolean;
  userEmail?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  isAuthenticated = false,
  userEmail,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/55 dark:bg-slate-900/55 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-headline font-bold tracking-tighter text-primary">
            HiringGround
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-label-md font-headline font-bold text-on-surface-variant hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link href="/mentors" className="text-label-md font-headline font-bold text-on-surface-variant hover:text-primary transition-colors">
            Mentors
          </Link>
          <Link href="#" className="text-label-md font-headline font-bold text-on-surface-variant hover:text-primary transition-colors">
            Practice
          </Link>
          <Link href="#" className="text-label-md font-headline font-bold text-on-surface-variant hover:text-primary transition-colors">
            Resources
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <button className="hidden md:block text-label-md font-headline font-bold text-on-surface-variant hover:text-primary transition-colors">
                Sign In
              </button>
              <Button size="md" variant="primary">
                Get Started
              </Button>
            </>
          ) : (
            <>
              <span className="hidden md:block text-label-md text-on-surface-variant">
                {userEmail}
              </span>
              <Button size="md" variant="secondary">
                Profile
              </Button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-surface-container-low rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant/15">
          <div className="px-6 py-4 space-y-4">
            <Link href="#" className="block text-body-md font-headline text-on-surface hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/mentors" className="block text-body-md font-headline text-on-surface hover:text-primary transition-colors">
              Mentors
            </Link>
            <Link href="#" className="block text-body-md font-headline text-on-surface hover:text-primary transition-colors">
              Practice
            </Link>
            <Link href="#" className="block text-body-md font-headline text-on-surface hover:text-primary transition-colors">
              Resources
            </Link>
            {!isAuthenticated && (
              <Button size="md" variant="primary" className="w-full">
                Get Started
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

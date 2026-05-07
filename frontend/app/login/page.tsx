'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Logging in to ' + siteConfig.name + '...');
  };

  const labelClass = "block text-sm text-slate-800 mb-1.5";
  const inputClass = "w-full bg-white border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3 py-2.5 text-sm text-slate-900 transition-all outline-none";

  return (
    <div className="h-[calc(100vh-64px)] bg-[#F3F2EF] relative flex flex-col justify-center py-4 px-4 sm:px-6 lg:px-8 selection:bg-primary/20 overflow-hidden antialiased">
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center gap-4 mb-6">
          <Link href="/" className="shrink-0">
            <img src="/logo.png" alt={`${siteConfig.name} Logo`} className="w-12 h-12 object-contain rounded-xl shadow-sm" />
          </Link>
          <div className="text-left">
            <h2 className="text-2xl font-headline text-slate-900 tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-1 text-sm text-slate-600 font-body">
              Welcome back to {siteConfig.name}
            </p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl py-8 px-6 sm:px-10 shadow-lg shadow-slate-200/50 rounded-2xl border border-slate-200 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleLogin} className="space-y-5">
            
            <div>
              <label className={labelClass}>Email Address</label>
              <input 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                className={inputClass} 
                placeholder="jane@example.com" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm text-slate-800" style={{marginBottom: 0}}>Password</label>
                <Link href="#" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                className={inputClass} 
                placeholder="••••••••" 
              />
            </div>

            <div className="flex items-center">
              <input 
                id="remember-me" 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" 
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                Remember me
              </label>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98]"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/80 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <Link
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                </Link>
              </div>
              <div>
                <Link
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  <img className="h-5 w-5" src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn" />
                </Link>
              </div>
            </div>
          </div>
          
          <p className="text-center text-sm text-slate-600 mt-8">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

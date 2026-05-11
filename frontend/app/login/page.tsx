'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siteConfig } from '@/config/site';
import { loginSchema, LoginFormData } from '@/lib/validations/auth';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    try {
      const response = await fetchApi<any>('/auth/login', {
        data: {
          email: data.email,
          password: data.password,
        },
      });
      
      console.log('Login success:', response);
      
      // Save token and user info to context and localStorage
      login(response.token, {
        id: response.id,
        email: response.email,
        roles: response.roles
      });
      
      // Force a hard redirect so context reloads or middleware catches it
      window.location.href = '/dashboard';
      
    } catch (err: any) {
      setLoginError(err.message || 'Invalid email or password');
    }
  };

  const labelClass = "block text-sm text-slate-800 mb-1.5";
  const inputClass = "w-full bg-white border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3 py-2.5 text-sm text-slate-900 transition-all outline-none";
  const inputErrorClass = "border-red-500 focus:border-red-500 focus:ring-red-500";

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F3F2EF] relative flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-primary/20 overflow-hidden antialiased">
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

        <div className="bg-white/80 backdrop-blur-2xl py-8 px-6 sm:px-10 shadow-lg shadow-slate-200/50 rounded-2xl border border-slate-200">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {loginError && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {loginError}
              </div>
            )}

            <div>
              <label className={labelClass}>Email Address</label>
              <input 
                {...register('email')}
                type="email" 
                className={`${inputClass} ${errors.email ? inputErrorClass : ''}`} 
                placeholder="jane@example.com" 
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm text-slate-800" style={{marginBottom: 0}}>Password</label>
                <Link href="#" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input 
                {...register('password')}
                type="password" 
                className={`${inputClass} ${errors.password ? inputErrorClass : ''}`} 
                placeholder="••••••••" 
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input 
                {...register('rememberMe')}
                id="rememberMe" 
                type="checkbox" 
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" 
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700">
                Remember me
              </label>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
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
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/../oauth2/authorization/google`}
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  <img className="h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                </a>
              </div>
              <div>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/../oauth2/authorization/linkedin`}
                  className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  <img className="h-5 w-5" src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn" />
                </a>
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

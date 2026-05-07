import React from 'react';
import Link from 'next/link';
import Footer from '@/app/components/layout/Footer';
import { siteConfig } from '@/config/site';

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative px-8 pt-24 pb-32 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-primary uppercase bg-primary-fixed rounded-full">{siteConfig.name}</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-[#0A2156] leading-[1.1] tracking-tight mb-8">
              Practice Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Interviews</span> with Industry Experts.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant mb-10 max-w-lg leading-relaxed">
              Master the art of the interview through editorial-grade simulations. Transition from high-anxiety to authoritative calm with AI-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <button className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-full font-headline font-bold text-lg shadow-lg hover:opacity-90 transition-all active:scale-[0.98]">
                  Get Started
                </button>
              </Link>
              <Link href="/mentors">
                <button className="bg-surface-container-lowest border border-outline-variant/20 px-8 py-4 rounded-full font-headline font-bold text-lg text-[#0A2156] hover:bg-surface-container-low transition-all">
                  View Mentors
                </button>
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6s4uayIDG1dfXCrXgTZjo4d2VxDB0P0zCbOSrlAYh5HgLenaj8cAU9j1nUWRsbvhfplN1ZsZ03H8hM3VKCz3oNblWzxfA8TR5RFO5lrn2nCfH8lv4Yplfh_4z00Er1eT3Ta5lBKDmZgIg9QPJ9Qa6UouTo_uiIJQJdutv1NLowL8pgiZjshQN-MIEQMC9G9CZ-JYxByBdk90yqO_5jYNE7ByqaQzf8_OzopR6W0ksgrJKRM561ymNxyQ3SDII1AQ3m7MGVlcTmkWZ" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc-zB9G-LntiQijoSwrNVT3T39gEiKgb17Hy6orzV0TU1zADxbSCtA9zhtQKiDDPjEAPagPLevFKWm8k1t3jHRQBJL_TpZ8laCwvwvpYb_pM2ZdUnyrkSRxcQFOJQjNczZkDsSu6VoZp1VHZMCb_41use5echNPdeXbMwa7-m63b9WYVFUxZ31SE635aya4iVKPW-S7tXbp9-xZYv1nOTYh8qgnnFbySsVSvojDr-id0A4ZXt4SlqDxHKoWaVWklhdZOMZvM9B7k6N" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDucTWeVknJii9VYkW8G_SiRopxlIiDRhKpvf7Q7yIs7nmeeB0VGTexY-BXXCCNbfRX6eBILMgliipALpkBs4miWqgrSLJD8sHfHTRUNecKJ77fsSsnbGhQ4tij6QSPIrYiowApULc5yyHW-zSSnaWtCIH45s18TwtjQ86j3wFFXrBtDeJUQTsGNExkAjgDgzeJ4LS0nvREAiF3Q_-VZLxnezedTFpJ_0hmMBa1yHcZvr107kwbncwb6VZ1vesNRRLPrxPnY21_nYCy" />
              </div>
              <p>Joined by 2,000+ candidates this month</p>
            </div>
          </div>
          <div className="relative">
            {/* Asymmetric Hero Visual */}
            <div className="relative z-10 glass-card p-4 rounded-2xl shadow-2xl overflow-hidden border border-white/40">
              <img className="rounded-xl w-full h-[500px] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFVW6qJhAABO51_RQgQnl4zTB1AQVBLDzt8mAcUgaoetzktU9GR-M6ElARgLpBmOzCJrIEIf3NyJdO4KTNbxna7hx2SRwKD5BQ4W8tR68Yb73MpWiLFUK4u_HJ4w7m1mvKQZXqccbtX541avDA5MzOJNlB6g4r5WnbSkngZxPLYFWF48XwTLJtU6V-K6mMWHXpMps1Gq0c-_fPmMxSZxG0njhG8WK9hJuv9z2vsSGkb6Hayn8_WX4NOInm6ivT3NQjaG8-BvqcUlzv" />
              <div className="absolute bottom-8 right-8 glass-card p-6 rounded-xl shadow-xl border border-white/50 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                  <span className="font-headline font-bold text-[#0A2156]">Real-time Clarity</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">AI analyzes your tone, pacing, and keyword relevance to provide instantaneous behavioral corrections.</p>
              </div>
            </div>
            {/* Background Decor */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center font-headline font-bold text-xs uppercase tracking-[0.2em] text-slate-400 mb-10">Trusted by candidates now at</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-headline font-black text-[#0A2156]">GOOGLE</span>
            <span className="text-2xl font-headline font-black text-[#0A2156]">STRIPE</span>
            <span className="text-2xl font-headline font-black text-[#0A2156]">LINEAR</span>
            <span className="text-2xl font-headline font-black text-[#0A2156]">AIRBNB</span>
            <span className="text-2xl font-headline font-black text-[#0A2156]">VERCEL</span>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="font-headline text-4xl font-extrabold text-[#0A2156] tracking-tight mb-4">Master the Narrative.</h2>
          <p className="text-on-surface-variant max-w-xl text-lg">Our platform is designed to emulate the physical presence of a high-stakes interview environment.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Card */}
          <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-2xl flex flex-col justify-between shadow-sm border border-outline-variant/5">
            <div>
              <span className="material-symbols-outlined text-primary mb-6 text-4xl">video_chat</span>
              <h3 className="font-headline text-2xl font-bold text-[#0A2156] mb-4">Live Mock Interviews</h3>
              <p className="text-on-surface-variant leading-relaxed max-w-md">Connect with industry veterans from FAANG and high-growth startups for 1-on-1 simulations that mirror the exact pressure of the real thing.</p>
            </div>
            <div className="mt-12 flex items-center gap-4 group cursor-pointer">
              <span className="font-headline font-bold text-primary group-hover:underline">Explore Mentor Network</span>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
          {/* Secondary Card */}
          <div className="bg-tertiary-container p-10 rounded-2xl shadow-sm border border-outline-variant/5">
            <span className="material-symbols-outlined text-on-tertiary-container mb-6 text-4xl">description</span>
            <h3 className="font-headline text-2xl font-bold text-on-tertiary-container mb-4">Feedback Reports</h3>
            <p className="text-on-tertiary-fixed-variant leading-relaxed">Editorial-grade review of your performance, broken down by technical accuracy and soft-skill proficiency.</p>
          </div>
          {/* AI Recommendations */}
          <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm border border-outline-variant/5">
            <span className="material-symbols-outlined text-primary mb-6 text-4xl">psychology</span>
            <h3 className="font-headline text-2xl font-bold text-[#0A2156] mb-4">AI Recommendations</h3>
            <p className="text-on-surface-variant leading-relaxed">Dynamic growth plans generated after every session, highlighting the exact areas where you need more polish.</p>
          </div>
          {/* Wide Feature */}
          <div className="md:col-span-2 relative overflow-hidden bg-[#0A2156] p-10 rounded-2xl flex items-center shadow-xl">
            <div className="relative z-10 w-full md:w-1/2">
              <h3 className="font-headline text-2xl font-bold text-white mb-4">The Focus Glass Engine</h3>
              <p className="text-slate-300 leading-relaxed mb-8">Our proprietary environment removes UI friction, allowing you to focus purely on human interaction while AI works silently in the background.</p>
              <button className="bg-primary text-white px-6 py-2.5 rounded-full font-headline font-bold text-sm">See it in action</button>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/2 hidden md:block">
              <div className="h-full w-full bg-gradient-to-l from-primary/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics/Stats Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="font-headline text-5xl font-extrabold text-[#0A2156] mb-2">94%</p>
            <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Offer Success Rate</p>
          </div>
          <div>
            <p className="font-headline text-5xl font-extrabold text-[#0A2156] mb-2">12k+</p>
            <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Mock Sessions</p>
          </div>
          <div>
            <p className="font-headline text-5xl font-extrabold text-[#0A2156] mb-2">450+</p>
            <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Industry Mentors</p>
          </div>
          <div>
            <p className="font-headline text-5xl font-extrabold text-[#0A2156] mb-2">35%</p>
            <p className="text-sm text-slate-500 font-medium tracking-wide uppercase">Avg. Salary Increase</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <h2 className="font-headline text-4xl font-extrabold text-[#0A2156] text-center mb-20 tracking-tight">The candidate experience.</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-surface-container-lowest p-12 rounded-2xl border border-outline-variant/10">
            <div className="flex gap-1 mb-6 text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-xl font-body italic text-on-surface-variant mb-10 leading-relaxed">
              &quot;{siteConfig.name} changed how I perceive high-pressure calls. The AI feedback on my pacing was a wake-up call I didn't know I needed.&quot;
            </p>
            <div className="flex items-center gap-4">
              <img className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT3Pm9WFTd7nOzHCG5Z_bm0dQtilI5k3F2kdRuP94L4YiZ_F7mw2SRpQ4Ob0MZknDCkanCpuLWFZBIicwcOGhDpsjZb_VelRC80l86-WNx7otRz3w3fetbv4DjCKABmCMAOtVDR_rmCcFAuVxEOKcXoK5URi9pHRSzZI0CmEjNAdEvU63bUmGeTmFPjnjgoJ9VbKtJmIK4SdA6_bScGI8Q1ES9Oy5ISVn-SZyIInfBU7gbBa4ycDCyuIRgvd1z7gmKr3OyvRUhmPxi" />
              <div>
                <p className="font-headline font-bold text-[#0A2156]">Marcus Thorne</p>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Senior Engineer @ Stripe</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-12 rounded-2xl border border-outline-variant/10">
            <div className="flex gap-1 mb-6 text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-xl font-body italic text-on-surface-variant mb-10 leading-relaxed">
              "The mentors here don't just ask questions—they teach you the mindset behind the rubric. I landed three offers within two weeks of my last session."
            </p>
            <div className="flex items-center gap-4">
              <img className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBfJTyD6vFb4848AbcTmobSYwvxQsp-5g_NXs4pmCP71_iLglRwQaPhhzivEywPFjeNgSjQlsVsqNgNS5TUkOIj_riwa1JCo5b3A_dAQBEybDd3ThZ_EJ7fk_VWUk9pbIlqPwku8YCdqvc14uFak5z1Y0AYk8H6ookl0R3D2ZwaP63EyYO42_FNGy1YhqWOUaUzgRMZROOxK3EtgqfkxnBxZaMeEEZwWiJn9ecP_BVMe7ZMF4TTERB6BtWZhFTGyBIuNzbnycxqBCD" />
              <div>
                <p className="font-headline font-bold text-[#0A2156]">Elena Rodriguez</p>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Product Lead @ Linear</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto glass-card p-16 rounded-[2rem] text-center border border-white/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-primary-container/20 -z-10"></div>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-[#0A2156] mb-6 tracking-tight leading-tight">Ready to master your next <br />career-defining moment?</h2>
          <p className="text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto">Join the hundreds of candidates who have transitioned from nervous applicants to confident experts this month.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-br from-primary to-primary-container text-white px-10 py-4 rounded-full font-headline font-bold text-lg shadow-lg hover:opacity-90 transition-all active:scale-[0.98]">Get Started Now</button>
            <button className="bg-white border border-outline-variant/30 px-10 py-4 rounded-full font-headline font-bold text-lg text-[#0A2156] hover:bg-slate-50 transition-all">Schedule a Demo</button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

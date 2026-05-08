import React from 'react';
import Link from 'next/link';

export default function ResourcesPage() {
  const resources = [
    {
      category: 'Workshop',
      title: 'Advanced System Design Architecture',
      description: 'A 2-hour deep dive into designing scalable distributed systems for FAANG interviews.',
      icon: 'architecture',
      duration: '120 mins',
      date: 'May 15, 2026',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'Masterclass',
      title: 'Cracking the Behavioral Interview',
      description: 'Learn the STAR method and how to present your professional experience perfectly.',
      icon: 'psychology',
      duration: '45 mins',
      date: 'Available Now',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'Cheat Sheet',
      title: 'Dynamic Programming Patterns',
      description: 'Download our comprehensive guide to identifying and solving 1D and 2D DP problems.',
      icon: 'data_object',
      duration: 'PDF',
      date: 'Updated Weekly',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'Workshop',
      title: 'Frontend Performance Optimization',
      description: 'Live coding session focusing on React rendering, memory leaks, and web vitals.',
      icon: 'speed',
      duration: '90 mins',
      date: 'May 18, 2026',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'Mock Recording',
      title: 'Senior iOS Developer Interview',
      description: 'Watch a recorded mock interview between an Apple engineer and a senior candidate.',
      icon: 'phone_iphone',
      duration: '60 mins',
      date: 'Available Now',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800'
    },
    {
      category: 'Masterclass',
      title: 'Negotiating Your Salary',
      description: 'Expert tips on how to handle the offer stage and maximize your compensation package.',
      icon: 'payments',
      duration: '30 mins',
      date: 'Available Now',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F2EF] antialiased">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-[#0A2156] tracking-tight mb-4">
            Learning Resources
          </h1>
          <p className="text-lg text-slate-600 font-body leading-relaxed">
            Elevate your skills with our curated collection of enterprise-grade workshops, expert masterclasses, and comprehensive technical guides.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {['All Resources', 'Workshops', 'Masterclasses', 'Cheat Sheets', 'Recordings'].map((filter, i) => (
            <button key={filter} className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${i === 0 ? 'bg-primary text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow group flex flex-col cursor-pointer">
              <div className="h-48 relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-headline font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mb-6 flex-grow leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                    {item.duration}
                  </div>
                  <div>{item.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

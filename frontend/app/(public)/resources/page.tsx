'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { resourceApi } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/app/components/ui/Button';

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await resourceApi.getAll();
      setResources(data);
    } catch (e) {
      console.error('Failed to load resources:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: number) => {
    if (!isAuthenticated) {
      alert('Please sign in to like resources');
      return;
    }
    try {
      await resourceApi.like(id, token!);
      setResources(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDislike = async (id: number) => {
    if (!isAuthenticated) {
      alert('Please sign in to dislike resources');
      return;
    }
    try {
      await resourceApi.dislike(id, token!);
      setResources(prev => prev.map(r => r.id === id ? { ...r, dislikes: r.dislikes + 1 } : r));
    } catch (e) {
      console.error(e);
    }
  };

  const filters = ['All', 'Workshop', 'Masterclass', 'Cheatsheet', 'Recording'];
  const filteredResources = activeFilter === 'All' 
    ? resources 
    : resources.filter(r => r.type === activeFilter.toUpperCase());

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F2EF]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F2EF] antialiased">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-[#0A2156] tracking-tight mb-4">
            Learning Resources
          </h1>
          <p className="text-lg text-slate-600 font-body leading-relaxed">
            Elevate your skills with our curated collection of enterprise-grade workshops, expert masterclasses, and comprehensive technical guides created by industry mentors.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button 
              key={filter} 
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeFilter === filter 
                ? 'bg-primary text-white shadow-md scale-105' 
                : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/30 hover:text-primary'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Resource Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <div className="h-52 relative overflow-hidden">
                  <img 
                    src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-primary text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      {item.type}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-primary border border-slate-200">
                      {item.mentor.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{item.mentor.name}</span>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 flex-grow leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleLike(item.id)}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">thumb_up</span>
                        <span className="text-xs font-bold">{item.likes}</span>
                      </button>
                      <button 
                        onClick={() => handleDislike(item.id)}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">thumb_down</span>
                        <span className="text-xs font-bold">{item.dislikes}</span>
                      </button>
                    </div>
                    <Link href={item.contentUrl || '#'} target="_blank">
                      <Button variant="ghost" size="sm" className="font-bold">
                        {item.type === 'CHEATSHEET' ? 'Download' : 'Watch Now'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">folder_open</span>
            <p className="text-slate-500 font-medium">No resources found in this category yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}

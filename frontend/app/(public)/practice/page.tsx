import React from 'react';
import Link from 'next/link';

export default function PracticeDashboard() {
  const practiceModes = [
    {
      id: 'system-design',
      title: 'System Design Mock',
      description: 'Practice architecting scalable systems with an AI staff engineer. Includes virtual whiteboard and live feedback.',
      icon: 'architecture',
      difficulty: 'Hard',
      color: 'bg-blue-50 text-blue-700 ring-blue-500/20'
    },
    {
      id: 'algorithms',
      title: 'Data Structures & Algo',
      description: 'Solve complex algorithmic problems with hints, time complexity analysis, and real-time code execution.',
      icon: 'data_object',
      difficulty: 'Medium',
      color: 'bg-purple-50 text-purple-700 ring-purple-500/20'
    },
    {
      id: 'frontend',
      title: 'Frontend Architecture',
      description: 'Build UI components and discuss React performance optimization, state management, and web vitals.',
      icon: 'web',
      difficulty: 'Medium',
      color: 'bg-orange-50 text-orange-700 ring-orange-500/20'
    },
    {
      id: 'behavioral',
      title: 'Behavioral & Leadership',
      description: 'Hone your STAR method responses with our empathetic AI hiring manager.',
      icon: 'psychology',
      difficulty: 'Easy',
      color: 'bg-emerald-50 text-emerald-700 ring-emerald-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F3F2EF] antialiased">
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-[#0A2156] tracking-tight mb-4">
            AI Practice Sessions
          </h1>
          <p className="text-lg text-slate-600 font-body leading-relaxed">
            Sharpen your skills in a high-fidelity enterprise interview environment. Select a track below to start a live session with your AI coach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceModes.map((mode) => (
            <div key={mode.id} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all group flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 rounded-xl ring-1 shadow-sm ${mode.color}`}>
                  <span className="material-symbols-outlined text-3xl block">{mode.icon}</span>
                </div>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-md border border-slate-200">
                  {mode.difficulty}
                </span>
              </div>
              
              <h3 className="text-2xl font-headline font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                {mode.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                {mode.description}
              </p>
              
              <Link href="/practice/session" className="inline-flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-primary text-white rounded-xl font-medium text-sm transition-colors shadow-sm">
                <span className="material-symbols-outlined text-lg">play_arrow</span>
                Start AI Session
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

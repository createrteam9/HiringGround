import React from 'react';
import Link from 'next/link';

export default function PracticeSessionRoom() {
  return (
    <div className="h-[calc(100vh-64px)] w-full bg-[#F3F2EF] text-[#0A2156] overflow-hidden selection:bg-primary/30 flex flex-col font-body antialiased">
      {/* Top Session Bar */}
      <header className="h-14 w-full bg-white/80 backdrop-blur-md flex items-center justify-between px-6 z-50 border-b border-slate-200 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/practice" className="flex items-center justify-center p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors">
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </Link>
          <div className="h-5 w-px bg-slate-200"></div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-900">System Design Architecture Mock</span>
            <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold uppercase tracking-wider">Active Session</span>
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <span className="material-symbols-outlined text-primary text-sm animate-pulse">radio_button_checked</span>
          <span className="font-mono text-base font-bold text-slate-700 tracking-widest">38:24</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <img className="w-5 h-5 rounded-full object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100"/>
            <span className="text-xs font-medium text-slate-500">AI Coach: <span className="text-slate-900 font-bold">Priya</span></span>
          </div>
          <Link href="/practice" className="px-4 py-1.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors text-xs font-bold rounded-lg shadow-sm">
            End Session
          </Link>
        </div>
      </header>

      {/* Main 2-Column Layout */}
      <main className="flex flex-grow w-full overflow-hidden p-4 gap-4">
        
        {/* LEFT COLUMN: Communication */}
        <section className="w-[35%] flex flex-col gap-4">
          {/* AI Coach Video Panel */}
          <div className="relative flex-grow-[6] rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-slate-200 group">
            <img className="w-full h-full object-cover opacity-90" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"/>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg shadow-sm">
              <span className="text-xs font-bold text-slate-900">Priya (AI Staff Engineer)</span>
            </div>
            <div className="absolute bottom-4 right-4 p-2 bg-primary/90 backdrop-blur rounded-full shadow-lg">
              <span className="material-symbols-outlined text-white text-lg">mic</span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse"></span>
            </div>
          </div>

          {/* User Video Panel */}
          <div className="relative flex-grow-[4] rounded-2xl overflow-hidden bg-slate-800 shadow-sm border border-slate-200">
            <img className="w-full h-full object-cover opacity-90" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=800"/>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-lg shadow-sm">
              <span className="text-xs font-bold text-slate-900">You</span>
            </div>
            <div className="absolute bottom-4 right-4 p-2 bg-red-500/90 backdrop-blur rounded-full shadow-lg">
              <span className="material-symbols-outlined text-white text-lg">mic_off</span>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Workspace */}
        <section className="w-[65%] flex flex-col gap-4">
          
          {/* Whiteboard / Code Area */}
          <div className="flex-grow flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md">
            {/* Toolbar */}
            <div className="h-12 flex items-center justify-between px-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-1">
                <button className="px-4 h-12 text-xs font-bold text-primary border-b-2 border-primary bg-white">Whiteboard.excal</button>
                <button className="px-4 h-12 text-xs font-medium text-slate-500 hover:bg-slate-100 transition-colors">Schema.sql</button>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-1.5 rounded text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors" title="Zoom In"><span className="material-symbols-outlined text-sm">zoom_in</span></button>
                <button className="p-1.5 rounded text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors" title="Zoom Out"><span className="material-symbols-outlined text-sm">zoom_out</span></button>
                <div className="h-4 w-px bg-slate-300 mx-1"></div>
                <button className="bg-primary text-white font-bold text-xs px-4 py-1.5 rounded-lg hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-sm">share</span>
                  Share Canvas
                </button>
              </div>
            </div>

            {/* Canvas Area Placeholder */}
            <div className="flex-grow relative bg-[#F8F9FA] overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
              
              {/* Mock System Design Diagram */}
              <div className="relative z-10 p-6 bg-white border-2 border-blue-200 rounded-xl shadow-lg flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-4xl text-blue-500">dns</span>
                <span className="font-mono text-sm font-bold text-slate-700">API Gateway</span>
              </div>
              
              <svg className="absolute w-full h-full pointer-events-none z-0">
                {/* Arrow pointing right */}
                <path d="M 400 250 L 550 250" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="5,5" fill="none" />
              </svg>

              <div className="absolute right-32 z-10 p-6 bg-white border-2 border-emerald-200 rounded-xl shadow-lg flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-4xl text-emerald-500">database</span>
                <span className="font-mono text-sm font-bold text-slate-700">Primary DB</span>
              </div>
            </div>
          </div>

          {/* Transcript / AI Feedback Panel */}
          <div className="h-1/3 bg-white rounded-2xl flex flex-col overflow-hidden border border-slate-200 shadow-md">
            <div className="flex border-b border-slate-200 bg-slate-50">
              <button className="px-6 py-3 text-xs font-bold text-primary border-b-2 border-primary bg-white">Live Transcript</button>
              <button className="px-6 py-3 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">AI Feedback</button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 w-12 pt-1 shrink-0">12:04</span>
                <p className="text-sm text-slate-700 italic leading-relaxed">"Can you explain why you chose a relational database here instead of a NoSQL solution given the read-heavy requirements you just mentioned?"</p>
              </div>
              <div className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 w-12 pt-1 shrink-0">12:12</span>
                <p className="text-sm text-slate-900 leading-relaxed font-medium">"I decided to use PostgreSQL because we need strong ACID compliance for the transaction ledgers. We can handle the read-heavy load by introducing a Redis caching layer in front of it."</p>
              </div>
              <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 w-12 pt-1 shrink-0">12:18</span>
                <div className="flex gap-2 items-center text-slate-500 text-sm">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse"></span>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse delay-75"></span>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse delay-150"></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Controls Overlay */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-white/90 backdrop-blur-xl rounded-full p-2 border border-slate-200 shadow-2xl">
        <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
          <button className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all" title="Toggle Mic">
            <span className="material-symbols-outlined">mic_off</span>
          </button>
          <button className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md" title="Toggle Camera">
            <span className="material-symbols-outlined">videocam</span>
          </button>
          <button className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all" title="Share Screen">
            <span className="material-symbols-outlined">screen_share</span>
          </button>
        </div>
        <div className="flex items-center gap-3 pl-4">
          <button className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 font-bold text-xs flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-sm">psychology</span>
            Hint
          </button>
          <button className="bg-primary text-white font-bold text-xs px-6 py-2.5 rounded-full flex items-center gap-2 hover:opacity-90 transition-all shadow-md">
            Next Scenario
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

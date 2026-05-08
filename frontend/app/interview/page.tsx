import React from 'react';

export default function InterviewRoom() {
  return (
    <div className="h-screen w-full bg-[#FAFAFA] text-[#0A2156] overflow-hidden selection:bg-primary/30">
      {/* Top Session Bar (48px) */}
      <header className="h-12 w-full bg-surface-container-lowest flex items-center justify-between px-4 z-50 border-b border-black/[0.05]">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold tracking-tighter text-on-surface font-headline">InterviewSanctuary</span>
          <div className="h-4 w-[1px] bg-black/10"></div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-on-surface/80">Mock Interview — System Design Round</span>
            <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wider">Technical</span>
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="material-symbols-outlined text-on-primary-container text-sm" style={{fontVariationSettings: "'FILL' 1"}}>timer</span>
          <span className="font-mono text-lg font-medium text-on-surface tracking-widest">38:24</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-black/5 px-3 py-1 rounded-full">
            <img className="w-5 h-5 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_lgp2QqjTlOZLu54gA126ZUoxtoHtEy-Goeml5YJmkDnoyveAln4Y0afiZqP0c3zUno6DBrziDtPBZOsFq-gn9r88hmPY_nA9xyjfs7ivMpJccI9K9bt9ooByza8rC_1p5ttgCjl5rN0GfWpV9BIUNJT7IxpvgZd4o4kkvVQ7ktX6C8lJMxEPyyh12MTwpr4TZQeGcGQ6Ads0ND7WA1IBqoGNHeL59iSPpcFLiTsGl1MipBKKrLihjJb_xgEhuWAf8veZNAM3eAwH"/>
            <span className="text-xs font-medium text-on-surface/70">with <span className="text-on-surface font-bold">Priya Sharma · Google</span></span>
          </div>
          <button className="px-4 py-1 border border-error/50 text-error hover:bg-error/5 transition-colors text-xs font-semibold rounded-lg">End Session</button>
        </div>
      </header>

      {/* Main 2-Column Layout */}
      <main className="flex h-[calc(100vh-48px-80px)] w-full overflow-hidden">
        {/* LEFT COLUMN: Communication (40%) */}
        <section className="w-[40%] flex flex-col p-4 gap-4 bg-surface">
          {/* Mentor Video Panel (55%) */}
          <div className="relative flex-grow-[55] basis-0 rounded-2xl overflow-hidden bg-surface-container-low group speaking-glow transition-all duration-500 shadow-sm border border-black/5">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnL9V-LR53INmZEk3fXse5o4z1rtkhBIB40pfUgoYpr_Oy_IWvfvyg3J9srnUbdLycfSnm-bi32lxpOTjHBL2qLmJO8kaCezXUgVqvQ-6bLfP9zPWJ4jwQg5QA2hqc7KcbjwUUYndImpSYldJNjVPgKpsn4GjyvzZZezltEF8zz_0z7k9HvcFRw3NcMD7-6FH02aF0OwK7D3nl7p4OLu9RM_IdpoWgS3T_7ufwTnHFyigE5u7uv4va7dEw-Df-L09VK-qX1MmBnCXq"/>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-lg shadow-sm border border-black/5">
              <span className="text-xs font-bold text-on-surface">Priya Sharma</span>
            </div>
            <div className="absolute bottom-4 right-4 p-2 bg-primary rounded-full shadow-lg">
              <span className="material-symbols-outlined text-white text-lg" style={{fontVariationSettings: "'FILL' 1"}}>mic</span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            </div>
          </div>

          {/* Student Video Panel (45%) */}
          <div className="relative flex-grow-[45] basis-0 rounded-2xl overflow-hidden bg-surface-container-low border border-black/5 shadow-sm">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaKdL-55hY9qO0xzuAGtMv_4ZX0-9dYUMMc7YbSl-e49rHGn5171aEKO2ZM3PdMjLQzb-xFRKut3JxNwvZl_ECitUHKJTPzjAOEfxmj-ArXshOOrrX8PewGuCWdT7yhXf9iFd4kDXRY-HO7jIxTovVgaq6Chue2lUvy38i1ql2NKW0-c4yKIzT6TI7hkxkqxHbFoXNFGX6bYwhr0Uj6L6JUZ4oggSeJKzHYaOiAgmymGxDkRp4yAYPu2T-pg_zIGfpviCQagipy2pv"/>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-white/70 backdrop-blur-md rounded-lg shadow-sm border border-black/5">
              <span className="text-xs font-bold text-on-surface">You</span>
            </div>
            <div className="absolute bottom-4 right-4 p-2 bg-error rounded-full shadow-lg">
              <span className="material-symbols-outlined text-white text-lg">mic_off</span>
            </div>
          </div>

          {/* Session Info Strip */}
          <div className="flex items-center justify-between px-6 py-3 bg-white/60 backdrop-blur-md rounded-xl border border-black/[0.05] shadow-sm">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Round</span>
              <span className="text-xs font-bold text-on-surface">System Design</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Questions</span>
              <span className="text-xs font-bold text-on-surface">2/4</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Difficulty</span>
              <span className="text-xs font-extrabold text-error">Hard</span>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Work (60%) */}
        <section className="w-[60%] flex flex-col p-4 pl-0 gap-4">
          {/* Code Editor (65%) */}
          <div className="flex-grow-[65] basis-0 flex flex-col rounded-2xl overflow-hidden bg-white border border-black/5 shadow-xl">
            {/* Editor Header */}
            <div className="h-10 flex items-center justify-between px-4 bg-[#F6F8FA] border-b border-black/5">
              <div className="flex items-center gap-px">
                <div className="flex items-center gap-2 px-4 h-10 bg-white border-t-2 border-primary">
                  <span className="text-xs font-bold text-on-surface">solution.py</span>
                </div>
                <div className="flex items-center gap-2 px-4 h-10 hover:bg-black/5 cursor-pointer">
                  <span className="text-xs font-medium text-secondary">requirements.txt</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-black/5 px-2 py-1 rounded">
                  <span className="text-[10px] font-mono text-secondary">Python 3.10</span>
                  <span className="material-symbols-outlined text-xs text-secondary">expand_more</span>
                </div>
                <button className="bg-primary text-white font-bold text-xs px-4 py-1.5 rounded-lg hover:brightness-95 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  Run Code
                </button>
              </div>
            </div>

            {/* Code Area */}
            <div className="flex-grow flex font-mono text-sm overflow-hidden bg-white">
              <div className="w-12 bg-[#F6F8FA] text-right pr-3 py-4 text-secondary/40 select-none border-r border-black/5">
                1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12
              </div>
              <div className="flex-grow p-4 overflow-y-auto text-on-surface leading-relaxed">
                <span className="text-[#D73A49]">class</span> <span className="text-[#005CC5]">LRUCache</span>:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#D73A49]">def</span> <span className="text-[#6F42C1]">__init__</span>(self, capacity: int):<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.cap = capacity<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.cache = OrderedDict()<br/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#D73A49]">def</span> <span className="text-[#6F42C1]">get</span>(self, key: int) -&gt; int:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#D73A49]">if</span> key <span className="text-[#D73A49]">not in</span> self.cache:<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#D73A49]">return</span> -1<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.cache.move_to_end(key)<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#D73A49]">return</span> self.cache[key]
              </div>
            </div>

            {/* Editor Footer */}
            <div className="h-8 bg-[#F6F8FA] flex items-center justify-between px-4 text-[10px] text-secondary border-t border-black/5">
              <div className="flex items-center gap-4 font-mono">
                <span>Ln 12, Col 24</span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                <span>Auto-save on</span>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="h-10 bg-white border border-black/5 rounded-xl flex items-center px-4 justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">terminal</span>
              <span className="text-xs font-semibold text-secondary">Console Output</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <span className="text-on-surface/60">Runtime: <span className="text-on-surface font-bold">42ms</span></span>
              <span className="text-on-surface/60">Memory: <span className="text-on-surface font-bold">16.3 MB</span></span>
            </div>
          </div>

          {/* Tabbed Panel (35%) */}
          <div className="flex-grow-[35] basis-0 bg-white rounded-2xl flex flex-col overflow-hidden border border-black/5 shadow-sm">
            <div className="flex border-b border-black/5 bg-[#F8FAFF]">
              <button className="px-6 py-3 text-xs font-bold text-on-surface border-b-2 border-primary">Live Transcript</button>
              <button className="px-6 py-3 text-xs font-bold text-secondary hover:text-on-surface transition-colors">AI Suggestions</button>
              <button className="px-6 py-3 text-xs font-bold text-secondary hover:text-on-surface transition-colors">Notes</button>
            </div>
            <div className="flex-grow p-5 overflow-y-auto space-y-3">
              <div className="flex gap-4 p-3 bg-tertiary-container rounded-lg">
                <span className="text-[10px] font-bold text-on-surface/40 w-12 pt-1 shrink-0">12:04</span>
                <p className="text-sm text-on-surface italic leading-relaxed">"Can you explain why you chose an OrderedDict for this specific implementation? What are the trade-offs?"</p>
              </div>
              <div className="flex gap-4 p-3 bg-white border border-black/5 rounded-lg">
                <span className="text-[10px] font-bold text-on-surface/30 w-12 pt-1 shrink-0">12:12</span>
                <p className="text-sm text-on-surface leading-relaxed">"Using an OrderedDict allows us to maintain the insertion order of keys while providing O(1) average time complexity for lookups and deletions..."</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Floating Control Bar */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-12 items-center bg-primary-container/80 backdrop-blur-2xl rounded-full px-12 py-3 border border-white/40 shadow-2xl">
        {/* Left: Toggles */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white hover:brightness-95 shadow-sm transition-all">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>mic</span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/60 text-on-surface/80 hover:bg-white transition-all shadow-sm">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>videocam</span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/60 text-on-surface/80 hover:bg-white transition-all shadow-sm">
            <span className="material-symbols-outlined">screen_share</span>
          </button>
        </div>

        {/* Center: AI & Status */}
        <div className="flex items-center gap-8">
          <button className="px-6 py-2 border border-black/5 bg-white/40 rounded-full text-on-surface font-bold text-xs flex items-center gap-2 hover:bg-white transition-all shadow-sm">
            <span className="material-symbols-outlined text-sm">psychology</span>
            Ask AI Coach
          </button>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest">Question 2 of 4</span>
            <button className="bg-primary text-white font-bold text-xs px-5 py-2 rounded-full flex items-center gap-2 hover:brightness-95 transition-all shadow-md">
              Next Question
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center text-on-surface/40 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">chat</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-on-surface/40 hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="ml-4 bg-error text-white font-bold text-xs px-6 py-2.5 rounded-full hover:brightness-90 transition-all shadow-lg shadow-error/10 uppercase tracking-wider">
            End Session
          </button>
        </div>
      </nav>
    </div>
  );
}

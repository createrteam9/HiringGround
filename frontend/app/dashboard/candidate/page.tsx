import React from 'react';

export default function CandidateDashboard() {
  return (
    <main className="min-h-screen p-8 lg:p-12 selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Header */}
      <header className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-headline font-extrabold tracking-tighter text-[#0A2156] mb-2">Welcome back, Alex.</h1>
          <p className="text-on-surface-variant font-medium">Your next interview is in <span className="text-primary font-bold">2 days</span>. You're 85% prepared.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-3 bg-surface-container-lowest rounded-full shadow-sm hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
          </button>
          <div className="h-10 w-[1px] bg-slate-200 mx-2"></div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sovereign AI Score</p>
            <p className="text-xl font-headline font-extrabold text-[#0A2156]">782 <span className="text-xs text-primary font-bold">/ 1000</span></p>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Upcoming Interviews (Span 8) */}
        <section className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-headline font-bold text-[#0A2156]">Upcoming Sessions</h2>
            <a className="text-xs font-bold text-primary hover:underline" href="#">View Schedule</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Session Card 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all group border-l-4 border-primary">
              <div className="flex justify-between mb-4">
                <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-[10px] font-bold uppercase tracking-wider">Technical Deep Dive</span>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">more_vert</span>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <img alt="Sarah Chen" className="w-12 h-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfJHTxSOdpXT1NoqGDbvlxlXRZGQvm8bkO0UXsrZ1kyNx-uvAd0xzDrTfnGHXKhb0TyZuUn0kXA1cGitUgplq-R00T_I7-X8DBSkdRD1UiVRHDwQg6f2ISYtts_rJ0jofWUFhaee68dJBgwttusS_urFzwGMqRCkytv3WqKzb7F6Fz4Es4vVb2MO4O8ZrgNyBaegCCOeRkYwEVWosyA4hwDYKTJTIforRKyplDCiya8MBHoZQtSUXEfIeGTUypPxo9Wix7fFYFY60m"/>
                <div>
                  <h3 className="font-bold text-[#0A2156]">Sarah Chen</h3>
                  <p className="text-xs text-on-surface-variant">Lead Engineer at Google</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-50">
                <div className="flex items-center space-x-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">event</span>
                  <span>Oct 24, 2024</span>
                </div>
                <div className="flex items-center space-x-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>14:00 GMT</span>
                </div>
              </div>
            </div>

            {/* Session Card 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between mb-4">
                <span className="px-3 py-1 bg-surface-container-low text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider">Culture Fit</span>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">more_vert</span>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-fixed">smart_toy</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#0A2156]">Sovereign AI</h3>
                  <p className="text-xs text-on-surface-variant">Automated Simulation</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-50">
                <div className="flex items-center space-x-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">event</span>
                  <span>Oct 26, 2024</span>
                </div>
                <div className="flex items-center space-x-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span>09:30 GMT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Past Sessions History */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm">
            <h3 className="text-lg font-headline font-bold text-[#0A2156] mb-6">Session History</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 group border-b border-slate-50 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F0F3FA] flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">code</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0A2156]">System Design Architecture</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Completed with David Miller</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-xs font-bold text-primary">High Accuracy</p>
                    <p className="text-[10px] text-slate-400">Oct 18</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary">chevron_right</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 group border-b border-slate-50 last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F0F3FA] flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">psychology</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0A2156]">Behavioral Frameworks</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Completed with Sovereign AI</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-xs font-bold text-tertiary">Action Required</p>
                    <p className="text-[10px] text-slate-400">Oct 15</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary">chevron_right</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F0F3FA] flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">terminal</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0A2156]">Leetcode Hard: Dynamic Programming</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Completed with Sarah Chen</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-xs font-bold text-primary">Exceptional</p>
                    <p className="text-[10px] text-slate-400">Oct 12</p>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 group-hover:text-primary">chevron_right</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar Panels (Span 4) */}
        <aside className="col-span-12 lg:col-span-4 space-y-6">
          {/* Progress Visualization */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-headline font-bold text-[#0A2156] mb-6">Preparation Velocity</h3>
              <div className="flex items-end justify-between h-32 space-x-2 mb-4">
                <div className="w-full bg-slate-100 rounded-t-lg h-[40%]"></div>
                <div className="w-full bg-slate-100 rounded-t-lg h-[55%]"></div>
                <div className="w-full bg-primary-container rounded-t-lg h-[85%]"></div>
                <div className="w-full bg-primary-container rounded-t-lg h-[70%]"></div>
                <div className="w-full bg-primary rounded-t-lg h-[95%]"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-fixed/20 blur-3xl rounded-full"></div>
          </div>

          {/* AI Recommendation Panel */}
          <div className="bg-[#F0F3FA] p-8 rounded-2xl border border-white/50 shadow-inner">
            <div className="flex items-center space-x-2 mb-6">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>auto_awesome</span>
              <h3 className="text-sm font-bold text-[#0A2156] uppercase tracking-wide">AI Recommendations</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/60 backdrop-blur-md rounded-xl border border-white">
                <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-tighter">Skill Focus</p>
                <h4 className="text-sm font-bold text-[#0A2156] mb-2">Refine Low-Latency Design</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-3">Your last session showed minor delays in explaining database sharding. Review the system design module.</p>
                <a className="text-xs font-bold text-primary flex items-center" href="#">
                  Start Module <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                </a>
              </div>
              <div className="p-4 bg-white/60 backdrop-blur-md rounded-xl border border-white">
                <p className="text-[10px] font-bold text-tertiary mb-1 uppercase tracking-tighter">Communication</p>
                <h4 className="text-sm font-bold text-[#0A2156] mb-2">Structural Answer Framing</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">Practice the STAR method for behavioral questions. Your clarity index is currently 72%.</p>
              </div>
            </div>
          </div>

          {/* Latest Feedback Summary */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-slate-50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-[#0A2156] uppercase tracking-wide">Latest Feedback</h3>
              <span className="text-xs font-bold text-slate-400">Oct 18</span>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-r-slate-100 flex items-center justify-center">
                <span className="text-xs font-extrabold text-[#0A2156]">75%</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#0A2156]">Cognitive Depth</p>
                <p className="text-[10px] text-slate-500">Above average for Tier-1 Candidates</p>
              </div>
            </div>
            <div className="p-4 bg-tertiary-container/30 rounded-xl text-xs text-on-tertiary-container italic leading-relaxed">
              "Alex exhibits strong analytical fundamentals. Future sessions should push on edge-case handling in distributed environments."
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

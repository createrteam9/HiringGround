import React from 'react';
import Footer from '@/app/components/layout/Footer';

export default function MentorProfile({ params }: { params: { id: string } }) {
  return (
    <>
      <main className="pb-16 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Profile Bio & Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Profile Header */}
            <section className="bg-white/55 backdrop-blur-xl shadow-sm top-24 sticky flex flex-col md:flex-row gap-8 items-start">
              <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                <img className="w-full h-full object-cover rounded-xl shadow-lg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeHE4ZJ0CCFdyFhjnYvDmcq6VTrndA_4SFWOqIvMSbfHy6UskVG8iFmA00naVA8LwjOj59_qqbP5Ani_V7Q7-nDHMzgkvRKI9U1z8wGwbHHgP4uId9Ue1UDlqGzZbVSfFyu2gFH8BAZYSsuhqzLE4G-hhmr2xxnLqC14oduS_CoOJop5kMG4TEgarIkSoLJfT1iUlgtGNxPJM2CenFQRaRTnGaal_MNm452ygPuKbBNqDuPCec4kLKQvW8FEeUJM7puj_APqQd3eSZ" />
                <div className="absolute -bottom-2 -right-2 bg-primary-container text-on-primary-container p-1.5 rounded-lg shadow-sm border-2 border-white">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-4xl font-extrabold tracking-tighter text-[#0A2156] font-headline">Sovereign AI</h1>
                  <span className="bg-tertiary-container/30 text-[#5b4834] px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">Technical Lead & AI Specialist</span>
                </div>
                <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  Pioneering clarity in technical interviews. I specialize in helping senior candidates navigate complex architectural discussions and AI-driven systems design.
                </p>
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#465C97] text-lg" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-bold text-[#0A2156]">4.9</span>
                    <span className="text-slate-400 text-sm">(124 sessions)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#465C97] text-lg">schedule</span>
                    <span className="text-slate-600 text-sm">Response time: 2hrs</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Experience */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight text-[#0A2156] font-headline">About the Mentor</h2>
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm space-y-6">
                <p className="text-[#666] leading-7">
                  With over 12 years of experience at top-tier tech firms (including Google and Anthropic), Sovereign AI brings a unique perspective to the interview process. The focus isn't just on getting the "right" answer, but on articulating thought processes and demonstrating technical leadership under pressure.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4 p-4 rounded-lg bg-surface-container-low transition-transform hover:translate-x-1">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                    <div>
                      <h4 className="font-bold text-[#0A2156] text-sm">Systems Design</h4>
                      <p className="text-xs text-slate-500">Mastering distributed systems and scale-ready architecture.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-lg bg-surface-container-low transition-transform hover:translate-x-1">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                    <div>
                      <h4 className="font-bold text-[#0A2156] text-sm">Behavioral Mastery</h4>
                      <p className="text-xs text-slate-500">Navigating high-stakes leadership and conflict resolutions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-[#0A2156] font-headline">Core Expertise</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-white text-[#465C97] text-sm font-medium rounded-full shadow-sm">Distributed Systems</span>
                <span className="px-4 py-2 bg-white text-[#465C97] text-sm font-medium rounded-full shadow-sm">LLM Fine-Tuning</span>
                <span className="px-4 py-2 bg-white text-[#465C97] text-sm font-medium rounded-full shadow-sm">Leadership Framing</span>
                <span className="px-4 py-2 bg-white text-[#465C97] text-sm font-medium rounded-full shadow-sm">Golang</span>
                <span className="px-4 py-2 bg-white text-[#465C97] text-sm font-medium rounded-full shadow-sm">Kubernetes</span>
                <span className="px-4 py-2 bg-white text-[#465C97] text-sm font-medium rounded-full shadow-sm">Machine Learning Ops</span>
              </div>
            </section>

            {/* Reviews */}
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-2xl font-bold tracking-tight text-[#0A2156] font-headline">Candidate Feedback</h2>
                <button className="text-primary text-sm font-bold hover:underline">View all 124 reviews</button>
              </div>
              <div className="space-y-4">
                <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-tertiary shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200">
                      <img className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuBOxRZa20iTYbXJ3Kd1wQdFICUvDXjMaXy8ohmeDZ0cI_F_mQ6KNBQMvt793wEi7rMyF8ooAXRWnoFI0s7CHjNg1zeofjuiO2VpD2pcOd8n9k33gYfdmzGLFqiBUm00hhnHjNFIFZEMbF6ydxlKTaaNORTzo9HaxQqLeDqdIzcmmUJXOfUXXgOIXt4DmC_viWA1XCwdEQmkqUNcoCsDUzdxL0fOw3fWK3QCt6vES0bEjCnJ4ufzYCKO0VxY1v_xfjc4aNDOReIuY7" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0A2156]">Alex R.</div>
                      <div className="flex text-xs text-primary">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic">"The session on distributed systems was a game-changer. Sovereign helped me simplify complex concepts that I used to struggle with during interviews. I landed my Staff role at a FinTech firm a week later!"</p>
                </div>
                <div className="bg-surface-container-lowest p-6 rounded-xl border-l-4 border-primary-container shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200">
                      <img className="w-full h-full object-cover rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiT4NG3ygTywN46HoEmiAEYW8TTrCYpGYzPM0r0ChNki_mkJs3o2VjXmpMRE7tmIHs6UgxW3xZRnRrDIfZkx-H5Q0fqgTVeTfyBDi0IeVnxPkDhrm6nz5HunmCCIhB8cpuHmmhyniWYR4S4FF8zIyVLqYFbOa6-vmaAk4p8Wtsxcr6YpSK4YT4Y15m_nWGgC9F5HuKSRQjsVqjVdn1J_2TbXm8Yb6F9H4ygJ4ldb-8210hOQ0SloeDK7Ke8LzUvb_GqsS0V7j6fc1q" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#0A2156]">Sarah J.</div>
                      <div className="flex text-xs text-primary">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                        <span className="material-symbols-outlined text-[14px]" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 italic">"Very clinical yet supportive. Sovereign doesn't just give feedback; they provide an editorial framework for how to present your best self. Highly recommended for senior transitions."</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Booking & Availability */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className="bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden p-6 border border-slate-100/50">
                <h3 className="text-xl font-bold text-[#0A2156] font-headline mb-6">Select Your Session</h3>

                {/* Availability Calendar Visualizer */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">October 2024</span>
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-slate-100 rounded-md transition-colors"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                      <button className="p-1 hover:bg-slate-100 rounded-md transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    <button className="h-8 flex items-center justify-center text-xs rounded-full text-slate-300 cursor-not-allowed">14</button>
                    <button className="h-8 flex items-center justify-center text-xs rounded-full text-slate-300 cursor-not-allowed">15</button>
                    <button className="h-8 flex items-center justify-center text-xs rounded-full hover:bg-slate-100 transition-colors">16</button>
                    <button className="h-8 flex items-center justify-center text-xs rounded-full bg-primary text-white font-bold shadow-md">17</button>
                    <button className="h-8 flex items-center justify-center text-xs rounded-full hover:bg-slate-100 transition-colors">18</button>
                    <button className="h-8 flex items-center justify-center text-xs rounded-full hover:bg-slate-100 transition-colors">19</button>
                    <button className="h-8 flex items-center justify-center text-xs rounded-full hover:bg-slate-100 transition-colors">20</button>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-3 mb-8">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Available Slots (PT)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 text-xs font-medium rounded-lg border border-slate-200 hover:border-primary hover:text-primary transition-all text-center">09:00 AM</button>
                    <button className="py-2 text-xs font-medium rounded-lg bg-primary-fixed text-primary border border-transparent text-center font-bold">11:30 AM</button>
                    <button className="py-2 text-xs font-medium rounded-lg border border-slate-200 hover:border-primary hover:text-primary transition-all text-center">02:00 PM</button>
                    <button className="py-2 text-xs font-medium rounded-lg border border-slate-200 hover:border-primary hover:text-primary transition-all text-center">04:30 PM</button>
                  </div>
                </div>

                {/* Session Types */}
                <div className="space-y-4 mb-8">
                  <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between border-2 border-primary-container/20">
                    <div>
                      <div className="text-sm font-bold text-[#0A2156]">Mock Simulation</div>
                      <div className="text-[11px] text-slate-500">60 mins • Technical Focus</div>
                    </div>
                    <div className="text-sm font-bold text-primary">$180</div>
                  </div>
                  <div className="p-3 hover:bg-surface-container-low rounded-xl flex items-center justify-between transition-colors cursor-pointer group">
                    <div>
                      <div className="text-sm font-bold text-slate-600 group-hover:text-[#0A2156]">Resume Deep Dive</div>
                      <div className="text-[11px] text-slate-400">30 mins • Framing Review</div>
                    </div>
                    <div className="text-sm font-bold text-slate-500">$95</div>
                  </div>
                </div>

                <button className="w-full bg-[#a5bbfc] text-[#0A2156] font-headline font-extrabold text-sm py-4 rounded-full shadow-lg hover:opacity-95 active:scale-95 transition-all">
                  Book Session
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-tighter">Secure checkout via Stripe</p>
              </div>

              {/* Trust Indicators */}
              <div className="bg-[#F3F3F3] p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                  <span className="text-sm font-bold text-[#0A2156]">Satisfaction Guarantee</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  If you aren't completely satisfied with the insights provided, we'll refund your session or book a follow-up at no cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

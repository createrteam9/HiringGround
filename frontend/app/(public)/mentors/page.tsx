import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function MentorsMarketplace() {
  return (
    <>
      <div className="flex">
        {/* Sidebar Filters */}
        <aside className="hidden lg:flex flex-col w-72 h-[calc(100vh-64px)] fixed left-0 top-16 bg-[#f3f3f3] p-8 overflow-y-auto z-40">
          <div className="mb-10">
            <h2 className="font-headline text-lg font-bold text-[#0d1a3c] mb-6">Filters</h2>

            {/* Availability */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#444650]">Availability</label>
                <span className="material-symbols-outlined text-sm text-[#444650]">keyboard_arrow_down</span>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="w-4 h-4 rounded border-[#c5c6d1] text-[#465c97] focus:ring-[#a5bbfc]" type="checkbox" />
                  <span className="text-sm text-[#1a1c1c] font-medium group-hover:text-[#465c97]">Available Today</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="w-4 h-4 rounded border-[#c5c6d1] text-[#465c97] focus:ring-[#a5bbfc]" type="checkbox" />
                  <span className="text-sm text-[#1a1c1c] font-medium group-hover:text-[#465c97]">Weekend Only</span>
                </label>
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#444650]">Price Range</label>
                <span className="material-symbols-outlined text-sm text-[#444650]">keyboard_arrow_down</span>
              </div>
              <div className="px-1">
                <input className="w-full h-1 bg-[#c5c6d1] rounded-lg appearance-none cursor-pointer accent-[#465c97]" max="2500" min="0" type="range" defaultValue="1200" />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-[#757781]">
                  <span>₹0</span>
                  <span>₹2500+</span>
                </div>
              </div>
            </div>

            {/* Experience Radio Buttons */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#444650]">Experience</label>
                <span className="material-symbols-outlined text-sm text-[#444650]">keyboard_arrow_down</span>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="w-4 h-4 border-[#c5c6d1] text-[#465c97] focus:ring-[#a5bbfc]" name="exp" type="radio" />
                  <span className="text-sm text-[#1a1c1c] font-medium group-hover:text-[#465c97] transition-colors">10+ Years</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input className="w-4 h-4 border-[#c5c6d1] text-[#465c97] focus:ring-[#a5bbfc]" name="exp" type="radio" />
                  <span className="text-sm text-[#1a1c1c] font-medium group-hover:text-[#465c97] transition-colors">5-10 Years</span>
                </label>
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#444650]">Tech Stack</label>
                <span className="material-symbols-outlined text-sm text-[#444650]">keyboard_arrow_down</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[#ffffff] text-[#444650] text-[10px] font-bold rounded border border-[#c5c6d1] uppercase">React</span>
                <span className="px-2 py-1 bg-[#ffffff] text-[#444650] text-[10px] font-bold rounded border border-[#c5c6d1] uppercase">Python</span>
                <span className="px-2 py-1 bg-[#ffffff] text-[#444650] text-[10px] font-bold rounded border border-[#c5c6d1] uppercase">Go</span>
              </div>
            </div>

            {/* Company Search */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#444650]">Company</label>
                <span className="material-symbols-outlined text-sm text-[#444650]">keyboard_arrow_down</span>
              </div>
              <div className="relative">
                <input className="w-full bg-[#ffffff] border-none rounded-xl text-sm px-4 py-3 focus:ring-2 focus:ring-[#dae2ff] outline-none placeholder:text-[#757781] transition-all" placeholder="Search Company" type="text" />
                <span className="material-symbols-outlined absolute right-3 top-3 text-[#757781] text-lg">search</span>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-[#444650]">Rating</label>
                <span className="material-symbols-outlined text-sm text-[#444650]">keyboard_arrow_down</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer">
                <span className="material-symbols-outlined text-[#FFB800] text-lg fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[#FFB800] text-lg fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[#FFB800] text-lg fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[#FFB800] text-lg fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-xs font-bold ml-1 text-[#444650]">&amp; up</span>
              </div>
            </div>
          </div>
          <button className="w-full py-4 bg-[#0d1a3c] text-white font-headline font-bold text-sm rounded-xl hover:bg-[#3a456a] transition-colors">Apply Filters</button>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-72 min-h-screen">
          {/* Sub-header Navigation */}
          <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-outline-variant px-8 py-3 flex gap-4 overflow-x-auto no-scrollbar">
            <button className="whitespace-nowrap bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">Mock Interview</button>
            <button className="whitespace-nowrap bg-white/50 border border-outline-variant text-on-surface-variant px-6 py-2 rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-all">Career Guidance</button>
            <button className="whitespace-nowrap bg-white/50 border border-outline-variant text-on-surface-variant px-6 py-2 rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-all">Stress Consulting</button>
            <button className="whitespace-nowrap bg-white/50 border border-outline-variant text-on-surface-variant px-6 py-2 rounded-full text-sm font-bold hover:border-primary hover:text-primary transition-all">Startup Discussion</button>
          </div>

          <div className="p-8 lg:p-12">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="max-w-2xl">
                <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-[#0d1a3c] mb-4">Top Mentors</h1>
                <p className="text-[#444650] text-lg leading-relaxed">Connect with top-tier AI and Engineering leaders. Specialized preparation for editorial-grade interviews.</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-xs font-bold text-[#757781] uppercase tracking-widest">128 results found</span>
                <div className="flex items-center gap-4 bg-[#eeeeee] px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-[#444650]">Sort by:</span>
                  <select className="bg-transparent border-none text-sm font-bold text-[#1a1c1c] focus:ring-0 cursor-pointer">
                    <option>Highest Rated</option>
                    <option>Price: Low to High</option>
                    <option>Experience</option>
                  </select>
                </div>
              </div>
            </header>

            {/* Mentor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {/* Mentor Card 1 */}
              <div className="glass-card rounded-3xl p-6 flex flex-col hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="relative mb-6">
                  <img alt="Arjun Mehta" className="w-full h-48 object-cover rounded-2xl shadow-sm grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1CuZSwAn1C34TglK54nsUFXeBOfYdew48ZxFUmg-z53KJ7LZfiSbj1Hlg5Vbp1IYn61FvHknUXRMAxdJyUIylB8ZouC_O6oACTiWWArDFSEewAxm0BE8ILKxvXo86jZdBjT0nbybYjbO3hAEn8V8x-krUch5WF02jaMyCaibEKEEi8xMJ58qJHU9l4X0yvXhYL1oC0tKti17w83Z5Qn9XFgNQ9ILLfUuScQqMk2rOdivqsRc1J7-HtPcJdZVvxE6QiUz5YhYD3PPj" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-[10px] font-bold text-primary tracking-tight uppercase">Verified</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="font-headline text-xl font-bold text-[#0d1a3c] mb-0.5">Arjun Mehta</h3>
                  <p className="text-sm text-[#465c97] font-semibold">Senior Architect @ Google</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="material-symbols-outlined text-[#FFB800] text-sm fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs font-bold text-[#1a1c1c]">4.9</span>
                    <span className="text-[10px] text-[#757781] ml-1 font-medium">(124 reviews)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-2.5 py-1 bg-[#f3f3f3] text-[10px] font-bold rounded-lg text-[#444650] uppercase tracking-tighter border border-[#c5c6d1]/30">System Design</span>
                  <span className="px-2.5 py-1 bg-[#f3f3f3] text-[10px] font-bold rounded-lg text-[#444650] uppercase tracking-tighter border border-[#c5c6d1]/30">Leadership</span>
                </div>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/mentors/1" className="block text-center border border-[#c5c6d1] text-[#1a1c1c] px-4 py-2.5 rounded-xl font-headline font-bold text-sm hover:bg-white transition-colors">
                      View Profile
                    </Link>
                    <button className="bg-[#0d1a3c] text-white px-4 py-2.5 rounded-xl font-headline font-bold text-sm hover:translate-y-[-2px] transition-transform">Book Now</button>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-[#757781] font-bold uppercase tracking-widest block">Starting at</span>
                    <span className="text-lg font-headline font-extrabold text-[#0d1a3c]">₹799<span className="text-xs font-normal text-[#757781]">/ session</span></span>
                  </div>
                </div>
              </div>

              {/* Mentor Card 2: Sara Williams */}
              <div className="glass-card rounded-3xl p-6 flex flex-col hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="relative mb-6">
                  <img alt="Sara Williams" className="w-full h-48 object-cover rounded-2xl shadow-sm grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBMPQ79Y6sXfbkILYkBK2vFCupwxKBdUZ14Zp_PLAji4R4UBOG99HdRWd91Bi57fvGvM04VYdL8Y4CvHt9W0_h0onjEQPTh9XO-sr58f02Il5yt1C7RPMPa6RrrlBaQ724OeHTYgm3239Xv-ognQv551acW5Y7EAeY_yVHPCQfkMH-tjcg84ZTueXIdKhCx9yK1tg8h5WZd1rBZGwmltlclOnD0m1mPSmQcGkyPSW73nu2ySUFBDPXVAgsMgAh3uoJ8TSZ5JhCS9uW" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-[10px] font-bold text-primary tracking-tight uppercase">Verified</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="font-headline text-xl font-bold text-[#0d1a3c] mb-0.5">Sara Williams</h3>
                  <p className="text-sm text-[#465c97] font-semibold">VP Engineering @ Stripe</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="material-symbols-outlined text-[#FFB800] text-sm fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs font-bold text-[#1a1c1c]">5.0</span>
                    <span className="text-[10px] text-[#757781] ml-1 font-medium">(89 reviews)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-2.5 py-1 bg-[#f3f3f3] text-[10px] font-bold rounded-lg text-[#444650] uppercase tracking-tighter border border-[#c5c6d1]/30">Frontend</span>
                  <span className="px-2.5 py-1 bg-[#f3f3f3] text-[10px] font-bold rounded-lg text-[#444650] uppercase tracking-tighter border border-[#c5c6d1]/30">Team Mgmt</span>
                </div>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/mentors/2" className="block text-center border border-[#c5c6d1] text-[#1a1c1c] px-4 py-2.5 rounded-xl font-headline font-bold text-sm hover:bg-white transition-colors">
                      View Profile
                    </Link>
                    <button className="bg-[#0d1a3c] text-white px-4 py-2.5 rounded-xl font-headline font-bold text-sm hover:translate-y-[-2px] transition-transform">Book Now</button>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-[#757781] font-bold uppercase tracking-widest block">Starting at</span>
                    <span className="text-lg font-headline font-extrabold text-[#0d1a3c]">₹1299<span className="text-xs font-normal text-[#757781]">/ session</span></span>
                  </div>
                </div>
              </div>

              {/* Mentor Card 3: Priya Kapur */}
              <div className="glass-card rounded-3xl p-6 flex flex-col hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="relative mb-6">
                  <img alt="Priya Kapur" className="w-full h-48 object-cover rounded-2xl shadow-sm grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVsnrTIr-TCeIsI_84MMG8CLEbL7s0raoiU6fTH3YiWKXCg3WoeFLvjrRmSzCTx-q17UKyCnj-OUa7dR50k35AzAhMthRGiQNxWCWmiy1ALaFaNBsp0K3x7WyxYdKO6xn_y38Odq-ngKxWE4R_J4KKyUq7mMK_tSaEfPJAo4E3dFQy4Z1DQub1K225V0fL9Bq9Qp3ngQPRTKnPLRWMb0pY6ohg7kXKdlNjRuuSLSR2kHFpZ1NaJfeSHUItDZtCJ1hFyu42SfcnccxG" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-[10px] font-bold text-primary tracking-tight uppercase">Verified</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="font-headline text-xl font-bold text-[#0d1a3c] mb-0.5">Priya Kapur</h3>
                  <p className="text-sm text-[#465c97] font-semibold">Product Lead @ Meta</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="material-symbols-outlined text-[#FFB800] text-sm fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs font-bold text-[#1a1c1c]">4.8</span>
                    <span className="text-[10px] text-[#757781] ml-1 font-medium">(210 reviews)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-2.5 py-1 bg-[#f3f3f3] text-[10px] font-bold rounded-lg text-[#444650] uppercase tracking-tighter border border-[#c5c6d1]/30">Strategy</span>
                  <span className="px-2.5 py-1 bg-[#f3f3f3] text-[10px] font-bold rounded-lg text-[#444650] uppercase tracking-tighter border border-[#c5c6d1]/30">Growth</span>
                </div>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/mentors/3" className="block text-center border border-[#c5c6d1] text-[#1a1c1c] px-4 py-2.5 rounded-xl font-headline font-bold text-sm hover:bg-white transition-colors">
                      View Profile
                    </Link>
                    <button className="bg-[#0d1a3c] text-white px-4 py-2.5 rounded-xl font-headline font-bold text-sm hover:translate-y-[-2px] transition-transform">Book Now</button>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-[#757781] font-bold uppercase tracking-widest block">Starting at</span>
                    <span className="text-lg font-headline font-extrabold text-[#0d1a3c]">₹999<span className="text-xs font-normal text-[#757781]">/ session</span></span>
                  </div>
                </div>
              </div>

              {/* Mentor Card 4: Leo Davinci */}
              <div className="glass-card rounded-3xl p-6 flex flex-col hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="relative mb-6">
                  <img alt="Leo Davinci" className="w-full h-48 object-cover rounded-2xl shadow-sm grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2huPmMdc7i-mr4uaU-5c7qUH40MsByJmyuFA0xYMXzzs0szSXerhOAcyHwmRHFibhHmbGbannYGdbOnIcyXLhnGBqmqybXPZy60xNHFqHQm9nly-F_Q6rMumVJ2FAVtGUJfIDqS8S9nkXVE3nhT8poeimEK6EMWSZTfghcrsJYTFxGflmcpcHk6ntXJod3fhpgx_cTqVGNo1U9hl6koNFj7LGhD6BIe375NTclLWntTdRb_yt1jTyeiiTRb7hpNYNL9uhuUteH_oJ" />
                </div>
                <div className="mb-4">
                  <h3 className="font-headline text-xl font-bold text-[#0d1a3c] mb-0.5">Leo Davinci</h3>
                  <p className="text-sm text-[#465c97] font-semibold">Senior Dev @ Uber</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="material-symbols-outlined text-[#FFB800] text-sm fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs font-bold text-[#1a1c1c]">4.7</span>
                    <span className="text-[10px] text-[#757781] ml-1 font-medium">(56 reviews)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-2.5 py-1 bg-[#f3f3f3] text-[10px] font-bold rounded-lg text-[#444650] uppercase tracking-tighter border border-[#c5c6d1]/30">Java</span>
                  <span className="px-2.5 py-1 bg-[#f3f3f3] text-[10px] font-bold rounded-lg text-[#444650] uppercase tracking-tighter border border-[#c5c6d1]/30">Distributed</span>
                </div>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/mentors/4" className="block text-center border border-[#c5c6d1] text-[#1a1c1c] px-4 py-2.5 rounded-xl font-headline font-bold text-sm hover:bg-white transition-colors">
                      View Profile
                    </Link>
                    <button className="bg-[#0d1a3c] text-white px-4 py-2.5 rounded-xl font-headline font-bold text-sm hover:translate-y-[-2px] transition-transform">Book Now</button>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-[#757781] font-bold uppercase tracking-widest block">Starting at</span>
                    <span className="text-lg font-headline font-extrabold text-[#0d1a3c]">₹699<span className="text-xs font-normal text-[#757781]">/ session</span></span>
                  </div>
                </div>
              </div>

              {/* Mentor Card 5: Dr. Helena Vance */}
              <div className="glass-card rounded-3xl p-6 flex flex-col hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                <div className="relative mb-6">
                  <img alt="Dr. Helena Vance" className="w-full h-48 object-cover rounded-2xl shadow-sm grayscale group-hover:grayscale-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGhuNS8wVKBybgFFugKue9YXURvwBzipTBqHYuaws0sFIB49lBeutpXUT346m433-A2oIhM0aGxVJp77pbX00-cBjhZm7njdBXTWTIZdwbH_qI3NGq8KNDTrW-DIi_qAJUJgkqYACOixrbwWKUHeDtXdSJEY-w-gNgCpLG2jRq2hC3oZVJF3c6LPo-B-6dX0W4NwVbNdiDPDbb1xydQ0WgNy-219rybR_8XnYlpBU8fF_jV3ITMDM7aHGfvIqk72rpq9s-EisGUk7y" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                    <span className="text-[10px] font-bold text-primary tracking-tight uppercase">Verified</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="font-headline text-xl font-bold text-[#0d1a3c] mb-0.5">Dr. Helena Vance</h3>
                  <p className="text-sm text-[#465c97] font-semibold">AI Research @ OpenAI</p>
                  <div className="flex items-center gap-1 mt-2">
                    <span className="material-symbols-outlined text-[#FFB800] text-sm fill-current" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs font-bold text-[#1a1c1c]">4.9</span>
                    <span className="text-[10px] text-[#757781] ml-1 font-medium">(150 reviews)</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-2.5 py-1 bg-[#f3f3f3] text-[10px] font-bold rounded-lg text-[#444650] uppercase tracking-tighter border border-[#c5c6d1]/30">PyTorch</span>
                  <span className="px-2.5 py-1 bg-[#f3f3f3] text-[10px] font-bold rounded-lg text-[#444650] uppercase tracking-tighter border border-[#c5c6d1]/30">Deep Learning</span>
                </div>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/mentors/5" className="block text-center border border-[#c5c6d1] text-[#1a1c1c] px-4 py-2.5 rounded-xl font-headline font-bold text-sm hover:bg-white transition-colors">
                      View Profile
                    </Link>
                    <button className="bg-[#0d1a3c] text-white px-4 py-2.5 rounded-xl font-headline font-bold text-sm hover:translate-y-[-2px] transition-transform">Book Now</button>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-[#757781] font-bold uppercase tracking-widest block">Starting at</span>
                    <span className="text-lg font-headline font-extrabold text-[#0d1a3c]">₹2499<span className="text-xs font-normal text-[#757781]">/ session</span></span>
                  </div>
                </div>
              </div>

              {/* Load More Mentors / Join Card */}
              <div className="border-2 border-dashed border-[#c5c6d1] rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 group cursor-pointer hover:bg-[#f3f3f3] transition-colors">
                <div className="w-16 h-16 rounded-full bg-[#a5bbfc] flex items-center justify-center text-[#465c97] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" data-icon="add">add</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-[#0d1a3c] mb-2">Join as Mentor</h3>
                  <p className="text-sm text-[#444650] max-w-[200px] mb-6">Help others reach their potential and earn as you mentor.</p>
                  <button className="bg-[#0d1a3c] text-white px-8 py-3 rounded-xl font-headline font-bold text-sm transition-all group-hover:bg-[#3a456a]">Load More Mentors</button>
                </div>
              </div>
            </div>

            {/* Embedded Footer inside the main content to match HTML structure exactly */}
            <footer className="mt-20 pt-12 border-t border-[#e8e8e8] w-full">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <img src="/logo.png" alt={`${siteConfig.name} Logo`} className="w-8 h-8 object-contain rounded-sm" />
                    <span className="font-headline font-bold text-[#0A2156] text-lg">{siteConfig.name}</span>
                  </div>
                  <p className="font-body text-xs tracking-wide text-slate-500">© 2024 {siteConfig.name}. {siteConfig.description}</p>
                </div>
                <div className="flex gap-8">
                  <Link className="font-body text-xs tracking-wide text-slate-500 hover:text-[#465C97] transition-colors" href="#">Privacy Policy</Link>
                  <Link className="font-body text-xs tracking-wide text-slate-500 hover:text-[#465C97] transition-colors" href="#">Terms of Service</Link>
                  <Link className="font-body text-xs tracking-wide text-slate-500 hover:text-[#465C97] transition-colors" href="#">Cookie Policy</Link>
                  <Link className="font-body text-xs tracking-wide text-slate-500 hover:text-[#465C97] transition-colors" href="#">Support</Link>
                </div>
              </div>
            </footer>

          </div>
        </main>
      </div>
    </>
  );
}

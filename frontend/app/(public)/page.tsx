'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  BrainCircuit,
  Map,
  ArrowRight,
  CheckCircle2,
  Star,
  Quote,
  TrendingUp,
  ShieldCheck,
  Zap
} from 'lucide-react';
import Footer from '@/app/components/layout/Footer';
import { siteConfig } from '@/config/site';
import AnimatedCounter from '@/app/components/ui/AnimatedCounter';
import LogoMarquee from '@/app/components/ui/LogoMarquee';
import TestimonialSlider from '@/app/components/ui/TestimonialSlider';

const services = [
  {
    title: "Mock Interviews",
    description: "Connect with industry veterans from Google, Meta, and Netflix for role-specific simulations that mirror real-world pressure.",
    details: "Industry-standard IT Professionals",
    icon: <Users className="w-8 h-8 text-primary" />,
    color: "bg-primary-container/20",
    link: "/mentors"
  },
  {
    title: "Stress Consultancy",
    description: "Master technical and psychological resilience through sessions with IT experts and professional psychiatrists.",
    details: "IT Pros & Psychiatrists",
    icon: <BrainCircuit className="w-8 h-8 text-tertiary" />,
    color: "bg-tertiary-container/20",
    link: "/mentors"
  },
  {
    title: "Career Roadmap",
    description: "Engineer your growth with data-backed consultation to navigate transitions, promotions, and industry shifts.",
    details: "Expert Career Consultants",
    icon: <Map className="w-8 h-8 text-secondary" />,
    color: "bg-secondary-container/20",
    link: "/resources"
  }
];

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-surface selection:bg-primary/20"
    >
      {/* Hero Section */}
      <section className="relative pt-5 pb-24 px-8 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/10 mb-8">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-headline font-bold tracking-widest text-primary uppercase">
                  {siteConfig.name} Platform
                </span>
              </div>

              <h1 className="font-headline text-6xl md:text-8xl font-black text-[#0A2156] leading-[1.05] tracking-tight mb-8">
                Scale Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-container to-primary">
                  Career
                </span> with Experts.
              </h1>

              <p className="text-xl md:text-2xl text-on-surface-variant mb-12 max-w-2xl leading-relaxed font-body">
                Experience hyper-realistic mock interviews, stress-resilience training, and strategic career roadmaps designed by billion-dollar company insiders.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#0A2156] text-white px-10 py-5 rounded-2xl font-headline font-extrabold text-xl shadow-2xl shadow-primary/20 hover:bg-primary transition-colors flex items-center gap-3"
                  >
                    Start Your Journey
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </Link>
                <Link href="/mentors">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white border-2 border-outline-variant/20 px-10 py-5 rounded-2xl font-headline font-extrabold text-xl text-[#0A2156] hover:bg-surface-container-lowest transition-colors"
                  >
                    View Mentors
                  </motion.button>
                </Link>
              </div>

              <div className="mt-16 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-surface object-cover"
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User avatar"
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-surface bg-primary-container flex items-center justify-center text-primary font-bold text-xs">
                    +2k
                  </div>
                </div>
                <div className="text-sm">
                  <p className="font-headline font-bold text-[#0A2156]">Trusted by 2,000+ candidates</p>
                  <div className="flex text-amber-400 gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative"
            >
              <div className="relative z-10 glass-card p-6 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border-white/60">
                <img
                  className="rounded-[2rem] w-full h-[600px] object-cover"
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000"
                  alt="Professional Interview"
                />

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -left-12 top-1/4 glass-panel p-5 rounded-2xl shadow-xl border border-white/40 max-w-[200px]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-headline font-bold text-xs text-[#0A2156]">Verified Experts</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant leading-tight">All mentors are from industry-standard IT companies.</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -right-8 bottom-1/4 glass-panel p-5 rounded-2xl shadow-xl border border-white/40"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary-container rounded-lg">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-headline font-bold text-xs text-[#0A2156]">Live Feedback</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      animate={{ width: ["30%", "90%", "30%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Signals - Auto Marquee */}
      <section className="border-y border-outline-variant/10">
        <LogoMarquee />
      </section>

      {/* Services Section */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-headline font-black tracking-widest uppercase text-sm"
          >
            Our Ecosystem
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-headline text-5xl md:text-6xl font-black text-[#0A2156] mt-4 mb-6"
          >
            What we offer
          </motion.h2>
          <p className="text-on-surface-variant text-xl max-w-2xl mx-auto leading-relaxed font-body">
            We provide a comprehensive platform to transform your professional profile from every angle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-surface-container-lowest p-10 rounded-[2.5rem] border border-outline-variant/5 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
            >
              <div className={`w-20 h-20 ${service.color} rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                {service.icon}
              </div>
              <h3 className="font-headline text-2xl font-black text-[#0A2156] mb-4">{service.title}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6 font-body text-lg">
                {service.description}
              </p>
              <div className="flex items-center gap-2 mb-8 py-2 px-4 bg-surface-container-low rounded-xl w-fit">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-headline font-bold text-[#0A2156] uppercase tracking-wider">{service.details}</span>
              </div>
              <Link href={service.link} className="flex items-center gap-2 text-primary font-headline font-black group-hover:gap-4 transition-all">
                Learn More
                <ArrowRight size={20} />
              </Link>

              {/* Decorative Background Element */}
              <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${service.color} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metrics Section - Running Numbers */}
      <section className="py-24 bg-[#0A2156] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white">
            <div>
              <div className="font-headline text-6xl font-black mb-2 text-primary-container">
                <AnimatedCounter value={98} suffix="%" />
              </div>
              <p className="text-sm font-headline font-bold tracking-[0.2em] uppercase text-slate-400">Offer Success</p>
            </div>
            <div>
              <div className="font-headline text-6xl font-black mb-2 text-primary-container">
                <AnimatedCounter value={15} suffix="k+" />
              </div>
              <p className="text-sm font-headline font-bold tracking-[0.2em] uppercase text-slate-400">Mock Sessions</p>
            </div>
            <div>
              <div className="font-headline text-6xl font-black mb-2 text-primary-container">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <p className="text-sm font-headline font-bold tracking-[0.2em] uppercase text-slate-400">Mentors</p>
            </div>
            <div>
              <div className="font-headline text-6xl font-black mb-2 text-primary-container">
                <AnimatedCounter value={40} suffix="%" />
              </div>
              <p className="text-sm font-headline font-bold tracking-[0.2em] uppercase text-slate-400">Salary Hike</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Auto Swapping */}
      <section className="py-32 px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="font-headline text-5xl md:text-6xl font-black text-[#0A2156] tracking-tight">The Success Stories</h2>
        </div>
        <TestimonialSlider />
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary-container to-tertiary rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-white border border-outline-variant/10 p-16 md:p-24 rounded-[3rem] text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />

            <h2 className="font-headline text-5xl md:text-7xl font-black text-[#0A2156] mb-8 tracking-tight leading-tight">
              Ready to master your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
                next big leap?
              </span>
            </h2>

            <p className="text-on-surface-variant text-xl md:text-2xl mb-14 max-w-3xl mx-auto leading-relaxed font-body">
              Join hundreds of candidates who have transitioned from nervous applicants to confident experts this month.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0A2156] text-white px-12 py-5 rounded-2xl font-headline font-black text-xl shadow-2xl shadow-primary/20"
                >
                  Get Started Free
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white border-2 border-[#0A2156] px-12 py-5 rounded-2xl font-headline font-black text-xl text-[#0A2156]"
                >
                  How it Works
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}


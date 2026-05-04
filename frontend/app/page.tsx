'use client'; 

import HeroSection from '@/app/components/sections/HeroSection';
import FeatureCard from '@/app/components/sections/FeatureCard';
import TestimonialCard from '@/app/components/sections/TestimonialCard';
import TrustSignals from '@/app/components/sections/TrustSignals';
import GlassCard from '@/app/components/ui/GlassCard';
import Button from '@/app/components/ui/Button';
import Container from '@/app/components/layout/Container';
import { use } from 'react';

const InterviewIcon = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
    <path fillRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const FeedbackIcon = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AIIcon = () => (
  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default function Home() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <HeroSection
        badge="The Cognitive Sanctuary"
        title={
          <>
            Practice Real <span className="text-gradient">Interviews</span> with Industry Experts.
          </>
        }
        subtitle="Master the art of the interview through editorial-grade simulations. Transition from high-anxiety to authoritative calm with AI-driven insights."
        primaryCTA={{ text: 'Get Started', href: '/auth/register' }}
        secondaryCTA={{ text: 'View Mentors', href: '/mentors' }}
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
        imageAlt="Professional conducting an interview"
      />

      {/* Trust Signals */}
      <TrustSignals />

      {/* Features Section */}
      <section className="py-32 px-6">
        <Container>
          <div className="mb-20">
            <h2 className="text-headline-lg font-bold text-on-surface tracking-tight mb-4">
              Master the Narrative.
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-xl">
              Our platform is designed to emulate the physical presence of a high-stakes interview environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feature 1 - Large Card */}
            <FeatureCard
              icon={<InterviewIcon />}
              title="Live Mock Interviews"
              description="Connect with industry veterans from FAANG and high-growth startups for 1-on-1 simulations that mirror the exact pressure of the real thing."
              linkText="Explore Mentor Network"
              colSpan="full"
            />

            {/* Feature 2 - Small Card */}
            <FeatureCard
              icon={<FeedbackIcon />}
              title="Feedback Reports"
              description="Editorial-grade review of your performance, broken down by technical accuracy and soft-skill proficiency."
              colSpan="half"
              backgroundColor="bg-tertiary-container"
            />

            {/* Feature 3 - Small Card */}
            <FeatureCard
              icon={<AIIcon />}
              title="AI Recommendations"
              description="Dynamic growth plans generated after every session, highlighting the exact areas where you need more polish."
              colSpan="half"
            />

            {/* Feature 4 - Wide Dark Card */}
            <div className="md:col-span-2 relative overflow-hidden bg-slate-900 p-10 rounded-md flex items-center shadow-lg">
              <div className="relative z-10 w-full md:w-1/2">
                <h3 className="text-headline-md font-bold text-white mb-4">
                  The Focus Glass Engine
                </h3>
                <p className="text-body-md text-slate-300 leading-relaxed mb-8">
                  Our proprietary environment removes UI friction, allowing you to focus purely on human interaction while AI works silently in the background.
                </p>
                <Button variant="primary" size="md">
                  See it in action
                </Button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 hidden md:block bg-gradient-to-l from-primary/30 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      {/* Metrics Section */}
      <section className="py-24 bg-surface">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface mb-2">
                94%
              </p>
              <p className="text-label-sm text-on-surface-variant font-medium tracking-wide uppercase">
                Offer Success Rate
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface mb-2">
                12k+
              </p>
              <p className="text-label-sm text-on-surface-variant font-medium tracking-wide uppercase">
                Mock Sessions
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface mb-2">
                450+
              </p>
              <p className="text-label-sm text-on-surface-variant font-medium tracking-wide uppercase">
                Industry Mentors
              </p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface mb-2">
                35%
              </p>
              <p className="text-label-sm text-on-surface-variant font-medium tracking-wide uppercase">
                Avg. Salary Increase
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6">
        <Container>
          <h2 className="text-headline-lg font-bold text-on-surface text-center mb-20 tracking-tight">
            The candidate experience.
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="The Cognitive Sanctuary changed how I perceive high-pressure calls. The AI feedback on my pacing was a wake-up call I didn't know I needed."
              author="Marcus Thorne"
              title="Senior Engineer @ Stripe"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop"
            />
            <TestimonialCard
              quote="The mentors here don't just ask questions—they teach you the mindset behind the rubric. I landed three offers within two weeks of my last session."
              author="Elena Rodriguez"
              title="Product Lead @ Linear"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop"
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <Container size="md">
          <GlassCard className="p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-primary-container/20 -z-10" />
            <h2 className="text-display-md md:text-4xl font-headline font-bold text-on-surface mb-6 tracking-tight leading-tight">
              Ready to master your next career-defining moment?
            </h2>
            <p className="text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
              Join the hundreds of candidates who have transitioned from nervous applicants to confident experts this month.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="primary">
                Get Started Now
              </Button>
              <Button size="lg" variant="secondary">
                Schedule a Demo
              </Button>
            </div>
          </GlassCard>
        </Container>
      </section>
    </div>
  );
}

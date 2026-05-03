import React from 'react';
import Button from '@/app/components/ui/Button';
import Container from '@/app/components/layout/Container';
import Image from 'next/image';

interface HeroSectionProps {
  badge?: string;
  title: React.ReactNode;
  subtitle: string;
  primaryCTA?: { text: string; href?: string };
  secondaryCTA?: { text: string; href?: string };
  image?: string;
  imageAlt?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  image,
  imageAlt = 'Hero image',
}) => {
  return (
    <section className="relative px-6 pt-24 pb-32 overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="z-10">
            {badge && (
              <div className="inline-block px-4 py-1.5 mb-6 text-label-md font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
                {badge}
              </div>
            )}

            <h1 className="text-display-lg md:text-5xl leading-tight mb-8">
              {title}
            </h1>

            <p className="text-body-lg md:text-body-md text-on-surface-variant mb-10 max-w-lg leading-relaxed">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCTA && (
                <Button
                  size="lg"
                  variant="primary"
                  onClick={() => window.location.href = primaryCTA.href || '#'}
                >
                  {primaryCTA.text}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => window.location.href = secondaryCTA.href || '#'}
                >
                  {secondaryCTA.text}
                </Button>
              )}
            </div>
          </div>

          {/* Right Visual */}
          {image && (
            <div className="relative hidden lg:block">
              <div className="relative z-10 glass-card p-4 rounded-md shadow-2xl overflow-hidden border border-white/40">
                <Image
                  src={image}
                  alt={imageAlt}
                  width={500}
                  height={500}
                  className="rounded-sm w-full h-auto object-cover"
                />
              </div>

              {/* Background Decorative Blurs */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;

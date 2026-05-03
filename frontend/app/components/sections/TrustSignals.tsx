import React from 'react';
import Container from '@/app/components/layout/Container';

interface TrustSignalsProps {
  companies?: string[];
  label?: string;
}

const TrustSignals: React.FC<TrustSignalsProps> = ({
  companies = ['GOOGLE', 'STRIPE', 'LINEAR', 'AIRBNB', 'VERCEL'],
  label = 'Trusted by candidates now at',
}) => {
  return (
    <section className="py-16 bg-surface-container-low">
      <Container>
        <p className="text-center font-headline font-bold text-label-lg uppercase tracking-[0.2em] text-on-surface-variant mb-10">
          {label}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {companies.map((company) => (
            <span
              key={company}
              className="text-2xl font-headline font-black text-on-surface"
            >
              {company}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustSignals;

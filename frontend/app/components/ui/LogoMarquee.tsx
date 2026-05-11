'use client';

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  { name: 'Google', icon: 'google' },
  { name: 'Stripe', icon: 'payments' },
  { name: 'Meta', icon: 'all_inclusive' },
  { name: 'Amazon', icon: 'shopping_cart' },
  { name: 'Microsoft', icon: 'window' },
  { name: 'Netflix', icon: 'movie' },
  { name: 'Apple', icon: 'apple' },
  { name: 'Airbnb', icon: 'home' },
];

export default function LogoMarquee() {
  return (
    <div className="relative w-full overflow-hidden bg-surface-container-lowest py-10">
      <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-surface-container-lowest to-transparent"></div>
      <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-surface-container-lowest to-transparent"></div>
      
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
      >
        {[...logos, ...logos, ...logos].map((logo, idx) => (
          <div
            key={idx}
            className="mx-12 flex items-center gap-2 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
          >
            <span className="material-symbols-outlined text-3xl text-primary">{logo.icon}</span>
            <span className="text-xl font-headline font-black text-[#0A2156] tracking-tighter uppercase">
              {logo.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Marcus Thorne',
    role: 'Senior Engineer @ Stripe',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT3Pm9WFTd7nOzHCG5Z_bm0dQtilI5k3F2kdRuP94L4YiZ_F7mw2SRpQ4Ob0MZknDCkanCpuLWFZBIicwcOGhDpsjZb_VelRC80l86-WNx7otRz3w3fetbv4DjCKABmCMAOtVDR_rmCcFAuVxEOKcXoK5URi9pHRSzZI0CmEjNAdEvU63bUmGeTmFPjnjgoJ9VbKtJmIK4SdA6_bScGI8Q1ES9Oy5ISVn-SZyIInfBU7gbBa4ycDCyuIRgvd1z7gmKr3OyvRUhmPxi',
    text: "HiringGround changed how I perceive high-pressure calls. The AI feedback on my pacing was a wake-up call I didn't know I needed.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Elena Rodriguez',
    role: 'Product Lead @ Linear',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBfJTyD6vFb4848AbcTmobSYwvxQsp-5g_NXs4pmCP71_iLglRwQaPhhzivEywPFjeNgSjQlsVsqNgNS5TUkOIj_riwa1JCo5b3A_dAQBEybDd3ThZ_EJ7fk_VWUk9pbIlqPwku8YCdqvc14uFak5z1Y0AYk8H6ookl0R3D2ZwaP63EyYO42_FNGy1YhqWOUaUzgRMZROOxK3EtgqfkxnBxZaMeEEZwWiJn9ecP_BVMe7ZMF4TTERB6BtWZhFTGyBIuNzbnycxqBCD',
    text: "The mentors here don't just ask questions—they teach you the mindset behind the rubric. I landed three offers within two weeks of my last session.",
    rating: 5,
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Engineering Manager @ Google',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6s4uayIDG1dfXCrXgTZjo4d2VxDB0P0zCbOSrlAYh5HgLenaj8cAU9j1nUWRsbvhfplN1ZsZ03H8hM3VKCz3oNblWzxfA8TR5RFO5lrn2nCfH8lv4Yplfh_4z00Er1eT3Ta5lBKDmZgIg9QPJ9Qa6UouTo_uiIJQJdutv1NLowL8pgiZjshQN-MIEQMC9G9CZ-JYxByBdk90yqO_5jYNE7ByqaQzf8_OzopR6W0ksgrJKRM561ymNxyQ3SDII1AQ3m7MGVlcTmkWZ',
    text: "The Stress Consultancy session was a game-changer. It combined technical rigour with mental preparation that you just can't find elsewhere.",
    rating: 5,
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] w-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute w-full max-w-4xl"
        >
          <div className="bg-surface-container-lowest p-12 rounded-[2rem] border border-outline-variant/10 shadow-xl flex flex-col md:flex-row gap-8 items-center">
            <div className="relative">
              <img 
                src={testimonials[index].image} 
                alt={testimonials[index].name}
                className="w-32 h-32 rounded-2xl object-cover shadow-lg border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-lg shadow-lg">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-1 mb-4 text-primary">
                {[...Array(testimonials[index].rating)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <p className="text-xl md:text-2xl font-body italic text-on-surface-variant mb-6 leading-relaxed">
                &quot;{testimonials[index].text}&quot;
              </p>
              <div>
                <h4 className="font-headline text-xl font-bold text-[#0A2156]">{testimonials[index].name}</h4>
                <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">{testimonials[index].role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 flex gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-primary' : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

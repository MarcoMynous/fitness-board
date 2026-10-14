'use client';

import React from 'react';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Amara O.',
      location: 'Victoria Island, Lagos • 8 Weeks',
      metric: '-4.4 kg',
      quote:
        '“I went to weddings in November, ate my jollof, followed Tolu’s 4-day split, and wore a dress I hadn’t zipped since 2021. This isn’t a quick fix; it’s a cheat code.”',
    },
    {
      name: 'Chioma K.',
      location: 'Abuja • 8 Weeks',
      metric: 'Core & Glute Sculpt',
      quote:
        '“Before this, I had severe lower back pain and zero strength. The structure of the lifts and the clarity of videos gave me posture and real athletic confidence.”',
    },
    {
      name: 'Ngozi E.',
      location: 'Lekki, Lagos • 8 Weeks',
      metric: '-5.1 kg',
      quote:
        '“The fact that the meal guide uses actual ingredients from Shoprite and local markets made all the difference. No strange powders or starvation.”',
    },
  ];

  return (
    <section id="results" className="w-full bg-deep-charcoal text-on-primary py-space-xl lg:py-space-2xl">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-desktop">
        <div className="flex flex-col space-y-space-xs mb-space-xl sm:mb-space-2xl text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-bold text-primary-fixed tracking-widest uppercase font-sans">
            REAL STORIES
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] text-surface-container-lowest font-bold">
            THE WORK SHOWS.
          </h2>
          <p className="text-[15px] sm:text-[16px] text-surface-dim leading-relaxed">
            Over 1,400 women have transformed how they move, eat, and feel without losing their social lives.
          </p>
        </div>

        {/* 3 Testimonial Cards in Horizontal Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-inverse-surface p-space-lg rounded-2xl flex flex-col justify-between space-y-space-md shadow-md border border-white/5 hover:border-primary/40 transition-colors"
            >
              <div className="space-y-space-sm">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-primary-fixed-dim" />
                  ))}
                </div>
                <p className="text-[14px] sm:text-[15px] text-surface-bright leading-relaxed">
                  {t.quote}
                </p>
              </div>

              <div className="pt-space-sm border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-[16px] text-surface-container-lowest">
                    {t.name}
                  </h4>
                  <span className="text-[12px] text-surface-dim block">{t.location}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary-fixed text-[11px] font-bold">
                  {t.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

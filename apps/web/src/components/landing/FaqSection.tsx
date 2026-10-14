'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this beginner friendly?',
      a: "Yes! Every movement has video cues and alternative dumbbell regressions if you've never touched a barbell before.",
    },
    {
      q: 'Do I need a gym?',
      a: 'No. The program offers two full pathways: a Gym Track and a Home Dumbbell Track with identical progression principles.',
    },
    {
      q: 'Can I follow this with Nigerian food?',
      a: '100%. The entire cookbook is crafted around authentic West African staples: Jollof rice, plantains, egusi, fish, chicken, and local greens.',
    },
    {
      q: 'How long does the program last?',
      a: 'It is an 8-week structured roadmap, but you retain lifetime access to repeat phases anytime you want a reset.',
    },
    {
      q: 'How do I access the program?',
      a: 'Immediately after checkout, you receive secure login details to access the Kinfolk & Core member dashboard on your browser.',
    },
    {
      q: 'Can I download the cookbook?',
      a: 'Yes, the digital cookbook is available for both high-resolution PDF download and interactive browsing in the member portal.',
    },
    {
      q: 'Can I use it on my phone?',
      a: 'Yes! The platform is optimized for mobile browser use, allowing you to log workouts effortlessly right from the gym floor.',
    },
    {
      q: 'When do I receive access?',
      a: "Instantaneous. Within 60 seconds of completing payment via Paystack, you'll be redirected straight to your dashboard.",
    },
  ];

  return (
    <section id="faq" className="w-full max-w-[1280px] mx-auto px-margin md:px-margin-desktop py-space-xl lg:py-space-2xl">
      <div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-xl sm:mb-space-2xl">
        <span className="text-[11px] font-bold text-primary tracking-widest uppercase font-sans">
          GOT QUESTIONS?
        </span>
        <h2 className="font-serif text-[32px] sm:text-[40px] text-deep-charcoal font-bold">
          FREQUENTLY ASKED QUESTIONS.
        </h2>
        <p className="text-[15px] sm:text-[16px] text-muted-charcoal">
          Everything you need to know before stepping into the program.
        </p>
      </div>

      {/* 2-Column FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-surface-cream rounded-2xl border border-border-subtle overflow-hidden shadow-xs transition-all hover:border-primary/30"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-space-md sm:p-space-lg flex items-center justify-between text-left cursor-pointer hover:bg-surface-elevated/40 transition-colors"
              >
                <h3 className="font-serif font-bold text-[16px] sm:text-[17px] text-deep-charcoal pr-4">
                  {faq.q}
                </h3>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-charcoal shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-space-md sm:px-space-lg pb-space-md sm:pb-space-lg pt-0 text-[14px] text-muted-charcoal leading-relaxed border-t border-border-subtle/60">
                  <p className="pt-2">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

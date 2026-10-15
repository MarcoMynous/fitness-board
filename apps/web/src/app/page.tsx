'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LandingHeader,
  HeroSection,
  SocialProofStrip,
  ProblemSection,
  CompanionDashboardPreview,
  MeetCoachSection,
  MovementSystemSection,
  NutritionSystemSection,
  AccountabilitySection,
  TestimonialsSection,
  CurriculumIncludedSection,
  PricingEnrollmentSection,
  FaqSection,
  FinalCtaSection,
  LandingFooter,
  MobileStickyCta,
} from '../components/landing';

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export default function LandingPage() {
  const router = useRouter();
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  // Check if visitor is already an active member
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleCheckout = () => {
    if (user) {
      router.push('/home');
    } else {
      router.push('/sign-in');
    }
  };

  const scrollToPricing = () => {
    if (user) {
      router.push('/home');
      return;
    }
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleCheckout();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-canvas-cream font-sans antialiased text-deep-charcoal selection:bg-primary selection:text-on-primary">
      {/* 1. Sticky Editorial Header */}
      <LandingHeader
        user={user}
        currency={currency}
        setCurrency={setCurrency}
        onCheckout={handleCheckout}
        isLoading={isLoading}
      />

      <main className="w-full pt-20 bg-canvas-cream min-h-screen flex flex-col">
        {/* 2. Hero Section */}
        <HeroSection onCheckout={handleCheckout} isLoading={isLoading} />

        {/* 3. Social Proof Strip */}
        <SocialProofStrip />

        {/* 4. The Routine Dilemma (Problem Bento) */}
        <ProblemSection onExplore={scrollToPricing} />

        {/* 5. Companion Dashboard Preview */}
        <CompanionDashboardPreview />

        {/* 6. Meet Your Coach (Tolu Story) */}
        <MeetCoachSection onJoin={scrollToPricing} />

        {/* 7. Movement System (Train With A Plan) */}
        <MovementSystemSection />

        {/* 8. Nigerian Nutrition System (Eat Like A Normal Human) */}
        <NutritionSystemSection />

        {/* 9. Accountability Engine (Watch Yourself Change) */}
        <AccountabilitySection />

        {/* 10. Real Stories (The Work Shows) */}
        <TestimonialsSection />

        {/* 11. Complete Curriculum Inclusions */}
        <CurriculumIncludedSection />

        {/* 12. Main Pricing Enrollment (Paystack NGN/USD) */}
        <PricingEnrollmentSection
          currency={currency}
          setCurrency={setCurrency}
          onCheckout={handleCheckout}
          isLoading={isLoading}
        />

        {/* 13. Frequently Asked Questions */}
        <FaqSection />

        {/* 14. Final Transformational Call To Action */}
        <FinalCtaSection onCheckout={handleCheckout} isLoading={isLoading} />
      </main>

      {/* 15. Editorial Footer */}
      <LandingFooter />

      {/* 16. Mobile Sticky CTA Bar (Emerges on scroll) */}
      <MobileStickyCta
        currency={currency}
        onCheckout={handleCheckout}
        isLoading={isLoading}
      />
    </div>
  );
}

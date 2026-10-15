'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Lock,
  CheckCircle2,
  X,
  ExternalLink,
  FileCheck2,
  Mail,
} from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const reasonParam = searchParams.get('reason');

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [devVerifyUrl, setDevVerifyUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string } | null>(null);

  // Check if user is already signed in — verified users are redirected directly to dashboard
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
          router.replace('/home');
        }
      })
      .catch(() => {});
  }, [router]);

  // Handle resend countdown
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const interval = setInterval(() => {
      setResendCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCountdown]);

  // Determine error text from URL query parameters
  const getBannerError = () => {
    if (errorParam === 'expired_or_invalid') {
      return 'Your access link has expired or has already been used. Please request a fresh link below.';
    }
    if (errorParam === 'missing_token') {
      return 'No valid authorization token was provided. Please request a fresh access link.';
    }
    if (reasonParam === 'unauthorized') {
      return 'Please enter your email to access your private member sanctuary & workouts.';
    }
    return null;
  };

  const bannerError = getBannerError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    // If an authenticated user enters their email, redirect directly to dashboard
    if (currentUser) {
      router.replace('/home');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          turnstileToken: turnstileToken || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to dispatch access link. Please verify your email.');
      } else {
        const query = new URLSearchParams({ email: email.trim() });
        if (data.devVerifyUrl) query.set('verifyUrl', data.devVerifyUrl);
        if (data.deliveryNotice) query.set('notice', data.deliveryNotice);
        if (data.isVerified) query.set('verified', 'true');
        router.push(`/auth/check-email?${query.toString()}`);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network connection error. Please verify your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#121110]">
      {/* ========================================================
          LEFT COLUMN: Luxury Editorial Visual Sanctuary Frame
         ======================================================== */}
      <div className="relative w-full lg:w-[48%] xl:w-[46%] bg-[#121110] text-[#fbf8f4] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden min-h-[480px] lg:min-h-screen">
        {/* Editorial Background Image with Bespoke Coach Tolu Photography */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            alt="Coach Tolu - Kinfolk and Core Sanctuary"
            className="w-full h-full object-cover object-top opacity-55 filter brightness-85 contrast-105"
            src="/images/coach-tolu-editorial.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/60 to-[#121110]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#121110]/40 via-transparent to-[#121110]" />
        </div>

        {/* Top Header Tag */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-bold tracking-widest uppercase text-[#d6cdb7]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121110]/70 backdrop-blur-md border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#c86241] animate-pulse" />
            <span>KINFOLK &amp; CORE / SANCTUARY</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#d6cdb7]">
            <Lock className="w-3.5 h-3.5 text-[#c86241]" />
            <span>MEMBERS PORTAL</span>
          </div>
        </div>

        {/* Bottom Editorial Copy & Coach Credit */}
        <div className="relative z-10 space-y-6 mt-16 lg:mt-0">
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c86241] block">
              MEMBER ACCESS
            </span>
            <h1 className="font-serif text-[38px] sm:text-[46px] xl:text-[54px] leading-[1.08] tracking-tight font-bold text-[#faf7f2]">
              YOUR PROGRAM.
              <br />
              YOUR PROGRESS.
              <br />
              <span className="italic font-normal text-[#8ca391]">YOUR SPACE.</span>
            </h1>
            <p className="text-[14px] sm:text-[15px] text-[#c7beaa] max-w-md leading-relaxed font-light">
              Strength sculpted with purposeful grace. Nourishing movement and authentic West African nutrition calibrated for the contemporary woman.
            </p>
          </div>

          {/* Coach Byline Card */}
          <div className="pt-5 border-t border-[#34302a]/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-1 ring-[#c86241]/40 shrink-0">
                <img
                  alt="Coach Tolu"
                  className="w-full h-full object-cover"
                  src="/images/coach-tolu-editorial.jpg"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-[14px] text-[#faf7f2] block leading-tight">
                  COACH TOLU
                </span>
                <span className="text-[11px] text-[#a49a85]">
                  Founder &amp; Master Movement Architect
                </span>
              </div>
            </div>

            <div className="text-right text-[10px] font-bold tracking-widest uppercase text-[#8e8574]">
              LAGOS • ABUJA • DIASPORA
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          RIGHT COLUMN: Warm Cream Canvas & Member Authentication
         ======================================================== */}
      <div className="w-full lg:w-[52%] xl:w-[54%] bg-[#fbf8f4] flex flex-col justify-between p-6 sm:p-10 lg:p-16">
        {/* Top Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-[#ece4d3]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[12px] font-bold text-[#5c5650] hover:text-[#9b3d20] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>

          <Link href="/" className="font-serif font-bold text-[19px] text-[#1a1714]">
            Kinfolk &amp; Core
          </Link>
        </div>

        {/* Main Authentication Flow Container (Clean, Minimal, Luxury) */}
        <div className="max-w-[460px] w-full mx-auto my-auto py-8 space-y-7">
          {/* Active Cycle Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4a5c4e]/10 text-[#4a5c4e] text-[11px] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a5c4e]" />
            <span>COACH TOLU • ACTIVE CYCLE 04</span>
          </div>

          {/* Clean Heading Group */}
          <div className="space-y-2">
            <h2 className="font-serif text-[34px] sm:text-[42px] font-bold text-[#1a1714] tracking-tight leading-none uppercase">
              WELCOME BACK.
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#5c5650] leading-relaxed">
              Enter the email you used when purchasing your program to access your workouts, custom West African meal guides, and private member studio.
            </p>
          </div>

          {/* Banner Error Notification */}
          {(bannerError || errorMessage) && (
            <div className="p-3.5 rounded-xl bg-[#9b3d20]/10 border border-[#9b3d20]/25 flex items-start gap-2.5 text-[12px] text-[#9b3d20]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage || bannerError}</span>
            </div>
          )}

          {/* Active Session Notice */}
          {currentUser && (
            <div className="p-4 rounded-2xl bg-[#efe7da] border border-[#dcd2c0] flex items-center justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#4a5c4e] block">
                  Active Session Detected
                </span>
                <p className="text-[13px] text-[#1a1714] font-medium">{currentUser.email}</p>
              </div>
              <Link
                href="/home"
                className="px-4 py-2 rounded-xl bg-[#9b3d20] text-white text-[12px] font-bold hover:bg-[#853218] transition-colors flex items-center gap-1.5"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Authentication Form or Sent Confirmation */}
          {submitted ? (
            <div className="bg-[#f4ede1] rounded-3xl p-6 sm:p-8 border border-[#e2d8c5] text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#4a5c4e]/15 text-[#4a5c4e] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-bold text-[22px] text-[#1a1714]">
                  Access Link Dispatched
                </h3>
                <p className="text-[13px] text-[#5c5650] leading-relaxed">
                  We sent your secure, single-use access link to:
                  <br />
                  <strong className="text-[#1a1714] font-semibold">{email}</strong>
                </p>
              </div>

              <p className="text-[12px] text-[#787062]">
                Valid for 15 minutes. Check your promotion or junk tabs if it doesn&apos;t arrive in 60 seconds.
              </p>

              {devVerifyUrl && (
                <div className="mt-4 p-4 rounded-xl bg-[#fbf8f4] border border-[#d8cdb8] text-left space-y-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9b3d20]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Instant Access Link (Testing)
                  </div>
                  <a
                    href={devVerifyUrl}
                    className="w-full h-10 rounded-xl bg-[#9b3d20] hover:bg-[#853218] text-white font-bold text-[12px] flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Instant Authorized Entry</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}

              <div className="pt-4 border-t border-[#ded4c0] flex flex-col items-center gap-2">
                <button
                  type="button"
                  disabled={resendCountdown > 0 || isLoading}
                  onClick={(e) => handleSubmit(e as any)}
                  className="text-[12px] font-bold text-[#9b3d20] hover:underline disabled:text-[#a09787] flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  {resendCountdown > 0 ? `Resend link in ${resendCountdown}s` : 'Resend access link'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setDevVerifyUrl(null);
                  }}
                  className="text-[11px] text-[#736a5c] hover:text-[#1a1714] hover:underline"
                >
                  Use a different email address
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-[11px] font-bold tracking-wider uppercase text-[#1a1714]">
                  EMAIL ADDRESS
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#736a5c]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. amaka@domain.com"
                    disabled={isLoading}
                    className="w-full h-12 pl-10 pr-10 rounded-xl bg-[#f2ebde] border border-[#dcd2c0] text-[#1a1714] text-[14px] placeholder-[#9c9384] focus:outline-hidden focus:ring-2 focus:ring-[#9b3d20] focus:border-transparent transition-all"
                  />
                  {email && (
                    <button
                      type="button"
                      onClick={() => setEmail('')}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#918776] hover:text-[#1a1714]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Cloudflare Turnstile Bot Verification */}
              {turnstileSiteKey && (
                <div className="flex justify-center my-1">
                  <Turnstile
                    siteKey={turnstileSiteKey}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                    options={{ theme: 'light', size: 'flexible' }}
                  />
                </div>
              )}

              {/* Submit CTA — NOT "send verification code" */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#9b3d20] hover:bg-[#853218] text-white font-bold text-[13px] tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>OPENING SANCTUARY...</span>
                  </>
                ) : (
                  <>
                    <span>ACCESS YOUR SANCTUARY</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Reassurance Note */}
              <div className="flex items-center justify-center gap-2 text-[12px] text-[#736a5c] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#4a5c4e] shrink-0" />
                <span>Single-use private access link dispatched to your inbox. No passwords required.</span>
              </div>
            </form>
          )}

          {/* Already Purchased / Sync Note */}
          <div className="bg-[#f2ebde] rounded-2xl p-4 sm:p-5 border border-[#e2d8c6] space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#9b3d20] uppercase tracking-wider">
              <FileCheck2 className="w-4 h-4" />
              <span>ALREADY PURCHASED?</span>
            </div>
            <p className="text-[12px] text-[#5c5650] leading-relaxed">
              Use the exact email address you completed your enrollment with on <strong className="text-[#1a1714]">Paystack</strong>. Your training cycle, nutrition handbook, and check-in cadence will sync instantly.
            </p>
          </div>

          {/* WhatsApp Support Link */}
          <div className="text-center pt-1">
            <p className="text-[13px] text-[#736a5c]">
              Need direct assistance?{' '}
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9b3d20] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>WhatsApp Concierge</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="pt-6 border-t border-[#ece4d3] space-y-3 text-[11px] text-[#736a5c]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-[#4a5c4e]" />
              <span>256-BIT TLS SECURED • LAGOS STUDIO</span>
            </div>
            <span className="font-bold tracking-wider uppercase text-[10px] text-[#9b3d20]">
              MEMBER PORTAL
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-1 text-[#8c8270]">
            <span>© Kinfolk &amp; Core. All rights reserved.</span>
            <div className="flex items-center gap-3">
              <Link href="/privacy" className="hover:text-[#1a1714] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-[#1a1714] transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/help" className="hover:text-[#1a1714] transition-colors">
                Studio Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#121110] text-[#faf7f2] flex items-center justify-center text-sm font-serif">
          Initializing Sanctuary Portal...
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}

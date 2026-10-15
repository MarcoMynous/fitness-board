'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  MailCheck,
  RefreshCw,
  Lock,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Inbox,
  AlertCircle,
} from 'lucide-react';

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';
  const initialVerifyUrl = searchParams.get('verifyUrl');
  const deliveryNotice = searchParams.get('notice');

  const [resendCountdown, setResendCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [devVerifyUrl, setDevVerifyUrl] = useState<string | null>(initialVerifyUrl);

  // Auto-countdown for resend cooldown
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const interval = setInterval(() => {
      setResendCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCountdown]);

  const handleResend = async () => {
    if (resendCountdown > 0 || isResending) return;

    setIsResending(true);
    setResendStatus(null);

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setResendStatus(data.error || 'Failed to dispatch new access link.');
      } else {
        setResendStatus('A fresh access link has been dispatched to your inbox.');
        setResendCountdown(60);
        if (data.devVerifyUrl) {
          setDevVerifyUrl(data.devVerifyUrl);
        }
      }
    } catch {
      setResendStatus('Could not reconnect to authentication service. Please retry in a moment.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#121110]">
      {/* ========================================================
          LEFT COLUMN: Luxury Editorial Visual Sanctuary Frame
         ======================================================== */}
      <div className="relative w-full lg:w-[48%] xl:w-[46%] bg-[#121110] text-[#fbf8f4] flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden min-h-[460px] lg:min-h-screen">
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
              ACCESS DISPATCHED
            </span>
            <h1 className="font-serif text-[38px] sm:text-[46px] xl:text-[54px] leading-[1.08] tracking-tight font-bold text-[#faf7f2]">
              ALMOST THERE.
              <br />
              YOUR SANCTUARY
              <br />
              <span className="italic font-normal text-[#8ca391]">AWAITS YOU.</span>
            </h1>
            <p className="text-[14px] sm:text-[15px] text-[#c7beaa] max-w-md leading-relaxed font-light">
              Tap the private magic link we sent to verify your identity. No passwords, no delays.
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
          RIGHT COLUMN: Check Inbox Confirmation & Quick Actions
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

        {/* Main Content Box */}
        <div className="max-w-[460px] w-full mx-auto my-auto py-8 space-y-7 text-center">
          {/* Animated Delivery Badge */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#9b3d20]/10 flex items-center justify-center text-[#9b3d20] mx-auto ring-8 ring-[#9b3d20]/5 animate-pulse">
              <MailCheck className="w-9 h-9" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h2 className="font-serif text-[32px] sm:text-[40px] font-bold text-[#1a1714] tracking-tight leading-none uppercase">
              CHECK YOUR INBOX.
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#5c5650] leading-relaxed">
              We just dispatched your private, single-use access link to:
            </p>
            <div className="inline-block px-4 py-2 rounded-xl bg-[#f2ebde] border border-[#e2d8c6] text-[#1a1714] font-semibold text-[14px] mt-1 break-all">
              {email}
            </div>
          </div>

          {/* Delivery Warning (e.g. Resend Sandbox notice) */}
          {deliveryNotice && (
            <div className="p-3.5 rounded-xl bg-[#c86241]/10 border border-[#c86241]/25 text-[12px] text-[#9b3d20] text-left space-y-1">
              <div className="flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-wider text-[#9b3d20]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Resend Test Mode Notice</span>
              </div>
              <p className="leading-relaxed text-[#736a5c]">
                {deliveryNotice}
              </p>
              <p className="text-[11px] text-[#5c5650] pt-0.5">
                On the free test domain, Resend delivers to your verified email: <strong className="text-[#1a1714]">ulonnamugochukwu3@gmail.com</strong>.
              </p>
            </div>
          )}

          {/* Status Message */}
          {resendStatus && (
            <div className="p-3.5 rounded-xl bg-[#4a5c4e]/10 border border-[#4a5c4e]/25 text-[12px] text-[#4a5c4e] flex items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{resendStatus}</span>
            </div>
          )}

          {/* Direct Email App Shortcuts */}
          <div className="space-y-2.5 pt-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#8c8270] block">
              QUICK INBOX SHORTCUTS
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href="https://mail.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 rounded-xl bg-[#f2ebde] hover:bg-[#eae1d0] border border-[#dcd2c0] text-[#1a1714] font-bold text-[12px] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Inbox className="w-3.5 h-3.5 text-[#9b3d20]" />
                <span>Open Gmail</span>
                <ExternalLink className="w-3 h-3 text-[#787062]" />
              </a>

              <a
                href="https://outlook.live.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 rounded-xl bg-[#f2ebde] hover:bg-[#eae1d0] border border-[#dcd2c0] text-[#1a1714] font-bold text-[12px] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Inbox className="w-3.5 h-3.5 text-[#9b3d20]" />
                <span>Open Outlook</span>
                <ExternalLink className="w-3 h-3 text-[#787062]" />
              </a>
            </div>
          </div>

          {/* Dev Mode Instant Link for Local Testing */}
          {devVerifyUrl && (
            <div className="p-4 rounded-xl bg-[#efe7da] border border-[#dcd2c0] text-left space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9b3d20]">
                <Sparkles className="w-3.5 h-3.5" />
                Local Testing Instant Link
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

          {/* Resend & Change Email Actions */}
          <div className="pt-4 border-t border-[#ded4c0] flex flex-col items-center gap-2.5">
            <button
              type="button"
              disabled={resendCountdown > 0 || isResending}
              onClick={handleResend}
              className="text-[13px] font-bold text-[#9b3d20] hover:underline disabled:text-[#a09787] flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
              {resendCountdown > 0
                ? `Resend access link in ${resendCountdown}s`
                : 'Resend access link'}
            </button>

            <Link
              href="/sign-in"
              className="text-[12px] text-[#736a5c] hover:text-[#1a1714] hover:underline"
            >
              Wrong email address? Change email
            </Link>
          </div>

          {/* Reassurance Badge */}
          <div className="flex items-center justify-center gap-2 text-[12px] text-[#736a5c] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#4a5c4e] shrink-0" />
            <span>Single-use link valid for 15 minutes. Check promotions or spam if delayed.</span>
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

export default function CheckEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#121110] text-[#faf7f2] flex items-center justify-center text-sm font-serif">
          Loading Sanctuary Portal...
        </div>
      }
    >
      <CheckEmailContent />
    </Suspense>
  );
}

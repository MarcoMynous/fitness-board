'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button, Input, Card, Badge } from '@repo/ui';
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';

function SignInContent() {
  const searchParams = useSearchParams();
  const errorParam = searchParams.get('error');
  const reasonParam = searchParams.get('reason');

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [devVerifyUrl, setDevVerifyUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string } | null>(null);
  const [resendCountdown, setResendCountdown] = useState<number>(0);

  // Check if user is already signed in
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const interval = setInterval(() => {
      setResendCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCountdown]);

  // Determine error text from URL params
  const getBannerError = () => {
    if (errorParam === 'expired_or_invalid') {
      return 'Your sign-in link has expired or has already been used. Please request a fresh link below.';
    }
    if (errorParam === 'missing_token') {
      return 'No sign-in token was provided in the link. Please request a new link below.';
    }
    if (reasonParam === 'unauthorized') {
      return 'Please sign in to access your member dashboard.';
    }
    return null;
  };

  const bannerError = getBannerError();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to send sign-in link. Please check your email.');
      } else {
        setSubmitted(true);
        setResendCountdown(60);
        if (data.devVerifyUrl) {
          setDevVerifyUrl(data.devVerifyUrl);
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-base flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-stone-secondary hover:text-stone-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Homepage
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-7 h-7 rounded-lg bg-brand-burgundy text-white flex items-center justify-center font-bold text-xs font-serif">
            M
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-secondary">
            Member Portal
          </span>
        </div>

        <h1 className="font-serif text-3xl font-normal text-stone-primary">
          Sign In to Your Account
        </h1>
        <p className="mt-2 text-sm text-stone-secondary">
          Enter the email address associated with your membership to receive a single-use access link.
        </p>

        {/* Banner Error Notification */}
        {bannerError && (
          <div className="mt-4 p-3.5 rounded-lg bg-brand-burgundy/10 border border-brand-burgundy/20 flex items-start gap-2.5 text-xs text-brand-burgundy">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{bannerError}</span>
          </div>
        )}

        {/* Existing Session Detected */}
        {currentUser && (
          <div className="mt-4 p-4 rounded-xl bg-white border border-stone-border shadow-sm flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-state-success block">
                Active Session
              </span>
              <p className="text-xs text-stone-primary font-medium">{currentUser.email}</p>
            </div>
            <Link href="/home">
              <Button size="sm" variant="primary">
                Go to Dashboard
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="bg-white border-stone-border shadow-tactile-lg">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-state-success/10 text-state-success rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl text-stone-primary">Check Your Inbox</h3>
                <p className="text-sm text-stone-secondary leading-relaxed">
                  We sent a secure, single-use access link to:
                  <br />
                  <strong className="text-stone-primary font-semibold">{email}</strong>
                </p>
              </div>

              <p className="text-xs text-stone-secondary">
                The link expires in 15 minutes and can only be used once. Check your spam folder if you do not see it within a minute.
              </p>

              {devVerifyUrl && (
                <div className="mt-4 p-4 rounded-lg bg-surface-base border border-stone-border text-left space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-brand-burgundy">
                    <Sparkles className="w-3.5 h-3.5" />
                    Local Development Instant Link
                  </div>
                  <p className="text-xs text-stone-secondary">
                    Your verification link is available here for instant testing:
                  </p>
                  <a href={devVerifyUrl} className="block">
                    <Button variant="primary" size="sm" className="w-full">
                      Proceed With Sign-In (Direct)
                    </Button>
                  </a>
                </div>
              )}

              <div className="pt-4 border-t border-stone-border flex flex-col gap-2 items-center">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={resendCountdown > 0 || isLoading}
                  onClick={(e) => handleSubmit(e as any)}
                  className="text-xs"
                >
                  <RefreshCw className={`w-3 h-3 mr-1.5 ${isLoading ? 'animate-spin' : ''}`} />
                  {resendCountdown > 0 ? `Resend link in ${resendCountdown}s` : 'Resend access link'}
                </Button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setDevVerifyUrl(null);
                  }}
                  className="text-xs text-stone-secondary hover:text-stone-primary hover:underline mt-1"
                >
                  Use a different email address
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Your Email Address"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                autoComplete="email"
                enterKeyHint="done"
                disabled={isLoading}
                error={errorMessage || undefined}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full shadow-tactile"
                isLoading={isLoading}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Magic Link
              </Button>

              <div className="flex items-center justify-center gap-2 pt-2 text-xs text-stone-secondary">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>Single-use, 15-minute expiration, password-free</span>
              </div>
            </form>
          )}
        </Card>

        <div className="mt-6 text-center text-xs text-stone-secondary">
          Don't have an active membership yet?{' '}
          <Link href="/#pricing" className="text-brand-burgundy font-semibold hover:underline">
            View offerings & pricing
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-base py-20 text-center text-sm text-stone-secondary">Loading portal...</div>}>
      <SignInContent />
    </Suspense>
  );
}

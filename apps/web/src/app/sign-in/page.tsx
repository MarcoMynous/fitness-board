'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Card, Badge } from '@repo/ui';
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [devVerifyUrl, setDevVerifyUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to send sign-in link. Please check your email.');
      } else {
        setSubmitted(true);
        if (data.devVerifyUrl) {
          setDevVerifyUrl(data.devVerifyUrl);
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-base flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
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
          Enter the email address you used during purchase to receive a single-use magic link.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="bg-white border-stone-border shadow-tactile-lg">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-state-success/10 text-state-success rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl text-stone-primary">Check Your Inbox</h3>
                <p className="text-sm text-stone-secondary">
                  We sent a secure, single-use access link to:
                  <br />
                  <strong className="text-stone-primary">{email}</strong>
                </p>
              </div>

              {devVerifyUrl && (
                <div className="mt-4 p-4 rounded-lg bg-stone-sunken border border-stone-border text-left space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase text-brand-burgundy">
                    <Sparkles className="w-3.5 h-3.5" />
                    Local Development Instant Link
                  </div>
                  <p className="text-xs text-stone-secondary">
                    Resend API key is not configured, so your link is available right here for immediate testing:
                  </p>
                  <a href={devVerifyUrl} className="block">
                    <Button variant="primary" size="sm" className="w-full">
                      Proceed With Sign-In (Dev)
                    </Button>
                  </a>
                </div>
              )}

              <div className="pt-4 border-t border-stone-border">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setDevVerifyUrl(null);
                  }}
                  className="text-xs text-brand-burgundy font-medium hover:underline"
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
                autoComplete="username"
                enterKeyHint="done"
                disabled={isLoading}
                error={errorMessage || undefined}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
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

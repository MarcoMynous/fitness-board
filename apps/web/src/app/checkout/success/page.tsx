'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, Button, Badge } from '@repo/ui';
import { CheckCircle2, ArrowRight, Sparkles, Mail } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const verifyUrl = searchParams.get('verify_url');
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-surface-base py-16 px-4 sm:px-6 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="w-16 h-16 bg-state-success/15 text-state-success rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="success">Payment Confirmed</Badge>
          <h1 className="font-serif text-3xl font-normal text-stone-primary">
            Welcome to the Method
          </h1>
          <p className="text-sm text-stone-secondary leading-relaxed">
            Your payment was successful and your entitlements have been activated in the system.
          </p>
        </div>

        <Card className="bg-white border-stone-border shadow-tactile-lg text-left space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-secondary">
              Next Step: Activate Your Access
            </span>
            <p className="text-sm text-stone-secondary">
              A secure sign-in magic link has been sent to your email. You can click the link in your email
              or proceed directly below:
            </p>
          </div>

          {verifyUrl ? (
            <div className="pt-2 space-y-3">
              <a href={verifyUrl} className="block">
                <Button variant="primary" size="lg" className="w-full">
                  <span>Enter Member Area & Onboarding</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <p className="text-[11px] text-stone-secondary text-center">
                This link logs you in securely and routes you directly into the member experience.
              </p>
            </div>
          ) : (
            <div className="pt-2 space-y-3">
              <Link href="/sign-in" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Sign In with Your Email
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {sessionId && (
          <p className="text-[11px] text-stone-secondary">
            Reference Session: <code className="bg-stone-sunken px-1 py-0.5 rounded">{sessionId}</code>
          </p>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading confirmation...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

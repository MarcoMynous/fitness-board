'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, Badge, Button } from '@repo/ui';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const product = searchParams.get('product') || 'bundle';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setError('No payment reference found in URL.');
      setLoading(false);
      return;
    }

    fetch('/api/checkout/paystack-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference, productSlug: product }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError(data.error || 'Could not verify payment');
        } else {
          router.push(
            `/checkout/success?session_id=${data.reference}&verify_url=${encodeURIComponent(
              data.verifyUrl
            )}`
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Network error during payment verification.');
      })
      .finally(() => setLoading(false));
  }, [reference, product, router]);

  return (
    <div className="min-h-screen bg-surface-base py-16 px-4 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-6 text-center">
        {loading ? (
          <Card className="bg-white border-stone-border shadow-tactile p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center mx-auto">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <h2 className="font-serif text-2xl text-stone-primary">Verifying Payment...</h2>
            <p className="text-xs text-stone-secondary">
              Confirming transaction with Paystack and activating your access entitlements.
            </p>
          </Card>
        ) : error ? (
          <Card className="bg-white border-stone-border shadow-tactile p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-state-danger/10 text-state-danger flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-stone-primary">Payment Verification Notice</h2>
            <p className="text-xs text-state-danger font-medium">{error}</p>
            <div className="pt-2">
              <Link href="/#pricing">
                <Button variant="outline" size="sm">
                  Return to Pricing
                </Button>
              </Link>
            </div>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

export default function PaystackCallbackPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Verifying transaction...</div>}>
      <CallbackContent />
    </Suspense>
  );
}

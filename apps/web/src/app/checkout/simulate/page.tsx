'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS, ProductSlug } from '@repo/domain';
import { Button, Input, Card, Badge } from '@repo/ui';
import { ShieldCheck, CreditCard, ArrowRight, Check } from 'lucide-react';

function SimulateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productSlug = (searchParams.get('product') as ProductSlug) || 'bundle';
  const initialEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(initialEmail);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const product = PRODUCTS[productSlug] || PRODUCTS.bundle;

  const handleSimulatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide an email address');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug,
          email,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to process payment');
      } else {
        router.push(
          `/checkout/success?session_id=${data.sessionId}&verify_url=${encodeURIComponent(
            data.verifyUrl
          )}`
        );
      }
    } catch (err) {
      console.error(err);
      setError('Connection error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-base py-12 px-4 sm:px-6 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="terracotta">Development Payment Gateway</Badge>
          <h1 className="font-serif text-3xl text-stone-primary">Simulate Checkout</h1>
          <p className="text-sm text-stone-secondary">
            Stripe keys are not yet configured in <code className="text-xs bg-stone-sunken px-1 py-0.5 rounded">.env</code>. 
            This simulator allows end-to-end verification of payment and entitlement creation.
          </p>
        </div>

        <Card className="bg-white border-stone-border shadow-tactile-lg space-y-6">
          <div className="p-4 rounded-lg bg-surface-base border border-stone-border space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-primary">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-secondary">{product.headline}</p>
              </div>
              <span className="font-serif font-bold text-xl text-brand-burgundy">
                ${(product.priceInCents / 100).toFixed(2)}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-border/60 text-xs text-stone-secondary space-y-1">
              <span className="font-semibold uppercase text-[10px] tracking-wider text-stone-secondary block">
                Entitlements to be issued:
              </span>
              {product.entitlements.map((ent, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-stone-primary">
                  <Check className="w-3.5 h-3.5 text-brand-burgundy" />
                  <span className="capitalize">{ent} Access</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSimulatePayment} className="space-y-4">
            <Input
              label="Customer Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="purchaser@example.com"
              error={error || undefined}
              helperText="This email will receive the access magic link and hold your entitlement."
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isProcessing}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Complete Test Purchase (${(product.priceInCents / 100).toFixed(0)})
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 text-xs text-stone-secondary border-t border-stone-border pt-4">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span>Simulates Stripe Webhook & Atomic Entitlement Creation</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function SimulateCheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading checkout...</div>}>
      <SimulateContent />
    </Suspense>
  );
}

'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { PRODUCTS, ProductSlug } from '@repo/domain';
import { Button, Input, Card, Badge } from '@repo/ui';
import { ShieldCheck, CreditCard, ArrowRight, Check } from 'lucide-react';

function InitiateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productSlug = (searchParams.get('product') as ProductSlug) || 'bundle';
  const product = PRODUCTS[productSlug] || PRODUCTS.bundle;

  const [email, setEmail] = useState('');
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priceFormatted =
    currency === 'NGN'
      ? `₦${product.priceInNgn.toLocaleString()}`
      : `$${(product.priceInCents / 100).toFixed(0)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your email address to receive access.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const res = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug,
          email,
          currency,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to initialize checkout');
      } else if (data.url) {
        window.location.href = data.url;
      } else if (data.simulatedUrl) {
        window.location.href = data.simulatedUrl;
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to payment gateway.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-base py-12 px-4 sm:px-6 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="burgundy">Secure Checkout</Badge>
          <h1 className="font-serif text-3xl text-stone-primary">Activate Membership</h1>
          <p className="text-sm text-stone-secondary">
            Pay securely with Paystack (Debit/Credit Card, Bank Transfer, USSD).
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
                {priceFormatted}
              </span>
            </div>

            <div className="pt-2 border-t border-stone-border/60 text-xs text-stone-secondary space-y-1">
              <span className="font-semibold uppercase text-[10px] tracking-wider text-stone-secondary block">
                Included Entitlements:
              </span>
              {product.entitlements.map((ent, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-stone-primary capitalize">
                  <Check className="w-3.5 h-3.5 text-brand-burgundy" />
                  <span>{ent} Protocol Access</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Currency Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-secondary">
                Select Currency:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCurrency('NGN')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    currency === 'NGN'
                      ? 'border-brand-burgundy bg-brand-burgundy/5 text-brand-burgundy'
                      : 'border-stone-border bg-white text-stone-secondary'
                  }`}
                >
                  🇳🇬 Nigerian Naira (NGN)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    currency === 'USD'
                      ? 'border-brand-burgundy bg-brand-burgundy/5 text-brand-burgundy'
                      : 'border-stone-border bg-white text-stone-secondary'
                  }`}
                >
                  🇺🇸 US Dollars (USD)
                </button>
              </div>
            </div>

            <Input
              label="Customer Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@example.com"
              error={error || undefined}
              helperText="This email will receive your instant sign-in magic link."
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isProcessing}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Pay {priceFormatted} with Paystack
            </Button>
          </form>

          <div className="flex items-center justify-center gap-2 text-xs text-stone-secondary border-t border-stone-border pt-4">
            <ShieldCheck className="w-4 h-4 text-brand-burgundy" />
            <span>256-bit encrypted • Powered by Paystack</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function InitiateCheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading checkout...</div>}>
      <InitiateContent />
    </Suspense>
  );
}

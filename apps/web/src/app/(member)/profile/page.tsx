import React from 'react';
import { cookies } from 'next/headers';
import { validateSession } from '@repo/auth';
import { db, payments } from '@repo/database';
import { Card, Badge, Button } from '@repo/ui';
import { User, ShieldCheck, CreditCard, LogOut, Settings, Calendar, Utensils } from 'lucide-react';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';


export default async function ProfilePage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('fitness_session_token')?.value;
  const user = await validateSession(sessionToken);

  if (!user) return null;

  const userPayments = await db.query.payments.findMany({
    where: eq(payments.userId, user.id),
    orderBy: [desc(payments.createdAt)],
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-stone-border pb-6 space-y-2">
        <Badge variant="burgundy">Member Account</Badge>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-primary">
          Profile & Entitlements
        </h1>
        <p className="text-sm text-stone-secondary">
          Manage your personal preferences, verified product access, and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Account Details & Preferences (Col 2) */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card className="bg-white border-stone-border shadow-tactile space-y-4">
            <h2 className="font-serif text-xl text-stone-primary flex items-center gap-2">
              <User className="w-5 h-5 text-brand-burgundy" />
              <span>Personal Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-surface-base border border-stone-border">
                <span className="text-[10px] uppercase font-semibold text-stone-secondary block">
                  Full Name
                </span>
                <span className="font-medium text-stone-primary">
                  {user.profile?.fullName || 'Not specified'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-surface-base border border-stone-border">
                <span className="text-[10px] uppercase font-semibold text-stone-secondary block">
                  Display Name
                </span>
                <span className="font-medium text-stone-primary">
                  {user.profile?.displayName || 'Not specified'}
                </span>
              </div>

              <div className="sm:col-span-2 p-3 rounded-lg bg-surface-base border border-stone-border">
                <span className="text-[10px] uppercase font-semibold text-stone-secondary block">
                  Sign-In Email
                </span>
                <span className="font-medium text-stone-primary">{user.email}</span>
              </div>
            </div>
          </Card>

          {/* Preferences */}
          <Card className="bg-white border-stone-border shadow-tactile space-y-4">
            <h2 className="font-serif text-xl text-stone-primary flex items-center gap-2">
              <Settings className="w-5 h-5 text-brand-terracotta" />
              <span>Training & Dietary Calibration</span>
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-stone-border/70">
                <span className="text-stone-secondary">Primary Focus:</span>
                <span className="font-semibold text-stone-primary capitalize">
                  {user.profile?.fitnessGoal?.replace('_', ' ') || 'None selected'}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-stone-border/70">
                <span className="text-stone-secondary">Lifting Experience:</span>
                <span className="font-semibold text-stone-primary capitalize">
                  {user.profile?.experienceLevel || 'Intermediate'}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-stone-border/70">
                <span className="text-stone-secondary">Environment:</span>
                <span className="font-semibold text-stone-primary capitalize">
                  {user.profile?.trainingEnvironment?.replace('_', ' ') || 'Commercial gym'}
                </span>
              </div>

              <div className="py-2">
                <span className="text-stone-secondary block mb-1.5">Dietary Exclusions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(user.profile?.dietaryPreferences || []).length > 0 ? (
                    (user.profile?.dietaryPreferences as string[]).map((d, i) => (
                      <Badge key={i} variant="neutral">
                        {d}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-stone-secondary">Standard High-Protein</span>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Purchase History */}
          <Card className="bg-white border-stone-border shadow-tactile space-y-4">
            <h2 className="font-serif text-xl text-stone-primary flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-brand-burgundy" />
              <span>Purchase History</span>
            </h2>

            {userPayments.length === 0 ? (
              <p className="text-xs text-stone-secondary">No transaction records found.</p>
            ) : (
              <div className="divide-y divide-stone-border">
                {userPayments.map((p) => (
                  <div key={p.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-stone-primary block uppercase">{p.productSlug}</strong>
                      <span className="text-stone-secondary">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-serif font-bold text-sm text-stone-primary">
                        ${(p.amountInCents / 100).toFixed(2)}
                      </span>
                      <span className="block text-[10px] text-state-success capitalize">
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Active Entitlements & Sign out (Col 1) */}
        <div className="space-y-6">
          <Card className="bg-white border-stone-border shadow-tactile space-y-4">
            <h2 className="font-serif text-lg text-stone-primary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-burgundy" />
              <span>Active Entitlements</span>
            </h2>

            <div className="space-y-2.5">
              {(user.entitlements || []).length === 0 ? (
                <p className="text-xs text-stone-secondary">No active entitlements.</p>
              ) : (
                (user.entitlements as any[]).map((ent) => (
                  <div
                    key={ent.id}
                    className="p-3 rounded-lg bg-surface-base border border-stone-border space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-serif font-bold text-sm uppercase text-stone-primary">
                        {ent.accessType}
                      </span>
                      <Badge variant="success">Active</Badge>
                    </div>
                    <span className="text-[11px] text-stone-secondary block">
                      Issued: {new Date(ent.startsAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="bg-surface-sunken border-stone-border text-center space-y-3 p-5">
            <span className="text-xs font-semibold text-stone-primary block">
              Session Management
            </span>
            <p className="text-xs text-stone-secondary">
              Sign out of this browser. You can always sign back in via magic link.
            </p>
            <form action="/api/auth/sign-out" method="POST">
              <Button type="submit" variant="outline" size="sm" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

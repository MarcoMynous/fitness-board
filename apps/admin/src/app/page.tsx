import React from 'react';
import Link from 'next/link';
import { db, users, payments, entitlements, auditEvents } from '@repo/database';
import { Card, Badge, Button } from '@repo/ui';
import { DollarSign, Users, CreditCard, Activity, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { desc, sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';


export default async function AdminOverviewPage() {
  // Fetch overview metrics
  const allPayments = await db.query.payments.findMany({
    orderBy: [desc(payments.createdAt)],
  });

  const totalRevenueInCents = allPayments.reduce(
    (acc, curr) => (curr.status === 'succeeded' || curr.status === 'simulated' ? acc + curr.amountInCents : acc),
    0
  );

  const allUsers = await db.query.users.findMany({
    orderBy: [desc(users.createdAt)],
  });

  const allEntitlements = await db.query.entitlements.findMany();
  const trainingCount = allEntitlements.filter((e) => e.accessType === 'training' && e.status === 'active').length;
  const cookbookCount = allEntitlements.filter((e) => e.accessType === 'cookbook' && e.status === 'active').length;

  const recentAudits = await db.query.auditEvents.findMany({
    orderBy: [desc(auditEvents.createdAt)],
    limit: 6,
  });

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-stone-primary">Platform Overview</h1>
        <p className="text-xs text-stone-secondary mt-1">
          Real-time metrics across revenue, member entitlement distribution, and recent operations.
        </p>
      </div>

      {/* Top Metric Cards: Revenue First */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <Card className="bg-white border-stone-border shadow-sm p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-secondary">
            <span>Total Gross Revenue</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-primary">
            ${(totalRevenueInCents / 100).toFixed(2)}
          </div>
          <p className="text-[11px] text-stone-secondary">{allPayments.length} total orders processed</p>
        </Card>

        {/* Total Members */}
        <Card className="bg-white border-stone-border shadow-sm p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-secondary">
            <span>Registered Customers</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-primary">{allUsers.length}</div>
          <p className="text-[11px] text-stone-secondary">
            {allUsers.filter((u) => u.onboardingCompleted).length} finished onboarding
          </p>
        </Card>

        {/* Training Entitlements */}
        <Card className="bg-white border-stone-border shadow-sm p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-secondary">
            <span>Training Active Members</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-primary">{trainingCount}</div>
          <p className="text-[11px] text-stone-secondary">Active protocol licenses</p>
        </Card>

        {/* Cookbook Entitlements */}
        <Card className="bg-white border-stone-border shadow-sm p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-secondary">
            <span>Kitchen Active Members</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-stone-primary">{cookbookCount}</div>
          <p className="text-[11px] text-stone-secondary">Active culinary licenses</p>
        </Card>
      </div>

      {/* Two Column Grid: Recent Payments & Activity Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Transactions (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-stone-primary">Recent Transactions</h2>
            <Link href="/payments" className="text-xs text-brand-burgundy font-semibold hover:underline">
              View all payments →
            </Link>
          </div>

          <Card className="bg-white border-stone-border shadow-sm p-0 overflow-hidden">
            {allPayments.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-secondary">
                No transactions recorded yet. Complete a checkout test to see transactions here.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-base border-b border-stone-border text-stone-secondary font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-border">
                  {allPayments.slice(0, 5).map((pay) => (
                    <tr key={pay.id} className="hover:bg-surface-base/50">
                      <td className="p-3.5 font-medium text-stone-primary">{pay.customerEmail}</td>
                      <td className="p-3.5 capitalize font-medium">{pay.productSlug}</td>
                      <td className="p-3.5 font-semibold text-stone-primary">
                        ${(pay.amountInCents / 100).toFixed(2)}
                      </td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                          {pay.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-stone-secondary">
                        {new Date(pay.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>

        {/* Audit Activity Stream (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-stone-primary">System Audit Activity</h2>
            <span className="text-xs text-stone-secondary">Immutable logs</span>
          </div>

          <Card className="bg-white border-stone-border shadow-sm p-4 space-y-3">
            {recentAudits.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-secondary">
                No audit events recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {recentAudits.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between gap-3 text-xs pb-2.5 border-b border-stone-border/60 last:border-0 last:pb-0"
                  >
                    <div>
                      <span className="font-semibold text-stone-primary block">{event.action}</span>
                      <span className="text-[11px] text-stone-secondary">
                        Target: {event.targetType} ({event.targetId || 'global'})
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-secondary shrink-0">
                      {new Date(event.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

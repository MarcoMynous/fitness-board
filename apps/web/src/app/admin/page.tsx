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
        <h1 className="text-2xl font-bold text-[#1C1A18] font-serif">Platform Overview</h1>
        <p className="text-xs text-[#635F5B] mt-1">
          Real-time metrics across revenue, member entitlement distribution, and recent operations.
        </p>
      </div>

      {/* Top Metric Cards: Revenue First */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <Card className="bg-white border-[#E7E2DA] shadow-xs p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-[#635F5B]">
            <span>Total Gross Revenue</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-[#1C1A18] font-serif">
            ${(totalRevenueInCents / 100).toFixed(2)}
          </div>
          <p className="text-[11px] text-[#635F5B]">{allPayments.length} total orders processed</p>
        </Card>

        {/* Total Members */}
        <Card className="bg-white border-[#E7E2DA] shadow-xs p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-[#635F5B]">
            <span>Registered Customers</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-[#1C1A18] font-serif">{allUsers.length}</div>
          <p className="text-[11px] text-[#635F5B]">
            {allUsers.filter((u) => u.onboardingCompleted).length} finished onboarding
          </p>
        </Card>

        {/* Training Entitlements */}
        <Card className="bg-white border-[#E7E2DA] shadow-xs p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-[#635F5B]">
            <span>Training Active Members</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-[#1C1A18] font-serif">{trainingCount}</div>
          <p className="text-[11px] text-[#635F5B]">Active protocol licenses</p>
        </Card>

        {/* Cookbook Entitlements */}
        <Card className="bg-white border-[#E7E2DA] shadow-xs p-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-[#635F5B]">
            <span>Kitchen Active Members</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-bold text-[#1C1A18] font-serif">{cookbookCount}</div>
          <p className="text-[11px] text-[#635F5B]">Active culinary licenses</p>
        </Card>
      </div>

      {/* Two Column Grid: Recent Payments & Activity Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Transactions (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-[#1C1A18]">Recent Transactions</h2>
            <Link href="/admin/payments" className="text-xs text-[#9a4023] font-semibold hover:underline">
              View all payments →
            </Link>
          </div>

          <Card className="bg-white border-[#E7E2DA] shadow-xs p-0 overflow-hidden">
            {allPayments.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#635F5B]">
                No transactions recorded yet in the database.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] border-b border-[#E7E2DA] text-[#635F5B] font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E2DA]">
                  {allPayments.slice(0, 5).map((pay) => (
                    <tr key={pay.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="p-3.5 font-medium text-[#1C1A18]">{pay.customerEmail}</td>
                      <td className="p-3.5 uppercase text-[10px] font-semibold text-[#635F5B]">
                        {pay.productSlug}
                      </td>
                      <td className="p-3.5 font-mono font-semibold text-[#1C1A18]">
                        ${(pay.amountInCents / 100).toFixed(2)}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium capitalize ${
                            pay.status === 'succeeded' || pay.status === 'simulated'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {pay.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>

        {/* Recent Audit Log (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-[#1C1A18]">Recent Activity</h2>
            <Link href="/admin/activity" className="text-xs text-[#9a4023] font-semibold hover:underline">
              Full audit trail →
            </Link>
          </div>

          <Card className="bg-white border-[#E7E2DA] shadow-xs p-4 space-y-3">
            {recentAudits.length === 0 ? (
              <p className="text-xs text-[#635F5B] text-center py-6">No audit events recorded.</p>
            ) : (
              recentAudits.map((a) => (
                <div key={a.id} className="flex items-start justify-between text-xs py-1 border-b border-[#E7E2DA]/50 last:border-0">
                  <div>
                    <span className="font-bold text-[#1C1A18] block">{a.action}</span>
                    <span className="text-[10px] text-[#635F5B]">Actor: {a.actorType}</span>
                  </div>
                  <span className="text-[10px] text-[#635F5B] font-mono">
                    {new Date(a.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

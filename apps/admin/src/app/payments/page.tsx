import React from 'react';
import { db, payments } from '@repo/database';
import { desc } from 'drizzle-orm';
import { CreditCard, DollarSign, CheckCircle2, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPaymentsPage() {
  const allPayments = await db.query.payments.findMany({
    orderBy: [desc(payments.createdAt)],
  });

  const totalInCents = allPayments.reduce(
    (acc, curr) => (curr.status === 'succeeded' || curr.status === 'simulated' ? acc + curr.amountInCents : acc),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-700">
            PAYMENT LEDGER
          </span>
          <h1 className="text-2xl font-bold text-stone-primary mt-1 font-serif">
            Transactions & Revenue Ledger
          </h1>
          <p className="text-xs text-stone-secondary mt-1">
            Reconciled payments from Stripe & Paystack checkouts.
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-white border border-stone-border shadow-sm flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-bold text-stone-primary">
            ${(totalInCents / 100).toFixed(2)} Total Settled
          </span>
        </div>
      </div>

      <div className="bg-white border border-stone-border rounded-xl shadow-sm overflow-hidden">
        {allPayments.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-secondary">
            No transactions recorded yet in the database.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-sunken border-b border-stone-border text-stone-secondary uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5">Transaction ID</th>
                  <th className="p-3.5">Customer Email</th>
                  <th className="p-3.5">Product Purchased</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-border">
                {allPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-sunken/40 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] text-stone-primary">
                      {p.id.slice(0, 12)}...
                    </td>
                    <td className="p-3.5 font-medium text-stone-primary">
                      {p.customerEmail}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-stone-100 text-stone-700">
                        {p.productSlug}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-stone-primary font-mono">
                      ${(p.amountInCents / 100).toFixed(2)}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium capitalize ${
                          p.status === 'succeeded' || p.status === 'simulated'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-stone-secondary font-mono text-[11px]">
                      {new Date(p.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

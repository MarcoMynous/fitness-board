import React from 'react';
import { db, auditEvents } from '@repo/database';
import { desc } from 'drizzle-orm';
import { History, Shield, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminActivityPage() {
  const audits = await db.query.auditEvents.findMany({
    orderBy: [desc(auditEvents.createdAt)],
    limit: 50,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-700">
            AUDIT LOG
          </span>
          <h1 className="text-2xl font-bold text-stone-primary mt-1 font-serif">
            Security & Operations Audit
          </h1>
          <p className="text-xs text-stone-secondary mt-1">
            Immutable log of system events, authentication tokens, checkout settlements, and admin mutations.
          </p>
        </div>
      </div>

      <div className="bg-white border border-stone-border rounded-xl shadow-sm overflow-hidden">
        {audits.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-secondary">
            No audit records logged yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-sunken border-b border-stone-border text-stone-secondary uppercase text-[10px] tracking-wider font-semibold">
                <tr>
                  <th className="p-3.5">Actor</th>
                  <th className="p-3.5">Action</th>
                  <th className="p-3.5">Target</th>
                  <th className="p-3.5">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-border">
                {audits.map((a) => (
                  <tr key={a.id} className="hover:bg-surface-sunken/40 transition-colors">
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-stone-100 text-stone-700">
                        {a.actorType}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-stone-primary font-mono text-[11px]">
                      {a.action}
                    </td>
                    <td className="p-3.5 text-stone-secondary font-mono text-[11px]">
                      {a.targetType ? `${a.targetType}:${a.targetId || ''}` : 'system'}
                    </td>
                    <td className="p-3.5 text-stone-secondary font-mono text-[11px]">
                      {new Date(a.createdAt).toLocaleString()}
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

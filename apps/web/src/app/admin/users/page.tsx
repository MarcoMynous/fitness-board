import React from 'react';
import { db, users, entitlements, profiles, auditEvents } from '@repo/database';
import { desc, eq } from 'drizzle-orm';
import { Users as UsersIcon, ShieldCheck, Mail, Calendar, CheckCircle2, XCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const allUsers = await db.query.users.findMany({
    orderBy: [desc(users.createdAt)],
    with: {
      profile: true,
      entitlements: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-blue-50 text-blue-700">
            MEMBERSHIP DIRECTORY
          </span>
          <h1 className="text-2xl font-bold text-stone-primary mt-1 font-serif">
            Users & Entitlements Control
          </h1>
          <p className="text-xs text-stone-secondary mt-1">
            Live database records of registered members, profiles, onboarding states, and protocol licenses.
          </p>
        </div>
        <div className="px-3.5 py-1.5 rounded-lg bg-white border border-stone-border text-xs font-semibold text-stone-secondary shadow-sm">
          {allUsers.length} Total Users Registered
        </div>
      </div>

      <div className="bg-white border border-stone-border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-sunken border-b border-stone-border text-stone-secondary uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="p-3.5">Member Identity</th>
                <th className="p-3.5">Role & Status</th>
                <th className="p-3.5">Onboarding Profile</th>
                <th className="p-3.5">Active Entitlements</th>
                <th className="p-3.5">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-border">
              {allUsers.map((u) => {
                const trainingActive = u.entitlements.some(
                  (e) => e.accessType === 'training' && e.status === 'active'
                );
                const cookbookActive = u.entitlements.some(
                  (e) => e.accessType === 'cookbook' && e.status === 'active'
                );

                return (
                  <tr key={u.id} className="hover:bg-surface-sunken/40 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-burgundy/10 text-brand-burgundy font-serif font-bold text-xs flex items-center justify-center shrink-0">
                          {u.profile?.fullName?.[0] || u.email[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-stone-primary">
                            {u.profile?.fullName || 'Anonymous Member'}
                          </p>
                          <p className="text-[11px] text-stone-secondary font-mono flex items-center gap-1">
                            <Mail className="w-3 h-3 text-stone-400" />
                            {u.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-stone-100 text-stone-700">
                          {u.role}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium capitalize ${
                            u.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {u.status}
                        </span>
                      </div>
                    </td>

                    <td className="p-3.5">
                      {u.onboardingCompleted ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                          <p className="text-[10px] text-stone-secondary">
                            Goal: {u.profile?.fitnessGoal?.replace('_', ' ') || 'General'}
                          </p>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] text-stone-400">
                          <XCircle className="w-3 h-3" />
                          Pending Onboarding
                        </span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        {trainingActive ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Training Protocol
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-stone-100 text-stone-400">
                            No Training
                          </span>
                        )}
                        {cookbookActive ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                            Cookbook Access
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-stone-100 text-stone-400">
                            No Kitchen
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5 text-stone-secondary font-mono text-[11px]">
                      {new Date(u.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

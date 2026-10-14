import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Dumbbell,
  History,
  Settings,
  ExternalLink,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Platform Operations & Control — Creator Fitness',
  description: 'Operational admin dashboard for members, payments, entitlements, and content.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: 'Overview', href: '/', icon: LayoutDashboard },
    { label: 'Users & Entitlements', href: '/users', icon: Users },
    { label: 'Payments', href: '/payments', icon: CreditCard },
    { label: 'Content CMS', href: '/content', icon: Dumbbell },
    { label: 'Activity & Audit', href: '/activity', icon: History },
  ];

  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-base text-stone-primary flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-stone-border flex flex-col justify-between hidden md:flex shrink-0">
          <div>
            <div className="h-16 px-6 border-b border-stone-border flex items-center gap-2.5">
              <span className="w-7 h-7 rounded bg-brand-burgundy text-white flex items-center justify-center font-bold text-xs font-serif">
                M
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-xs tracking-wider text-stone-primary">
                  METHOD ADMIN
                </span>
                <span className="text-[10px] text-stone-secondary uppercase">
                  Operations Console
                </span>
              </div>
            </div>

            <nav className="p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-stone-secondary hover:text-stone-primary hover:bg-surface-sunken rounded-lg transition-colors"
                  >
                    <Icon className="w-4 h-4 text-stone-secondary" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t border-stone-border space-y-2">
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-xs font-medium text-stone-secondary hover:text-stone-primary hover:bg-surface-sunken rounded-lg transition-colors"
            >
              <span>View Member App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 bg-white border-b border-stone-border px-6 flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-secondary uppercase tracking-wider">
              Platform Administration
            </span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Production Ready
              </span>
            </div>
          </header>

          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}

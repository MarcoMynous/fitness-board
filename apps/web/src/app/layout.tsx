import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const editorialFont = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Creator Fitness & Performance — Training & High-Performance Nutrition',
  description:
    'Structured progressive strength protocols and chef-crafted nutrition calibrated for high performance, athletic longevity, and physical mastery.',
  openGraph: {
    title: 'Creator Fitness & Performance',
    description: 'A mobile-first, creator-led physical training protocol and culinary system.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF8F5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${editorialFont.variable} ${sansFont.variable}`}>
      <body className="min-h-screen bg-surface-base text-stone-primary flex flex-col">
        {children}
      </body>
    </html>
  );
}

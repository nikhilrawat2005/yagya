import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/data/site';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-surface text-on-surface antialiased font-sans selection:bg-primary-container selection:text-surface">
        <SmoothScrollProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen pt-24">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

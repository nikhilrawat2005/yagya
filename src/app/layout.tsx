import type { Metadata } from 'next';
import {
  Playfair_Display,
  Playpen_Sans,
  Plus_Jakarta_Sans,
  Space_Mono,
} from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/data/site';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { PageTransition } from '@/components/motion/PageTransition';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const playpenSans = Playpen_Sans({
  subsets: ['latin'],
  variable: '--font-playpen',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — Seeds & Berries, Straight From The Farm`,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[
        playfair.variable,
        playpenSans.variable,
        plusJakarta.variable,
        spaceMono.variable,
      ].join(' ')}
    >
      <body className="bg-oat text-indigo antialiased font-sans selection:bg-seabuckthorn selection:text-oat">
        <SmoothScrollProvider>
          <CursorGlow />
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen pt-24 md:pt-28">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

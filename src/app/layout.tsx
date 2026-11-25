import type { Metadata, Viewport } from 'next';
import {
  Playfair_Display,
  DM_Sans,
  Caveat,
} from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/data/site';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { PageTransition } from '@/components/motion/PageTransition';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  adjustFontFallback: true,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  adjustFontFallback: true,
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#141C2B',
};

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
        dmSans.variable,
        caveat.variable,
      ].join(' ')}
    >
      <body className="bg-navy text-oat antialiased font-sans selection:bg-flame selection:text-oat">
        <SmoothScrollProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

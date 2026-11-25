import type { Metadata, Viewport } from 'next';
import {
  Playfair_Display,
  DM_Sans,
  Caveat,
} from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/data/site';
import { ASSETS } from '@/lib/assets';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { PageTransition } from '@/components/motion/PageTransition';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${siteConfig.name} - Seeds & Berries, Straight From The Farm`,
  description: siteConfig.description,
  icons: {
    icon: ASSETS.brand.logoPrimary,
  },
};

export const viewport: Viewport = {
  themeColor: '#141C2B',
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
      <body className="bg-navy text-oat antialiased font-sans selection:bg-flame selection:text-navy">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-[4px] focus:bg-flame focus:text-navy focus:font-semibold focus:text-xs"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <Navbar />
          <CartDrawer />
          <main id="main-content" className="min-h-[100dvh]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

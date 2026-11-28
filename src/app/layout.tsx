import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  Caveat,
} from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/config/site';
import { ASSETS } from '@/lib/assets';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { PageTransition } from '@/components/motion/PageTransition';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${siteConfig.brandName} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  robots: {
    index: false,
    follow: false,
  },
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
        cormorant.variable,
        jakarta.variable,
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
        <AuthProvider>
          <SmoothScrollProvider>
            <Navbar />
            <CartDrawer />
            <main id="main-content" className="min-h-[100dvh]">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display, Caveat, Space_Mono } from 'next/font/google';
import './globals.css';
import './tailwind-built.css';
import { siteConfig } from '@/lib/data/site';
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-fragilita',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
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
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} ${caveat.variable} ${spaceMono.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-oat text-blueberry antialiased font-sans selection:bg-seabuckthorn selection:text-white">
        <SmoothScrollProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen pt-24 md:pt-28">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

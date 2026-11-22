export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  announcement: string;
  freeShippingThreshold: number;
  currency: string;
  currencySymbol: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    instagram: string;
    twitter: string;
    youtube: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'Botanica Pantry',
  tagline: 'Clean food. Nothing else.',
  description:
    'Single-origin harvests and heritage superfoods sourced directly from ethical smallholder farmers across India. Zero preservatives, fillers, or artificial processing.',
  announcement: 'Free shipping over ₹499 · Packed fresh in small batches',
  freeShippingThreshold: 499,
  currency: 'INR',
  currencySymbol: '₹',
  contact: {
    email: 'care@botanicapantry.in',
    phone: '+91 98765 43210',
    address: 'Atelier Botanica, DLF Phase 5, Gurugram, HR 122002',
  },
  social: {
    instagram: 'https://instagram.com/botanicapantry',
    twitter: 'https://twitter.com/botanicapantry',
    youtube: 'https://youtube.com/@botanicapantry',
  },
};

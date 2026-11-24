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
  name: 'Yagya',
  tagline: 'Seeds & Berries, Straight From The Farm',
  description:
    'Honest Indian seeds and mountain berries harvested directly from partner farming communities and packed fresh in small batches.',
  announcement: 'Seeds & Berries Straight From Indian Farms · Free Dispatch Over ₹499',
  freeShippingThreshold: 499,
  currency: 'INR',
  currencySymbol: '₹',
  contact: {
    email: 'care@yagyafoods.in',
    phone: '+91 98765 43210',
    address: 'Yagya Naturals, India',
  },
  social: {
    instagram: 'https://instagram.com/yagyafoods',
    twitter: 'https://twitter.com/yagyafoods',
    youtube: 'https://youtube.com/@yagyafoods',
  },
};

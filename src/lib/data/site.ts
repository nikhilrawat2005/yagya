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
  tagline: 'Clean Superfoods. Nothing Else.',
  description:
    'Authentic Himalayan dried sea buckthorn berries, seeds & heritage superfoods. Sourced with zero added sugar directly from high-altitude ethical farms.',
  announcement: '100% Pure Himalayan Superfoods · Free shipping over ₹499',
  freeShippingThreshold: 499,
  currency: 'INR',
  currencySymbol: '₹',
  contact: {
    email: 'care@yagyafoods.in',
    phone: '+91 98765 43210',
    address: 'Yagya Naturals, Himalayan Organic Hub, India',
  },
  social: {
    instagram: 'https://instagram.com/yagyafoods',
    twitter: 'https://twitter.com/yagyafoods',
    youtube: 'https://youtube.com/@yagyafoods',
  },
};

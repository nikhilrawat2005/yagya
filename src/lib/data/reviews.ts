export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  location: string;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  productSlug?: string;
}

export const reviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Suniti Sharma',
    rating: 5,
    date: '18 Nov 2026',
    location: 'Jaipur, RJ',
    title: 'The cleanest crunch I have ever found',
    comment:
      'The difference between commercial makhana and Botanica’s harvest is night and day. You can taste the purity and fresh roasting without any stale oil smell.',
    verifiedBuyer: true,
    productSlug: 'roasted-himalayan-makhana',
  },
  {
    id: 'rev-2',
    author: 'Karan Mehra',
    rating: 5,
    date: '14 Nov 2026',
    location: 'Bengaluru, KA',
    title: 'Staple for my morning ritual',
    comment:
      'The black chia seeds gel evenly in almond milk within 10 minutes. Clean, zero grit or dirt residue. Packaging is aesthetic on my open kitchen shelf.',
    verifiedBuyer: true,
    productSlug: 'raw-organic-chia-seeds',
  },
  {
    id: 'rev-3',
    author: 'Arundhati Roy',
    rating: 5,
    date: '09 Nov 2026',
    location: 'Dehradun, UK',
    title: 'Rare Nubra golden berries',
    comment:
      'Finding real dried sea buckthorn without added sulfur or syrup in India was impossible until Botanica. It has that authentic wild tang.',
    verifiedBuyer: true,
    productSlug: 'wild-sea-buckthorn-dried',
  },
];

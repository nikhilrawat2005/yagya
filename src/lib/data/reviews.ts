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
    title: 'Crisp pumpkin seeds with real farm freshness',
    comment:
      'Clean, plump kaddu kernels without any stale oil smell. We roast a spoonful every morning for salads and oats.',
    verifiedBuyer: true,
    productSlug: 'pumpkin-seeds',
  },
  {
    id: 'rev-2',
    author: 'Karan Mehra',
    rating: 5,
    date: '14 Nov 2026',
    location: 'Bengaluru, KA',
    title: 'Staple for my morning ritual',
    comment:
      'The chia seeds hydrate evenly in water within 15 minutes with zero dust or grit. Honest packaging and crisp seal.',
    verifiedBuyer: true,
    productSlug: 'chia-seeds',
  },
  {
    id: 'rev-3',
    author: 'Arundhati Roy',
    rating: 5,
    date: '09 Nov 2026',
    location: 'Dehradun, UK',
    title: 'Authentic tangy sea buckthorn berries',
    comment:
      'Finding whole dried sea buckthorn without added sugar or syrup was rare until Yagya. Clean, vibrant mountain tartness.',
    verifiedBuyer: true,
    productSlug: 'dried-sea-buckthorn-berries',
  },
];

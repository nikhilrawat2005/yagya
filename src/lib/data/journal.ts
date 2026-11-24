export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
}

export const journalArticles: JournalArticle[] = [
  {
    id: 'art-1',
    slug: 'rabi-flax-harvest',
    title: 'Winter Rabi Harvests: Why Crisp Weather Deepens Alsi Aroma',
    date: '12 Nov 2026',
    readTime: '4 min read',
    excerpt:
      'Across rainfed and irrigated fields in Madhya Pradesh and Rajasthan, winter flax develops rich oil density before direct farm-to-pack sorting.',
    content:
      'Known traditionally as Alsi in Hindi and Jawas in Marathi, flax thrives in cool winter soils. Direct farm partnerships ensure every seed batch is cleaned and packed hygienically without middleman delays.',
    category: 'Harvest Stories',
    image: '/images/3d/seed-flax-01.webp',
  },
  {
    id: 'art-2',
    slug: 'sea-buckthorn-mountain-pulp',
    title: 'Zero Added Sugar: Preserving Whole Sea Buckthorn Pulp & Seed Oils',
    date: '02 Nov 2026',
    readTime: '3 min read',
    excerpt:
      'Gentle dehydration locks in plant-based Omega-7, Vitamin C, and natural tartness without artificial glaze or sugar.',
    content:
      'Unlike heavily sweetened dried fruit snacks, whole dried sea buckthorn berries retain their nutrient-rich pulp and seeds for daily oatmeal, yogurt, and warm infusions.',
    category: 'Farm Craft',
    image: '/images/3d/berry-seabuckthorn-01.webp',
  },
];

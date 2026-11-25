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
      'Across rainfed and irrigated winter fields, cool nights help flax develop rich oil density before direct farm-to-pack sorting.',
    content:
      'Known traditionally as Alsi and Jawas, flax thrives in cool winter soils. Direct farm partnerships ensure every seed batch is cleaned and packed hygienically without middleman delays.',
    category: 'Harvest Stories',
    image: '/images/products/flax-seeds.webp',
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
    image: '/images/products/dried-sea-buckthorn-berries.webp',
  },
  {
    id: 'art-3',
    slug: 'orchard-anjeer-and-dates',
    title: 'Sun-Cured Orchard Figs & Dates: Sweetness Without Glaze',
    date: '25 Oct 2026',
    readTime: '3 min read',
    excerpt:
      'Plump Anjeer rings and soft hand-sorted dates cured slowly to preserve natural honeyed chew and seed texture.',
    content:
      'From soaked morning figs to stuffed pre-run dates, unglazed orchard fruit offers clean, steady energy straight from warm groves.',
    category: 'Orchard Notes',
    image: '/images/products/dried-anjeer-figs.webp',
  },
  {
    id: 'art-4',
    slug: 'slow-roasted-makhana-craft',
    title: 'Slow-Roasted Fox Nuts: Garden Mint, Kala Namak & Warm Spices',
    date: '18 Oct 2026',
    readTime: '4 min read',
    excerpt:
      'Light, airy popped lotus seeds tumbled gently in small drums with black salt crystals, cracked pepper, and red chilies.',
    content:
      'Picked from tranquil wetland ponds and crisp-roasted in small batches, our five seasoned makhana harvests pair light crunch with honest pantry botanicals.',
    category: 'Roastery Craft',
    image: '/images/products/mint-makhana.webp',
  },
];

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
    slug: 'mithila-lotus-harvest',
    title: 'Wading into the Mist: Harvest Season in Mithila Ponds',
    date: '12 Nov 2026',
    readTime: '4 min read',
    excerpt: 'Behind the morning light in Bihar where lotus seeds are hand-harvested by generational farming collectives.',
    content:
      'Before sunrise, harvesters wade chest-deep into tranquil ponds to gather wild lotus pods. The journey from muddy bed to sun-dried kernel requires patience, woodfire roasting, and manual grading...',
    category: 'Harvest Stories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Y_yLhxexFpa0Jj0wcVSGACCOsVqlxTP3X4U_acAphLNMt8lcuhLybZrpS6UT9ck5zsag6131m7mqK-Rqh3u2NNmwyed6YWfqrZVltPgtUk5va2Hzum9fBwJxrdNDVq384xTzdSX_t3Bi5kEEkd4806ux8w96IxhUElTkKfUUW8yWay3JRgkVqx7Y5rPuZfPa8IoW6l8lLnhkc8MbQ5CjIdnbRL5D6RV8gpcS-xZM',
  },
  {
    id: 'art-2',
    slug: 'the-art-of-slow-roasting',
    title: 'Why Slow Roasting Preserves Delicate Seed Lipids',
    date: '02 Nov 2026',
    readTime: '3 min read',
    excerpt: 'High industrial heat oxidizes healthy oils. Here is why our artisan batch process keeps every seed raw or gently warm-roasted.',
    content:
      'Seeds are tiny nutritional capsules packed with volatile omega lipids. When subjected to commercial flash-frying, those beneficial compounds break down. At Botanica Pantry, we roast in micro-batches with slow heat...',
    category: 'Pantry Philosophy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY9GJkKTyIXx-1DQ7wR_lU6-rJXdpng8yDILjleCstC0Zmt2eXkJDtt4Dv2SiDDvowiNSbVnx3nC2pO8SfGS6yYyVM3n9j5PhJtTh4EtXb4uZv4qTXpuXftKzqeqZV_q_H9tRCq305gS2Ouk5vwav5ZTvqMViuUL28aLOeeNiuyi7-MfPHzLg4BUOgrsQO5nn1ESh2GuS9HZGPy9a0oR5T2_MMqiG6bk0CYnR3Al7O',
  },
];

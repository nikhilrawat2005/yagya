export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  originBadge?: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: 'artisan-makhana',
    name: 'Fox Seeds (Makhana)',
    slug: 'makhana',
    description: 'Slow-roasted Bihar lotus pop',
    originBadge: 'Bihar Origin',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP4Vilqbn8g1ZSX_5ZgtTsHPuJ0D6mG7L6Epwxq4QLiHaxb_uaTAEFaYUsbaV0UltEkgCEpCgEtwDmqiA1aR3tGq6ts94qLfi4Ye0aOHodGNDOBQ5Am1aXJhQcBYulK_BL9vxO0dRuvfa9TIqx91kpdlUe8HOE1J5A0mmDYTnJDFZPP-SYL_P5MEJGWX3e3f_NtacKU7TTQlUA7jopHu31lv9Z8riqLG5fxVFKS_xD',
  },
  {
    id: 'chia-seeds',
    name: 'Chia Seeds',
    slug: 'chia',
    description: 'Omega-rich highland harvest',
    originBadge: 'Highland',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmJgYv-rkofXCeYe4T-0CEc319pGNtQzyUwSC-7CfMtfE9Y8X2DdCNmRwhCI0c_CON8qYEXuyIscJEVo7EqHlv1s7OrUcbYF1GaClJScd-0o87B4qw9cEf2LsYsM9t_9AbTe8fKslzA8GTuNnwKKZ-nYSu8yAPTal_ZmDK6jR50iwBdiZkZJtcktuFh1p37K_MAkKP0tMWFpNQQ0V_JPcwC7QZmjekTsc20f9WSaXA',
  },
  {
    id: 'sunflower-seeds',
    name: 'Sunflower Seeds',
    slug: 'sunflower',
    description: 'Lightly shelled raw kernels',
    originBadge: 'Sun-Grown',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzFYqUYE2Mwzm999Q0TiupXTjvuRkJfeAbGrzTSRjh91f2wj_yYWnG3q3-DwBKGEltYX4qnMSds571lR0BDfvjkc35CZ_i7WEEcEoBHf2jZOC-2fAN1MSkNy2lKUhKua2BfjAc_xCMmmuMbxMdJ84vna1WmEqWAiZxq8o-WoQ76dSmzJpixMb_NkpDF0pINEYx419_MQ94pcFO-7aLQBGhCrb2b6y05HxHa6cKUbqN',
  },
  {
    id: 'pumpkin-seeds',
    name: 'Pumpkin Seeds',
    slug: 'pumpkin',
    description: 'Mineral-dense green pepitas',
    originBadge: 'Himalayan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQGgmjyW7NSPMgcKpBs8nBF4bi15O80IXTyLnU1B-VKVaMHKNJD6APOKoV01WvDR3OMkkwQuFHXQSDt9obq3WbiBjFU4eLWVJr0h6p1czENkOdCeVHsTSs5JJhGkOyalrYlxLy_eEEpIWzUlB3DWuJNJRS3TwzB6QH-SDa6n6eT-wF6QdgpGhPRqHwHoHGN9EHy7ZY1vLMKRMkESGkcLthYE4CPQXidgoBoilE1lSx',
  },
  {
    id: 'black-berries',
    name: 'Black Berries',
    slug: 'black-berries',
    description: 'Sun-dried Himalayan wild berries',
    originBadge: 'Wild Forest',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCejakrhL5Oz9ipuPvVIOktt4NY8jNlXW02aUjTXMB5X4IJ8oRwR9inr90SMM7c8AbIz8-7PP5LwSJC1VKF8sjhisNHq9CZ4L8emAP5Qy8BnrGox_5tft0bmCTPQmTP9I9N3jadRN-Gw1Ao7PQ77jNPrfzfVm8P0vF58Id1tPrEY_s2EmVD10YEPY6U77c915xA5jMeGHK_2moF8l7hHgdr5MuVeR2GiK5ncRlv7kSx',
  },
  {
    id: 'red-berries',
    name: 'Red Berries',
    slug: 'red-berries',
    description: 'Tart organic whole cranberries',
    originBadge: 'Organic Tart',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm22Lm9UyIrVJOuFInDQnq1X46pmBBaD2mISjeMPNvtgAsfzM3GzUhKmWaYaUBh0q6qwJB6WOTqsfpW06-7cmqsVC1919q1nJ-NKWJVK89iaKALlOmlWzznIAb-6uLNl3J4EIfrH8H7xS7FblYU674jpdz66pr3rWtTQudXpv7PPofzn60VQPEN4m9pRdT6Kz8MOuBSjjssigEMJJ-GuO0eH5qQ8sbnbpbeGvPDzV8',
  },
  {
    id: 'sea-buckthorn',
    name: 'Sea Buckthorn',
    slug: 'sea-buckthorn',
    description: 'High-altitude golden berries',
    originBadge: 'Ladakh Gold',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9lYncPXx9zA5fkVEkn9VOEq6AtzRtV1nvT-2VFDcSs5t-lqiepue8hzjW41tN59fiY3Q7nR19kRPqJrkzsJd78jzYJbc99mWjwLUIs_-avRYFkvHZHrsOzu7YkkgzhkYswTYTE_KKd9RDb8D2oqAU0GtRLnf58WT8szqvH6p7rKj4-rkP4kIzeADrbvcAT_W42YKtxwFJtrhybbjbgCJL4Tyz6SnNpFIlgojaNVMi',
  },
  {
    id: 'pantry-bundles',
    name: 'Artisan Pantry Mix',
    slug: 'bundles',
    description: 'Hand-blended heritage seed essentials',
    originBadge: 'Curated Pairings',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLhdWTOkPbl9dZc-gYpIyPmxdmkOHmHL6gvXlbpCWApZ03Ulm2Zv1ZBacadTJHcU12V3nIcct6dcvvtqxGxEo8PMv7Q8DdEbBqyeqkd-H6rd_pSzo4kRjrVh--l-ijQ7fA4d4HgT0pSB54nFKzVFK_9WGW43_3CIiHtF4FChNyCT9SX6vWE7tvyqNxqHxItWbVsul2bgPqHnXQBeUE-mTaW-CAttOCOAeWS-Iu9j85',
  },
];

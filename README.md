# Botanica Pantry — Next.js Superfoods Store

An artisan, data-driven e-commerce frontend built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Motion (Framer Motion) + Lenis**.

---

## How to Change Products, Images, and Brand Text

All store content is driven by a single source of truth in `/src/lib/data/`. You will **never** need to touch UI components or layouts when updating products or branding.

### 1. Adding or Editing Products
* **File:** [`src/lib/data/products.ts`](file:///c:/Users/NIKHIL%20RAWAT/OneDrive/Desktop/Nikhil%20PROJECT/Cipher/yagya/src/lib/data/products.ts)
* Each product conforms to the `Product` schema:
  ```typescript
  {
    id: 'prod-unique-id',
    slug: 'unique-product-slug', // Used in URL: /product/unique-product-slug
    name: 'Roasted Lotus Pops',
    category: 'Fox Seeds (Makhana)',
    categorySlug: 'makhana', // Matches categories.ts
    shortDescription: 'One-line summary for shop & card grids',
    description: 'Detailed description for product detail page',
    provenance: 'Mithila Lotus Kernels · Batch #085',
    origin: 'Bihar Origin',
    images: [
      { src: '/products/makhana/hero.jpg', alt: 'Artisan makhana pouch' },
      { src: '/products/makhana/detail.jpg', alt: 'Overhead bowl shot' }
    ],
    variants: [
      { id: 'v-100', label: '100g Sampler', weight: '100g', price: 129, mrp: 159, sku: 'BP-100', stock: 50 },
      { id: 'v-250', label: '250g Regular', weight: '250g', price: 249, mrp: 299, sku: 'BP-250', stock: 100 }
    ],
    badges: ['Bestseller', 'Batch #085'],
    rating: 4.9,
    reviewCount: 142,
    nutritionFacts: [
      { label: 'Plant Protein', value: '9.7g / 100g' },
      { label: 'Dietary Fiber', value: '14.5g / 100g' }
    ],
    howToUse: ['Enjoy directly from pouch', 'Toss into warm curries'],
    storage: 'Store airtight in cool pantry.',
    tags: ['makhana', 'high-protein', 'vegan'],
    isFeatured: true,
    isBestseller: true,
    relatedSlugs: ['raw-organic-chia-seeds']
  }
  ```
* **Adding a product takes 2 minutes:** Just add an object to the `products` array and images. Everything (Shop filters, Search, Bestsellers, Cart, Checkout, Pairs-well-with) updates automatically.

### 2. Adding or Replacing Product Images
* Place new product photos inside `/public/products/<slug>/` or reference remote URLs.
* If an image link is broken or missing, the built-in `<ProductImageWithFallback />` displays a graceful neutral branded placeholder so your design never breaks.

### 3. Updating Categories
* **File:** [`src/lib/data/categories.ts`](file:///c:/Users/NIKHIL%20RAWAT/OneDrive/Desktop/Nikhil%20PROJECT/Cipher/yagya/src/lib/data/categories.ts)
* Add or rename categories here; the Homepage *"Shop by superfood"* grid and the Shop category pills dynamically render from this list.

### 4. Updating Brand Text, Announcements & Policies
* **File:** [`src/lib/data/site.ts`](file:///c:/Users/NIKHIL%20RAWAT/OneDrive/Desktop/Nikhil%20PROJECT/Cipher/yagya/src/lib/data/site.ts)
* Configures:
  * Brand name (`Botanica Pantry`) & Tagline
  * Top Announcement Bar text
  * Free Shipping threshold (`₹499`) & currency
  * Care email, phone, and atelier address
  * Social links

---

## How to Run Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the Next.js dev server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
3. **Build and Test production build:**
   ```bash
   npm run build
   npm run start
   ```
4. **Type check & Lint:**
   ```bash
   npx tsc --noEmit
   npm run lint
   ```

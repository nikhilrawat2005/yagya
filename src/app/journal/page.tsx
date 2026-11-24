import { getJournalArticles } from '@/lib/services/productService';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

export default async function JournalPage() {
  const articles = await getJournalArticles();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-2">
          Field Chronicle
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-indigo font-semibold mb-3">
          Harvest Journal
        </h1>
        <p className="font-script-body text-base text-indigo">
          Notes from Indian seed belts, cool hill berry bushes, and farm-direct packing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-apricot/45 rounded-2xl overflow-hidden border-2 border-charcoal flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] bg-oat border-b border-charcoal/20 p-6 flex items-center justify-center">
                <ProductImageWithFallback
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between font-mono-meta text-[11px] uppercase tracking-wider mb-2">
                  <span className="text-cranberry font-bold">{art.category}</span>
                  <span className="text-indigo/75">{art.readTime}</span>
                </div>
                <h2 className="font-sans text-lg font-semibold text-indigo mb-2 leading-snug">
                  {art.title}
                </h2>
                <p className="font-script-body text-sm text-indigo/90 line-clamp-3">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <span className="font-mono-meta text-[11px] text-indigo/75">{art.date}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

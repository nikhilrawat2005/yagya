import { getJournalArticles } from '@/lib/services/productService';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';

export default async function JournalPage() {
  const articles = await getJournalArticles();

  return (
    <div className="max-w-[1000px] mx-auto px-4 md:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-secondary block mb-1">
          Atelier Chronicle
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-primary font-normal mb-3">
          Harvest Journal
        </h1>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Essays on regenerative cultivation, seasonal foraging notes, and mindful seed rituals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
          >
            <div>
              <div className="relative aspect-[16/10] bg-surface">
                <ProductImageWithFallback src={art.image} alt={art.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex justify-between text-[11px] font-semibold text-secondary uppercase tracking-wider mb-2">
                  <span>{art.category}</span>
                  <span className="text-on-surface-variant/70">{art.readTime}</span>
                </div>
                <h2 className="font-serif text-xl font-medium text-primary mb-2 leading-snug">
                  {art.title}
                </h2>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2">
              <span className="text-[11px] text-on-surface-variant/60">{art.date}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

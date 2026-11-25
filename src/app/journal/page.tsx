import { getJournalArticles } from '@/lib/services/productService';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { Card3D, Card3DLayer } from '@/components/ui/Card3D';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import {
  DoodleUnderline,
  DoodleLeaf,
  DoodleSparkle,
} from '@/components/doodles';

export default async function JournalPage() {
  const articles = await getJournalArticles();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <FadeInSection className="relative text-center max-w-xl mx-auto mb-12">
        <DoodleLeaf
          variant="sprig"
          delay={0.25}
          className="hidden sm:block absolute -left-8 top-2 w-11 h-11 opacity-80"
        />
        <DoodleSparkle
          delay={0.3}
          className="hidden sm:block absolute -right-4 top-1 w-7 h-7 opacity-85"
        />
        <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block mb-2">
          Field Chronicle
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-indigo font-semibold mb-3">
          Harvest{' '}
          <span className="relative inline-block text-cranberry italic">
            Journal
            <DoodleUnderline
              variant="single"
              delay={0.2}
              className="absolute -bottom-1.5 left-0 w-full"
            />
          </span>
        </h1>
        <p className="font-script-body text-base text-indigo">
          Notes from Indian seed belts, cool hill berry bushes, and farm-direct packing.
        </p>
      </FadeInSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((art) => (
          <StaggerItem key={art.id}>
            <Card3D
              as="article"
              maxTilt={6}
              className="h-full"
              surfaceClassName="group bg-apricot/45 hover:bg-apricot/80 overflow-hidden border-2 border-charcoal flex flex-col justify-between transition-colors duration-250"
            >
              <div>
                <div className="relative aspect-[16/10] bg-oat border-b border-charcoal/20 p-6 flex items-center justify-center overflow-hidden">
                  <ProductImageWithFallback
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-108"
                  />
                </div>
                <Card3DLayer depth={12} className="p-6">
                  <div className="flex justify-between items-center font-mono-meta text-[11px] uppercase tracking-wider mb-2">
                    <span className="glow-badge px-2.5 py-0.5 rounded-full bg-peach text-indigo border border-charcoal/20 text-cranberry font-bold">
                      {art.category}
                    </span>
                    <span className="text-indigo/75">{art.readTime}</span>
                  </div>
                  <h2 className="font-sans text-lg font-semibold text-indigo group-hover:text-burnt transition-colors mb-2 leading-snug">
                    {art.title}
                  </h2>
                  <p className="font-script-body text-sm text-indigo/90 line-clamp-3">
                    {art.excerpt}
                  </p>
                </Card3DLayer>
              </div>

              <Card3DLayer depth={8} className="px-6 pb-6 pt-2">
                <span className="font-mono-meta text-[11px] text-indigo/75">{art.date}</span>
              </Card3DLayer>
            </Card3D>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}

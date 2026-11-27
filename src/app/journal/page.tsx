import { getJournalArticles } from '@/lib/services/productService';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { SpotlightCard } from '@/components/react-bits/SpotlightCard';
import { SplitText } from '@/components/react-bits/SplitText';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowButton } from '@/components/ui/GlowButton';

export default async function JournalPage() {
  const articles = await getJournalArticles();
  const firstHalf = articles.slice(0, 2);
  const secondHalf = articles.slice(2);

  return (
    <PageBackgroundSet
      page="signature"
      chapters={[
        {
          id: 'journal-01',
          chapterNumber: '01',
          chapterLabel: 'Field Chronicle',
          content: (
            <div className="max-w-5xl mx-auto relative">
              <FadeInSection className="relative z-10 text-center max-w-xl mx-auto mb-10">
                <SplitText
                  as="h1"
                  trigger="mount"
                  text="Harvest Journal"
                  className="font-display text-4xl sm:text-5xl text-oat font-medium mb-3"
                />
                <p className="text-sm sm:text-base text-apricot/90">
                  Notes from winter seed belts, cool mountain berry bushes, and farm-direct packing.
                </p>
              </FadeInSection>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {firstHalf.map((art) => (
                  <StaggerItem key={art.id}>
                    <SpotlightCard
                      as="article"
                      spotlightColor="rgba(223, 127, 37, 0.14)"
                      className="h-full bg-[#141C2B]/55 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <div className="relative aspect-[16/10] bg-navy/40 border-b border-white/15 overflow-hidden">
                            <ProductImageWithFallback
                              src={art.image}
                              alt={art.title}
                              fill
                              className={
                                art.image.includes('/assets/products/')
                                  ? 'object-cover transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-105'
                                  : 'object-contain p-4 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-105'
                              }
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-center text-[10px] font-ui-label mb-3">
                              <span className="px-2.5 py-0.5 rounded-[4px] bg-oat/15 text-peach border border-white/20">
                                {art.category}
                              </span>
                              <span className="text-apricot/85">{art.readTime}</span>
                            </div>
                            <h2 className="font-display text-xl font-medium text-oat group-hover:text-peach transition-colors mb-2 leading-snug">
                              {art.title}
                            </h2>
                            <p className="text-sm text-apricot/90 line-clamp-3 leading-relaxed">
                              {art.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="px-6 pb-6 pt-2">
                          <span className="text-[11px] text-apricot/85">{art.date}</span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ),
        },
        {
          id: 'journal-02',
          chapterNumber: '02',
          chapterLabel: 'Orchard & Roastery',
          content: (
            <div className="max-w-5xl mx-auto space-y-8 relative">
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {secondHalf.map((art) => (
                  <StaggerItem key={art.id}>
                    <SpotlightCard
                      as="article"
                      spotlightColor="rgba(223, 127, 37, 0.14)"
                      className="h-full bg-[#141C2B]/55 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <div className="relative aspect-[16/10] bg-navy/40 border-b border-white/15 overflow-hidden">
                            <ProductImageWithFallback
                              src={art.image}
                              alt={art.title}
                              fill
                              className={
                                art.image.includes('/assets/products/')
                                  ? 'object-cover transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-105'
                                  : 'object-contain p-4 transition-transform duration-500 ease-[var(--ease-smooth)] group-hover:scale-105'
                              }
                            />
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-center text-[10px] font-ui-label mb-3">
                              <span className="px-2.5 py-0.5 rounded-[4px] bg-oat/15 text-peach border border-white/20">
                                {art.category}
                              </span>
                              <span className="text-apricot/85">{art.readTime}</span>
                            </div>
                            <h2 className="font-display text-xl font-medium text-oat group-hover:text-peach transition-colors mb-2 leading-snug">
                              {art.title}
                            </h2>
                            <p className="text-sm text-apricot/90 line-clamp-3 leading-relaxed">
                              {art.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="px-6 pb-6 pt-2">
                          <span className="text-[11px] text-apricot/85">{art.date}</span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ),
        },
        {
          id: 'journal-03',
          chapterNumber: '03',
          chapterLabel: 'Taste the Harvest',
          content: (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 lg:col-start-4 relative">
                <OatSheet tone="warm" className="relative z-10 p-8 sm:p-10 space-y-5 text-center">
                  <h2 className="font-display text-3xl sm:text-4xl font-medium text-oat leading-tight">
                    Every harvest written here is packed in small batches.
                  </h2>
                  <p className="text-sm sm:text-base text-apricot/95 leading-relaxed">
                    Explore the full pantry of Rabi seeds, Himalayan berries, sun-cured orchard fruits,
                    and slow-roasted makhana.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 pt-2">
                    <GlowButton href="/shop" variant="cta" magnetic>
                      Explore Collection
                    </GlowButton>
                    <GlowButton href="/about" variant="secondary">
                      Our Philosophy
                    </GlowButton>
                  </div>
                </OatSheet>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}

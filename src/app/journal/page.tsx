import { getJournalArticles } from '@/lib/services/productService';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { Card3D, Card3DLayer } from '@/components/ui/Card3D';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { PageBackgroundSet } from '@/components/editorial/PageBackgroundSet';
import { OatSheet } from '@/components/editorial/OatSheet';
import { GlowButton } from '@/components/ui/GlowButton';
import { ChapterDoodleLayer, DoodleDivider, DoodleUnderline } from '@/components/doodles';
import { PAGE_CHAPTER_PLACEMENTS } from '@/config/doodle-placements';

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
              <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.journal['chapter-01']} priority />
              <FadeInSection className="relative z-10 text-center max-w-xl mx-auto mb-10">
                <span className="font-ui-label text-[11px] text-peach block mb-2">
                  01 · Field Chronicle
                </span>
                <h1 className="font-display text-4xl sm:text-5xl text-oat font-medium mb-3">
                  Harvest{' '}
                  <DoodleUnderline variant="curved" tone="peach" delay={0.2}>
                    <span className="italic text-peach">Journal</span>
                  </DoodleUnderline>
                </h1>
                <p className="text-sm sm:text-base text-apricot/85">
                  Notes from winter seed belts, cool mountain berry bushes, and farm-direct packing.
                </p>
              </FadeInSection>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {firstHalf.map((art) => (
                  <StaggerItem key={art.id}>
                    <Card3D
                      as="article"
                      maxTilt={5}
                      className="h-full"
                      surfaceClassName="group bg-[#F6EFE2]/[0.13] hover:bg-[#F6EFE2]/[0.20] backdrop-blur-[18px] border border-white/25 overflow-hidden flex flex-col justify-between"
                    >
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
                        <Card3DLayer depth={10} className="p-6">
                          <div className="flex justify-between items-center text-[10px] font-ui-label mb-3">
                            <span className="px-2.5 py-0.5 rounded-[4px] bg-oat/15 text-peach border border-white/20">
                              {art.category}
                            </span>
                            <span className="text-apricot/75">{art.readTime}</span>
                          </div>
                          <h2 className="font-display text-xl font-medium text-oat group-hover:text-peach transition-colors mb-2 leading-snug">
                            {art.title}
                          </h2>
                          <p className="text-sm text-apricot/85 line-clamp-3 leading-relaxed">
                            {art.excerpt}
                          </p>
                        </Card3DLayer>
                      </div>

                      <Card3DLayer depth={8} className="px-6 pb-6 pt-2">
                        <span className="text-[11px] text-apricot/70">{art.date}</span>
                      </Card3DLayer>
                    </Card3D>
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
              <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.journal['chapter-02']} />
              <DoodleDivider variant="leaf" tone="apricot" />
              <div className="flex items-center justify-between">
                <span className="font-ui-label text-[11px] text-peach">
                  02 · Orchard &amp; Roastery Notes
                </span>
              </div>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {secondHalf.map((art) => (
                  <StaggerItem key={art.id}>
                    <Card3D
                      as="article"
                      maxTilt={5}
                      className="h-full"
                      surfaceClassName="group bg-[#F6EFE2]/[0.13] hover:bg-[#F6EFE2]/[0.20] backdrop-blur-[18px] border border-white/25 overflow-hidden flex flex-col justify-between"
                    >
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
                        <Card3DLayer depth={10} className="p-6">
                          <div className="flex justify-between items-center text-[10px] font-ui-label mb-3">
                            <span className="px-2.5 py-0.5 rounded-[4px] bg-oat/15 text-peach border border-white/20">
                              {art.category}
                            </span>
                            <span className="text-apricot/75">{art.readTime}</span>
                          </div>
                          <h2 className="font-display text-xl font-medium text-oat group-hover:text-peach transition-colors mb-2 leading-snug">
                            {art.title}
                          </h2>
                          <p className="text-sm text-apricot/85 line-clamp-3 leading-relaxed">
                            {art.excerpt}
                          </p>
                        </Card3DLayer>
                      </div>

                      <Card3DLayer depth={8} className="px-6 pb-6 pt-2">
                        <span className="text-[11px] text-apricot/70">{art.date}</span>
                      </Card3DLayer>
                    </Card3D>
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
                <ChapterDoodleLayer placements={PAGE_CHAPTER_PLACEMENTS.journal['chapter-03']} />
                <OatSheet tone="warm" className="relative z-10 p-8 sm:p-10 space-y-5 text-center">
                <span className="font-ui-label text-[11px] text-peach block">
                  03 · From Field Notes to Pantry
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-medium text-oat leading-tight">
                  Every harvest written here is packed in small batches.
                </h2>
                <p className="text-sm sm:text-base text-apricot/90 leading-relaxed">
                  Explore the full pantry of Rabi seeds, Himalayan berries, sun-cured orchard fruits,
                  and slow-roasted makhana.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <GlowButton href="/shop" variant="cta" magnetic>
                    Explore Collection
                  </GlowButton>
                  <GlowButton href="/about" variant="secondary">
                    Our Story
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

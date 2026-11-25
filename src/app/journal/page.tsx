import { getJournalArticles } from '@/lib/services/productService';
import { ProductImageWithFallback } from '@/components/ui/ProductImageWithFallback';
import { Card3D, Card3DLayer } from '@/components/ui/Card3D';
import { FadeInSection } from '@/components/motion/FadeInSection';
import { StaggerContainer, StaggerItem } from '@/components/motion/Stagger';
import { DoodleSVG } from '@/components/editorial/DoodleSVG';
import { CharcoalDoodle } from '@/components/editorial/CharcoalDoodle';

export default async function JournalPage() {
  const articles = await getJournalArticles();

  return (
    <div className="min-h-screen bg-purple text-oat pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="relative text-center max-w-xl mx-auto mb-12">
          <CharcoalDoodle
            name="olive"
            variant="halo"
            size="sm"
            rotate={-6}
            className="hidden sm:block absolute -left-14 -top-4"
          />
          <DoodleSVG
            name="berries"
            tone="charcoal"
            className="hidden sm:block absolute -right-6 top-2 w-10 h-10"
          />
          <span className="font-ui-label text-[11px] text-peach block mb-2">
            Field Chronicle
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-oat font-medium mb-3">
            Harvest{' '}
            <span className="relative inline-block italic text-peach">
              Journal
              <DoodleSVG
                name="underline"
                tone="charcoal"
                delay={0.2}
                className="absolute -bottom-1.5 left-0 w-full h-2.5"
              />
            </span>
          </h1>
          <p className="text-sm sm:text-base text-apricot/85">
            Notes from winter seed belts, cool mountain berry bushes, and farm-direct packing.
          </p>
        </FadeInSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((art) => (
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
                        art.image.includes('/images/products/')
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
    </div>
  );
}

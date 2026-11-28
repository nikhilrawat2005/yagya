import { BookOpen } from 'lucide-react';
import { getJournalArticles } from '@/lib/services/productService';
import { siteConfig } from '@/config/site';
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

  if (!siteConfig.featureFlags.showJournal || articles.length === 0) {
    return (
      <div className="min-h-[100dvh] bg-navy text-oat pt-24 sm:pt-32 pb-24 px-4 flex items-center">
        <div className="max-w-lg mx-auto w-full">
          <OatSheet tone="medium" interactive={false} className="p-8 sm:p-10 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center text-peach">
              <BookOpen className="w-7 h-7" aria-hidden="true" />
            </div>
            <span className="font-ui-label text-[10px] text-peach block">
              {siteConfig.brandName} Editorial
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-medium text-oat">
              Journal Coming Soon
            </h1>
            <p className="text-sm text-sand leading-relaxed">
              We are preparing verified harvest notes and kitchen recipes. In the meantime, explore
              our full pantry collection.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <GlowButton href="/shop" variant="cta">
                Explore Collection
              </GlowButton>
              <GlowButton href="/" variant="secondary">
                Return Home
              </GlowButton>
            </div>
          </OatSheet>
        </div>
      </div>
    );
  }

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
              </FadeInSection>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...firstHalf, ...secondHalf].map((art) => (
                  <StaggerItem key={art.id}>
                    <SpotlightCard
                      as="article"
                      spotlightColor="rgba(223, 127, 37, 0.14)"
                      className="h-full bg-[#141C2B]/55 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-6">
                        <div className="relative aspect-[16/10] bg-navy/40 border-b border-white/15 overflow-hidden mb-4 rounded-[4px]">
                          <ProductImageWithFallback
                            src={art.image}
                            alt={art.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h2 className="font-display text-xl font-medium text-oat mb-2">{art.title}</h2>
                        <p className="text-sm text-apricot/90 leading-relaxed">{art.excerpt}</p>
                      </div>
                    </SpotlightCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ),
        },
      ]}
    />
  );
}

import { GlowButton } from '@/components/ui/GlowButton';
import { OatSheet } from '@/components/editorial/OatSheet';
import { Doodle } from '@/components/doodles';
import { siteConfig } from '@/config/site';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-navy text-oat pt-24 sm:pt-32 pb-24 px-4 flex items-center">
      <div className="relative max-w-md mx-auto w-full">
        <OatSheet tone="subtle" className="relative p-10 text-center">
          <span className="font-ui-label text-[10px] text-peach block mb-2">
            {siteConfig.brandName} · 404
          </span>
          <h1 className="font-display text-3xl font-medium text-oat mb-3">
            Page Not Found
          </h1>
          <p className="text-sm text-apricot/85 max-w-xs mx-auto mb-8">
            The product or page you requested could not be found in the {siteConfig.brandName}{' '}
            pantry catalog.
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-3">
            <Doodle
              name="arrow-curved-pointer"
              preset="connector"
              tone="apricot"
              size={52}
              rotate={-12}
              showOn="sm+"
              priority
              className="absolute -left-12 -top-4"
            />
            <GlowButton href="/shop" variant="cta" magnetic>
              Back to Shop
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

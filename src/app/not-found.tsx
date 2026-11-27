import { GlowButton } from '@/components/ui/GlowButton';
import { OatSheet } from '@/components/editorial/OatSheet';
import { Doodle } from '@/components/doodles';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-navy text-oat pt-32 pb-24 px-4 flex items-center">
      <div className="relative max-w-md mx-auto w-full">
        <OatSheet tone="subtle" className="relative p-10 text-center">
          <h1 className="font-display text-3xl font-medium text-oat mb-3">
            Harvest Page Not Found
          </h1>
          <p className="text-sm text-apricot/85 max-w-xs mx-auto mb-8">
            The superfood variety you were looking for could not be found in this season&apos;s catalogue.
          </p>
          <div className="relative inline-flex items-center justify-center">
            <Doodle
              name="arrow-curved-pointer"
              preset="connector"
              tone="apricot"
              size={52}
              rotate={-12}
              showOn="sm+"
              priority
              className="absolute -left-14 -top-4"
            />
            <GlowButton href="/" variant="cta" magnetic>
              Return Home
            </GlowButton>
          </div>
        </OatSheet>
      </div>
    </div>
  );
}

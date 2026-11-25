import { Sprout } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { OatSheet } from '@/components/editorial/OatSheet';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy text-oat pt-32 pb-24 px-4">
      <OatSheet tone="subtle" className="max-w-md mx-auto p-10 text-center">
        <div className="w-14 h-14 mx-auto mb-5 rounded-[6px] bg-oat/10 border border-white/25 flex items-center justify-center">
          <Sprout className="w-7 h-7 text-peach" />
        </div>
        <h1 className="font-display text-3xl font-medium text-oat mb-3">
          Harvest Page Not Found
        </h1>
        <p className="text-sm text-apricot/85 max-w-xs mx-auto mb-8">
          The superfood variety you were looking for could not be found in this season&apos;s catalogue.
        </p>
        <GlowButton href="/shop" variant="cta" magnetic>
          Explore Collection
        </GlowButton>
      </OatSheet>
    </div>
  );
}

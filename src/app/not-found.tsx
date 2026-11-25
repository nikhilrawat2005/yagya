import { Sprout } from 'lucide-react';
import { GlowButton } from '@/components/ui/GlowButton';
import { FadeInSection } from '@/components/motion/FadeInSection';

export default function NotFound() {
  return (
    <FadeInSection className="max-w-md mx-auto px-4 py-24 text-center">
      <div className="glow-hover w-16 h-16 mx-auto mb-5 rounded-full bg-apricot border-2 border-charcoal/25 flex items-center justify-center">
        <Sprout className="w-8 h-8 text-indigo icon-hover-pop" />
      </div>
      <h1 className="font-display text-3xl font-semibold text-indigo mb-3">
        Harvest Page Not Found
      </h1>
      <p className="font-script-body text-sm text-indigo max-w-xs mx-auto mb-8">
        The superfood variety you were looking for could not be found in this season&apos;s catalogue.
      </p>
      <GlowButton href="/shop" variant="cta" magnetic>
        BROWSE SUPERFOODS
      </GlowButton>
    </FadeInSection>
  );
}

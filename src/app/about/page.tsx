import { siteConfig } from '@/lib/data/site';
import { Floating3DAsset } from '@/components/ui/Floating3DAsset';
import { FibonacciBlocks } from '@/components/shapes/FibonacciBlocks';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        <div className="lg:col-span-6 space-y-5">
          <span className="font-mono-meta text-xs uppercase tracking-widest text-cranberry block">
            Our Story &amp; Soil
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-indigo font-semibold leading-tight">
            The <span className="text-cranberry italic">Yagya</span> Farm Philosophy
          </h1>
          <p className="font-script-body text-base sm:text-lg text-indigo">
            {siteConfig.description}
          </p>
          <p className="font-script-body text-base text-indigo/90">
            We partner directly with farming families across Madhya Pradesh, Rajasthan,
            Karnataka, Himachal, and Ladakh — skipping long middleman chains and packing
            every batch under strict hygiene controls.
          </p>
          <div className="pt-2">
            <Button href="/shop">EXPLORE HARVEST</Button>
          </div>
        </div>

        <div className="lg:col-span-6 relative flex items-center justify-center py-4">
          <div className="relative w-full max-w-[460px]">
            <FibonacciBlocks unit={36} showSpiralArc showIndices />
            <Floating3DAsset
              src="/images/3d/jar-reserve-01.webp"
              alt="Yagya matte clay jar"
              width={250}
              height={250}
              className="absolute left-[18%] -top-[8%] w-[52%] z-20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

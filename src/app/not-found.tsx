import Link from 'next/link';
import { Sprout } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <Sprout className="w-12 h-12 text-indigo/60 mx-auto mb-4" />
      <h1 className="font-display text-3xl font-semibold text-indigo mb-3">
        Harvest Page Not Found
      </h1>
      <p className="font-script-body text-sm text-indigo max-w-xs mx-auto mb-8">
        The superfood variety you were looking for could not be found in this season&apos;s catalogue.
      </p>
      <Link
        href="/shop"
        className="btn-primary-yagya px-7 py-3.5 rounded-full text-xs inline-block"
      >
        BROWSE SUPERFOODS
      </Link>
    </div>
  );
}

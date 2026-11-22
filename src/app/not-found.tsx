import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <span className="material-symbols-outlined text-6xl text-primary/40 mb-3">nature</span>
      <h1 className="font-serif text-3xl font-medium text-primary mb-2">Harvest Page Not Found</h1>
      <p className="text-xs text-on-surface-variant max-w-xs mx-auto mb-8 leading-relaxed">
        The harvest page or superfood variety you were seeking does not exist or has been shifted in the seasonal pantry.
      </p>
      <Link
        href="/shop"
        className="px-6 py-3 rounded-full bg-primary-container text-surface hover:bg-secondary text-xs font-semibold uppercase tracking-wider inline-block"
      >
        Browse Superfood Catalog
      </Link>
    </div>
  );
}

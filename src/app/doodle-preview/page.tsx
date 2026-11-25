import { notFound } from 'next/navigation';
import { DoodlePreviewClient } from '@/app/doodle-preview/DoodlePreviewClient';

export default function DoodlePreviewPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return <DoodlePreviewClient />;
}

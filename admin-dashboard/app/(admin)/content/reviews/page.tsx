// app/(admin)/content/reviews/page.tsx
import { adminDb } from '@/lib/firebase/admin';
import ReviewsTable from './ReviewsTable';

export default async function ReviewsPage() {
  const snap = await adminDb.collection('reviews').orderBy('created_at', 'desc').get();
  const reviews = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
        <p className="text-gray-500 mt-1 text-sm">{reviews.length} total reviews</p>
      </div>
      <ReviewsTable initialData={reviews as any[]} />
    </div>
  );
}

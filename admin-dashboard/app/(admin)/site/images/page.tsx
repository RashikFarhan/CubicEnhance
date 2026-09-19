export const dynamic = 'force-dynamic';
import { adminDb } from '@/lib/firebase/admin';
import { toSerializable } from '@/lib/utils';
import ImagesForm from './ImagesForm';

export default async function ImagesPage() {
  const doc = await adminDb.collection('site_config').doc('images').get();
  const images = toSerializable(doc.data() || {});
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Site Images</h1>
        <p className="text-gray-500 mt-1 text-sm">Update the image links across the public website. The site uses the image name (or Alt Text) to link these URLs to the specific sections and cards.</p>
      </div>
      <ImagesForm initialImages={images as any} />
    </div>
  );
}

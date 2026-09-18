export const dynamic = 'force-dynamic';
import { adminDb } from '@/lib/firebase/admin';
import ImagesManager from './ImagesManager';

export default async function ImagesPage() {
  const snap = await adminDb.collection('site_images').get();
  const images = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  // Group images by page/section
  const groupedImages = images.reduce((acc: any, img: any) => {
    const page = img.page || 'General';
    if (!acc[page]) acc[page] = [];
    acc[page].push(img);
    return acc;
  }, {});

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Image Management</h1>
        <p className="text-gray-500 mt-1 text-sm">Update images across different pages by pasting new URLs</p>
      </div>
      <ImagesManager initialGroups={groupedImages} />
    </div>
  );
}

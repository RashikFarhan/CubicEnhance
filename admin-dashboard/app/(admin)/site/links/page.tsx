import { Suspense } from 'react';
import LinksForm from './LinksForm';

export const metadata = {
  title: 'Site Links | CubicEnhance Admin',
};

export default function LinksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site Links</h1>
        <p className="text-gray-500 mt-1">Manage dynamic links across the website.</p>
      </div>
      
      <Suspense fallback={<div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">Loading links data...</div>}>
        <LinksForm />
      </Suspense>
    </div>
  );
}

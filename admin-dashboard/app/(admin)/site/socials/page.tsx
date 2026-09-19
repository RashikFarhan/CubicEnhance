import { Suspense } from 'react';
import SocialsForm from './SocialsForm';

export const metadata = {
  title: 'Social Media Links | CubicEnhance Admin',
};

export default function SocialsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Social Media</h1>
        <p className="text-gray-500 mt-1">Manage global social media links across the website (footer, buttons, widgets).</p>
      </div>
      
      <Suspense fallback={<div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">Loading socials data...</div>}>
        <SocialsForm />
      </Suspense>
    </div>
  );
}

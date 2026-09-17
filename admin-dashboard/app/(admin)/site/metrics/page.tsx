// app/(admin)/site/metrics/page.tsx
import { adminDb } from '@/lib/firebase/admin';
import MetricsForm from './MetricsForm';

export default async function MetricsPage() {
  const doc = await adminDb.collection('site_config').doc('metrics').get();
  const metrics = doc.data() || {};
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Site Metrics</h1>
        <p className="text-gray-500 mt-1 text-sm">These numbers power the animated counters on the public homepage.</p>
      </div>
      <MetricsForm initialMetrics={metrics as any} />
    </div>
  );
}

'use client';
import { useState } from 'react';
import { adminUpdate } from '@/lib/utils';
import type { SiteMetrics } from '@/lib/firebase/schema';

const METRIC_FIELDS: { key: keyof SiteMetrics; label: string; description: string }[] = [
  { key: 'total_clients', label: 'Total Client Partnerships', description: 'Drives the "Total Client Partnerships" counter on the homepage' },
  { key: 'contractual_accounts', label: 'Contractual Managed Accounts', description: 'Drives the "Contractual Managed Accounts" counter' },
  { key: 'years_operational', label: 'Years of Operational Discipline', description: 'Drives the "Years" counter' },
  { key: 'total_employees_core', label: 'Core Team Size', description: 'Internal figure for leadership page' },
  { key: 'contractual_fleet_size', label: 'Contractual Fleet Size', description: 'Total managed operators across all engagements' },
];

export default function MetricsForm({ initialMetrics }: { initialMetrics: SiteMetrics }) {
  const [metrics, setMetrics] = useState<SiteMetrics>(initialMetrics);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await adminUpdate('site_config', 'metrics', metrics as any);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
      {METRIC_FIELDS.map(field => (
        <div key={field.key}>
          <label className="block text-sm font-bold text-gray-800 mb-1">{field.label}</label>
          <p className="text-xs text-gray-500 mb-2">{field.description}</p>
          <input
            type="number" min={0}
            value={(metrics as any)[field.key] ?? 0}
            onChange={e => setMetrics(prev => ({ ...prev, [field.key]: Number(e.target.value) }))}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#5c829c]"
          />
        </div>
      ))}

      {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
      <div className="pt-4">
        <button type="submit" disabled={saving}
          className="w-full py-3 bg-[#30495f] text-white font-bold text-sm rounded-lg hover:bg-[#5c829c] transition-colors disabled:opacity-60">
          {saving ? 'Saving.' : saved ? '✓ Saved!' : 'Save Metrics to Firestore'}
        </button>
        {saved && <p className="text-center text-xs text-green-600 mt-2">Live site counters will update on next page load.</p>}
      </div>
    </form>
  );
}

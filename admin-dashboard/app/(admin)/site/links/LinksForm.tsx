'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Save, Loader2, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

export default function LinksForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [footerDiscoveryLink, setFooterDiscoveryLink] = useState('/how-we-work');

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, 'site_config', 'links');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.footer_discovery) setFooterDiscoveryLink(data.footer_discovery);
        }
      } catch (err) {
        console.error("Failed to load links data:", err);
        setError("Failed to load data from Firebase.");
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    
    try {
      await setDoc(doc(db, 'site_config', 'links'), {
        footer_discovery: footerDiscoveryLink,
        updated_at: new Date()
      }, { merge: true });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save links data:", err);
      setError("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg text-gray-400">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm font-medium">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 text-sm font-medium flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Changes saved successfully!
        </div>
      )}

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-bcg-green" />
          Footer Section Links
        </h2>
        
        <div className="grid grid-cols-1 gap-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              "Before You Book" Discovery Call Link
            </label>
            <input 
              type="text" 
              value={footerDiscoveryLink}
              onChange={(e) => setFooterDiscoveryLink(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors"
              placeholder="e.g., /how-we-work or https://calendly.com/..."
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              The URL destination when a user clicks the "Before You Book" banner in the footer. Use relative paths for internal pages (e.g. <code className="bg-gray-100 px-1 py-0.5 rounded">/contact</code>).
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-bcg-dark text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed font-medium shadow-sm"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

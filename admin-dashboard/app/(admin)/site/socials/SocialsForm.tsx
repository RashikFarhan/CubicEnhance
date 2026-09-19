'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { Save, Loader2, Share2, CheckCircle2 } from 'lucide-react';

export default function SocialsForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [socials, setSocials] = useState({
    instagram: 'https://www.instagram.com/cubicenhance?stkn=MXQ4ZHV0aXNsenphYg==',
    facebook: 'https://www.facebook.com/share/1JUVDfCqAi/',
    threads: 'https://www.threads.com/@cubicenhance',
    whatsapp: 'https://wa.me/8801846408737',
    gmail: 'mailto:admin@cubicenhance.com'
  });

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, 'site_config', 'socials');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSocials(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Failed to load socials data:", err);
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
      await setDoc(doc(db, 'site_config', 'socials'), {
        ...socials,
        updated_at: new Date()
      }, { merge: true });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save socials data:", err);
      setError("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocials({ ...socials, [e.target.name]: e.target.value });
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
          <Share2 className="w-5 h-5 text-bcg-green" />
          Global Social Links
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
            <input 
              type="text" name="instagram" value={socials.instagram} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors"
              placeholder="https://instagram.com/..." required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
            <input 
              type="text" name="facebook" value={socials.facebook} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors"
              placeholder="https://facebook.com/..." required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Threads URL</label>
            <input 
              type="text" name="threads" value={socials.threads} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors"
              placeholder="https://threads.net/..." required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Link</label>
            <input 
              type="text" name="whatsapp" value={socials.whatsapp} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors"
              placeholder="https://wa.me/..." required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email (Gmail) Link</label>
            <input 
              type="text" name="gmail" value={socials.gmail} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bcg-green focus:border-bcg-green transition-colors"
              placeholder="mailto:..." required
            />
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

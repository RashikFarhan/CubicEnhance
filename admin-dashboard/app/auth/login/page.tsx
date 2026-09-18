'use client';

import { useState, useTransition, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCred.user.getIdToken();

        const res = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        if (!res.ok) {
          const text = await res.text();
          let data;
          try { 
            data = JSON.parse(text); 
          } catch (e) { 
            throw new Error(Server Error ( + res.status + ):  + text.substring(0, 150)); 
          }
          throw new Error(data.error || 'Session creation failed');
        }

        router.push(redirect);
        router.refresh();
      } catch (err: any) {
        const msg = err.code === 'auth/invalid-credential'
          ? 'Invalid email or password.'
          : err.message || 'Sign-in failed. Please try again.';
        setError(msg);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
        <input
          type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c829c] focus:border-transparent transition-colors"
          placeholder="admin@cubicenhance.com"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
        <input
          type="password" required value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#5c829c] focus:border-transparent transition-colors"
          placeholder="            "
        />
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg break-words">
          {error}
        </div>
      )}
      <button
        type="submit" disabled={isPending}
        className="w-full py-3 bg-[#30495f] text-white font-bold text-sm rounded-lg hover:bg-[#5c829c] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Signing in...' : 'Sign In to Dashboard'}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#30495f] rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-[#30495f]">CubicEnhance</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Restricted access - authorized personnel only</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <Suspense fallback={<div className="text-center text-sm text-gray-500 py-4">Loading form...</div>}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          CubicEnhance Operations Platform &copy; Admin Console
        </p>
      </div>
    </div>
  );
}

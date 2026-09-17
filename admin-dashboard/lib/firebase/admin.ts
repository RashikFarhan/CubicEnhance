// lib/firebase/admin.ts
// Firebase Admin SDK — SERVER ONLY (API routes, Server Components)
// Never import this from client components

import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

function initAdminApp(): App {
  if (getApps().length > 0) return getApps()[0];

  // Prefer service account JSON env vars (set in Vercel / .env.local)
  if (
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
    process.env.FIREBASE_ADMIN_PRIVATE_KEY
  ) {
    return initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
        // Vercel escapes newlines in env vars — unescape them
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  }

  // Fallback: use Application Default Credentials (e.g. local `gcloud auth`)
  return initializeApp({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || 'cubicenhance-5fbf8',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

const adminApp = initAdminApp();

export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
export const adminStorage = getStorage(adminApp);
export default adminApp;

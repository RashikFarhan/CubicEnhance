// lib/firebase/admin.ts
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

function initAdminApp(): App {
  if (getApps().length > 0) return getApps()[0];

  if (process.env.FIREBASE_ADMIN_CLIENT_EMAIL && process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
    try {
      let pk = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
      if (pk.startsWith(") && pk.endsWith(")) pk = pk.slice(1, -1);
      pk = pk.replace(/\\n/g, '\n');

      return initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || 'cubicenhance-5fbf8',
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          privateKey: pk,
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } catch(err) {
      console.warn('Firebase Admin Init Error:', err);
    }
  }

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

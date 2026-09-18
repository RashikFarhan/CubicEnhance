// lib/firebase/admin.ts
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

function sanitizePrivateKey(raw: string): string {
  // Step 1: Strip surrounding quotes that Vercel sometimes adds
  let pk = raw.trim();
  if ((pk.startsWith('"') && pk.endsWith('"')) || (pk.startsWith("'") && pk.endsWith("'"))) {
    pk = pk.slice(1, -1);
  }
  // Step 2: Replace literal \n (two chars) with real newlines
  pk = pk.replace(/\\n/g, '\n');
  // Step 3: If it STILL doesn't have real newlines but has the PEM markers, try harder
  if (!pk.includes('\n') && pk.includes('-----BEGIN')) {
    pk = pk.replace(/(-----BEGIN [^-]+-----)([^-]+)(-----END [^-]+-----)/g, (_m, start, body, end) => {
      return start + '\n' + body.replace(/ /g, '\n') + '\n' + end;
    });
  }
  return pk;
}

function initAdminApp(): App {
  if (getApps().length > 0) return getApps()[0];

  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || 'cubicenhance-5fbf8';
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  if (!clientEmail || !rawKey) {
    console.error('[Firebase Admin] MISSING CREDENTIALS — FIREBASE_ADMIN_CLIENT_EMAIL or FIREBASE_ADMIN_PRIVATE_KEY not set. All admin reads will fail.');
    // Return a no-credential app only so the server doesn't crash at startup.
    // All DB reads will fail with a permission error rather than a crash.
    return initializeApp({ projectId, storageBucket: bucket });
  }

  const privateKey = sanitizePrivateKey(rawKey);

  if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    console.error('[Firebase Admin] INVALID PRIVATE KEY FORMAT — key does not contain PEM header after sanitization. Check Vercel env vars.');
    return initializeApp({ projectId, storageBucket: bucket });
  }

  try {
    const app = initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
      storageBucket: bucket,
    });
    console.log('[Firebase Admin] Initialized successfully with service account:', clientEmail);
    return app;
  } catch (err: any) {
    console.error('[Firebase Admin] INIT FAILED:', err.message);
    return initializeApp({ projectId, storageBucket: bucket });
  }
}

const adminApp = initAdminApp();

export const adminDb = getFirestore(adminApp);
export const adminAuth = getAuth(adminApp);
export const adminStorage = getStorage(adminApp);
export default adminApp;

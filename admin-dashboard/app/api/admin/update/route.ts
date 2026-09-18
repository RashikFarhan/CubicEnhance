// app/api/admin/update/route.ts
// Generic admin write endpoint — uses Admin SDK to bypass Firestore rules.
// All admin writes go through here so we never need client-side Firebase auth.
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { getAdminSession } from '@/lib/auth/session';
import { FieldValue } from 'firebase-admin/firestore';

const ALLOWED_COLLECTIONS = [
  'companies', 'reviews', 'employees',
  'site_config', 'site_images', 'users', 'inquiries', 'talent_registry',
];

export async function POST(req: NextRequest) {
  // 1. Verify server session
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { collection, docId, data, merge = true } = body;

    // 2. Validate collection
    if (!ALLOWED_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: `Collection '${collection}' is not allowed.` }, { status: 403 });
    }
    if (!docId || typeof docId !== 'string') {
      return NextResponse.json({ error: 'Missing docId' }, { status: 400 });
    }
    if (!data || typeof data !== 'object') {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // 3. Add server timestamp for updated_at
    const writeData = { ...data, updated_at: FieldValue.serverTimestamp() };

    // 4. Write via Admin SDK (bypasses Firestore security rules)
    if (merge) {
      await adminDb.collection(collection).doc(docId).set(writeData, { merge: true });
    } else {
      await adminDb.collection(collection).doc(docId).update(writeData);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('[api/admin/update]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

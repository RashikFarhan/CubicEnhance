// app/api/auth/session/route.ts
// POST: Exchange Firebase ID token for a server-side session cookie
// DELETE: Sign out (clear session cookie)

import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';
import { adminDb } from '@/lib/firebase/admin';
import { getSessionCookieName, getSessionDurationMs } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    if (!idToken) return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });

    // Verify the ID token
    const decoded = await adminAuth.verifyIdToken(idToken);

    // Enforce admin-only: check the users collection for admin role
    const userDoc = await adminDb.collection('users').doc(decoded.uid).get();
    if (!userDoc.exists || !['super_admin', 'admin'].includes(userDoc.data()?.role)) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
    }

    // Create session cookie
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: getSessionDurationMs(),
    });

    const res = NextResponse.json({ ok: true });
    res.cookies.set(getSessionCookieName(), sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: getSessionDurationMs() / 1000,
      path: '/',
    });
    return res;
  } catch (err: any) {
    console.error('[auth/session POST]', err);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(getSessionCookieName(), '', {
    httpOnly: true, secure: true, sameSite: 'strict', maxAge: 0, path: '/',
  });
  return res;
}

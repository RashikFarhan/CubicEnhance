// lib/auth/session.ts
// Server-side session management using Firebase ID tokens and HTTP-only cookies

import { adminAuth } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'cubicenhance_admin_session';
const SESSION_DURATION_MS = 60 * 60 * 24 * 5 * 1000; // 5 days

export async function createSessionCookie(idToken: string) {
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION_MS,
  });
  return sessionCookie;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decodedClaims;
  } catch {
    return null;
  }
}

export function getSessionCookieName() {
  return SESSION_COOKIE_NAME;
}

export function getSessionDurationMs() {
  return SESSION_DURATION_MS;
}

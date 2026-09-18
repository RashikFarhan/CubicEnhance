// lib/utils.ts
// Shared utility functions

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | { toDate: () => Date } | null | undefined): string {
  if (!date) return '—';
  const d = typeof (date as any).toDate === 'function' ? (date as any).toDate() : date as Date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(d);
}

export function formatShortDate(date: Date | { toDate: () => Date } | null | undefined): string {
  if (!date) return '—';
  const d = typeof (date as any).toDate === 'function' ? (date as any).toDate() : date as Date;
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
}

export const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  in_review: 'bg-yellow-100 text-yellow-800',
  responded: 'bg-green-100 text-green-800',
  closed: 'bg-gray-100 text-gray-600',
  pending: 'bg-blue-100 text-blue-800',
  reviewed: 'bg-yellow-100 text-yellow-800',
  shortlisted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-700',
};

/**
 * Converts Firestore Timestamp objects to ISO strings so they can be safely
 * serialized across the Next.js server→client boundary without causing
 * React hydration error #441.
 */
export function toSerializable<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(toSerializable) as unknown as T;
  if (typeof obj === 'object') {
    // Firestore Timestamp has toDate() or _seconds/_nanoseconds
    if (typeof (obj as any).toDate === 'function') {
      return (obj as any).toDate().toISOString() as unknown as T;
    }
    if ('_seconds' in (obj as any) && '_nanoseconds' in (obj as any)) {
      return new Date((obj as any)._seconds * 1000).toISOString() as unknown as T;
    }
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(obj as Record<string, unknown>)) {
      result[key] = toSerializable(val);
    }
    return result as unknown as T;
  }
  return obj;
}

/**
 * Client-side helper to call the admin write API route.
 * Use this in all 'use client' components instead of direct Firestore writes.
 */
export async function adminUpdate(
  collection: string,
  docId: string,
  data: Record<string, unknown>,
  merge = true,
): Promise<void> {
  const res = await fetch('/api/admin/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collection, docId, data, merge }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Update failed');
  }
}


// app/api/public/talent/route.ts
// POST: Save talent registry form submissions from the static /careers page

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';

const talentSchema = z.object({
  full_name: z.string().min(2).max(100),
  email: z.string().email(),
  location: z.string().min(2).max(100),
  domain: z.string().min(2).max(100),
  linkedin_url: z.string().url(),
  resume_url: z.string().url(),
  summary: z.string().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-api-secret');
  if (secret !== process.env.PUBLIC_SITE_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = talentSchema.parse(body);

    const docRef = await adminDb.collection('talent_registry').add({
      ...data,
      status: 'pending',
      reviewer_notes: '',
      created_at: Timestamp.now(),
    });

    // Queue mail notification (Phase 3)
    await adminDb.collection('mail_events').add({
      to: 'admin@cubicenhance.com',
      template: 'talent_notification',
      payload: { full_name: data.full_name, email: data.email, domain: data.domain },
      status: 'pending',
      created_at: Timestamp.now(),
    });

    return NextResponse.json({ ok: true, id: docRef.id }, { status: 201 });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', issues: err.issues }, { status: 422 });
    }
    console.error('[public/talent POST]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

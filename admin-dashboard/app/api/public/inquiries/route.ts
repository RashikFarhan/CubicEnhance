// app/api/public/inquiries/route.ts
// POST: Create a new inquiry from the public static site contact form
// Authenticated by a shared secret token (not Firebase Admin SDK)

import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { Timestamp } from 'firebase-admin/firestore';
import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  service_interest: z.string().max(100).optional(),
  budget: z.string().max(50).optional(),
  message: z.string().min(10).max(5000),
  inquiry_type: z.enum(['discovery_call', 'partnership', 'quote', 'general']).default('discovery_call'),
});

export async function POST(req: NextRequest) {
  // Validate shared secret
  const secret = req.headers.get('x-api-secret');
  if (secret !== process.env.PUBLIC_SITE_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = inquirySchema.parse(body);

    const docRef = await adminDb.collection('inquiries').add({
      ...data,
      status: 'new',
      admin_notes: '',
      created_at: Timestamp.now(),
    });

    // Queue mail notification (Phase 3)
    await adminDb.collection('mail_events').add({
      to: 'admin@cubicenhance.com',
      template: 'inquiry_notification',
      payload: { name: data.name, email: data.email, message: data.message.slice(0, 200) },
      status: 'pending',
      created_at: Timestamp.now(),
    });

    return NextResponse.json({ ok: true, id: docRef.id }, { status: 201 });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return NextResponse.json({ error: 'Validation failed', issues: err.issues }, { status: 422 });
    }
    console.error('[public/inquiries POST]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

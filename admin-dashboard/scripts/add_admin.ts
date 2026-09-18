import { adminDb } from '../lib/firebase/admin';

async function run() {
  const uid = 'KYbs3T29TZQRqLj1qSIT8fCtG253';
  await adminDb.collection('users').doc(uid).set({
    email: 'admin.cubicenhance@gmail.com',
    role: 'super_admin',
    is_active: true,
    created_at: new Date()
  });
  console.log('Super Admin created successfully for UID:', uid);
}

run().catch(console.error);

const admin = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { cert } = require('firebase-admin/app');
const { initializeApp } = require('firebase-admin/app');

require('dotenv').config({ path: '.env.local' });

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\\\n/g, '\n'),
  }),
});

const db = getFirestore(app);

async function audit() {
  const collections = ['companies', 'reviews', 'employees', 'site_config', 'inquiries', 'talent_registry', 'users'];
  for (const col of collections) {
    const snap = await db.collection(col).limit(2).get();
    console.log(col + ': ' + snap.size + ' sample docs (showing first doc field names):');
    if (!snap.empty) {
      const firstDoc = snap.docs[0].data();
      console.log('  Fields: ' + Object.keys(firstDoc).join(', '));
    }
  }
  process.exit(0);
}

audit().catch(e => { console.error(e.message); process.exit(1); });

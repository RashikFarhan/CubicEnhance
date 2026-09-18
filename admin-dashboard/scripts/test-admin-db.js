require('dotenv').config({ path: '.env.local' });
const { initializeApp, getApps, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

let pk = process.env.FIREBASE_ADMIN_PRIVATE_KEY || '';
if (pk.startsWith('"') && pk.endsWith('"')) pk = pk.slice(1, -1);
pk = pk.replace(/\\n/g, '\n');

const app = getApps().length === 0 ? initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: pk,
  }),
}) : getApps()[0];

const db = getFirestore(app);

async function test() {
  console.log('Testing companies...');
  const snap = await db.collection('companies').count().get();
  console.log('Companies count:', snap.data().count);
  
  console.log('Testing employees...');
  const emp = await db.collection('employees').orderBy('sort_order').limit(3).get();
  console.log('Employees found:', emp.size);
  emp.docs.forEach(d => console.log(' -', d.data().name, '|', d.data().role));

  console.log('Testing site_config...');
  const mc = await db.collection('site_config').doc('metrics').get();
  console.log('Metrics doc exists:', mc.exists);
  if (mc.exists) console.log('Metrics data:', JSON.stringify(mc.data()));
  
  process.exit(0);
}

test().catch(e => { console.error('FAILED:', e.message, e.code); process.exit(1); });

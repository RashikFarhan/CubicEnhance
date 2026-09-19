import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

// Parse .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envStr = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envStr.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        envVars[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
    }
});

function sanitizePrivateKey(raw) {
  let pk = raw.trim();
  if ((pk.startsWith('"') && pk.endsWith('"')) || (pk.startsWith("'") && pk.endsWith("'"))) {
    pk = pk.slice(1, -1);
  }
  pk = pk.replace(/\\n/g, '\n');
  if (!pk.includes('\n') && pk.includes('-----BEGIN')) {
    pk = pk.replace(/(-----BEGIN [^-]+-----)([^-]+)(-----END [^-]+-----)/g, (_m, start, body, end) => {
      return start + '\n' + body.replace(/ /g, '\n') + '\n' + end;
    });
  }
  return pk;
}

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: envVars.FIREBASE_ADMIN_PROJECT_ID,
            clientEmail: envVars.FIREBASE_ADMIN_CLIENT_EMAIL,
            privateKey: sanitizePrivateKey(envVars.FIREBASE_ADMIN_PRIVATE_KEY)
        })
    });
}
const db = getFirestore();

async function run() {
    console.log("Reading defaultImages.json...");
    const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'app/(admin)/site/images/defaultImages.json'), 'utf8'));
    
    console.log("Writing to Firestore site_config/images...");
    await db.collection('site_config').doc('images').set(data, { merge: true });
    
    console.log("Done!");
    process.exit(0);
}

run().catch(console.error);

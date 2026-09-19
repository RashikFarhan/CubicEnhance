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
    console.log("Fetching all companies...");
    const snapshot = await db.collection('companies').get();
    const allDocs = snapshot.docs;
    
    console.log(`Found ${allDocs.length} companies.`);
    
    let batch = db.batch();
    let count = 0;
    
    for (let i = 0; i < allDocs.length; i++) {
        const doc = allDocs[i];
        if (i < 14) {
            batch.update(doc.ref, {
                revenue_code: 1, 
                is_contractual: true 
            });
            count++;
        } else {
            batch.delete(doc.ref);
        }
    }
    
    console.log("Committing batch...");
    await batch.commit();
    console.log(`Kept ${count} companies and deleted the rest.`);
    
    console.log("Updating site_config/metrics...");
    await db.collection('site_config').doc('metrics').set({
        total_tasks: 12500,
        contractual_accounts: 14,
        years_operational: 1,
        employee_experience: 4
    }, { merge: true });
    
    // Fallback JSON
    const newSnap = await db.collection('companies').get();
    const companiesData = newSnap.docs.map(d => d.data());
    
    const rootPath = path.join(process.cwd(), '..', 'companies.json');
    fs.writeFileSync(rootPath, JSON.stringify(companiesData, null, 2));
    console.log(`Saved ${companiesData.length} companies to fallback JSON.`);
    
    console.log("Done!");
    process.exit(0);
}

run().catch(console.error);

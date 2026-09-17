// scripts/migrate.ts
// One-time migration: local JSON files → Firebase Firestore
// Run with: npx ts-node --project tsconfig.scripts.json scripts/migrate.ts
//
// REQUIRES: FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY in .env.local
// OR: gcloud auth application-default login

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

// ─── Init ─────────────────────────────────────────────────────────────────────
function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];
  if (process.env.FIREBASE_ADMIN_CLIENT_EMAIL && process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
    return initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }),
    });
  }
  return initializeApp({ projectId: 'cubicenhance-5fbf8' });
}

const app = getAdminApp();
const db = getFirestore(app);

// ─── Category Code Lookups ────────────────────────────────────────────────────
const CATEGORY_MAP: Record<string, string> = {
  C1: 'Digital & Marketing Agencies',
  C2: 'E-Commerce & Retail',
  C3: 'Construction & Engineering',
  C4: 'Startups & SaaS',
};

const SERVICE_MAP: Record<string, string> = {
  S1: 'Data & Internal Accounting',
  S2: 'Documentation & Back-Office Operations',
  S3: 'AI Workflow Automation',
  S4: 'Social Media Management & Marketing',
  S5: 'Website Design & Maintenance',
  S6: 'Graphics Design',
  S7: 'Photos & Videos Production',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function batchWrite(
  collectionName: string,
  docs: object[],
  idFn?: (doc: any, i: number) => string
) {
  const BATCH_SIZE = 400;
  let count = 0;
  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = docs.slice(i, i + BATCH_SIZE);
    chunk.forEach((doc: any, j: number) => {
      const id = idFn ? idFn(doc, i + j) : undefined;
      const ref = id
        ? db.collection(collectionName).doc(id)
        : db.collection(collectionName).doc();
      batch.set(ref, doc);
      count++;
    });
    await batch.commit();
    console.log(`  ✓ Committed ${count} docs to "${collectionName}"`);
  }
}

function readJson(filename: string) {
  const p = path.resolve(__dirname, '../../', filename);
  if (!fs.existsSync(p)) throw new Error(`File not found: ${p}`);
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

// ─── Migration: companies ─────────────────────────────────────────────────────
async function migrateCompanies() {
  console.log('\n📦 Migrating companies.json...');
  const raw: any[] = readJson('companies.json');
  const docs = raw.map((c, i) => ({
    name: c.name,
    country: c.country || 'Unknown',
    country_code: c.country_code || 'UNK',
    category_code: c.c_code || 'C1',
    category_label: CATEGORY_MAP[c.c_code] || c.c_code,
    service_code: c.s_code || 'S1',
    service_label: SERVICE_MAP[c.s_code] || c.s_code,
    revenue_code: c.r_code || 0,
    description: c.description || '',
    logo_url: null,
    is_featured: true,
    is_active: true,
    created_at: Timestamp.now(),
  }));
  await batchWrite('companies', docs);
  console.log(`  ✅ ${docs.length} companies migrated`);
}

// ─── Migration: reviews ───────────────────────────────────────────────────────
async function migrateReviews() {
  console.log('\n⭐ Migrating reviews.json...');
  const raw: any[] = readJson('reviews.json');
  const docs = raw.map((r) => ({
    rating: r.rating,
    text: r.text,
    country: r.country,
    country_code: r.country_code,
    service: r.service,
    reviewer_name: r.reviewer_name || null,
    is_verified: true,
    is_published: true,
    created_at: Timestamp.now(),
  }));
  await batchWrite('reviews', docs);
  console.log(`  ✅ ${docs.length} reviews migrated`);
}

// ─── Migration: employees ─────────────────────────────────────────────────────
async function migrateEmployees() {
  console.log('\n👥 Migrating employees.json...');
  const raw: Record<string, any[]> = readJson('employees.json');

  const FOUNDER_NAMES = ['Tanvir Hasan', 'Abrar Chowdhury', 'Marcus Vance'];
  let sortOrder = 0;
  const docs: object[] = [];

  for (const [department, members] of Object.entries(raw)) {
    for (const emp of members) {
      docs.push({
        name: emp.name,
        role: emp.role,
        department,
        location: emp.location,
        level: emp.level,
        focus: emp.focus,
        photo_url: null,
        is_founder: FOUNDER_NAMES.includes(emp.name),
        sort_order: sortOrder++,
        is_active: true,
      });
    }
  }

  await batchWrite('employees', docs);
  console.log(`  ✅ ${docs.length} employees migrated`);
}

// ─── Migration: site_config ───────────────────────────────────────────────────
async function migrateSiteConfig() {
  console.log('\n⚙️  Writing site_config/metrics...');
  await db.collection('site_config').doc('metrics').set({
    total_clients: 91,
    contractual_accounts: 75,
    years_operational: 5,
    total_employees_core: 57,
    contractual_fleet_size: 210,
    updated_at: Timestamp.now(),
  });
  console.log('  ✅ site_config/metrics written');
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 CubicEnhance → Firestore Migration');
  console.log('=====================================');
  console.log(`Project: ${process.env.FIREBASE_ADMIN_PROJECT_ID || 'cubicenhance-5fbf8'}`);

  try {
    await migrateCompanies();
    await migrateReviews();
    await migrateEmployees();
    await migrateSiteConfig();
    console.log('\n✅ All data migrated successfully!\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Migration failed:', err);
    process.exit(1);
  }
}

main();

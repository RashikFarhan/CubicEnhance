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

const IMAGES = [
  // Home page
  { id: 'hero-background', name: 'Hero Background', page: 'Home', section: 'Hero', url: '', description: 'Main hero background image on the homepage' },
  { id: 'hero-video-thumbnail', name: 'Video Thumbnail', page: 'Home', section: 'Hero', url: '', description: 'Thumbnail for the hero video embed' },
  // Our Story
  { id: 'our-story-hero', name: 'Our Story Hero', page: 'Our Story', section: 'Hero', url: '', description: 'Header image for the Our Story page' },
  { id: 'founder-tanvir', name: 'Tanvir Hasan (Founder)', page: 'Leadership', section: 'Team', url: '', description: 'Profile photo of Managing Partner Tanvir Hasan' },
  { id: 'founder-abrar', name: 'Abrar Chowdhury (Founder)', page: 'Leadership', section: 'Team', url: '', description: 'Profile photo of Managing Partner Abrar Chowdhury' },
  { id: 'founder-marcus', name: 'Marcus Vance (Founder)', page: 'Leadership', section: 'Team', url: '', description: 'Profile photo of Managing Partner Marcus Vance' },
  // Services
  { id: 'services-hero', name: 'Services Hero', page: 'Services', section: 'Hero', url: '', description: 'Header image for the Services page' },
  // Careers
  { id: 'careers-hero', name: 'Careers Hero', page: 'Careers', section: 'Hero', url: '', description: 'Header image for the Careers page' },
  // Contact
  { id: 'contact-hero', name: 'Contact Hero', page: 'Contact', section: 'Hero', url: '', description: 'Header image for the Contact page' },
  // Culture
  { id: 'culture-hero', name: 'Culture Hero', page: 'Culture', section: 'Hero', url: '', description: 'Header image for the Culture page' },
  // Partnerships
  { id: 'partnerships-hero', name: 'Partnerships Hero', page: 'Partnerships', section: 'Hero', url: '', description: 'Header image for the Partnerships page' },
  // Logo
  { id: 'logo-light', name: 'Logo (Light version)', page: 'Global', section: 'Branding', url: '/logo/logo.svg', description: 'Primary logo used on dark backgrounds' },
  { id: 'logo-dark', name: 'Logo (Dark version)', page: 'Global', section: 'Branding', url: '/logo/logo-dark.svg', description: 'Secondary logo used on light backgrounds' },
  { id: 'favicon', name: 'Favicon', page: 'Global', section: 'Branding', url: '/logo/favicon.ico', description: 'Browser tab icon' },
];

async function seed() {
  const col = db.collection('site_images');
  // Check if already seeded
  const existing = await col.limit(1).get();
  if (!existing.empty) {
    console.log('site_images already has data, merging...');
  }
  
  const batch = db.batch();
  for (const img of IMAGES) {
    const ref = col.doc(img.id);
    batch.set(ref, img, { merge: true });
  }
  await batch.commit();
  console.log('Seeded', IMAGES.length, 'image entries into site_images');
  process.exit(0);
}

seed().catch(e => { console.error('Seed failed:', e.message); process.exit(1); });

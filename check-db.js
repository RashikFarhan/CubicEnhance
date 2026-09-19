const { getFirestore } = require('firebase-admin/firestore');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

async function checkDb() {
  const reviews = await db.collection('reviews').get();
  console.log('Total reviews in DB:', reviews.size);
  
  const publishedReviews = await db.collection('reviews').where('is_published', '==', true).get();
  console.log('Published reviews in DB:', publishedReviews.size);

  const companies = await db.collection('companies').get();
  console.log('Total companies in DB:', companies.size);

  const metrics = await db.collection('site_config').doc('metrics').get();
  console.log('Metrics doc exists:', metrics.exists);
  if (metrics.exists) {
      console.log('Metrics data:', metrics.data());
  }
}

checkDb().catch(console.error);

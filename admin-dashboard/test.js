const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

try {
  const app = initializeApp({ projectId: 'test-project' });
  const db = getFirestore(app);
  console.log('Success');
} catch (e) {
  console.error('Error:', e.message);
}

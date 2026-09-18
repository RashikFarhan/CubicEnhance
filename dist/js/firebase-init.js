import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-3kMD8Cc6mqBGm3xWKhuisO2Wa5VimeI",
  authDomain: "cubicenhance-5fbf8.firebaseapp.com",
  projectId: "cubicenhance-5fbf8",
  storageBucket: "cubicenhance-5fbf8.firebasestorage.app",
  messagingSenderId: "330260416126",
  appId: "1:330260416126:web:2f46220f46027169a23a2f",
  measurementId: "G-XNZS8WZ22B"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.db = db;
window.firebaseCollection = collection;
window.firebaseAddDoc = addDoc;
window.firebaseGetDocs = getDocs;
window.firebaseQuery = query;
window.firebaseOrderBy = orderBy;
window.serverTimestamp = serverTimestamp;

console.log("Firebase initialized on static site.");

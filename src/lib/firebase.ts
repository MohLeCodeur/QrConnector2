// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  orderBy // Ajoutez cette import
} from "firebase/firestore";

// Votre configuration Firebase
const firebaseConfig = {
   apiKey: "AIzaSyCA9EKEpAcKzT048gSXAtuvI5UVSXWeb4U",
  authDomain: "qrconnector2.firebaseapp.com",
  projectId: "qrconnector2",
  storageBucket: "qrconnector2.firebasestorage.app",
  messagingSenderId: "870965559802",
  appId: "1:870965559802:web:a0b778f1cbeedad586e443",
  measurementId: "G-G807TP2YSM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export { 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  orderBy // Exportez orderBy
};

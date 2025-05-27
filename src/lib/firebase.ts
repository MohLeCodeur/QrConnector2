// src/lib/firebase.ts
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  // Vous pouvez choisir d'exporter les types d'ici ou de les importer directement
  // depuis 'firebase/firestore' dans les fichiers où ils sont nécessaires.
  // Pour l'instant, nous les importons directement dans ConnexionContext.tsx.
  // Si vous voulez les exporter d'ici, décommentez :
  // type Timestamp,
  // type QuerySnapshot,
  // type DocumentData,
  // type FirestoreError
} from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCA9EKEpAcKzT048gSXAtuvI5UVSXWeb4U",
  authDomain: "qrconnector2.firebaseapp.com",
  projectId: "qrconnector2",
  storageBucket: "qrconnector2.firebasestorage.app",
  messagingSenderId: "870965559802",
  appId: "1:870965559802:web:a0b778f1cbeedad586e443",
  measurementId: "G-G807TP2YSM"
};

// Initialiser Firebase App
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Utiliser l'application existante
}

const db = getFirestore(app);

export { 
  db, 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  // Si vous avez décommenté les types ci-dessus, exportez-les ici aussi :
  // Timestamp,
  // QuerySnapshot,
  // DocumentData,
  // FirestoreError
};
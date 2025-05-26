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
  apiKey: "AIzaSyCvETDMTzL2bydZXQbyqazTzVs83Bo9HHA", // Remplacez si ce n'est pas votre clé publique
  authDomain: "etherscan-6dadb.firebaseapp.com",
  projectId: "etherscan-6dadb",
  storageBucket: "etherscan-6dadb.firebasestorage.app",
  messagingSenderId: "286708158142",
  appId: "1:286708158142:web:6ed9aee6418654070298ef"
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
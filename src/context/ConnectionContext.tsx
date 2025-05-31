// src/context/ConnexionContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
 
// Importer Timestamp, QuerySnapshot, DocumentData, et FirestoreError
import { Timestamp, QuerySnapshot, DocumentData, FirestoreError } from "firebase/firestore"; 
import { 
  db, 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
} from "@/lib/firebase";

// Type pour les données telles qu'elles sont dans Firestore
interface FirestoreConnectionData {
  timestamp: Timestamp;
  status: string;
  ethAddress?: string;
}

// Type pour les entrées dans l'historique affiché
type ConnectionEntry = {
  timestamp: string;
  status: string;
  ethAddress?: string;
};

type ConnectionContextType = {
  connectionHistory: ConnectionEntry[];
  addConnection: (entry: Omit<ConnectionEntry, "timestamp">) => Promise<void>;
  loading: boolean;
};

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [connectionHistory, setConnectionHistory] = useState<ConnectionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "connections"));
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const entries: ConnectionEntry[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as FirestoreConnectionData;
        entries.push({
          timestamp: data.timestamp ? data.timestamp.toDate().toLocaleString() : new Date().toLocaleString(),
          status: data.status,
          ethAddress: data.ethAddress
        });
      });
  
      entries.sort((a, b) => {
        const dateA = new Date(a.timestamp || 0).getTime();
        const dateB = new Date(b.timestamp || 0).getTime();
        return dateB - dateA;
      });
  
      setConnectionHistory(entries);
      setLoading(false);
    }, (err: FirestoreError) => { // UTILISATION DE FirestoreError ici
      console.error("Erreur lors de l'écoute des modifications Firestore:", err);
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  const addConnection = async (entry: Omit<ConnectionEntry, "timestamp">) => {
    try {
      await addDoc(collection(db, "connections"), {
        ...entry,
        timestamp: serverTimestamp()
      });
    } catch (error: any) { 
      // CORRECTION de l'apostrophe pour ESLint
      console.error("Erreur d'ajout de connexion:", error); 
    }
  };

  return (
    <ConnectionContext.Provider value={{ connectionHistory, addConnection, loading }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    // Pas d'apostrophe ici, donc c'est OK
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
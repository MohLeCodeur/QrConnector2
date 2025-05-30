// src/context/ConnectionContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Timestamp, QuerySnapshot, DocumentData, FirestoreError } from "firebase/firestore"; 
import { 
  db, 
  collection, 
  query, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
} from "@/lib/firebase";

interface FirestoreConnectionData {
  timestamp: Timestamp;
  status: string;
  ethAddress?: string;
  walletProvider?: string;
  network?: string;
  ip?: string;
  location?: string;
  browser?: string;
  purpose?: string;
  balance?: string;
}

type ConnectionEntry = {
  timestamp: string;
  status: string;
  ethAddress?: string;
  walletProvider?: string;
  network?: string;
  ip?: string;
  location?: string;
  browser?: string;
  purpose?: string;
  balance?: string;
};

type ConnectionContextType = {
  connectionHistory: ConnectionEntry[];
  addConnection: (entry: Omit<ConnectionEntry, "timestamp">) => Promise<void>;
  loading: boolean;
  fetchUserData: (ethAddress: string) => Promise<{
    balance: string;
    network: string;
  }>;
  fetchIpData: () => Promise<{
    ip: string;
    location: string;
  }>;
};

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export const ConnectionProvider = ({ children }: { children: ReactNode }) => {
  const [connectionHistory, setConnectionHistory] = useState<ConnectionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les données de l'utilisateur depuis la blockchain
  const fetchUserData = async (ethAddress: string) => {
    try {
      // En production, vous utiliseriez une API comme Etherscan ou Alchemy
      const response = await fetch(`/api/userData?address=${ethAddress}`);
      const data = await response.json();
      return {
        balance: data.balance,
        network: data.network
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return {
        balance: "N/A",
        network: "Unknown"
      };
    }
  };

  // Fonction pour récupérer les données IP et localisation
  const fetchIpData = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        ip: data.ip,
        location: `${data.city}, ${data.country_name}`
      };
    } catch (error) {
      console.error("Error fetching IP data:", error);
      return {
        ip: "N/A",
        location: "Unknown"
      };
    }
  };

  useEffect(() => {
    const q = query(collection(db, "connections"));
    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const entries: ConnectionEntry[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as FirestoreConnectionData;
        entries.push({
          timestamp: data.timestamp ? data.timestamp.toDate().toLocaleString() : new Date().toLocaleString(),
          status: data.status,
          ethAddress: data.ethAddress,
          walletProvider: data.walletProvider,
          network: data.network,
          ip: data.ip,
          location: data.location,
          browser: data.browser,
          purpose: data.purpose,
         
        });
      });
  
      entries.sort((a, b) => {
        const dateA = new Date(a.timestamp || 0).getTime();
        const dateB = new Date(b.timestamp || 0).getTime();
        return dateB - dateA;
      });
  
      setConnectionHistory(entries);
      setLoading(false);
    }, (err: FirestoreError) => {
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
      console.error("Erreur d'ajout de connexion:", error); 
    }
  };

  return (
    <ConnectionContext.Provider value={{ 
      connectionHistory, 
      addConnection, 
      loading,
      fetchUserData,
      fetchIpData
    }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};
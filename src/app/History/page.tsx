// src/app/History/page.tsx
"use client";
import { useConnection } from "@/context/ConnectionContext";

export default function HistoryPage() {
  const { connectionHistory, loading } = useConnection();

  if (loading) {
    return <div className="text-center p-8">Loading history...</div>;
  }

  return (
    <div className="connection-history-section py-20 bg-white text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-blue-600">
          Connection History
        </h2>
        <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
          {connectionHistory.map((entry, index) => (
            <div key={index} className="history-item p-6 bg-gray-100 rounded-lg mb-4 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="font-semibold text-gray-800">Timestamp:</p>
                  <p className="text-gray-600 mb-2">{entry.timestamp}</p>
                  
                  <p className="font-semibold text-gray-800">Status:</p>
                  <p className="text-gray-600 mb-2">{entry.status}</p>
                  
                  {entry.ethAddress && (
                    <>
                      <p className="font-semibold text-gray-800">ETH Address:</p>
                      <p className="text-gray-600 font-mono mb-2">{entry.ethAddress}</p>
                    </>
                  )}
                  
                  <p className="font-semibold text-gray-800">Wallet Provider:</p>
                  <p className="text-gray-600 mb-2">{entry.walletProvider || "N/A"}</p>
                </div>
                
                <div>
                  <p className="font-semibold text-gray-800">Network:</p>
                  <p className="text-gray-600 mb-2">{entry.network || "N/A"}</p>
                  
                  <p className="font-semibold text-gray-800">IP Address:</p>
                  <p className="text-gray-600 mb-2">{entry.ip || "N/A"}</p>
                  
                  <p className="font-semibold text-gray-800">Location:</p>
                  <p className="text-gray-600 mb-2">{entry.location || "N/A"}</p>
                  
                  <p className="font-semibold text-gray-800">Browser:</p>
                  <p className="text-gray-600 mb-2">{entry.browser || "N/A"}</p>
                  
                  <p className="font-semibold text-gray-800">Purpose:</p>
                  <p className="text-gray-600 mb-2">{entry.purpose || "N/A"}</p>
                  
               
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
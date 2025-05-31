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
            <div key={index} className="history-item p-6 bg-gray-100 rounded-lg mb-4 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-gray-700">
                    <span className="font-semibold text-blue-600">Timestamp:</span>
                    <br />
                    <span className="text-sm">{entry.timestamp}</span>
                  </p>
                  
                  <p className="text-gray-700 mt-3">
                    <span className="font-semibold text-blue-600">Status:</span>
                    <br />
                    <span className={`px-2 py-1 rounded text-sm ${
                      entry.status.includes('connected') && !entry.status.includes('disconnected') 
                        ? 'bg-green-100 text-green-800' 
                        : entry.status.includes('disconnected')
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {entry.status}
                    </span>
                  </p>
                </div>

                <div>
                  {entry.ethAddress && (
                    <p className="text-gray-700 mb-3">
                      <span className="font-semibold text-blue-600">ETH Address:</span>
                      <br />
                      <span className="font-mono text-sm break-all bg-gray-200 px-2 py-1 rounded">
                        {entry.ethAddress}
                      </span>
                    </p>
                  )}

                  {entry.location && (
                    <p className="text-gray-700 mb-3">
                      <span className="font-semibold text-blue-600">Location:</span>
                      <br />
                      <span className="text-sm">{entry.location}</span>
                    </p>
                  )}

                  {entry.ethBalance && (
                    <p className="text-gray-700">
                      <span className="font-semibold text-blue-600">ETH Balance:</span>
                      <br />
                      <span className="text-sm font-mono bg-blue-100 px-2 py-1 rounded">
                        {entry.ethBalance}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

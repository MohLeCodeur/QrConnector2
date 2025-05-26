// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google"; // Poppins déjà importé
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Header from "./Header"; // Assurez-vous que ce chemin est correct
import { ConnectionProvider } from "@/context/ConnectionContext"; // Importer ConnectionProvider

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '600', '800'] });
// const inter = Inter({ subsets: ["latin"] }); // Vous utilisez poppins, inter n'est pas utilisé pour le body

export const metadata: Metadata = {
  title: "Etherscan AML Check", // Titre mis à jour
  description: "The AML Check platform automates AML/KYC procedures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/etherscan.png" type="image/png" />
      </head>
      <body className={poppins.className}>
        <ConnectionProvider> {/* Envelopper avec ConnectionProvider */}
          <Header />
          <ThirdwebProvider>
            <main className="pt-4"> {/* Ajout d'un peu de padding pour le contenu sous le header sticky */}
              {children}
            </main>
          </ThirdwebProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}
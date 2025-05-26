// src/app/Header.tsx
"use client"; // Indique que ce fichier est un Client Component

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link"; // Importation de Link
import logo from "@public/etherscan.svg"; // Assurez-vous que ce chemin est correct ou utilisez /etherscan.svg si dans public

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false); // Fonction pour fermer le menu

  return (
    <header className="bg-white shadow-md p-5 sticky top-0 z-50"> {/* Ajout de sticky et z-index */}
      <nav className="container mx-auto flex justify-between items-center"> {/* Ajout de container mx-auto */}
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <Image
            src={logo} // Utilisez votre variable logo importée
            alt="AMLCheck Logo"
            width={40}
            height={40}
          />
          <div className="logo text-xl sm:text-2xl font-bold text-blue-600">
            AMLCheck
            <span className="block text-sm font-normal text-gray-600">By Etherscan</span>
          </div>
        </Link>

        {/* Hamburger Button (visible on mobile) */}
        <button
          className="sm:hidden block focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Ouvrir le menu" // Pour l'accessibilité
          aria-expanded={isMenuOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-blue-600"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> // Icône croix
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" // Icône hamburger
              />
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } sm:flex flex-col sm:flex-row items-center sm:space-y-0 sm:space-x-6 space-y-4 absolute sm:static top-[70px] left-0 w-full sm:w-auto bg-white sm:bg-transparent p-5 sm:p-0 shadow-lg sm:shadow-none rounded-b-lg sm:rounded-none`}
          // Ajustement top, padding pour le menu mobile
        >
          <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 block sm:inline-block" onClick={closeMenu}>
            Accueil
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-blue-600 px-3 py-2 block sm:inline-block" onClick={closeMenu}>
            Products
          </Link>
          <Link href="/rates" className="text-gray-700 hover:text-blue-600 px-3 py-2 block sm:inline-block" onClick={closeMenu}>
            Rates
          </Link>
          <Link href="/analysis" className="text-gray-700 hover:text-blue-600 px-3 py-2 block sm:inline-block" onClick={closeMenu}>
            Analysis
          </Link>
          {/* Lien vers l'Historique ajouté ici */}
          <Link href="/History" className="text-gray-700 hover:text-blue-600 px-3 py-2 block sm:inline-block" onClick={closeMenu}>
            Historique
          </Link>
          <Link href="/faq" className="text-gray-700 hover:text-blue-600 px-3 py-2 block sm:inline-block" onClick={closeMenu}>
            FAQ
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600 px-3 py-2 block sm:inline-block" onClick={closeMenu}>
            Blog
          </Link>
          <Link href="/about-us" className="text-gray-700 hover:text-blue-600 px-3 py-2 block sm:inline-block" onClick={closeMenu}>
            About Us
          </Link>
          <Link href="/login" className="cta-button bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg block sm:inline-block text-center mt-2 sm:mt-0" onClick={closeMenu}>
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
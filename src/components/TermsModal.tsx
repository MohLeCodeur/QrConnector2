"use client";

import { useState } from 'react';

interface TermsModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAccept: () => void;
  walletAddress?: string;
}

const TermsModal = ({ isVisible, onClose, onAccept, walletAddress }: TermsModalProps) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [currentSection, setCurrentSection] = useState('overview');

  if (!isVisible) return null;

  const sections = [
    { id: 'overview', title: 'Vue d&apos;ensemble' },
    { id: 'wallet', title: 'Connexion Wallet' },
    { id: 'compliance', title: 'Conformité AML/KYC' },
    { id: 'terms', title: 'Conditions d&apos;utilisation' }
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'overview':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Bienvenue sur AMLCheck</h3>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed">
                AMLCheck est une plateforme de conformité tout-en-un conçue pour les entreprises crypto. 
                Notre solution automatise les procédures AML/KYC et réduit les coûts liés à la conformité.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">🔍 Analyse en temps réel</h4>
                <p className="text-sm text-gray-600">
                  Surveillance continue des transactions et détection automatique des activités suspectes.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">🛡️ Sécurité renforcée</h4>
                <p className="text-sm text-gray-600">
                  Chiffrement de bout en bout et protection des données personnelles selon les standards RGPD.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">📊 Rapports détaillés</h4>
                <p className="text-sm text-gray-600">
                  Génération automatique de rapports de conformité pour les autorités réglementaires.
                </p>
              </div>
            </div>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Connexion de votre Wallet</h3>
            {walletAddress && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 mb-2">✅ Wallet connecté avec succès</p>
                <p className="text-xs font-mono bg-green-100 p-2 rounded break-all">
                  {walletAddress}
                </p>
              </div>
            )}
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Informations importantes</h4>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li>• Nous ne stockons jamais vos clés privées</li>
                  <li>• Votre wallet reste sous votre contrôle exclusif</li>
                  <li>• Nous analysons uniquement les données publiques de la blockchain</li>
                  <li>• Vous pouvez vous déconnecter à tout moment</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">🔐 Données collectées</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Adresse publique du wallet</li>
                  <li>• Historique des transactions publiques</li>
                  <li>• Métadonnées des smart contracts</li>
                  <li>• Horodatage des connexions</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Conformité AML/KYC</h3>
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-800 mb-2">📋 Obligations réglementaires</h4>
              <p className="text-sm text-red-700 mb-3">
                En utilisant notre plateforme, vous acceptez de vous conformer aux réglementations AML/KYC en vigueur.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">🔍 Vérifications automatiques</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Analyse des listes de sanctions internationales</li>
                  <li>• Détection des adresses à haut risque</li>
                  <li>• Vérification des sources de fonds</li>
                  <li>• Surveillance des transactions suspectes</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">⚖️ Conformité légale</h4>
                <p className="text-sm text-gray-600">
                  Notre plateforme respecte les directives FATF, les réglementations européennes MiCA, 
                  et les standards internationaux de lutte contre le blanchiment d&apos;argent.
                </p>
              </div>
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Conditions d&apos;utilisation</h3>
            <div className="space-y-4 text-sm text-gray-700">
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">1. Acceptation des conditions</h4>
                <p>
                  En connectant votre wallet et en utilisant nos services, vous acceptez intégralement 
                  les présentes conditions d&apos;utilisation et notre politique de confidentialité.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">2. Utilisation autorisée</h4>
                <ul className="space-y-1 ml-4">
                  <li>• Usage personnel et professionnel légal uniquement</li>
                  <li>• Interdiction de contourner nos mesures de sécurité</li>
                  <li>• Respect des lois locales et internationales</li>
                  <li>• Pas d&apos;utilisation pour des activités illégales</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">3. Responsabilités</h4>
                <p>
                  Vous êtes responsable de la sécurité de votre wallet et de vos clés privées. 
                  AMLCheck ne peut être tenu responsable des pertes liées à une utilisation inappropriée.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">4. Confidentialité</h4>
                <p>
                  Nous nous engageons à protéger vos données personnelles conformément au RGPD. 
                  Les données blockchain publiques peuvent être analysées à des fins de conformité.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">5. Modifications</h4>
                <p>
                  Nous nous réservons le droit de modifier ces conditions à tout moment. 
                  Les utilisateurs seront notifiés des changements importants.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
      <div className="bg-white w-full max-w-2xl h-full flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Contrat d&apos;utilisation</h2>
            <p className="text-blue-100 text-sm">AMLCheck - Plateforme de conformité</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex space-x-1 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  currentSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                dangerouslySetInnerHTML={{ __html: section.title }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <input
                type="checkbox"
                id="terms-checkbox"
                className="rounded border-gray-300"
                onChange={(e) => setHasScrolledToBottom(e.target.checked)}
              />
              <label htmlFor="terms-checkbox">
                J&apos;ai lu et j&apos;accepte les conditions d&apos;utilisation
              </label>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Fermer
              </button>
              <button
                onClick={onAccept}
                disabled={!hasScrolledToBottom}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  hasScrolledToBottom
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Accepter et continuer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;

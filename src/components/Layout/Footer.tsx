import React from 'react';
import { Link } from 'react-router-dom';
import { GovernmentSeal } from '../UI/GovernmentSeal';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* En-tête du footer */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center space-x-4 mb-4">
            <div className="w-8 h-6 bg-gradient-to-r from-green-400 to-yellow-400 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
            <GovernmentSeal size="sm" variant="building" />
          </div>
          <h3 className="text-xl font-bold">Ministère de la Décentralisation et du Développement Local</h3>
          <p className="text-gray-300 mt-2">
            Plateforme blockchain de gestion administrative des projets territoriaux
          </p>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">À propos</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Notre plateforme facilite la gestion transparente et traçable des projets de développement 
              territorial, en utilisant la technologie blockchain pour garantir l'intégrité des processus administratifs.
            </p>
          </div>

          {/* Ministères Partenaires */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ministères Partenaires</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Ministère des Finances (MINFI)</li>
              <li>• Trésor Public</li>
              <li>• Cour des Comptes</li>
              <li>• Agence Nationale des Technologies de l'Information et de la Communication (ANTIC)</li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/support" className="text-gray-300 hover:text-white transition-colors">
                  • Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-gray-300 hover:text-white transition-colors">
                  • Documentation
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-gray-300 hover:text-white transition-colors">
                  • Sécurité
                </Link>
              </li>
              <li>
                <a href="mailto:contact@minddevel.cm" className="text-gray-300 hover:text-white transition-colors">
                  • Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Informations de contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Yaoundé, Cameroun</p>
              <p>Tél: +237 233 42 00 00</p>
              <p>Email: contact@minddevel.cm</p>
              <p>Horaires: Lun-Ven 8h-17h</p>
            </div>
          </div>
        </div>

        {/* Séparateur décoratif */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Liens légaux */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Conditions d'utilisation
              </Link>
              <Link to="/security" className="text-gray-400 hover:text-white transition-colors">
                Sécurité
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right text-sm text-gray-400">
              <p>&copy; 2024 République du Cameroun. Tous droits réservés.</p>
              <p className="mt-1">Ministère de la Décentralisation et du Développement Local</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

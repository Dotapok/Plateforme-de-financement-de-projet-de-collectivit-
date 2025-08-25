import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, Video, FileText, Users, Building2, Shield } from 'lucide-react';

export function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* En-tête */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Retour à l'accueil</span>
            </Link>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Documentation et Ressources
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Guides complets, tutoriels et ressources pour maîtriser la plateforme
            </p>
          </div>
        </div>

        {/* Navigation rapide */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation Rapide</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/support"
              className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-900">Centre d'aide</h3>
                  <p className="text-sm text-blue-700">Support et assistance</p>
                </div>
              </div>
            </Link>

            <Link
              to="/security"
              className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Sécurité</h3>
                  <p className="text-sm text-green-700">Protection et bonnes pratiques</p>
                </div>
              </div>
            </Link>

            <a
              href="mailto:support@minddevel.cm"
              className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-purple-600" />
                <div>
                  <h3 className="font-medium text-purple-900">Contact support</h3>
                  <p className="text-sm text-purple-700">Demander de l'aide</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.minddevel.cm"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Building2 className="h-6 w-6 text-orange-600" />
                <div>
                  <h3 className="font-medium text-orange-900">Site officiel</h3>
                  <p className="text-sm text-orange-700">Plus d'informations</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Sections de documentation */}
        <div className="space-y-6">
          {/* Premiers Pas */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
              Premiers Pas
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Guide de démarrage rapide</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Tout ce que vous devez savoir pour commencer à utiliser la plateforme
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>⏱️ 15 min</span>
                  <span>📊 Débutant</span>
                </div>
                <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Lire le guide
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Création de compte</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Étapes détaillées pour créer et configurer votre compte utilisateur
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>⏱️ 10 min</span>
                  <span>📊 Débutant</span>
                </div>
                <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Voir le tutoriel
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Vue d'ensemble</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Découvrez les principales fonctionnalités et l'interface utilisateur
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>⏱️ 20 min</span>
                  <span>📊 Débutant</span>
                </div>
                <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Commencer
                </button>
              </div>
            </div>
          </div>

          {/* Guides Utilisateur */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-6 w-6 text-green-600 mr-2" />
              Guides Utilisateur
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Guide CTD - Gestion des projets</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Manuel complet pour les Collectivités Territoriales Décentralisées
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>⏱️ 45 min</span>
                  <span>📊 Intermédiaire</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Lire
                  </button>
                  <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Guide MINDDEVEL - Évaluation</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Processus d'évaluation et de validation des projets soumis
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>⏱️ 60 min</span>
                  <span>📊 Intermédiaire</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Lire
                  </button>
                  <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Documentation Technique */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-6 w-6 text-purple-600 mr-2" />
              Documentation Technique
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Architecture de la plateforme</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Vue d'ensemble technique de l'infrastructure et des composants
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>⏱️ 40 min</span>
                  <span>📊 Avancé</span>
                </div>
                <button className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Consulter
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Sécurité et authentification</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Détails sur les protocoles de sécurité et l'authentification PKI
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>⏱️ 35 min</span>
                  <span>📊 Avancé</span>
                </div>
                <button className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Consulter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ rapide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Questions Fréquentes</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Comment créer un nouveau projet ?</h3>
              <p className="text-sm text-blue-800">
                Accédez à votre dashboard et cliquez sur "Nouveau Projet". Suivez le formulaire guidé 
                et téléchargez les documents requis.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Comment suivre l'état de mon projet ?</h3>
              <p className="text-sm text-blue-800">
                Consultez la page "Suivi Projets" dans votre dashboard. Vous recevrez également 
                des notifications par email lors des changements de statut.
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link
              to="/support"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span>Voir toutes les questions</span>
            </Link>
          </div>
        </div>

        {/* Contact et support */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Besoin d'Aide ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Support technique</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📧 Email: support@minddevel.cm</p>
                <p>📞 Téléphone: +237 233 42 00 00</p>
                <p>🕒 Horaires: Lun-Ven 8h-17h</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Ressources additionnelles</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>📚 <Link to="/support" className="text-blue-600 hover:text-blue-700">Centre d'aide complet</Link></p>
                <p>🔒 <Link to="/security" className="text-blue-600 hover:text-blue-700">Guide de sécurité</Link></p>
                <p>📋 <Link to="/terms" className="text-blue-600 hover:text-blue-700">Conditions d'utilisation</Link></p>
                <p>🛡️ <Link to="/privacy" className="text-blue-600 hover:text-blue-700">Politique de confidentialité</Link></p>
              </div>
            </div>
          </div>
        </div>

        {/* Dernière mise à jour */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Dernière mise à jour de la documentation : Janvier 2024</p>
          <p className="mt-1">
            Version 1.0 - Documentation de la plateforme blockchain MINDDEVEL
          </p>
        </div>
      </div>
    </div>
  );
}

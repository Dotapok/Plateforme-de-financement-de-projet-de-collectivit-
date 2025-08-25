import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Users, Building2, AlertTriangle, CheckCircle } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
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
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Conditions d'Utilisation
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Règles et conditions d'utilisation de la plateforme blockchain
            </p>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Les présentes conditions d'utilisation régissent l'utilisation de la plateforme blockchain
              de gestion administrative des projets territoriaux, propriété de la République du Cameroun
              et gérée par le Ministère de la Décentralisation et du Développement Local (MINDDEVEL).
            </p>
            <p className="text-gray-700 leading-relaxed">
              En accédant et en utilisant cette plateforme, vous acceptez d'être lié par ces conditions.
              Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser la plateforme.
            </p>
          </div>

          {/* Définitions */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Définitions</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Plateforme :</strong> La plateforme blockchain de gestion administrative des projets territoriaux.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Utilisateur :</strong> Toute personne ou entité autorisée à utiliser la plateforme.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>CTD :</strong> Collectivité Territoriale Décentralisée.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>MINDDEVEL :</strong> Ministère de la Décentralisation et du Développement Local.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong>Projet :</strong> Initiative de développement territorial soumise via la plateforme.
                </div>
              </div>
            </div>
          </div>

          {/* Acceptation des conditions */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Acceptation des Conditions</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                L'utilisation de la plateforme implique l'acceptation pleine et entière des présentes conditions :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Vous devez avoir l'âge légal et la capacité juridique pour accepter ces conditions</li>
                <li>Vous devez être autorisé par votre entité à utiliser la plateforme</li>
                <li>Vous devez respecter toutes les lois et réglementations applicables</li>
                <li>Vous devez maintenir la confidentialité de vos identifiants de connexion</li>
              </ul>
            </div>
          </div>

          {/* Utilisation autorisée */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              Utilisation Autorisée
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                La plateforme est destinée aux utilisations suivantes :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Pour les CTD :</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                    <li>Soumission de projets de développement</li>
                    <li>Suivi de l'état d'avancement</li>
                    <li>Gestion des documents et rapports</li>
                    <li>Communication avec les évaluateurs</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Pour MINDDEVEL :</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                    <li>Évaluation des projets soumis</li>
                    <li>Validation et approbation</li>
                    <li>Suivi des processus administratifs</li>
                    <li>Génération de rapports</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Utilisation interdite */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              Utilisation Interdite
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Il est strictement interdit de :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Utiliser la plateforme à des fins illégales ou frauduleuses</li>
                <li>Tenter d'accéder à des comptes d'autres utilisateurs</li>
                <li>Transmettre des virus, logiciels malveillants ou code destructeur</li>
                <li>Porter atteinte à la sécurité ou à l'intégrité de la plateforme</li>
                <li>Utiliser des robots ou scripts automatisés non autorisés</li>
                <li>Partager des informations confidentielles ou sensibles</li>
                <li>Utiliser la plateforme pour du spam ou du harcèlement</li>
              </ul>
            </div>
          </div>

          {/* Comptes et sécurité */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              Comptes et Sécurité
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Responsabilités de l'utilisateur :</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-sm">
                  <li>Maintenir la confidentialité de vos identifiants de connexion</li>
                  <li>Signaler immédiatement toute utilisation non autorisée</li>
                  <li>Déconnecter votre session après utilisation</li>
                  <li>Utiliser uniquement des appareils sécurisés</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Mesures de sécurité :</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-sm">
                  <li>Authentification multi-facteurs obligatoire</li>
                  <li>Certificats PKI pour l'identification</li>
                  <li>Chiffrement des données en transit et au repos</li>
                  <li>Surveillance continue des accès</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Propriété intellectuelle */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Propriété Intellectuelle</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                La plateforme et son contenu sont protégés par les droits de propriété intellectuelle :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>La plateforme appartient à la République du Cameroun</li>
                <li>Les logiciels et technologies sont protégés par le droit d'auteur</li>
                <li>Les marques et logos sont des marques déposées</li>
                <li>Le contenu des projets appartient aux CTD qui les ont soumis</li>
                <li>Les données blockchain sont publiques et immutables</li>
              </ul>
            </div>
          </div>

          {/* Confidentialité et protection des données */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Confidentialité et Protection des Données</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                La protection de vos données est une priorité. Consultez notre 
                <Link to="/privacy" className="text-blue-600 hover:text-blue-700 mx-1">
                  Politique de Confidentialité
                </Link>
                pour plus de détails.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Principes clés :</h4>
                <ul className="list-disc list-inside text-blue-800 space-y-1 ml-4 text-sm">
                  <li>Collecte minimale des données nécessaires</li>
                  <li>Utilisation exclusive aux fins autorisées</li>
                  <li>Stockage sécurisé et chiffré</li>
                  <li>Accès restreint et contrôlé</li>
                  <li>Respect des droits des utilisateurs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Responsabilités */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsabilités</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Responsabilités de MINDDEVEL :</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-sm">
                  <li>Maintenir la disponibilité et la sécurité de la plateforme</li>
                  <li>Traiter les projets dans des délais raisonnables</li>
                  <li>Protéger la confidentialité des données</li>
                  <li>Fournir un support technique adéquat</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Responsabilités des utilisateurs :</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 text-sm">
                  <li>Fournir des informations exactes et à jour</li>
                  <li>Respecter les délais et procédures</li>
                  <li>Maintenir la sécurité de leurs comptes</li>
                  <li>Respecter les droits des autres utilisateurs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Limitation de responsabilité */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitation de Responsabilité</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Dans les limites autorisées par la loi :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>MINDDEVEL ne peut être tenu responsable des dommages indirects</li>
                <li>La responsabilité est limitée au montant des frais d'utilisation</li>
                <li>Les utilisateurs sont responsables de l'utilisation de leurs comptes</li>
                <li>La plateforme est fournie "en l'état" sans garantie</li>
              </ul>
            </div>
          </div>

          {/* Modifications des conditions */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Modifications des Conditions</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                MINDDEVEL se réserve le droit de modifier ces conditions à tout moment :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Les modifications seront publiées sur la plateforme</li>
                <li>L'utilisation continue constitue l'acceptation des nouvelles conditions</li>
                <li>Les utilisateurs seront notifiés des changements importants</li>
                <li>Les anciennes conditions restent applicables aux actions passées</li>
              </ul>
            </div>
          </div>

          {/* Droit applicable et juridiction */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Droit Applicable et Juridiction</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Ces conditions sont régies par le droit camerounais. Tout litige sera résolu :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>En priorité par la négociation et la médiation</li>
                <li>Par les tribunaux compétents de Yaoundé, Cameroun</li>
                <li>Selon les procédures administratives applicables</li>
                <li>Dans le respect des conventions internationales ratifiées</li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Pour toute question concernant ces conditions d'utilisation :
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Ministère de la Décentralisation et du Développement Local</p>
                    <p className="text-gray-600">Yaoundé, Cameroun</p>
                    <p className="text-gray-600">Tél: +237 233 42 00 00</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Support technique</p>
                    <p className="text-gray-600">Email: support@minddevel.cm</p>
                    <p className="text-gray-600">Horaires: Lun-Ven 8h-17h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Date de dernière mise à jour */}
          <div className="text-center text-sm text-gray-500">
            <p>Dernière mise à jour : Janvier 2024</p>
            <p className="mt-1">
              Version 1.0 - Conditions d'utilisation de la plateforme blockchain MINDDEVEL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

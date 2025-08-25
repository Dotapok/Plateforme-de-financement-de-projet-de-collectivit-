import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, FileText, Calendar } from 'lucide-react';

export function PrivacyPage() {
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
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Politique de Confidentialité
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Protection de vos données personnelles et respect de votre vie privée
            </p>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La République du Cameroun, à travers le Ministère de la Décentralisation et du Développement Local (MINDDEVEL), 
              s'engage à protéger la confidentialité et la sécurité de vos informations personnelles. Cette politique de 
              confidentialité décrit comment nous collectons, utilisons, stockons et protégeons vos données.
            </p>
            <p className="text-gray-700 leading-relaxed">
              En utilisant cette plateforme blockchain de gestion administrative des projets territoriaux, vous acceptez 
              les pratiques décrites dans cette politique.
            </p>
          </div>

          {/* Collecte des données */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="h-6 w-6 text-blue-600 mr-2" />
              Collecte des Données
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Données personnelles collectées</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Nom, prénom et coordonnées professionnelles</li>
                  <li>Informations sur l'entité et le rôle dans l'organisation</li>
                  <li>Certificats PKI et informations d'authentification</li>
                  <li>Données de connexion et d'utilisation de la plateforme</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Données des projets</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Informations sur les projets soumis et évalués</li>
                  <li>Documents et fichiers associés aux projets</li>
                  <li>Données d'évaluation et de validation</li>
                  <li>Transactions blockchain et métadonnées associées</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Utilisation des données */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-6 w-6 text-green-600 mr-2" />
              Utilisation des Données
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Vos données sont utilisées exclusivement pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Gestion et suivi des projets de développement territorial</li>
                <li>Processus d'évaluation et de validation des projets</li>
                <li>Traçabilité blockchain des décisions administratives</li>
                <li>Communication officielle relative aux projets</li>
                <li>Amélioration de la plateforme et des services</li>
                <li>Respect des obligations légales et réglementaires</li>
              </ul>
            </div>
          </div>

          {/* Stockage et sécurité */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="h-6 w-6 text-red-600 mr-2" />
              Stockage et Sécurité
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Mesures de sécurité</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Chiffrement des données en transit et au repos</li>
                  <li>Authentification multi-facteurs et certificats PKI</li>
                  <li>Accès restreint et contrôlé aux données</li>
                  <li>Surveillance continue des systèmes</li>
                  <li>Sauvegardes sécurisées et redondantes</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Stockage blockchain</h3>
                <p className="text-gray-700 leading-relaxed">
                  Les transactions et validations sont enregistrées sur la blockchain pour garantir 
                  l'immutabilité et la traçabilité. Les données personnelles sensibles ne sont pas 
                  directement stockées sur la blockchain, mais référencées via des identifiants sécurisés.
                </p>
              </div>
            </div>
          </div>

          {/* Partage des données */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-6 w-6 text-purple-600 mr-2" />
              Partage des Données
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Vos données ne sont partagées qu'avec les entités autorisées et dans les limites strictes 
                nécessaires au fonctionnement de la plateforme :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Ministères partenaires pour l'évaluation des projets</li>
                <li>Entités CTD pour la gestion de leurs projets</li>
                <li>Auditeurs et contrôleurs habilités</li>
                <li>Autorités judiciaires sur demande légale</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Aucune donnée personnelle n'est vendue, louée ou partagée avec des tiers commerciaux.
              </p>
            </div>
          </div>

          {/* Droits des utilisateurs */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-6 w-6 text-orange-600 mr-2" />
              Vos Droits
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Conformément à la législation camerounaise, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Droit d'accès :</strong> Consulter vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> Corriger des informations inexactes</li>
                <li><strong>Droit de suppression :</strong> Demander la suppression de vos données</li>
                <li><strong>Droit de limitation :</strong> Limiter le traitement de vos données</li>
                <li><strong>Droit de portabilité :</strong> Récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Pour exercer ces droits, contactez notre délégué à la protection des données 
                à l'adresse : <a href="mailto:dpo@minddevel.cm" className="text-blue-600 hover:text-blue-700">dpo@minddevel.cm</a>
              </p>
            </div>
          </div>

          {/* Conservation des données */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-6 w-6 text-indigo-600 mr-2" />
              Conservation des Données
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Vos données sont conservées uniquement le temps nécessaire aux finalités pour lesquelles 
                elles ont été collectées :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li><strong>Données de compte :</strong> Pendant la durée d'utilisation de la plateforme</li>
                <li><strong>Données de projets :</strong> 10 ans après la finalisation du projet</li>
                <li><strong>Données blockchain :</strong> Conservation permanente pour la traçabilité</li>
                <li><strong>Données de connexion :</strong> 2 ans pour des raisons de sécurité</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Après ces délais, les données sont soit supprimées, soit anonymisées pour des fins 
                statistiques ou de recherche.
              </p>
            </div>
          </div>

          {/* Cookies et technologies */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies et Technologies</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Notre plateforme utilise des cookies et technologies similaires pour :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Assurer le bon fonctionnement de la plateforme</li>
                <li>Maintenir votre session de connexion</li>
                <li>Améliorer la sécurité et prévenir la fraude</li>
                <li>Analyser l'utilisation de la plateforme</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut 
                affecter le fonctionnement de certaines fonctionnalités.
              </p>
            </div>
          </div>

          {/* Modifications de la politique */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Modifications de la Politique</h2>
            <p className="text-gray-700 leading-relaxed">
              Cette politique de confidentialité peut être mise à jour périodiquement pour refléter 
              les évolutions de nos pratiques ou les changements législatifs. Les modifications 
              importantes vous seront notifiées via la plateforme ou par email.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Contact et Questions</h2>
            <p className="text-blue-800 leading-relaxed mb-4">
              Si vous avez des questions concernant cette politique de confidentialité ou la 
              protection de vos données personnelles, n'hésitez pas à nous contacter :
            </p>
            <div className="space-y-2 text-blue-800">
              <p><strong>Email :</strong> <a href="mailto:privacy@minddevel.cm" className="underline hover:text-blue-900">privacy@minddevel.cm</a></p>
              <p><strong>Téléphone :</strong> +237 233 42 00 00</p>
              <p><strong>Adresse :</strong> Ministère de la Décentralisation et du Développement Local, Yaoundé, Cameroun</p>
            </div>
          </div>

          {/* Dernière mise à jour */}
          <div className="text-center text-sm text-gray-500">
            <p>Dernière mise à jour : 15 janvier 2024</p>
            <p>Version : 1.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}

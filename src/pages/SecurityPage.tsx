import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Key, Database, Users, Eye, AlertTriangle, CheckCircle, Server } from 'lucide-react';

export function SecurityPage() {
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
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Sécurité de la Plateforme
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Mesures de protection et technologies de sécurité avancées
            </p>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="space-y-6">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Notre Engagement en Matière de Sécurité</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La sécurité de la plateforme blockchain MINDDEVEL est notre priorité absolue. Nous mettons en œuvre
              les technologies et protocoles de sécurité les plus avancés pour protéger vos données et garantir
              l'intégrité de tous les processus administratifs.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Notre approche de sécurité repose sur plusieurs couches de protection, de l'authentification
              des utilisateurs jusqu'au stockage sécurisé des données sur la blockchain.
            </p>
          </div>

          {/* Authentification et autorisation */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Key className="h-6 w-6 text-blue-600 mr-2" />
              Authentification et Autorisation
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Certificats PKI (Public Key Infrastructure)</h4>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Tous les utilisateurs de la plateforme sont authentifiés via des certificats PKI officiels,
                  garantissant une identification sécurisée et non-répudiable.
                </p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Certificats numériques émis par l'ANTIC (Agence Nationale des TIC)</li>
                  <li>Validation cryptographique des identités</li>
                  <li>Signature électronique des documents et transactions</li>
                  <li>Traçabilité complète des actions utilisateur</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Authentification multi-facteurs</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Premier facteur : Certificat PKI</li>
                  <li>Deuxième facteur : Code PIN personnel</li>
                  <li>Troisième facteur : Vérification biométrique (optionnel)</li>
                  <li>Session limitée dans le temps avec déconnexion automatique</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Gestion des rôles et permissions</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Attribution granulaire des permissions par fonction</li>
                  <li>Principe du moindre privilège appliqué</li>
                  <li>Révision périodique des accès</li>
                  <li>Audit automatique des actions sensibles</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chiffrement des données */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="h-6 w-6 text-green-600 mr-2" />
              Chiffrement des Données
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Chiffrement en transit (TLS/SSL)</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Protocole TLS 1.3 pour toutes les communications</li>
                  <li>Certificats SSL/TLS validés et renouvelés automatiquement</li>
                  <li>Chiffrement AES-256 pour les données sensibles</li>
                  <li>Protection contre les attaques de type "man-in-the-middle"</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Chiffrement au repos</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Chiffrement AES-256 pour les bases de données</li>
                  <li>Chiffrement des sauvegardes et archives</li>
                  <li>Gestion sécurisée des clés de chiffrement</li>
                  <li>Rotation automatique des clés selon les standards</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Chiffrement des documents</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Chiffrement individuel de chaque document</li>
                  <li>Clés de chiffrement uniques par projet</li>
                  <li>Accès contrôlé selon les permissions utilisateur</li>
                  <li>Traçabilité des accès aux documents</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sécurité de la blockchain */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Database className="h-6 w-6 text-purple-600 mr-2" />
              Sécurité de la Blockchain
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Architecture blockchain sécurisée</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Blockchain privée et permissionnée</li>
                  <li>Consensus Byzantine Fault Tolerance (BFT)</li>
                  <li>Validation cryptographique de chaque transaction</li>
                  <li>Immutabilité garantie par la cryptographie</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Protection des transactions</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Signature cryptographique obligatoire pour chaque transaction</li>
                  <li>Validation multi-signatures pour les opérations sensibles</li>
                  <li>Horodatage cryptographique des actions</li>
                  <li>Traçabilité complète et auditabilité</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sécurité des nœuds</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Nœuds validés et autorisés uniquement</li>
                  <li>Isolation réseau des nœuds de validation</li>
                  <li>Surveillance continue de l'intégrité des nœuds</li>
                  <li>Récupération automatique en cas de compromission</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Infrastructure et réseau */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Server className="h-6 w-6 text-orange-600 mr-2" />
              Infrastructure et Réseau
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sécurité physique</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Centres de données certifiés ISO 27001</li>
                  <li>Contrôle d'accès biométrique et vidéosurveillance</li>
                  <li>Protection contre les incendies et inondations</li>
                  <li>Alimentation électrique redondante et sécurisée</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sécurité réseau</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Pare-feu de nouvelle génération (NGFW)</li>
                  <li>Détection et prévention d'intrusion (IDS/IPS)</li>
                  <li>Segmentation réseau et isolation des services</li>
                  <li>Surveillance continue du trafic réseau</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Surveillance et monitoring</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Monitoring 24/7 des systèmes et services</li>
                  <li>Détection automatique des anomalies</li>
                  <li>Alertes en temps réel en cas d'incident</li>
                  <li>Tableaux de bord de sécurité en temps réel</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Protection contre les menaces */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              Protection Contre les Menaces
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Protection contre les attaques</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Protection DDoS (Distributed Denial of Service)</li>
                  <li>Détection et blocage des tentatives d'intrusion</li>
                  <li>Protection contre les injections SQL et XSS</li>
                  <li>Filtrage des contenus malveillants</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Gestion des vulnérabilités</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Scans de vulnérabilités automatisés</li>
                  <li>Tests de pénétration réguliers</li>
                  <li>Mise à jour automatique des correctifs de sécurité</li>
                  <li>Programme de bug bounty pour les chercheurs</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Réponse aux incidents</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Équipe de réponse aux incidents 24/7</li>
                  <li>Procédures de confinement et éradication</li>
                  <li>Communication transparente en cas d'incident</li>
                  <li>Analyse post-incident et amélioration continue</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Conformité et audit */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-6 w-6 text-indigo-600 mr-2" />
              Conformité et Audit
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Standards de conformité</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Conformité aux standards ISO 27001 (Sécurité de l'information)</li>
                  <li>Respect du cadre réglementaire camerounais</li>
                  <li>Conformité aux directives de l'ANTIC</li>
                  <li>Audit de sécurité annuel par des tiers indépendants</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Audit et traçabilité</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Journalisation complète de toutes les actions</li>
                  <li>Traçabilité des accès aux données sensibles</li>
                  <li>Audit des modifications de configuration</li>
                  <li>Rapports de sécurité mensuels et trimestriels</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Transparence et reporting</h4>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Publication des rapports de sécurité</li>
                  <li>Communication des incidents de sécurité</li>
                  <li>Partage des bonnes pratiques avec la communauté</li>
                  <li>Collaboration avec les autorités de régulation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bonnes pratiques utilisateur */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-6 w-6 text-teal-600 mr-2" />
              Bonnes Pratiques de Sécurité
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                La sécurité est une responsabilité partagée. Voici les bonnes pratiques que nous recommandons :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Gestion des comptes</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                    <li>Ne partagez jamais vos identifiants</li>
                    <li>Déconnectez-vous après chaque session</li>
                    <li>Utilisez uniquement des appareils sécurisés</li>
                    <li>Signalez immédiatement toute activité suspecte</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Protection des données</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                    <li>Ne téléchargez pas de fichiers non autorisés</li>
                    <li>Vérifiez l'identité des correspondants</li>
                    <li>Protégez vos certificats PKI</li>
                    <li>Faites des sauvegardes régulières</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">⚠️ Signaler un incident de sécurité</h4>
                <p className="text-blue-800 text-sm mb-3">
                  Si vous détectez une activité suspecte ou une vulnérabilité de sécurité :
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email d'urgence :</strong> <a href="mailto:security@minddevel.cm" className="text-blue-600 hover:text-blue-700">security@minddevel.cm</a></p>
                  <p><strong>Ligne directe :</strong> +237 233 42 00 01</p>
                  <p><strong>Horaires :</strong> 24h/24 et 7j/7</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications et reconnaissances */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications et Reconnaissances</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Certifications officielles</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                    <li>ISO 27001 - Sécurité de l'information</li>
                    <li>Certification ANTIC - Technologies numériques</li>
                    <li>Accréditation gouvernementale camerounaise</li>
                    <li>Conformité blockchain internationale</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Partenariats de sécurité</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                    <li>ANTIC - Agence Nationale des TIC</li>
                    <li>Organismes de certification internationaux</li>
                    <li>Communauté blockchain sécurisée</li>
                    <li>Experts en cybersécurité gouvernementale</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact sécurité */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Sécurité</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Notre équipe de sécurité est disponible pour répondre à vos questions et préoccupations :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Équipe de sécurité</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Email: security@minddevel.cm</p>
                    <p>Tél: +237 233 42 00 01</p>
                    <p>Urgences: 24h/24 et 7j/7</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Support général</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Email: support@minddevel.cm</p>
                    <p>Tél: +237 233 42 00 00</p>
                    <p>Horaires: Lun-Ven 8h-17h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Liens utiles */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Liens Utiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Documentation sécurité</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/documentation" className="text-blue-700 hover:text-blue-800">
                      • Guide de sécurité utilisateur
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-blue-700 hover:text-blue-800">
                      • Politique de confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-blue-700 hover:text-blue-800">
                      • Conditions d'utilisation
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Ressources externes</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="https://www.antic.cm" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                      • Site officiel ANTIC
                    </a>
                  </li>
                  <li>
                    <a href="https://www.minddevel.cm" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-800">
                      • Site officiel MINDDEVEL
                    </a>
                  </li>
                  <li>
                    <a href="mailto:contact@minddevel.cm" className="text-blue-700 hover:text-blue-800">
                      • Demander plus d'informations
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Date de dernière mise à jour */}
          <div className="text-center text-sm text-gray-500">
            <p>Dernière mise à jour : Janvier 2024</p>
            <p className="mt-1">
              Version 1.0 - Page de sécurité de la plateforme blockchain MINDDEVEL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

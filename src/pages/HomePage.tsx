import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Lock, 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  Clock, 
  Building2, 
  Award, 
  Globe, 
  Zap 
} from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center items-center mb-8">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-16 h-10 bg-gradient-to-r from-green-600 via-red-500 to-yellow-400 rounded-lg shadow-lg border-2 border-white"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
                <div className="gov-seal w-20 h-20">
                  <Shield className="h-10 w-10" />
                </div>
                <div className="relative">
                  <div className="w-16 h-10 bg-gradient-to-r from-green-600 via-red-500 to-yellow-400 rounded-lg shadow-lg border-2 border-white"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span className="gov-text-gradient">Plateforme</span>
              <br />
              <span className="text-green-700">Gestion Administrative</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Plateforme blockchain sécurisée et certifiée PKI pour le suivi et la validation transparente 
              des projets de développement territorial au Cameroun. Gestion complète du processus 
              administratif de la soumission à la décision de financement.
            </p>

            {/* Badges de confiance */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="gov-badge flex items-center space-x-2">
                <Shield className="h-3 w-3" />
                <span>Certifié PKI</span>
              </div>
              <div className="gov-badge flex items-center space-x-2">
                <Lock className="h-3 w-3" />
                <span>Blockchain Sécurisée</span>
              </div>
              <div className="gov-badge flex items-center space-x-2">
                <CheckCircle className="h-3 w-3" />
                <span>Conforme Gouvernement</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/login" 
                className="gov-button-primary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold group"
              >
                <Shield className="h-5 w-5 mr-2" />
                Accéder au Portail Officiel
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/about" 
                className="gov-button-secondary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold"
              >
                <FileText className="h-5 w-5 mr-2" />
                En savoir plus
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 transform translate-x-32 -translate-y-32 animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full opacity-20 transform -translate-x-32 translate-y-32 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      {/* Section des ministères partenaires */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ministères Partenaires
            </h2>
            <p className="text-xl text-gray-600">
              Collaboration interministérielle pour le développement territorial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'MINDDEVEL',
                description: 'Ministère de la Décentralisation et du Développement Local',
                icon: Building2,
                color: 'blue'
              },
              {
                name: 'MINFI',
                description: 'Ministère des Finances',
                icon: TrendingUp,
                color: 'green'
              },
              {
                name: 'ANTIC',
                description: 'Agence Nationale des TIC',
                icon: Zap,
                color: 'yellow'
              }
            ].map((ministry, index) => (
              <div key={index} className="gov-card p-6 text-center hover:scale-105 transition-transform">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${ministry.color}-100 text-${ministry.color}-900/20 mb-4`}>
                  <ministry.icon className={`h-8 w-8 text-${ministry.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{ministry.name}</h3>
                <p className="text-gray-600">{ministry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-24 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Processus Administratif et Décisionnel
            </h2>
            <p className="text-xl text-gray-600">
              De la soumission à la décision de financement, chaque étape administrative est tracée et sécurisée
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Soumission Officielle',
                description: 'Les CTD soumettent leurs projets avec certificat numérique PKI',
                icon: FileText,
                color: 'blue'
              },
              {
                step: '02',
                title: 'Évaluation MINDDEVEL',
                description: 'MINDDEVEL évalue et note les projets selon les critères officiels',
                icon: CheckCircle,
                color: 'green'
              },
              {
                step: '03',
                title: 'Validation MINFI',
                description: 'MINFI valide le budget et engage les fonds publics',
                icon: Shield,
                color: 'yellow'
              },
              {
                step: '04',
                title: 'Validation Finale',
                description: 'Le Trésor Public confirme la décision et autorise le décaissement',
                icon: TrendingUp,
                color: 'red'
              }
            ].map((process, index) => (
              <div key={index} className="gov-card p-6 text-center relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="gov-badge text-lg px-4 py-2">{process.step}</div>
                </div>
                <div className="mt-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${process.color}-100 text-${process.color}-900/20 mb-4`}>
                    <process.icon className={`h-8 w-8 text-${process.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section des avantages */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Avantages de la Plateforme Officielle
            </h2>
            <p className="text-xl text-gray-600">
              Sécurité, transparence et efficacité au service du développement territorial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Sécurité Maximale',
                description: 'Blockchain immuable avec cryptographie PKI de niveau gouvernemental',
                icon: Shield,
                color: 'blue'
              },
              {
                title: 'Transparence Totale',
                description: 'Traçabilité complète de toutes les étapes administratives et décisions',
                icon: Globe,
                color: 'green'
              },
              {
                title: 'Efficacité Opérationnelle',
                description: 'Automatisation des processus et réduction des délais',
                icon: Zap,
                color: 'yellow'
              },
              {
                title: 'Conformité Réglementaire',
                description: 'Respect des normes gouvernementales et internationales',
                icon: CheckCircle,
                color: 'red'
              },
              {
                title: 'Audit Automatique',
                description: 'Vérification continue du processus et rapports en temps réel',
                icon: Clock,
                color: 'purple'
              },
              {
                title: 'Collaboration Interministérielle',
                description: 'Coordination optimisée entre tous les acteurs',
                icon: Users,
                color: 'indigo'
              }
            ].map((advantage, index) => (
              <div key={index} className="gov-card p-6 hover:scale-105 transition-transform">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${advantage.color}-100 text-${advantage.color}-900/20 mb-4`}>
                  <advantage.icon className={`h-6 w-6 text-${advantage.color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{advantage.title}</h3>
                <p className="text-gray-600 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Rejoignez la Transformation Numérique
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Participez à la modernisation de la gestion administrative des projets territoriaux au Cameroun 
            avec une plateforme sécurisée, transparente et conforme aux standards internationaux.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center"
            >
              <Shield className="h-5 w-5 mr-2" />
              Commencer Maintenant
            </Link>
            <Link 
              to="/about" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Découvrir Plus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 

import React from 'react';
import { Shield, Building2, Users, Globe, Award, FileText, Clock, CheckCircle } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 lg:w-16 lg:h-10 bg-gradient-to-r from-green-600 via-red-500 to-yellow-400 rounded-lg shadow-lg border-2 border-white"></div>
                <div className="gov-seal w-16 h-16 lg:w-20 lg:h-20">
                  <Shield className="h-8 w-8 lg:h-10 lg:w-10" />
                </div>
                <div className="w-12 h-8 lg:w-16 lg:h-10 bg-gradient-to-r from-green-600 via-red-500 to-yellow-400 rounded-lg shadow-lg border-2 border-white"></div>
              </div>
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              À Propos de la Plateforme
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Découvrez la plateforme blockchain officielle du Cameroun pour la gestion administrative 
              des projets de développement territorial
            </p>
          </div>
        </div>
      </div>

      {/* Section Ministères */}
      <div className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6">
              Ministères Partenaires
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Collaboration interministérielle pour le développement territorial
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="gov-card p-6 lg:p-8 text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 lg:h-10 lg:w-10 text-blue-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                MINDDEVEL
              </h3>
              <p className="text-gray-600 mb-4">
                Ministère de la Décentralisation et du Développement Local
              </p>
              <p className="text-sm text-gray-500">
                Coordonne la politique de décentralisation et supervise le développement 
                des collectivités territoriales décentralisées.
              </p>
            </div>
            
            <div className="gov-card p-6 lg:p-8 text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 lg:h-10 lg:w-10 text-green-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                MINFI
              </h3>
              <p className="text-gray-600 mb-4">
                Ministère des Finances
              </p>
              <p className="text-sm text-gray-500">
                Gère les finances publiques et valide les budgets des projets 
                de développement territorial.
              </p>
            </div>
            
            <div className="gov-card p-6 lg:p-8 text-center">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 lg:h-10 lg:w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                ANTIC
              </h3>
              <p className="text-gray-600 mb-4">
                Agence Nationale des Technologies de l'Information et de la Communication
              </p>
              <p className="text-sm text-gray-500">
                Assure la sécurité numérique et la conformité technologique 
                de la plateforme blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { User, Shield, Settings, Bell, HelpCircle, Lock, Download, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { StatusBadge } from '../components/UI/StatusBadge';

export function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'certificate' | 'settings' | 'help'>('profile');

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'certificate', name: 'Certificat', icon: Shield },
    { id: 'settings', name: 'Paramètres', icon: Settings },
    { id: 'help', name: 'Aide', icon: HelpCircle }
  ];

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      ctd: 'Collectivité Territoriale Décentralisée',
      minddevel: 'Agent MINDDEVEL',
      minfi: 'Contrôleur MINFI',
      tresor: 'Trésor Public',
      auditeur: 'Auditeur',
      admin: 'Administrateur'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-8 text-white mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <User className="h-12 w-12 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-blue-100 text-lg mb-2">{user.entity}</p>
            <p className="text-blue-200">{getRoleDisplayName(user.role)}</p>
            <div className="flex items-center mt-3 space-x-3">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-sm">Connecté</span>
              <StatusBadge status={user.certificateInfo.status} size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation des onglets */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informations du Profil
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Informations Personnelles
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <p className="text-gray-900 font-medium">{user.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Identifiant
                        </label>
                        <p className="text-gray-900 font-mono text-sm">
                          {user.id}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rôle
                        </label>
                        <p className="text-gray-900">
                          {getRoleDisplayName(user.role)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Entité Rattachée
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Organisation
                        </label>
                        <p className="text-gray-900">{user.entity}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Niveau d'accès
                        </label>
                        <StatusBadge status="valid" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dernière connexion
                        </label>
                        <p className="text-gray-900">
                          {new Date().toLocaleDateString('fr-CM')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificate' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Certificat Numérique PKI
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-green-900">
                        Certificat Valide
                      </h3>
                      <p className="text-green-700 text-sm">
                        Votre certificat est valide et sécurisé
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Détails du Certificat
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Numéro de série
                          </label>
                          <p className="text-gray-900 font-mono text-sm">
                            {user.certificateInfo.serialNumber}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Émetteur
                          </label>
                          <p className="text-gray-900">
                            {user.certificateInfo.issuer}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date d'expiration
                          </label>
                          <p className="text-gray-900">
                            {new Date(user.certificateInfo.expiryDate).toLocaleDateString('fr-CM')}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Statut
                          </label>
                          <StatusBadge status={user.certificateInfo.status} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Actions
                      </h3>
                      <div className="space-y-4">
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                          <Download className="h-5 w-5" />
                          <span>Télécharger le certificat</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                          <RefreshCw className="h-5 w-5" />
                          <span>Renouveler le certificat</span>
                        </button>
                        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                          <HelpCircle className="h-5 w-5" />
                          <span>Guide d'installation</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Paramètres du Compte
                </h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Notifications
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          label: 'Notifications par email',
                          description: 'Recevoir les alertes importantes par email'
                        },
                        {
                          label: 'Notifications de projets',
                          description: 'Alertes pour les nouveaux projets et mises à jour'
                        },
                        {
                          label: 'Notifications système',
                          description: 'Maintenance et mises à jour de la plateforme'
                        }
                      ].map((setting, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{setting.label}</p>
                            <p className="text-sm text-gray-600">{setting.description}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Sécurité
                    </h3>
                    <div className="space-y-4">
                      <button className="flex items-center space-x-3 px-4 py-3 w-full text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">
                        <Lock className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-900">Changer le mot de passe</span>
                      </button>
                      <button className="flex items-center space-x-3 px-4 py-3 w-full text-left bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">
                        <Shield className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-900">Journal des connexions</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Centre d'Aide et Support
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Guide d\'utilisation',
                      description: 'Documentation complète de la plateforme',
                      icon: HelpCircle,
                      color: 'blue'
                    },
                    {
                      title: 'Support PKI',
                      description: 'Aide pour les certificats numériques',
                      icon: Shield,
                      color: 'green'
                    },
                    {
                      title: 'Contact technique',
                      description: 'support@govchain.cm',
                      icon: Bell,
                      color: 'purple'
                    },
                    {
                      title: 'Formation',
                      description: 'Ressources de formation et tutoriels',
                      icon: User,
                      color: 'orange'
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                      <item.icon className="h-8 w-8 text-gray-600 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

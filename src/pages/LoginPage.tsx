import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, Eye, EyeOff, Building2, Award, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(credentials);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Identifiants incorrects. Veuillez vérifier vos informations de connexion.');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { username: 'ctd.douala', role: 'CTD Douala', entity: 'Communauté Urbaine de Douala' },
    { username: 'minddevel.agent', role: 'Agent MINDDEVEL', entity: 'MINDDEVEL - Région du Centre' },
    { username: 'minfi.controller', role: 'Contrôleur MINFI', entity: 'MINFI - Contrôle Budgétaire' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header gouvernemental */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-blue-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">Portail Officiel</span>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulaire de connexion */}
          <div className="gov-card p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                <Lock className="h-6 w-6 mr-2 text-blue-600" />
                Connexion Sécurisée
              </h3>
              <p className="text-gray-600">
                Utilisez vos identifiants officiels pour accéder au portail
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Identifiant Officiel
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Votre identifiant officiel"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Votre mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="gov-button-primary w-full py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Connexion en cours...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Se connecter</span>
                  </div>
                )}
              </button>
            </form>

            {/* Informations de sécurité */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium mb-1">Sécurité renforcée</p>
                  <p>Cette plateforme utilise une authentification PKI et une connexion HTTPS sécurisée pour protéger vos données.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Comptes de démonstration */}
          <div className="space-y-6">
            <div className="gov-card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600" />
                Comptes de Démonstration
              </h3>
              <p className="text-gray-600 mb-4">
                Testez la plateforme avec ces comptes d'essai (utilisez "demo123" comme mot de passe)
              </p>
              <div className="space-y-3">
                {demoAccounts.map((account, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {account.username}
                      </span>
                      <button
                        onClick={() => setCredentials({ username: account.username, password: 'demo123' })}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Utiliser
                      </button>
                    </div>
                    <div className="text-xs text-gray-600">
                      <div className="font-medium">{account.role}</div>
                      <div>{account.entity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Informations sur la plateforme */}
            <div className="gov-card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-green-600" />
                À propos de la Plateforme
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Certifiée PKI niveau gouvernemental</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Blockchain sécurisée et immuable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Conforme aux standards internationaux</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Traçabilité complète du processus administratif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

import React, { useState, useEffect } from 'react';
import { useApi } from '../contexts/ApiContext';
import { API_CONFIG } from '../config/api';

const BackendStatus: React.FC = () => {
  const { isConnected, testBackendConnection } = useApi();
  const [apiStatus, setApiStatus] = useState<{
    success: boolean;
    message: string;
    url: string;
    loading: boolean;
  }>({
    success: false,
    message: '',
    url: '',
    loading: false,
  });

  const testApiConnection = async () => {
    setApiStatus(prev => ({ ...prev, loading: true }));
    try {
      const result = await testBackendConnection();
      setApiStatus({
        success: result.success,
        message: result.message,
        url: result.url,
        loading: false,
      });
    } catch (error) {
      setApiStatus({
        success: false,
        message: `Erreur lors du test: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        url: '',
        loading: false,
      });
    }
  };

  useEffect(() => {
    // Tester la connexion API au chargement du composant
    testApiConnection();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">État du Backend</h2>
      
      {/* Configuration */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Configuration</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium">API Base URL:</span>
            <span className="font-mono text-blue-600">{API_CONFIG.API_BASE_URL}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Socket URL:</span>
            <span className="font-mono text-blue-600">{API_CONFIG.SOCKET_URL}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">API Prefix:</span>
            <span className="font-mono text-blue-600">
              {API_CONFIG.API_PREFIX || 'Aucun'}
            </span>
          </div>
        </div>
      </div>

      {/* Statut Socket.IO */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Socket.IO</h3>
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`font-medium ${isConnected ? 'text-green-700' : 'text-red-700'}`}>
            {isConnected ? 'Connecté' : 'Déconnecté'}
          </span>
        </div>
      </div>

      {/* Statut API HTTP */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">API HTTP</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${apiStatus.loading ? 'bg-yellow-500' : apiStatus.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`font-medium ${apiStatus.loading ? 'text-yellow-700' : apiStatus.success ? 'text-green-700' : 'text-red-700'}`}>
              {apiStatus.loading ? 'Test en cours...' : apiStatus.success ? 'Accessible' : 'Inaccessible'}
            </span>
          </div>
          
          {apiStatus.message && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Message:</span> {apiStatus.message}
            </div>
          )}
          
          {apiStatus.url && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">URL testée:</span> 
              <span className="font-mono text-blue-600 ml-2">{apiStatus.url}</span>
            </div>
          )}
        </div>
        
        <button
          onClick={testApiConnection}
          disabled={apiStatus.loading}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {apiStatus.loading ? 'Test en cours...' : 'Tester à nouveau'}
        </button>
      </div>

      {/* Actions de diagnostic */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-700 mb-3">Diagnostic</h3>
        <div className="space-y-2 text-sm text-blue-600">
          <p>• Si Socket.IO fonctionne mais pas l'API HTTP, le problème peut venir du préfixe de l'API</p>
          <p>• Essayez de modifier la variable d'environnement VITE_API_PREFIX</p>
          <p>• Vérifiez que le backend accepte les requêtes HTTP sur l'endpoint testé</p>
        </div>
      </div>
    </div>
  );
};

export default BackendStatus;

// Configuration des URLs de l'API et Socket.IO
export const API_CONFIG = {
  // URL de base pour les appels API HTTP
  API_BASE_URL: import.meta.env.VITE_API_URL || 'https://backendcollectivite.up.railway.app',
  
  // URL pour Socket.IO (peut être différente de l'API)
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'https://backendcollectivite.up.railway.app',
  
  // Préfixe de l'API (peut être vide, '/api', ou autre)
  API_PREFIX: import.meta.env.VITE_API_PREFIX || '',
  
  // Timeout pour les requêtes HTTP (en millisecondes)
  REQUEST_TIMEOUT: 10000,
  
  // Configuration Socket.IO
  SOCKET_CONFIG: {
    transports: ['websocket', 'polling'],
    timeout: 20000,
    forceNew: true,
  }
};

// Fonction utilitaire pour construire l'URL complète de l'API
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = API_CONFIG.API_BASE_URL;
  const prefix = API_CONFIG.API_PREFIX;
  
  // Nettoyer l'endpoint (enlever le slash de début s'il existe)
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Construire l'URL
  if (prefix) {
    return `${baseUrl}${prefix.startsWith('/') ? prefix : `/${prefix}`}/${cleanEndpoint}`;
  }
  
  return `${baseUrl}/${cleanEndpoint}`;
};

// Fonction utilitaire pour tester la connectivité de l'API
export const testApiConnectivity = async (): Promise<{ success: boolean; message: string; url: string }> => {
  try {
    const response = await fetch(buildApiUrl('health'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(API_CONFIG.REQUEST_TIMEOUT),
    });
    
    if (response.ok) {
      return {
        success: true,
        message: `API accessible (${response.status})`,
        url: buildApiUrl('health')
      };
    } else {
      return {
        success: false,
        message: `API accessible mais erreur ${response.status}`,
        url: buildApiUrl('health')
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      url: buildApiUrl('health')
    };
  }
};

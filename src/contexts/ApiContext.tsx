import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { User, Project, Transaction, Evaluation, Notification, KPIData, ProjectStats, BudgetStats } from '../types';
import { useAuth } from './AuthContext';

interface ApiContextType {
  // État de connexion
  isConnected: boolean;
  socket: Socket | null;
  
  // Authentification
  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  register: (userData: Partial<User>) => Promise<{ user: User; token: string }>;
  logout: () => void;
  getCurrentUser: () => Promise<User>;
  
  // Projets
  getProjects: (filters?: any) => Promise<Project[]>;
  getProject: (id: string) => Promise<Project>;
  createProject: (projectData: Partial<Project>) => Promise<Project>;
  updateProject: (id: string, projectData: Partial<Project>) => Promise<Project>;
  deleteProject: (id: string) => Promise<void>;
  
  // Transactions
  getTransactions: (filters?: any) => Promise<Transaction[]>;
  getTransaction: (id: string) => Promise<Transaction>;
  createTransaction: (transactionData: Partial<Transaction>) => Promise<Transaction>;
  
  // Évaluations
  getEvaluations: (filters?: any) => Promise<Evaluation[]>;
  getEvaluation: (id: string) => Promise<Evaluation>;
  createEvaluation: (evaluationData: Partial<Evaluation>) => Promise<Evaluation>;
  updateEvaluation: (id: string, evaluationData: Partial<Evaluation>) => Promise<Evaluation>;
  
  // Notifications
  getNotifications: () => Promise<Notification[]>;
  markNotificationAsRead: (id: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  
  // Statistiques
  getKPIData: () => Promise<KPIData>;
  getProjectStats: () => Promise<ProjectStats>;
  getBudgetStats: () => Promise<BudgetStats>;
  
  // Blockchain
  getBlockchainStats: () => Promise<any>;
  getTransactionStatus: (hash: string) => Promise<any>;
  
  // Utilitaires
  joinRoom: (room: string) => void;
  leaveRoom: (room: string) => void;
  testBackendConnection: () => Promise<any>;
}

interface ApiProviderProps {
  children: ReactNode;
}

// Configuration des URLs
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://backendcollectivite.up.railway.app';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_BASE_URL;

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Récupérer le token depuis localStorage
  const getAuthToken = useCallback(() => {
    return localStorage.getItem('authToken');
  }, []);

  // Initialisation de Socket.IO
  useEffect(() => {
    if (!isAuthenticated) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    const authToken = getAuthToken();
    if (!authToken) return;

    const newSocket = io(SOCKET_URL, {
      auth: {
        token: authToken
      },
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('🔌 Connecté au serveur Socket.IO');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('🔌 Déconnecté du serveur Socket.IO');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Erreur de connexion Socket.IO:', error);
      setIsConnected(false);
    });

    // Écouter les événements en temps réel
    newSocket.on('project:created', (data) => {
      console.log('🆕 Nouveau projet créé:', data);
      // Émettre un événement personnalisé pour notifier les composants
      window.dispatchEvent(new CustomEvent('project:created', { detail: data }));
    });

    newSocket.on('project:updated', (data) => {
      console.log('✏️ Projet mis à jour:', data);
      window.dispatchEvent(new CustomEvent('project:updated', { detail: data }));
    });

    newSocket.on('project:deleted', (data) => {
      console.log('🗑️ Projet supprimé:', data);
      window.dispatchEvent(new CustomEvent('project:deleted', { detail: data }));
    });

    newSocket.on('transaction:confirmed', (data) => {
      console.log('✅ Transaction confirmée:', data);
      window.dispatchEvent(new CustomEvent('transaction:confirmed', { detail: data }));
    });

    newSocket.on('evaluation:completed', (data) => {
      console.log('📊 Évaluation terminée:', data);
      window.dispatchEvent(new CustomEvent('evaluation:completed', { detail: data }));
    });

    newSocket.on('notification:new', (data) => {
      console.log('🔔 Nouvelle notification:', data);
      window.dispatchEvent(new CustomEvent('notification:new', { detail: data }));
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [isAuthenticated, getAuthToken]);

  // Fonction utilitaire pour les appels API
  const apiCall = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const authToken = getAuthToken();
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ Erreur API ${endpoint}:`, error);
      throw error;
    }
  }, [getAuthToken]);

  // Authentification
  const login = useCallback(async (email: string, password: string) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success) {
      const { user, token } = response.data;
      localStorage.setItem('authToken', token);
      
      // Reconnecter Socket.IO avec le nouveau token
      if (socket) {
        socket.auth = { token };
        socket.connect();
      }
      
      return { user, token };
    } else {
      throw new Error(response.message || 'Échec de la connexion');
    }
  }, [apiCall, socket]);

  const register = useCallback(async (userData: Partial<User>) => {
    const response = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success) {
      const { user, token } = response.data;
      localStorage.setItem('authToken', token);
      
      if (socket) {
        socket.auth = { token };
        socket.connect();
      }
      
      return { user, token };
    } else {
      throw new Error(response.message || 'Échec de l\'inscription');
    }
  }, [apiCall, socket]);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    
    if (socket) {
      socket.disconnect();
    }
  }, [socket]);

  const getCurrentUser = useCallback(async () => {
    const response = await apiCall('/auth/profile');
    return response.data;
  }, [apiCall]);

  // Projets
  const getProjects = useCallback(async (filters?: any) => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    const response = await apiCall(`/projects${queryParams}`);
    return response.data.projects;
  }, [apiCall]);

  const getProject = useCallback(async (id: string) => {
    const response = await apiCall(`/projects/${id}`);
    return response.data;
  }, [apiCall]);

  const createProject = useCallback(async (projectData: Partial<Project>) => {
    const response = await apiCall('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
    return response.data;
  }, [apiCall]);

  const updateProject = useCallback(async (id: string, projectData: Partial<Project>) => {
    const response = await apiCall(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
    return response.data;
  }, [apiCall]);

  const deleteProject = useCallback(async (id: string) => {
    await apiCall(`/projects/${id}`, {
      method: 'DELETE',
    });
  }, [apiCall]);

  // Transactions
  const getTransactions = useCallback(async (filters?: any) => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    const response = await apiCall(`/transactions${queryParams}`);
    return response.data.transactions;
  }, [apiCall]);

  const getTransaction = useCallback(async (id: string) => {
    const response = await apiCall(`/transactions/${id}`);
    return response.data;
  }, [apiCall]);

  const createTransaction = useCallback(async (transactionData: Partial<Transaction>) => {
    const response = await apiCall('/transactions', {
      method: 'POST',
      body: JSON.stringify(transactionData),
    });
    return response.data;
  }, [apiCall]);

  // Évaluations
  const getEvaluations = useCallback(async (filters?: any) => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    const response = await apiCall(`/evaluations${queryParams}`);
    return response.data.evaluations;
  }, [apiCall]);

  const getEvaluation = useCallback(async (id: string) => {
    const response = await apiCall(`/evaluations/${id}`);
    return response.data;
  }, [apiCall]);

  const createEvaluation = useCallback(async (evaluationData: Partial<Evaluation>) => {
    const response = await apiCall('/evaluations', {
      method: 'POST',
      body: JSON.stringify(evaluationData),
    });
    return response.data;
  }, [apiCall]);

  const updateEvaluation = useCallback(async (id: string, evaluationData: Partial<Evaluation>) => {
    const response = await apiCall(`/evaluations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(evaluationData),
    });
    return response.data;
  }, [apiCall]);

  // Notifications
  const getNotifications = useCallback(async () => {
    const response = await apiCall('/notifications');
    return response.data.notifications;
  }, [apiCall]);

  const markNotificationAsRead = useCallback(async (id: string) => {
    await apiCall(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  }, [apiCall]);

  const markAllNotificationsAsRead = useCallback(async () => {
    await apiCall('/notifications/read-all', {
      method: 'PATCH',
    });
  }, [apiCall]);

  // Statistiques
  const getKPIData = useCallback(async () => {
    const response = await apiCall('/stats/overview');
    return response.data;
  }, [apiCall]);

  const getProjectStats = useCallback(async () => {
    const response = await apiCall('/stats/projects');
    return response.data;
  }, [apiCall]);

  const getBudgetStats = useCallback(async () => {
    const response = await apiCall('/stats/budget');
    return response.data;
  }, [apiCall]);

  // Blockchain
  const getBlockchainStats = useCallback(async () => {
    const response = await apiCall('/stats/blockchain');
    return response.data;
  }, [apiCall]);

  const getTransactionStatus = useCallback(async (hash: string) => {
    const response = await apiCall(`/transactions/status/${hash}`);
    return response.data;
  }, [apiCall]);

  // Utilitaires Socket.IO
  const joinRoom = useCallback((room: string) => {
    if (socket && isConnected) {
      socket.emit('join-room', room);
    }
  }, [socket, isConnected]);

  const leaveRoom = useCallback((room: string) => {
    if (socket && isConnected) {
      socket.emit('leave-room', room);
    }
  }, [socket, isConnected]);

  // Test de connectivité du backend
  const testBackendConnection = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        return {
          success: true,
          message: `API accessible (${response.status})`,
          url: `${API_BASE_URL}/health`
        };
      } else {
        return {
          success: false,
          message: `API accessible mais erreur ${response.status}`,
          url: `${API_BASE_URL}/health`
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Erreur de connexion: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        url: `${API_BASE_URL}/health`
      };
    }
  }, []);

  const contextValue: ApiContextType = {
    isConnected,
    socket,
    login,
    register,
    logout,
    getCurrentUser,
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    getTransactions,
    getTransaction,
    createTransaction,
    getEvaluations,
    getEvaluation,
    createEvaluation,
    updateEvaluation,
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getKPIData,
    getProjectStats,
    getBudgetStats,
    getBlockchainStats,
    getTransactionStatus,
    joinRoom,
    leaveRoom,
    testBackendConnection,
  };

  return (
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi doit être utilisé dans un ApiProvider');
  }
  return context;
};

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier le token existant au démarrage
  useEffect(() => {
    const checkExistingToken = async () => {
      const existingToken = localStorage.getItem('authToken');
      
      if (existingToken) {
        try {
          // Vérifier si le token est encore valide
          const response = await fetch('https://backendcollectivite.up.railway.app/api/auth/profile', {
            headers: {
              'Authorization': `Bearer ${existingToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            if (userData.success) {
              setUser(userData.data);
            } else {
              // Token invalide, le supprimer
              localStorage.removeItem('authToken');
            }
          } else {
            // Token invalide, le supprimer
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error('Erreur lors de la vérification du token:', error);
          localStorage.removeItem('authToken');
        }
      }
      
      setIsLoading(false);
    };

    checkExistingToken();
  }, []);

  const login = async (credentials: { username: string; password: string }): Promise<boolean> => {
    try {
      // Utiliser l'API backend pour l'authentification
      const response = await fetch('https://backendcollectivite.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: credentials.username, 
          password: credentials.password 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Échec de la connexion');
      }

      const data = await response.json();
      
      if (data.success) {
        const { user: userData, token } = data.data;
        
        // Stocker le token dans localStorage
        localStorage.setItem('authToken', token);
        
        // Mettre à jour l'état utilisateur
        setUser(userData);
        
        return true;
      } else {
        throw new Error(data.message || 'Échec de la connexion');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return false;
    }
  };

  const logout = () => {
    // Supprimer le token et l'utilisateur
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  };

  // Afficher un loader pendant la vérification du token
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

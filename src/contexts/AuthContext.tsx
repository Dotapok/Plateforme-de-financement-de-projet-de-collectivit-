import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers: Record<string, User> = {
  'ctd.douala': {
    id: '1',
    name: 'Marie Ngono',
    entity: 'Communauté Urbaine de Douala',
    role: 'ctd',
    certificateInfo: {
      issuer: 'AC-CAMEROUN',
      expiryDate: '2025-12-31',
      serialNumber: 'CUD2024001',
      status: 'valid'
    }
  },
  'minddevel.agent': {
    id: '2',
    name: 'Jean-Paul Mbarga',
    entity: 'MINDDEVEL - Région du Centre',
    role: 'minddevel',
    certificateInfo: {
      issuer: 'AC-CAMEROUN',
      expiryDate: '2025-06-30',
      serialNumber: 'MDD2024002',
      status: 'valid'
    }
  },
  'minfi.controller': {
    id: '3',
    name: 'Fatima Bello',
    entity: 'MINFI - Contrôle Budgétaire',
    role: 'minfi',
    certificateInfo: {
      issuer: 'AC-CAMEROUN',
      expiryDate: '2025-09-15',
      serialNumber: 'MFI2024003',
      status: 'valid'
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: { username: string; password: string }): Promise<boolean> => {
    // Simple mock authentication
    if (mockUsers[credentials.username] && credentials.password === 'demo123') {
      setUser(mockUsers[credentials.username]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

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

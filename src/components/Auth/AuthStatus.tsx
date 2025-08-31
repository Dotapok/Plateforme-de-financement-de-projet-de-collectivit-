import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function AuthStatus() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded z-50">
        🔄 Vérification de l'authentification...
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded z-50">
        ✅ Connecté en tant que {user.name} ({user.role})
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded z-50">
      ❌ Non connecté
    </div>
  );
}

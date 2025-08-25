import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, User, LogOut, Menu, X, Building2, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  // Fonction pour déterminer si un lien est actif
  const isActiveLink = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    if (path === '/projects') {
      return location.pathname.startsWith('/projects');
    }
    if (path === '/profile') {
      return location.pathname === '/profile';
    }
    return false;
  };

  return (
    <header className="gov-header text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
          {/* Logo et titre gouvernemental */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Drapeau camerounais stylisé */}
              <div className="relative">
                <div className="w-6 h-4 sm:w-8 sm:h-6 lg:w-10 lg:h-7 bg-gradient-to-r from-green-600 via-red-500 to-yellow-400 rounded shadow-md border border-white"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 lg:w-1.5 lg:h-1.5 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Sceau gouvernemental */}
              <div className="gov-seal w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
              </div>
            </div>
            
            <div className="text-white min-w-0">
              <Link to="/" className="block">
                <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold tracking-wide truncate">
                  République du Cameroun
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 font-medium truncate">
                  Ministère de la Décentralisation et du Développement Local
                </p>
                <p className="text-xs text-blue-200 hidden md:block truncate">
                  Plateforme Blockchain - Gestion Administrative
                </p>
              </Link>
            </div>
          </div>

          {/* Navigation desktop */}
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-2 lg:space-x-4 xl:space-x-6">
              <Link
                to="/dashboard"
                className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors border-b-2 ${
                  isActiveLink('/dashboard')
                    ? 'text-white border-yellow-400 bg-blue-800/50'
                    : 'text-blue-100 hover:text-white border-transparent hover:border-yellow-400'
                }`}
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden lg:inline">Tableau de Bord</span>
                  <span className="lg:hidden">Dashboard</span>
                </div>
              </Link>
              <Link
                to="/projects"
                className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors border-b-2 ${
                  isActiveLink('/projects')
                    ? 'text-white border-yellow-400 bg-blue-800/50'
                    : 'text-blue-100 hover:text-white border-transparent hover:border-yellow-400'
                }`}
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xl:inline">Gestion des Projets</span>
                  <span className="xl:hidden">Projets</span>
                </div>
              </Link>
              <Link
                to="/profile"
                className={`px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors border-b-2 ${
                  isActiveLink('/profile')
                    ? 'text-white border-yellow-400 bg-blue-800/50'
                    : 'text-blue-100 hover:text-white border-transparent hover:border-yellow-400'
                }`}
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden lg:inline">Mon Profil</span>
                  <span className="lg:hidden">Profil</span>
                </div>
              </Link>
            </nav>
          )}

                    {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
                {/* Bouton déconnexion */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-100 hover:text-white hover:bg-red-800/50 rounded transition-colors border border-red-700/50"
                >
                  <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="gov-button-primary flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
              >
                <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Accès Sécurisé</span>
                <span className="sm:hidden">Connexion</span>
              </Link>
            )}

            {/* Menu mobile */}
            {isAuthenticated && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 sm:p-2 text-blue-100 hover:text-white hover:bg-blue-800/50 rounded transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isAuthenticated && isMobileMenuOpen && (
        <div className="md:hidden bg-blue-900/95 border-t border-blue-700/50 backdrop-blur-sm">
          <nav className="px-3 sm:px-4 py-3 space-y-1">
            <Link
              to="/dashboard"
              className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded text-sm font-medium transition-colors ${
                isActiveLink('/dashboard')
                  ? 'text-white bg-blue-800/50'
                  : 'text-blue-100 hover:text-white hover:bg-blue-800/50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Tableau de Bord</span>
              </div>
            </Link>
            <Link
              to="/projects"
              className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded text-sm font-medium transition-colors ${
                isActiveLink('/projects')
                  ? 'text-white bg-blue-800/50'
                  : 'text-blue-100 hover:text-white hover:bg-blue-800/50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Gestion des Projets</span>
              </div>
            </Link>
                          <Link
                to="/profile"
                className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded text-sm font-medium transition-colors ${
                  isActiveLink('/profile')
                    ? 'text-white bg-blue-800/50'
                    : 'text-blue-100 hover:text-white hover:bg-blue-800/50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Mon Profil</span>
              </div>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

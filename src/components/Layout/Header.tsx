import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, User, LogOut, Menu, X, Building2, Award, Home } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  // Fermer le menu mobile en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Empêcher le scroll du body quand le menu est ouvert
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18 xl:h-20">
          
          {/* Logo et titre gouvernemental - Responsive */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 xl:space-x-5">
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
              {/* Drapeau camerounais stylisé */}
              <div className="relative flex-shrink-0">
                <div className="w-6 h-4 sm:w-8 sm:h-6 lg:w-10 lg:h-7 xl:w-12 xl:h-8 bg-gradient-to-r from-green-600 via-red-500 to-yellow-400 rounded shadow-md border border-white"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 lg:w-1.5 lg:h-1.5 xl:w-2 xl:h-2 bg-yellow-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Sceau gouvernemental */}
              <div className="gov-seal w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex-shrink-0">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
              </div>
            </div>
            
            {/* Titres adaptatifs */}
            <div className="text-white min-w-0 hidden sm:block">
              <Link to="/" className="block">
                <h1 className="text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold tracking-wide truncate">
                  République du Cameroun
                </h1>
                <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-blue-100 font-medium truncate">
                  Ministère de la Décentralisation
                </p>
                <p className="text-xs sm:text-sm lg:text-base text-blue-200 hidden lg:block truncate">
                  Plateforme Blockchain - Gestion Administrative
                </p>
              </Link>
            </div>
            
            {/* Titre compact pour très petits écrans */}
            <div className="text-white sm:hidden">
              <Link to="/" className="block">
                <h1 className="text-xs font-bold tracking-wide">
                  Cameroun
                </h1>
                <p className="text-xs text-blue-100 font-medium">
                  Décentralisation
                </p>
              </Link>
            </div>
          </div>

          {/* Navigation desktop - Optimisée pour tous les écrans */}
          {isAuthenticated && (
            <nav className="hidden lg:flex space-x-2 xl:space-x-4 2xl:space-x-6">
              <Link
                to="/dashboard"
                className={`px-3 sm:px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 xl:py-3 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 border-b-2 hover:scale-105 ${
                  isActiveLink('/dashboard')
                    ? 'text-white border-yellow-400 bg-blue-800/50 shadow-lg'
                    : 'text-blue-100 hover:text-white border-transparent hover:border-yellow-400 hover:bg-blue-800/30'
                }`}
              >
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <Building2 className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                  <span className="hidden xl:inline">Tableau de Bord</span>
                  <span className="xl:hidden">Dashboard</span>
                </div>
              </Link>
              
              <Link
                to="/projects"
                className={`px-3 sm:px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 xl:py-3 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 border-b-2 hover:scale-105 ${
                  isActiveLink('/projects')
                    ? 'text-white border-yellow-400 bg-blue-800/50 shadow-lg'
                    : 'text-blue-100 hover:text-white border-transparent hover:border-yellow-400 hover:bg-blue-800/30'
                }`}
              >
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <Award className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                  <span className="hidden 2xl:inline">Gestion des Projets</span>
                  <span className="2xl:hidden">Projets</span>
                </div>
              </Link>
              
              <Link
                to="/profile"
                className={`px-3 sm:px-4 lg:px-5 xl:px-6 py-2 lg:py-2.5 xl:py-3 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 border-b-2 hover:scale-105 ${
                  isActiveLink('/profile')
                    ? 'text-white border-yellow-400 bg-blue-800/50 shadow-lg'
                    : 'text-blue-100 hover:text-white border-transparent hover:border-yellow-400 hover:bg-blue-800/30'
                }`}
              >
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <User className="h-4 w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
                  <span className="hidden xl:inline">Mon Profil</span>
                  <span className="xl:hidden">Profil</span>
                </div>
              </Link>
            </nav>
          )}

          {/* Actions et menu burger */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Bouton déconnexion - Responsive */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm lg:text-base font-medium text-red-100 hover:text-white hover:bg-red-800/50 rounded-lg transition-all duration-200 border border-red-700/50 hover:scale-105 hover:shadow-lg"
                >
                  <LogOut className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="gov-button-primary flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm lg:text-base px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 hover:scale-105 transition-all duration-200"
              >
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                <span className="hidden sm:inline">Accès Sécurisé</span>
                <span className="sm:hidden">Connexion</span>
              </Link>
            )}

            {/* Menu burger - Toujours visible sur mobile et tablette */}
            {isAuthenticated && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 text-blue-100 hover:text-white hover:bg-blue-800/50 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="Menu principal"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu mobile - Amélioré avec animations */}
      {isAuthenticated && (
        <div 
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'opacity-100 visible' 
              : 'opacity-0 invisible'
          }`}
        >
          {/* Overlay sombre */}
          <div 
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu mobile */}
          <div 
            className={`absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-blue-900/95 border-l border-blue-700/50 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* En-tête du menu mobile */}
            <div className="flex items-center justify-between p-4 border-b border-blue-700/50">
              <h3 className="text-lg font-semibold text-white">Menu Principal</h3>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-blue-100 hover:text-white hover:bg-blue-800/50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Navigation mobile */}
            <nav className="p-4 space-y-2">
              <Link
                to="/dashboard"
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActiveLink('/dashboard')
                    ? 'text-white bg-blue-800/50 shadow-lg'
                    : 'text-blue-100 hover:text-white hover:bg-blue-800/50 hover:scale-105'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="h-5 w-5" />
                  <span>Tableau de Bord</span>
                </div>
              </Link>
              
              <Link
                to="/projects"
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActiveLink('/projects')
                    ? 'text-white bg-blue-800/50 shadow-lg'
                    : 'text-blue-100 hover:text-white hover:bg-blue-800/50 hover:scale-105'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <Award className="h-5 w-5" />
                  <span>Gestion des Projets</span>
                </div>
              </Link>
              
              <Link
                to="/profile"
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  isActiveLink('/profile')
                    ? 'text-white bg-blue-800/50 shadow-lg'
                    : 'text-blue-100 hover:text-white hover:bg-blue-800/50 hover:scale-105'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5" />
                  <span>Mon Profil</span>
                </div>
              </Link>
            </nav>
            
            {/* Informations utilisateur en bas du menu mobile */}
            {user && (
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700/50 bg-blue-800/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-blue-200 truncate">
                      {user.role || 'Utilisateur'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

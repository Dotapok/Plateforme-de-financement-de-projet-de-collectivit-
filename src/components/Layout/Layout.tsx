import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import BackendStatus from '../UI/BackendStatus';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="flex-1">
        {children}
      </main>

      {!isAuthenticated && <Footer />}
      <BackendStatus />
    </div>
  );
}

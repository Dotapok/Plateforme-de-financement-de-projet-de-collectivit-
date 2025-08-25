import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Mail, HelpCircle, FileText, Video, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ContactModal } from '../components/UI/ContactModal';

export function SupportPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('faq');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const faqs = [
    {
      question: "Comment créer un nouveau projet ?",
      answer: "Allez dans le Dashboard et cliquez sur 'Nouveau Projet' dans les actions rapides. Remplissez le formulaire avec toutes les informations requises et soumettez-le pour évaluation."
    },
    {
      question: "Combien de temps dure l'évaluation d'un projet ?",
      answer: "L'évaluation d'un projet prend généralement 3-5 jours ouvrables. Vous recevrez une notification dès que le projet sera évalué."
    },
    {
      question: "Comment suivre l'état de mes projets ?",
      answer: "Utilisez la page 'Gestion des Projets' pour voir tous vos projets et leur statut actuel. Vous pouvez également utiliser le Dashboard pour un aperçu rapide."
    },
    {
      question: "Que faire si mon projet est rejeté ?",
      answer: "Si votre projet est rejeté, vous recevrez un email avec les raisons du rejet et les suggestions d'amélioration. Vous pouvez le modifier et le soumettre à nouveau."
    },
    {
      question: "Comment fonctionne la validation blockchain ?",
      answer: "Chaque étape du processus (soumission, évaluation, validation, financement) est enregistrée sur la blockchain pour garantir la transparence et la traçabilité."
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Téléphone",
      value: "+237 233 42 00 00",
      description: "Lun-Ven: 8h-17h"
    },
    {
      icon: Mail,
      title: "Email",
      value: "support@minddevel.cm",
      description: "Réponse sous 24h"
    },
    {
      icon: MessageCircle,
      title: "Chat en ligne",
      value: "Disponible 24/7",
      description: "Support instantané"
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Guide utilisateur",
      description: "Documentation complète de la plateforme",
      link: "#"
    },
    {
      icon: Video,
      title: "Tutoriels vidéo",
      description: "Apprenez à utiliser la plateforme",
      link: "#"
    },
    {
      icon: BookOpen,
      title: "FAQ détaillée",
      description: "Questions fréquemment posées",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* En-tête */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Retour au Dashboard</span>
            </Link>
          </div>
          
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Centre d'Aide et Support
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Besoin d'aide ? Nous sommes là pour vous accompagner
            </p>
          </div>
        </div>

        {/* Onglets */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'faq', label: 'FAQ', icon: HelpCircle },
                { id: 'contact', label: 'Contact', icon: MessageCircle },
                { id: 'resources', label: 'Ressources', icon: BookOpen }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Contenu des onglets */}
          <div className="p-6">
            {/* FAQ */}
            {activeTab === 'faq' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Questions Fréquemment Posées
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Contactez notre équipe
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div key={index} className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">{method.title}</h3>
                        <p className="text-lg font-semibold text-blue-600 mb-1">{method.value}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    );
                  })}
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-medium text-blue-900 mb-2">Formulaire de contact</h3>
                  <p className="text-blue-800 text-sm mb-4">
                    Pour des questions spécifiques, utilisez notre formulaire de contact en ligne.
                  </p>
                  <button 
                    onClick={() => setIsContactModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Ouvrir le formulaire
                  </button>
                </div>
              </div>
            )}

            {/* Ressources */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Ressources utiles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {resources.map((resource, index) => {
                    const Icon = resource.icon;
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">{resource.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                        <a
                          href={resource.link}
                          className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
                        >
                          Accéder →
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Informations utilisateur */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Informations de votre compte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Nom</p>
              <p className="font-medium text-gray-900">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Entité</p>
              <p className="font-medium text-gray-900">{user?.entity}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Rôle</p>
              <p className="font-medium text-gray-900">{user?.role?.toUpperCase()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Statut du certificat</p>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  user?.certificateInfo.status === 'valid' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="font-medium text-gray-900">
                  {user?.certificateInfo.status === 'valid' ? 'Valide' : 'Expiré'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de contact */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}

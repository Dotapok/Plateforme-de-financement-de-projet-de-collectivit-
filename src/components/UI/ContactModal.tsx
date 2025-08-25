import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, User, Building2, FileText } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    entity: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        entity: '',
        subject: '',
        message: '',
        category: 'general'
      });
      
      // Fermer le modal
      onClose();
      
      // Afficher un message de succès (vous pouvez implémenter une notification)
      alert('Votre message a été envoyé avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Une erreur est survenue lors de l\'envoi du message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Contactez-nous</h2>
            <p className="text-sm text-gray-600">
              Nous sommes là pour vous aider. Envoyez-nous votre message.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Informations de contact */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Adresse</p>
                    <p className="text-sm text-gray-600">Yaoundé, Cameroun</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Téléphone</p>
                    <p className="text-sm text-gray-600">+237 233 42 00 00</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">contact@minddevel.cm</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Horaires de disponibilité</h4>
                  <p className="text-sm text-blue-800">
                    Lundi - Vendredi: 8h00 - 17h00<br />
                    Samedi: 9h00 - 13h00<br />
                    <span className="font-medium">Support d'urgence: 24h/24 et 7j/7</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Envoyez votre message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Entité/Organisation
                  </label>
                  <input
                    type="text"
                    name="entity"
                    value={formData.entity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="CTD, Ministère, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">Question générale</option>
                    <option value="technical">Support technique</option>
                    <option value="project">Question sur un projet</option>
                    <option value="account">Problème de compte</option>
                    <option value="security">Question de sécurité</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Résumé de votre demande"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Envoyer le message</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p>
              Pour les urgences techniques, contactez directement :{' '}
              <a href="mailto:security@minddevel.cm" className="text-blue-600 hover:text-blue-700 font-medium">
                security@minddevel.cm
              </a>
            </p>
            <p className="mt-1">
              Temps de réponse moyen : <span className="font-medium">2-4 heures</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

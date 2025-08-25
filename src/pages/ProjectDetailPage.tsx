import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Download, Eye, Calendar, MapPin, DollarSign, User, Hash } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';
import { StatusBadge } from '../components/UI/StatusBadge';

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const { getProjectById, deleteProject,  } = useApi();
  const navigate = useNavigate();
  
  const [project, setProject] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      const projectData = await getProjectById(projectId!);
      setProject(projectData);
    } catch (err) {
      console.error('Erreur lors du chargement du projet:', err);
    }
  };

  const handleDelete = async () => {
    if (!project) return;
    
    try {
      await deleteProject(project.id);
      navigate('/projects', { 
        state: { 
          message: 'Projet supprimé avec succès.' 
        } 
      });
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-CM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'submitted': 'bg-blue-100 text-blue-800',
      'under_review': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'funded': 'bg-purple-100 text-purple-800',
      'completed': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'submitted': 'Soumis',
      'under_review': 'En évaluation',
      'approved': 'Approuvé',
      'rejected': 'Rejeté',
      'funded': 'Financé',
      'completed': 'Terminé'
    };
    return labels[status as keyof typeof labels] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Projet non trouvé</h1>
            <p className="text-gray-600 mb-6">Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour aux projets</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* En-tête */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Link
              to="/projects"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Retour aux projets</span>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm sm:text-base text-gray-600">
                <span className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{project.submittedBy}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Soumis le {formatDate(project.submissionDate)}</span>
                </span>
              </div>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <StatusBadge status={project.status} size="lg" />
              {user?.role === 'ctd' && project.submittedBy === user.entity && (
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/projects/${project.id}/edit`}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Modifier</span>
                  </Link>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Supprimer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            {/* Objectifs et bénéficiaires */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Objectifs</h3>
                <p className="text-gray-700">{project.objectives || 'Non spécifiés'}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Bénéficiaires</h3>
                <p className="text-gray-700">{project.beneficiaries || 'Non spécifiés'}</p>
              </div>
            </div>

            {/* Informations blockchain */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations Blockchain</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Hash de transaction:</span>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                      {project.blockchainHash}
                    </code>
                    <button
                      onClick={() => navigator.clipboard.writeText(project.blockchainHash)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Copier le hash"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Score d'évaluation:</span>
                  <span className="font-semibold text-gray-900">
                    {project.evaluationScore ? `${project.evaluationScore}/100` : 'Non évalué'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statut et actions */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut du projet</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Statut:</span>
                  <StatusBadge status={project.status} size="md" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-semibold text-gray-900">{formatAmount(project.budget)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Score:</span>
                  <span className="font-semibold text-gray-900">
                    {project.evaluationScore ? `${project.evaluationScore}/100` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Entité soumettante</p>
                  <p className="font-medium text-gray-900">{project.submittedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date de soumission</p>
                  <p className="font-medium text-gray-900">{formatDate(project.submissionDate)}</p>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Download className="h-4 w-4" />
                  <span>Télécharger le rapport</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <Eye className="h-4 w-4" />
                  <span>Voir l'historique</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de confirmation de suppression */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmer la suppression</h3>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

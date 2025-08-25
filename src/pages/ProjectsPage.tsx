import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, FileText, Clock, CheckCircle, Award, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';
import { StatusBadge } from '../components/UI/StatusBadge';
import { Project } from '../types';

export function ProjectsPage() {
  const { user } = useAuth();
  const { getProjects } = useApi();
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const projectsData = await getProjects();
      setProjects(projectsData);
      setFilteredProjects(projectsData);
    } catch (err) {
      console.error('Erreur lors du chargement des projets:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

    loadProjects();
  }, [getProjects]);

  useEffect(() => {
    const filtered = projects.filter(project => {
      return project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
             project.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const getStatusColor = (status: string) => {
    const colors = {
      submitted: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      funded: 'bg-purple-100 text-purple-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      submitted: 'Soumis',
      under_review: 'En évaluation',
      approved: 'Approuvé',
      rejected: 'Rejeté',
      funded: 'Financé',
      completed: 'Terminé'
    };
    return labels[status as keyof typeof labels] || status;
  };



  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* En-tête */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                Gestion des Projets
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                Suivi et gestion des projets de développement territorial
              </p>
            </div>
            <Link
              to="/projects/new"
              className="gov-button-primary mt-4 sm:mt-0 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Nouveau Projet</span>
            </Link>
          </div>
        </div>

        {/* Recherche */}
        <div className="gov-card p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* État de chargement et erreur */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Chargement des projets...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-400 mr-2" />
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="gov-card p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{projects.length}</h3>
            <p className="text-gray-600 text-sm sm:text-base">Total Projets</p>
          </div>
          
          <div className="gov-card p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              {projects.filter(p => p.status === 'under_review').length}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">En Évaluation</p>
          </div>
          
          <div className="gov-card p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              {projects.filter(p => p.status === 'approved').length}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Approuvés</p>
          </div>
          
          <div className="gov-card p-4 sm:p-6 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              {projects.filter(p => p.status === 'funded').length}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Financés</p>
          </div>
        </div>

        {/* Liste des projets */}
        <div className="gov-card p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Projets ({filteredProjects.length})</h2>
          
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun projet trouvé avec ces critères</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 flex-1 mr-2">{project.title}</h3>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(project.status)} flex-shrink-0`}>
                          {getStatusLabel(project.status)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 text-sm sm:text-base">{project.description}</p>
                      
                                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Entité:</span>
                            <p className="text-gray-600 truncate">{project.submittedBy}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Budget:</span>
                            <p className="text-gray-600">{formatAmount(project.budget)}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Score:</span>
                            <p className="text-gray-600">{project.evaluationScore ? `${project.evaluationScore}/100` : 'Non évalué'}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Date de soumission:</span>
                            <p className="text-gray-600">{new Date(project.submissionDate).toLocaleDateString('fr-CM')}</p>
                          </div>
                        </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4 lg:mt-0">
                      <Link
                        to={`/projects/${project.id}`}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                      >
                        Voir détails
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

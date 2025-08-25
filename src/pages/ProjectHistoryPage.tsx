import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, FileText, TrendingUp, Filter, Search, Calendar, BarChart3, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';
import { StatusBadge } from '../components/UI/StatusBadge';

export function ProjectHistoryPage() {
  const { user } = useAuth();
  const { getProjects,  } = useApi();
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    region: 'all',
    dateRange: 'all',
    searchTerm: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [projects, filters]);

  const loadProjects = async () => {
    try {
      const allProjects = await getProjects();
      // Ajouter des dates historiques pour la démonstration
      const projectsWithHistory = allProjects.map(project => ({
        ...project,
        history: [
          {
            date: '2024-01-15T10:30:00Z',
            action: 'Projet finalisé avec succès',
            status: 'completed',
            details: 'Tous les objectifs ont été atteints dans les délais et le budget prévus.'
          },
          {
            date: '2024-01-10T14:20:00Z',
            action: 'Approbation finale accordée',
            status: 'approved',
            details: 'Le projet a reçu l\'approbation finale du comité d\'évaluation.'
          },
          {
            date: '2024-01-05T09:15:00Z',
            action: 'Évaluation technique terminée',
            status: 'under_review',
            details: 'L\'évaluation technique a été complétée avec un score de 85/100.'
          },
          {
            date: '2024-01-01T16:45:00Z',
            action: 'Projet soumis pour évaluation',
            status: 'submitted',
            details: 'Le projet a été soumis avec succès et est en attente d\'évaluation.'
          }
        ]
      }));
      setProjects(projectsWithHistory);
    } catch (err) {
      console.error('Erreur lors du chargement des projets:', err);
    }
  };

  const applyFilters = () => {
    let filtered = [...projects];

    // Filtre par statut
    if (filters.status !== 'all') {
      filtered = filtered.filter(project => project.status === filters.status);
    }

    // Filtre par catégorie
    if (filters.category !== 'all') {
      filtered = filtered.filter(project => project.category === filters.category);
    }

    // Filtre par région
    if (filters.region !== 'all') {
      filtered = filtered.filter(project => project.region === filters.region);
    }

    // Filtre par plage de dates
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const projectDate = new Date();
      
      switch (filters.dateRange) {
        case 'last_month':
          projectDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(project => new Date(project.submissionDate) >= projectDate);
          break;
        case 'last_3_months':
          projectDate.setMonth(now.getMonth() - 3);
          filtered = filtered.filter(project => new Date(project.submissionDate) >= projectDate);
          break;
        case 'last_year':
          projectDate.setFullYear(now.getFullYear() - 1);
          filtered = filtered.filter(project => new Date(project.submissionDate) >= projectDate);
          break;
      }
    }

    // Filtre par recherche
    if (filters.searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        project.submittedBy.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getProjectStats = () => {
    const total = projects.length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const approved = projects.filter(p => p.status === 'approved').length;
    const underReview = projects.filter(p => p.status === 'under_review').length;
    const rejected = projects.filter(p => p.status === 'rejected').length;

    return { total, completed, approved, underReview, rejected };
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-CM', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': 'bg-green-100 text-green-800',
      'approved': 'bg-blue-100 text-blue-800',
      'under_review': 'bg-yellow-100 text-yellow-800',
      'submitted': 'bg-purple-100 text-purple-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getActionIcon = (action: string) => {
    if (action.includes('finalisé')) return '🎯';
    if (action.includes('Approbation')) return '✅';
    if (action.includes('Évaluation')) return '📋';
    if (action.includes('soumis')) return '📤';
    return '📝';
  };

  const stats = getProjectStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
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
              Historique des Projets
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Suivi complet de l'évolution de tous les projets de développement territorial
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Finalisés</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approuvés</p>
                <p className="text-2xl font-bold text-blue-600">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.underReview}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejetés</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Statut */}
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Finalisés</option>
              <option value="approved">Approuvés</option>
              <option value="under_review">En cours</option>
              <option value="submitted">Soumis</option>
              <option value="rejected">Rejetés</option>
            </select>

            {/* Catégorie */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">Toutes les catégories</option>
              <option value="infrastructure">Infrastructure</option>
              <option value="education">Éducation</option>
              <option value="sante">Santé</option>
              <option value="agriculture">Agriculture</option>
              <option value="energie">Énergie</option>
              <option value="eau">Eau</option>
            </select>

            {/* Région */}
            <select
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">Toutes les régions</option>
              <option value="littoral">Littoral</option>
              <option value="centre">Centre</option>
              <option value="ouest">Ouest</option>
              <option value="nord">Nord</option>
              <option value="sud">Sud</option>
              <option value="est">Est</option>
              <option value="adamaoua">Adamaoua</option>
              <option value="extreme-nord">Extrême-Nord</option>
            </select>

            {/* Plage de dates */}
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">Toutes les dates</option>
              <option value="last_month">Dernier mois</option>
              <option value="last_3_months">3 derniers mois</option>
              <option value="last_year">Dernière année</option>
            </select>
          </div>

          {/* Résultats des filtres */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} trouvé{filteredProjects.length > 1 ? 's' : ''}
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Download className="h-4 w-4" />
              <span>Exporter</span>
            </button>
          </div>
        </div>

        {/* Liste des projets */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Projets ({filteredProjects.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Chargement des projets...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">Aucun projet trouvé avec les filtres actuels</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <ProjectHistoryCard
                  key={project.id}
                  project={project}
                  formatAmount={formatAmount}
                  formatDate={formatDate}
                  formatDateTime={formatDateTime}
                  getStatusColor={getStatusColor}
                  getActionIcon={getActionIcon}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Composant pour la carte d'historique d'un projet
function ProjectHistoryCard({ project, formatAmount, formatDate, formatDateTime, getStatusColor, getActionIcon }: any) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Informations du projet */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <StatusBadge status={project.status} size="md" />
            <span className="text-xs text-gray-500">
              Soumis le {formatDate(project.submissionDate)}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Entité:</span>
              <p className="text-gray-600 truncate">{project.submittedBy}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Budget:</span>
              <p className="text-gray-600">{formatAmount(project.budget)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Catégorie:</span>
              <p className="text-gray-600 capitalize">{project.category}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Région:</span>
              <p className="text-gray-600 capitalize">{project.region}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Link
            to={`/projects/${project.id}`}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
          >
            <FileText className="h-4 w-4" />
            <span>Voir détails</span>
          </Link>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            <Clock className="h-4 w-4" />
            <span>{showHistory ? 'Masquer' : 'Voir'} l'historique</span>
          </button>
        </div>
      </div>

      {/* Historique détaillé */}
      {showHistory && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Historique du projet
          </h4>

          <div className="space-y-3">
            {project.history.map((event: any, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg">
                  {getActionIcon(event.action)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-gray-900">{event.action}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{event.details}</p>
                  <p className="text-xs text-gray-500">{formatDateTime(event.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

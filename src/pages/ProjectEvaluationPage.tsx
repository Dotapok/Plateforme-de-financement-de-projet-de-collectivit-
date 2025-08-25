import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, Star, FileText, User, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';
import { StatusBadge } from '../components/UI/StatusBadge';

export function ProjectEvaluationPage() {
  const { user } = useAuth();
  const { getProjects, evaluateProject,  } = useApi();
  const [projects, setProjects] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('submitted');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const allProjects = await getProjects();
      // Filtrer les projets soumis et en attente d'évaluation
      const pendingProjects = allProjects.filter(p => 
        p.status === 'submitted' || p.status === 'under_review'
      );
      setProjects(pendingProjects);
    } catch (err) {
      console.error('Erreur lors du chargement des projets:', err);
    }
  };

  const handleEvaluate = async (projectId: string, evaluation: any) => {
    try {
      await evaluateProject(projectId, evaluation);
      // Recharger les projets après évaluation
      loadProjects();
    } catch (err) {
      console.error('Erreur lors de l\'évaluation:', err);
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-CM');
  };

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
              Évaluation des Projets
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Évaluez et validez les projets soumis par les CTD
            </p>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">Tous les statuts</option>
                <option value="submitted">Soumis</option>
                <option value="under_review">En évaluation</option>
              </select>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{filteredProjects.length}</p>
                <p className="text-xs text-blue-700">Projets à évaluer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Liste des projets à évaluer */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Projets en attente d'évaluation ({filteredProjects.length})
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
                <CheckCircle className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">Aucun projet à évaluer</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <ProjectEvaluationCard
                  key={project.id}
                  project={project}
                  onEvaluate={handleEvaluate}
                  formatAmount={formatAmount}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Composant pour la carte d'évaluation d'un projet
function ProjectEvaluationCard({ project, onEvaluate, formatAmount, formatDate }: any) {
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [evaluation, setEvaluation] = useState({
    score: 0,
    comments: '',
    recommendations: '',
    decision: 'approved' as 'approved' | 'rejected' | 'needs_revision'
  });

  const handleSubmitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    onEvaluate(project.id, evaluation);
    setShowEvaluationForm(false);
    setEvaluation({ score: 0, comments: '', recommendations: '', decision: 'approved' });
  };

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
            onClick={() => setShowEvaluationForm(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Star className="h-4 w-4" />
            <span>Évaluer</span>
          </button>
        </div>
      </div>

      {/* Formulaire d'évaluation */}
      {showEvaluationForm && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Formulaire d'évaluation</h4>
          
          <form onSubmit={handleSubmitEvaluation} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score (0-100)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={evaluation.score}
                  onChange={(e) => setEvaluation(prev => ({ ...prev, score: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Décision
                </label>
                <select
                  value={evaluation.decision}
                  onChange={(e) => setEvaluation(prev => ({ ...prev, decision: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="approved">Approuver</option>
                  <option value="rejected">Rejeter</option>
                  <option value="needs_revision">Demander des révisions</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commentaires
              </label>
              <textarea
                value={evaluation.comments}
                onChange={(e) => setEvaluation(prev => ({ ...prev, comments: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Commentaires sur l'évaluation..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recommandations
              </label>
              <textarea
                value={evaluation.recommendations}
                onChange={(e) => setEvaluation(prev => ({ ...prev, recommendations: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Recommandations pour améliorer le projet..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Soumettre l'évaluation</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowEvaluationForm(false)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <XCircle className="h-4 w-4" />
                <span>Annuler</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

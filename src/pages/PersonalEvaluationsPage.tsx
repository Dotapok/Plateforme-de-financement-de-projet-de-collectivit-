import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle, XCircle, Clock, FileText, TrendingUp, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';
import { StatusBadge } from '../components/UI/StatusBadge';

export function PersonalEvaluationsPage() {
  const { user } = useAuth();
  const { getEvaluations,  } = useApi();
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [filterDecision, setFilterDecision] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvaluations();
  }, []);

  const loadEvaluations = async () => {
    try {
      // Simuler le chargement des évaluations personnelles
      const mockEvaluations = [
        {
          id: 'EVAL001',
          projectId: 'PRJ001',
          projectTitle: 'Construction Route Principale',
          projectSubmittedBy: 'CTD Douala',
          decision: 'approved',
          score: 85,
          comments: 'Projet bien structuré avec des objectifs clairs',
          recommendations: 'Prévoir un suivi environnemental plus strict',
          evaluationDate: '2024-01-15T10:30:00Z',
          projectStatus: 'approved'
        },
        {
          id: 'EVAL002',
          projectId: 'PRJ002',
          projectTitle: 'Centre de Santé Communautaire',
          projectSubmittedBy: 'CTD Yaoundé',
          decision: 'needs_revision',
          score: 65,
          comments: 'Concept intéressant mais budget trop élevé',
          recommendations: 'Réduire le budget et optimiser les coûts',
          evaluationDate: '2024-01-14T14:20:00Z',
          projectStatus: 'under_review'
        },
        {
          id: 'EVAL003',
          projectId: 'PRJ003',
          projectTitle: 'Système d\'Irrigation Agricole',
          projectSubmittedBy: 'CTD Bafoussam',
          decision: 'rejected',
          score: 45,
          comments: 'Projet manque de viabilité économique',
          recommendations: 'Refaire l\'étude de faisabilité',
          evaluationDate: '2024-01-13T09:15:00Z',
          projectStatus: 'rejected'
        }
      ];
      setEvaluations(mockEvaluations);
    } catch (err) {
      console.error('Erreur lors du chargement des évaluations:', err);
    }
  };

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.projectSubmittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDecision = filterDecision === 'all' || evaluation.decision === filterDecision;
    return matchesSearch && matchesDecision;
  });

  const getDecisionStats = () => {
    const total = evaluations.length;
    const approved = evaluations.filter(e => e.decision === 'approved').length;
    const rejected = evaluations.filter(e => e.decision === 'rejected').length;
    const needsRevision = evaluations.filter(e => e.decision === 'needs_revision').length;
    
    return { total, approved, rejected, needsRevision };
  };

  const getAverageScore = () => {
    if (evaluations.length === 0) return 0;
    const totalScore = evaluations.reduce((sum, e) => sum + e.score, 0);
    return Math.round(totalScore / evaluations.length);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-CM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDecisionColor = (decision: string) => {
    const colors = {
      'approved': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'needs_revision': 'bg-yellow-100 text-yellow-800'
    };
    return colors[decision as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDecisionLabel = (decision: string) => {
    const labels = {
      'approved': 'Approuvé',
      'rejected': 'Rejeté',
      'needs_revision': 'Révision requise'
    };
    return labels[decision as keyof typeof labels] || decision;
  };

  const stats = getDecisionStats();

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
              Mes Évaluations
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Historique de toutes vos évaluations de projets
            </p>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
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
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approuvés</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Révisions</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.needsRevision}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejetés</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Score moyen */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Score Moyen d'Évaluation</h3>
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-8 w-8 text-yellow-500" />
              <span className="text-4xl font-bold text-blue-600">{getAverageScore()}</span>
              <span className="text-xl text-gray-600">/ 100</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Basé sur {evaluations.length} évaluation{evaluations.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une évaluation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            
            <div>
              <select
                value={filterDecision}
                onChange={(e) => setFilterDecision(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">Toutes les décisions</option>
                <option value="approved">Approuvés</option>
                <option value="rejected">Rejetés</option>
                <option value="needs_revision">Révisions requises</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des évaluations */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Historique des évaluations ({filteredEvaluations.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Chargement des évaluations...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                <span className="text-red-800">{error}</span>
              </div>
            </div>
          ) : filteredEvaluations.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">Aucune évaluation trouvée</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredEvaluations.map((evaluation) => (
                <div key={evaluation.id} className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Informations de l'évaluation */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDecisionColor(evaluation.decision)}`}>
                          {getDecisionLabel(evaluation.decision)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Évalué le {formatDate(evaluation.evaluationDate)}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{evaluation.projectTitle}</h3>
                      <p className="text-gray-600 text-sm mb-3">{evaluation.comments}</p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Entité:</span>
                          <p className="text-gray-600 truncate">{evaluation.projectSubmittedBy}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Score:</span>
                          <p className="text-gray-600">{evaluation.score}/100</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Statut actuel:</span>
                          <StatusBadge status={evaluation.projectStatus} size="sm" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">ID Projet:</span>
                          <p className="text-gray-600 font-mono text-xs">{evaluation.projectId}</p>
                        </div>
                      </div>
                      
                      {evaluation.recommendations && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm">
                            <span className="font-medium text-blue-800">Recommandations:</span>
                            <span className="text-blue-700 ml-2">{evaluation.recommendations}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Link
                        to={`/projects/${evaluation.projectId}`}
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Voir le projet</span>
                      </Link>
                      
                      <button
                        className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                        title="Modifier l'évaluation"
                      >
                        <Star className="h-4 w-4" />
                        <span>Modifier</span>
                      </button>
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, ExternalLink, Copy, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';

export function TransactionsPage() {
  const { user } = useAuth();
  const { getTransactions,  } = useApi();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const txns = await getTransactions(50);
        setTransactions(txns);
      } catch (err) {
        console.error('Erreur lors du chargement des transactions:', err);
      }
    };

    loadTransactions();
  }, [getTransactions]);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.signedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.hash.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || transaction.type.toLowerCase().includes(filterType.toLowerCase());
    
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getTransactionTypeColor = (type: string) => {
    const colors = {
      'validation': 'bg-blue-100 text-blue-800',
      'décaissement': 'bg-green-100 text-green-800',
      'soumission': 'bg-purple-100 text-purple-800',
      'évaluation': 'bg-yellow-100 text-yellow-800',
      'approbation': 'bg-indigo-100 text-indigo-800',
      'finalisation': 'bg-gray-100 text-gray-800'
    };
    
    for (const [key, color] of Object.entries(colors)) {
      if (type.toLowerCase().includes(key)) {
        return color;
      }
    }
    return 'bg-gray-100 text-gray-800';
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
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Transactions Blockchain
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Historique complet des transactions sur la plateforme
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Blockchain Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher une transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Filtre par type */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">Tous les types</option>
                <option value="validation">Validations</option>
                <option value="décaissement">Décaissements</option>
                <option value="soumission">Soumissions</option>
                <option value="évaluation">Évaluations</option>
                <option value="approbation">Approbations</option>
                <option value="finalisation">Finalisations</option>
              </select>
            </div>

            {/* Statistiques */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{transactions.length}</p>
                <p className="text-xs text-blue-700">Transactions totales</p>
              </div>
            </div>
          </div>
        </div>

        {/* État de chargement et erreur */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Chargement des transactions...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
              <span className="text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Liste des transactions */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Transactions ({filteredTransactions.length})
              </h2>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">Aucune transaction trouvée avec ces critères</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionTypeColor(transaction.type)}`}>
                            {transaction.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(transaction.timestamp).toLocaleDateString('fr-CM')} à {new Date(transaction.timestamp).toLocaleTimeString('fr-CM')}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Signé par:</span> {transaction.signedBy}
                          </p>
                          {transaction.amount && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Montant:</span> {formatCurrency(transaction.amount)}
                            </p>
                          )}
                          <div className="flex items-center space-x-2">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Hash:</span> 
                            </p>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono truncate max-w-32 sm:max-w-48">
                              {transaction.hash}
                            </code>
                            <button
                              onClick={() => copyToClipboard(transaction.hash)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                              title="Copier le hash"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <button
                          onClick={() => copyToClipboard(transaction.hash)}
                          className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copier</span>
                        </button>
                        <Link
                          to={`/transactions/${transaction.id}`}
                          className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="h-3 w-3" />
                          <span>Détails</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

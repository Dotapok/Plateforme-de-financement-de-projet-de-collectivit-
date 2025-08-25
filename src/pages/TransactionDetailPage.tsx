import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Copy, Download, ExternalLink, Hash, Calendar, User, Shield, FileText, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';

export function TransactionDetailPage() {
  const { transactionId } = useParams<{ transactionId: string }>();
  const { user } = useAuth();
  const { getTransaction } = useApi();
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    if (transactionId) {
      loadTransaction();
    }
  }, [transactionId]);

  const loadTransaction = async () => {
    try {
      if (transactionId) {
        const transactionData = await getTransaction(transactionId);
        if (transactionData) {
          setTransaction(transactionData);
        } else {
          console.error('Transaction non trouvée');
        }
      }
    } catch (err) {
      console.error('Erreur lors du chargement de la transaction:', err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
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

  const getTransactionTypeLabel = (type: string) => {
    const labels = {
      'validation': 'Validation',
      'décaissement': 'Décaissement',
      'soumission': 'Soumission',
      'évaluation': 'Évaluation',
      'approbation': 'Approbation',
      'finalisation': 'Finalisation'
    };
    
    for (const [key, label] of Object.entries(labels)) {
      if (type.toLowerCase().includes(key)) {
        return label;
      }
    }
    return type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Transaction non trouvée</h1>
            <p className="text-gray-600 mb-6">La transaction que vous recherchez n'existe pas ou a été supprimée.</p>
            <Link
              to="/transactions"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Retour aux transactions</span>
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
              to="/transactions"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Retour aux transactions</span>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Détails de la Transaction
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Informations complètes sur la transaction blockchain
              </p>
            </div>
            
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTransactionTypeColor(transaction.type)}`}>
                {getTransactionTypeLabel(transaction.type)}
              </span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Confirmée</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informations principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hash de la transaction */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hash de la Transaction</h2>
              <div className="flex items-center space-x-3">
                <Hash className="h-5 w-5 text-gray-500" />
                <code className="flex-1 text-sm bg-gray-100 px-3 py-2 rounded font-mono break-all">
                  {transaction.hash}
                </code>
                <button
                  onClick={() => copyToClipboard(transaction.hash)}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                  title="Copier le hash"
                >
                  <Copy className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Informations du projet */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations du Projet</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Titre du projet</p>
                    <p className="font-medium text-gray-900">{transaction.projectTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">ID du projet</p>
                    <p className="font-medium text-gray-900 font-mono">{transaction.projectId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Catégorie</p>
                    <p className="font-medium text-gray-900 capitalize">{transaction.metadata.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Région</p>
                    <p className="font-medium text-gray-900 capitalize">{transaction.metadata.region}</p>
                  </div>
                </div>
                
                {transaction.amount && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Montant</p>
                    <p className="text-2xl font-bold text-green-600">{formatAmount(transaction.amount)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Métadonnées de la transaction */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Métadonnées</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="text-gray-900">{transaction.metadata.description}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Évaluateur</p>
                    <p className="font-medium text-gray-900">{transaction.metadata.evaluator}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Score d'évaluation</p>
                    <p className="font-medium text-gray-900">{transaction.metadata.evaluationScore}/100</p>
                  </div>
                </div>
                
                {transaction.metadata.comments && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Commentaires</p>
                    <p className="text-gray-900">{transaction.metadata.comments}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Informations techniques blockchain */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations Techniques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Numéro de bloc</p>
                  <p className="font-medium text-gray-900">{transaction.blockNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Confirmations</p>
                  <p className="font-medium text-gray-900">{transaction.confirmations}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Gas utilisé</p>
                  <p className="font-medium text-gray-900">{transaction.gasUsed.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Prix du gas</p>
                  <p className="font-medium text-gray-900">{parseInt(transaction.gasPrice).toLocaleString()} wei</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Nonce</p>
                  <p className="font-medium text-gray-900">{transaction.nonce}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Statut</p>
                  <p className="font-medium text-gray-900 capitalize">{transaction.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Résumé de la transaction */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionTypeColor(transaction.type)}`}>
                    {getTransactionTypeLabel(transaction.type)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-900">{formatDate(transaction.timestamp)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Signé par</span>
                  <span className="font-medium text-gray-900">{transaction.signedBy}</span>
                </div>
                {transaction.amount && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Montant</span>
                    <span className="font-bold text-green-600">{formatAmount(transaction.amount)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Adresses */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresses</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">De</p>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 text-xs bg-gray-100 px-2 py-1 rounded font-mono truncate">
                      {transaction.from}
                    </code>
                    <button
                      onClick={() => copyToClipboard(transaction.from)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Copier l'adresse"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Vers</p>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 text-xs bg-gray-100 px-2 py-1 rounded font-mono truncate">
                      {transaction.to}
                    </code>
                    <button
                      onClick={() => copyToClipboard(transaction.to)}
                      className="text-blue-600 hover:text-blue-700"
                      title="Copier l'adresse"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions rapides */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-3">
                <Link
                  to={`/projects/${transaction.projectId}`}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <FileText className="h-4 w-4" />
                  <span>Voir le projet</span>
                </Link>
                
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <Download className="h-4 w-4" />
                  <span>Télécharger le rapport</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <ExternalLink className="h-4 w-4" />
                  <span>Voir sur l'explorateur</span>
                </button>
              </div>
            </div>

            {/* Liens de navigation */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
              <div className="space-y-3">
                <Link
                  to="/transactions"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Toutes les transactions</span>
                </Link>
                
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                >
                  <Shield className="h-4 w-4" />
                  <span>Retour au Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

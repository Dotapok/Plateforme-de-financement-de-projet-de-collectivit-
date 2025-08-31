import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, FileText, CheckCircle, AlertCircle, DollarSign, Clock, Users, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';
import { KPICard } from '../components/UI/KPICard';
import { StatusBadge } from '../components/UI/StatusBadge';

// Données pour les graphiques (pourraient être récupérées depuis l'ApiContext)
const projectsData = [
  { month: 'Jan', soumis: 12, approuvés: 8, financés: 6 },
  { month: 'Fév', soumis: 15, approuvés: 11, financés: 9 },
  { month: 'Mar', soumis: 18, approuvés: 14, financés: 12 },
  { month: 'Avr', soumis: 22, approuvés: 16, financés: 14 },
  { month: 'Mai', soumis: 28, approuvés: 21, financés: 18 },
  { month: 'Juin', soumis: 25, approuvés: 19, financés: 16 }
];

const budgetData = [
  { name: 'Infrastructures', value: 45, amount: '2.8M FCFA' },
  { name: 'Éducation', value: 25, amount: '1.6M FCFA' },
  { name: 'Santé', value: 20, amount: '1.2M FCFA' },
  { name: 'Agriculture', value: 10, amount: '0.6M FCFA' }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

export function DashboardPage() {
  const { user } = useAuth();
  const { getKPIData, getProjectStats, getBudgetStats, getTransactions } = useApi();
  const [kpiData, setKpiData] = useState<any>(null);
  const [projectStats, setProjectStats] = useState<any>(null);
  const [budgetStats, setBudgetStats] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
      const loadDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [kpi, stats, budget, txns] = await Promise.all([
        getKPIData(),
        getProjectStats(),
        getBudgetStats(),
        getTransactions({ limit: 4 })
      ]);
      
      setKpiData(kpi);
      setProjectStats(stats);
      setBudgetStats(budget);
      setTransactions(txns);
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

    loadDashboardData();
  }, []); // Remove function dependencies to prevent infinite re-renders

  const getRoleSpecificKPIs = () => {
    if (!kpiData) return [];
    
    // Fonction utilitaire pour sécuriser les valeurs
    const safeValue = (value: any, defaultValue: string = '0') => {
      return value != null ? value.toString() : defaultValue;
    };
    
    // Extraire les données avec des valeurs par défaut sécurisées
    // Note: La structure exacte dépend de la réponse de l'API
    const totalProjects = kpiData.totalProjects || kpiData.stats?.projects?.totalProjects || 0;
    const approvedProjects = kpiData.approvedProjects || kpiData.stats?.projects?.completedProjects || 0;
    const totalBudget = kpiData.totalBudget || kpiData.stats?.projects?.totalBudget || 0;
    const averageProcessingTime = kpiData.averageProcessingTime || kpiData.stats?.projects?.avgScore || 0;
    
    switch (user?.role) {
      case 'ctd':
        return [
          { title: 'Projets Soumis', value: safeValue(totalProjects), icon: FileText, color: 'text-blue-600', trend: { value: 8, isPositive: true } },
          { title: 'En Évaluation', value: '7', icon: Clock, color: 'text-yellow-600' },
          { title: 'Approuvés', value: safeValue(approvedProjects), icon: CheckCircle, color: 'text-green-600', trend: { value: 12, isPositive: true } },
          { title: 'Budget Total', value: formatBudgetInMillions(totalBudget), icon: DollarSign, color: 'text-purple-600' }
        ];
      case 'minddevel':
        return [
          { title: 'À Évaluer', value: '15', icon: AlertCircle, color: 'text-orange-600' },
          { title: 'Évalués', value: safeValue(approvedProjects), icon: CheckCircle, color: 'text-green-600', trend: { value: 15, isPositive: true } },
          { title: 'Délai Moyen', value: `${averageProcessingTime}j`, icon: Clock, color: 'text-blue-600', trend: { value: -8, isPositive: true } },
          { title: 'Taux Approbation', value: `${Math.round((approvedProjects / (totalProjects || 1)) * 100)}%`, icon: TrendingUp, color: 'text-purple-600', trend: { value: 5, isPositive: true } }
        ];
      case 'minfi':
        return [
          { title: 'Validations', value: safeValue(approvedProjects), icon: Shield, color: 'text-blue-600', trend: { value: 12, isPositive: true } },
          { title: 'Budget Engagé', value: formatBudgetInMillions(totalBudget), icon: DollarSign, color: 'text-green-600' },
          { title: 'En Attente', value: '6', icon: Clock, color: 'text-yellow-600' },
          { title: 'Conformité', value: '95%', icon: CheckCircle, color: 'text-purple-600', trend: { value: 2, isPositive: true } }
        ];
      default:
        return [
          { title: 'Total Projets', value: safeValue(totalProjects), icon: FileText, color: 'text-blue-600', trend: { value: 12, isPositive: true } },
          { title: 'Utilisateurs Actifs', value: '89', icon: Users, color: 'text-green-600', trend: { value: 8, isPositive: true } },
          { title: 'Transactions', value: '234', icon: TrendingUp, color: 'text-purple-600', trend: { value: 15, isPositive: true } },
          { title: 'Uptime', value: '99.9%', icon: Shield, color: 'text-red-600' }
        ];
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatBudgetInMillions = (amount: number) => {
    if (amount >= 1000000000) {
      // Plus de 1 milliard, afficher en milliards
      return `${(amount / 1000000000).toFixed(1)} Md FCFA`;
    } else if (amount >= 1000000) {
      // Plus de 1 million, afficher en millions
      return `${(amount / 1000000).toFixed(1)}M FCFA`;
    } else if (amount >= 1000) {
      // Plus de 1 millier, afficher en milliers
      return `${(amount / 1000).toFixed(1)}K FCFA`;
    } else {
      // Montant inférieur à 1000
      return `${amount.toLocaleString('fr-FR')} FCFA`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6 lg:space-y-8">
      {/* En-tête de bienvenue */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-4 sm:p-6 lg:p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 truncate">
              Bonjour, {user?.name}
            </h1>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg truncate">
              {user?.entity} • {user?.role?.toUpperCase()}
            </p>
            <div className="flex items-center mt-2 sm:mt-4 space-x-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-300 rounded-full"></div>
              <span className="text-xs sm:text-sm truncate">Certificat: {user?.certificateInfo.serialNumber}</span>
              <StatusBadge status={user?.certificateInfo.status || 'valid'} size="sm" />
            </div>
          </div>
          <div className="hidden sm:block ml-4">
            <Shield className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-white opacity-20" />
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {getRoleSpecificKPIs().map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            iconColor={kpi.color}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Évolution des projets */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Évolution des Projets
          </h2>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <BarChart data={projectsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px', 
                  color: '#fff' 
                }} 
              />
              <Bar dataKey="soumis" fill="#3B82F6" name="Soumis" radius={[2, 2, 0, 0]} />
              <Bar dataKey="approuvés" fill="#10B981" name="Approuvés" radius={[2, 2, 0, 0]} />
              <Bar dataKey="financés" fill="#F59E0B" name="Financés" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition budgétaire */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Répartition Budgétaire
          </h2>
          <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value}% (${props.payload.amount})`,
                  name
                ]}
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px', 
                  color: '#fff' 
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actions rapides et transactions récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Actions rapides */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Actions Rapides
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {user?.role === 'ctd' && (
              <>
                <Link
                  to="/projects/new"
                  className="w-full flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                >
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  <span className="text-blue-900 font-medium text-sm sm:text-base">Nouveau Projet</span>
                </Link>
                <Link
                  to="/projects"
                  className="w-full flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors cursor-pointer"
                >
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  <span className="text-green-900 font-medium text-sm sm:text-base">Suivi Projets</span>
                </Link>
              </>
            )}
            {user?.role === 'minddevel' && (
              <>
                <Link
                  to="/projects/evaluate"
                  className="w-full flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition-colors cursor-pointer"
                >
                  <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  <span className="text-orange-900 font-medium text-sm sm:text-base">Projets À Évaluer</span>
                </Link>
                <Link
                  to="/projects/evaluations"
                  className="w-full flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors cursor-pointer"
                >
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  <span className="text-purple-900 font-medium text-sm sm:text-base">Mes Évaluations</span>
                </Link>
              </>
            )}
            <Link
              to="/support"
              className="w-full flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors cursor-pointer"
            >
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
              <span className="text-gray-900 font-medium text-sm sm:text-base">Support</span>
            </Link>
          </div>
        </div>

        {/* Transactions blockchain récentes */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Transactions Blockchain Récentes
            </h2>
            <Link
              to="/transactions"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors flex items-center space-x-1"
            >
              <span>Voir toutes</span>
              <span>→</span>
            </Link>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Chargement...</span>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center py-4">{error}</div>
          ) : (
            <>
              <div className="space-y-3 sm:space-y-4">
                {transactions.map((transaction) => (
                  <Link
                    key={transaction.id}
                    to={`/transactions/${transaction.id}`}
                    className="block hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                            {transaction.type}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {transaction.signedBy} • {new Date(transaction.timestamp).toLocaleDateString('fr-CM')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-2 sm:ml-4 flex-shrink-0">
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">
                          {transaction.amount ? formatCurrency(transaction.amount) : '-'}
                        </p>
                        <p className="text-xs text-gray-500 font-mono truncate max-w-20 sm:max-w-32">
                          {transaction.hash}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

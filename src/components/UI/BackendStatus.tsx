import React, { useEffect, useState } from 'react';
import { useApi } from '../../contexts/ApiContext';
import { Wifi, WifiOff, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

const BackendStatus: React.FC = () => {
  const { isConnected, socket, getBlockchainStats } = useApi();
  const [blockchainStats, setBlockchainStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlockchainStats = async () => {
      if (isConnected) {
        setIsLoading(true);
        setError(null);
        try {
          const stats = await getBlockchainStats();
          setBlockchainStats(stats);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Erreur inconnue');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBlockchainStats();
  }, [isConnected, getBlockchainStats]);

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="w-4 h-4 animate-spin" />;
    if (isConnected) return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusText = () => {
    if (isLoading) return 'Vérification...';
    if (isConnected) return 'Connecté';
    return 'Déconnecté';
  };

  const getStatusColor = () => {
    if (isLoading) return 'text-yellow-600';
    if (isConnected) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-4 max-w-sm">
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className="text-sm font-medium">État du Backend</span>
        </div>
        {getStatusIcon()}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Socket.IO:</span>
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>

        {isConnected && blockchainStats && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Blocs:</span>
              <span className="text-sm font-medium text-blue-600">
                {blockchainStats.totalBlocks}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Transactions:</span>
              <span className="text-sm font-medium text-blue-600">
                {blockchainStats.totalTransactions}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">En attente:</span>
              <span className="text-sm font-medium text-orange-600">
                {blockchainStats.pendingTransactions}
              </span>
            </div>
          </>
        )}

        {error && (
          <div className="flex items-center space-x-2 mt-2 p-2 bg-red-50 rounded border border-red-200">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-xs text-red-600">{error}</span>
          </div>
        )}

        {socket && (
          <div className="text-xs text-gray-500 mt-2">
            ID: {socket.id}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackendStatus;

import React from 'react';
import clsx from 'clsx';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  submitted: { label: 'Soumis', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  under_review: { label: 'En évaluation', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  approved: { label: 'Approuvé', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  rejected: { label: 'Rejeté', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
  funded: { label: 'Financé', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  completed: { label: 'Terminé', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
  valid: { label: 'Valide', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  expired: { label: 'Expiré', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
  revoked: { label: 'Révoqué', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' }
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base'
  };

  return (
    <span className={clsx(
      'inline-flex items-center rounded-full font-medium',
      config.color,
      sizeClasses[size]
    )}>
      {config.label}
    </span>
  );
}

import React from 'react';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', color = 'border-warm-coral', className = '' }) => {
  const { t } = useTranslation();
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4',
  };

  return (
    <div 
      className={`animate-spin rounded-full border-solid ${color} border-t-transparent ${sizeClasses[size]} ${className}`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">{t('common.loading', { defaultValue: 'Loading...' })}</span>
    </div>
  );
};

export default LoadingSpinner;
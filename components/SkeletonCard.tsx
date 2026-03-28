
import React from 'react';
import Card from './Card';

interface SkeletonCardProps {
  type: 'blog' | 'testimonial';
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ type }) => {
  if (type === 'testimonial') {
    return (
      <Card className="p-6 bg-calm-blue/50 h-full flex flex-col relative animate-pulse">
        <div className="flex-grow pt-4">
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
        <div className="mt-auto">
          <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-gray-300"></div>
          <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto mt-2"></div>
        </div>
      </Card>
    );
  }

  // Default to blog post skeleton
  return (
    <Card className="flex flex-col h-full animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="flex-grow space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="mt-auto pt-4">
          <div className="h-9 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </Card>
  );
};

export default SkeletonCard;

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
    <div className="bg-pure-white rounded-[2.5rem] overflow-hidden shadow-lg border border-gentle-green/10 flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-72 w-full bg-gray-200">
        <div className="absolute bottom-6 left-8 bg-gray-300 w-24 h-6 rounded-full" />
      </div>
      
      {/* Content Skeleton */}
      <div className="p-10 flex-grow flex flex-col">
        <div className="h-8 bg-gray-300 rounded w-full mb-3"></div>
        <div className="h-8 bg-gray-300 rounded w-2/3 mb-6"></div>
        
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-10 flex-grow"></div>
        
        {/* Footer Skeleton */}
        <div className="mt-auto pt-10 border-t border-gentle-green/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
             <div className="w-12 h-12 rounded-full bg-gray-300 border border-white/20"></div>
             <div className="flex flex-col space-y-2">
               <div className="w-12 h-3 bg-gray-300 rounded"></div>
               <div className="w-32 h-4 bg-gray-300 rounded"></div>
             </div>
          </div>
          
          <div className="w-32 h-12 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
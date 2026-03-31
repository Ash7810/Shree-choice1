import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-100 flex flex-col gap-3">
      <div className="relative flex-shrink-0">
        {/* Image Skeleton */}
        <div className="aspect-square w-full rounded-xl bg-gray-100 animate-pulse" />
      </div>
      
      {/* Info Section Skeleton */}
      <div className="flex flex-col flex-grow gap-2 mt-auto">
         {/* Price */}
        <div className="h-6 w-1/3 bg-gray-100 rounded animate-pulse mx-auto" />

        {/* Title Skeleton */}
        <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse mx-auto" />
        
        {/* Rating Skeleton */}
        <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse mx-auto" />
        
        {/* Button Skeleton */}
        <div className="h-10 bg-gray-100 rounded-full animate-pulse mt-2" />
      </div>
    </div>
  );
};
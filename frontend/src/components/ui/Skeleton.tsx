import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700 ${className}`} />
);

export const SkeletonCard: React.FC = () => (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 bg-white dark:bg-gray-900">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-full rounded-xl" />
    </div>
);

export const SkeletonTable: React.FC = () => (
    <div className="space-y-3">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
    </div>
);

export const SkeletonChart: React.FC = () => (
    <div className="space-y-3">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-64 w-full rounded-xl" />
    </div>
);

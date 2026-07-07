import React from 'react';

interface SkeletonProps {
    className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
    <div className={`animate-pulse-slow rounded-xl bg-gray-200 dark:bg-gray-700 ${className}`} />
);

export const SkeletonCard: React.FC = () => (
    <div className="rounded-2xl border border-border dark:border-border-dark p-6 space-y-4 bg-white dark:bg-surface-dark">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <div className="pt-2">
            <Skeleton className="h-10 w-full rounded-xl" />
        </div>
    </div>
);

export const SkeletonTable: React.FC = () => (
    <div className="space-y-3">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
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

export const SkeletonStats: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
    </div>
);

import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'gradient' | 'glass';
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default', onClick }) => {
    const variants = {
        default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm',
        gradient: 'bg-gradient-brand text-white shadow-md',
        glass: 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-md',
    };

    return (
        <div className={`rounded-2xl p-6 transition-smooth ${variants[variant]} ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={className}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>
);

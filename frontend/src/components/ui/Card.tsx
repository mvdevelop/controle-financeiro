import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'gradient' | 'glass';
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', variant = 'default', onClick }) => {
    const variants = {
        default: 'bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-sm',
        gradient: 'bg-gradient-card text-white shadow-lg',
        glass: 'glass shadow-lg',
    };

    return (
        <div
            className={`rounded-2xl p-6 transition-smooth ${variants[variant]} ${onClick ? 'cursor-pointer hover:shadow-xl hover:-translate-y-0.5' : ''} ${className}`}
            onClick={onClick}
        >
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
    <div className={`mt-4 pt-4 border-t border-border dark:border-border-dark ${className}`}>{children}</div>
);

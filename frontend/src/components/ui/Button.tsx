import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}

const variants = {
    primary: 'bg-gradient-brand text-white hover:opacity-90 shadow-md hover:shadow-lg',
    secondary: 'bg-primary-light dark:bg-surface-dark text-white hover:bg-opacity-90',
    danger: 'bg-danger text-white hover:bg-red-600 shadow-md',
    ghost: 'text-primary dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
    outline: 'border-2 border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    children,
    disabled,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`inline-flex items-center justify-center gap-2 font-semibold transition-smooth disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
};

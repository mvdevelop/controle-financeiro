import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, className = '', ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-primary dark:text-gray-300 mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                        {icon}
                    </div>
                )}
                <input
                    className={`w-full px-4 py-2.5 rounded-xl border transition-smooth
                        bg-white dark:bg-surface-dark
                        text-primary dark:text-gray-200
                        placeholder:text-muted
                        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                        ${icon ? 'pl-10' : ''}
                        ${error ? 'border-danger focus:ring-danger' : 'border-border dark:border-border-dark hover:border-brand-400'}
                        ${className}`}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-danger">{error}</p>}
        </div>
    );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, error, options, className = '', ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-primary dark:text-gray-300 mb-1.5">
                    {label}
                </label>
            )}
            <select
                className={`w-full px-4 py-2.5 rounded-xl border transition-smooth
                    bg-white dark:bg-surface-dark
                    text-primary dark:text-gray-200
                    focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                    ${error ? 'border-danger focus:ring-danger' : 'border-border dark:border-border-dark hover:border-brand-400'}
                    ${className}`}
                {...props}
            >
                <option value="">Selecione...</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-danger">{error}</p>}
        </div>
    );
};

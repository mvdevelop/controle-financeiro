import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    variant?: 'spinner' | 'pulse' | 'dots';
}

const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    text = 'Carregando...',
    variant = 'spinner',
}) => {
    if (variant === 'pulse') {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <div className={`${sizeMap[size]} bg-gradient-brand rounded-full animate-pulse-slow`} />
                {text && <p className="mt-4 text-sm text-muted">{text}</p>}
            </div>
        );
    }

    if (variant === 'dots') {
        return (
            <div className="flex flex-col items-center justify-center p-8 gap-3">
                <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                        <div
                            key={i}
                            className="w-2.5 h-2.5 bg-brand-500 rounded-full animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        />
                    ))}
                </div>
                {text && <p className="text-sm text-muted">{text}</p>}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className={`${sizeMap[size]} text-brand-500 animate-spin`} />
            {text && <p className="mt-4 text-sm text-muted">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;

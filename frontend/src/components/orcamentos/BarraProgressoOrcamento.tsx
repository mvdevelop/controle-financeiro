import React from 'react';

interface BarraProgressoProps {
    percentual: number;
    status: 'SAFE' | 'WARNING' | 'CRITICAL' | 'EXCEEDED';
    size?: 'sm' | 'md' | 'lg';
}

const statusColors = {
    SAFE: { bar: 'bg-gradient-to-r from-brand-400 to-brand-500', text: 'text-brand-600 dark:text-brand-400' },
    WARNING: { bar: 'bg-gradient-to-r from-amber-400 to-amber-500', text: 'text-amber-600 dark:text-amber-400' },
    CRITICAL: { bar: 'bg-gradient-to-r from-orange-400 to-orange-500', text: 'text-orange-600 dark:text-orange-400' },
    EXCEEDED: { bar: 'bg-gradient-to-r from-red-400 to-red-500', text: 'text-red-600 dark:text-red-400' },
};

const heightMap = { sm: 'h-2', md: 'h-3', lg: 'h-4' };

const BarraProgressoOrcamento: React.FC<BarraProgressoProps> = ({ percentual, status, size = 'md' }) => {
    const colors = statusColors[status];
    const clampedPercentual = Math.min(Math.max(percentual, 0), 100);

    return (
        <div className="w-full">
            <div className={`w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden ${heightMap[size]}`}>
                <div
                    className={`${heightMap[size]} ${colors.bar} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min(percentual, 100)}%` }}
                />
                {percentual > 100 && (
                    <div
                        className={`${heightMap[size]} bg-red-500 rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min(percentual - 100, 100)}%`, marginTop: `-${size === 'sm' ? '8px' : size === 'lg' ? '16px' : '12px'}`, marginLeft: '100%' }}
                    />
                )}
            </div>
        </div>
    );
};

export default BarraProgressoOrcamento;

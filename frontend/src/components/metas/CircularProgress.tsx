import React from 'react';

interface CircularProgressProps {
    percentual: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    percentual,
    size = 120,
    strokeWidth = 8,
    color = '#10b981',
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (Math.min(percentual, 100) / 100) * circumference;

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="currentColor"
                strokeWidth={strokeWidth}
                fill="none"
                className="text-gray-100 dark:text-gray-700"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
            />
        </svg>
    );
};

export default CircularProgress;

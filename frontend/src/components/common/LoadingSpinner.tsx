
import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
    );
};

export default LoadingSpinner;

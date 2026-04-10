
import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';

const SignIn: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">💰 Controle Financeiro</h1>
                    <p className="text-gray-600">Faça login para acessar o sistema</p>
                </div>
                <ClerkSignIn 
                    routing="path" 
                    path="/sign-in"
                    signUpUrl="/sign-up"
                    afterSignInUrl="/dashboard"
                />
            </div>
        </div>
    );
};

export default SignIn;

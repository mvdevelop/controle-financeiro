
import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';

const SignUp: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">💰 Controle Financeiro</h1>
                    <p className="text-gray-600">Crie sua conta gratuitamente</p>
                </div>
                <ClerkSignUp 
                    routing="path" 
                    path="/sign-up"
                    signInUrl="/sign-in"
                    afterSignUpUrl="/dashboard"
                />
            </div>
        </div>
    );
};

export default SignUp;

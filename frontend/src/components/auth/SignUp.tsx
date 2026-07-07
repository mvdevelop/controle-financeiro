import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/slices/authSlice';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleRegister = () => {
        dispatch(setUser({
            id: '1',
            email: 'usuario@financeiro.com',
            name: 'Usuário',
        }));
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary mb-2">💰 Controle Financeiro</h1>
                    <p className="text-gray-600">Bem-vindo ao sistema</p>
                </div>
                <button
                    onClick={handleRegister}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-smooth"
                >
                    Acessar o Sistema
                </button>
            </div>
        </div>
    );
};

export default SignUp;

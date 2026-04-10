
import React from 'react';
import Layout from '../components/layout/Layout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme } from '../store/slices/uiSlice';
import { useAuth } from '@clerk/clerk-react';

const Configuracoes: React.FC = () => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.ui);
    const { user } = useAuth();

    return (
        <Layout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-primary">⚙️ Configurações</h1>

                <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-primary mb-4">Aparência</h2>
                        <div className="flex gap-4">
                            <button
                                className={`px-6 py-3 rounded-lg font-semibold transition-smooth ${
                                    theme === 'light'
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                onClick={() => dispatch(setTheme('light'))}
                            >
                                ☀️ Claro
                            </button>
                            <button
                                className={`px-6 py-3 rounded-lg font-semibold transition-smooth ${
                                    theme === 'dark'
                                        ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                onClick={() => dispatch(setTheme('dark'))}
                            >
                                🌙 Escuro
                            </button>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold text-primary mb-4">Conta</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Usuário</label>
                                <p className="mt-1 text-gray-900">{user?.fullName || user?.username}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <p className="mt-1 text-gray-900">{user?.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Configuracoes;

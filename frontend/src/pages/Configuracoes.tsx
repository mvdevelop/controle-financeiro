import React from 'react';
import { Sun, Moon, User, Mail } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme } from '../store/slices/uiSlice';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const Configuracoes: React.FC = () => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.ui);
    const { userName, userEmail } = useAppSelector(state => state.auth);

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-primary dark:text-white">⚙️ Configurações</h1>
                    <p className="text-muted text-sm mt-1">Personalize sua experiência</p>
                </div>

                <Card>
                    <CardBody>
                        <h2 className="text-lg font-semibold text-primary dark:text-white mb-4">Aparência</h2>
                        <div className="flex gap-3">
                            <button
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-smooth ${
                                    theme === 'light'
                                        ? 'bg-gradient-brand text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                                onClick={() => dispatch(setTheme('light'))}
                            >
                                <Sun className="w-4 h-4" />
                                Claro
                            </button>
                            <button
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-smooth ${
                                    theme === 'dark'
                                        ? 'bg-gradient-brand text-white shadow-md'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                                onClick={() => dispatch(setTheme('dark'))}
                            >
                                <Moon className="w-4 h-4" />
                                Escuro
                            </button>
                        </div>
                        <p className="text-sm text-muted mt-3">
                            Tema atual: <Badge variant={theme === 'dark' ? 'info' : 'default'}>{theme === 'dark' ? 'Escuro' : 'Claro'}</Badge>
                        </p>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <h2 className="text-lg font-semibold text-primary dark:text-white mb-4">Conta</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm">
                                    {userName?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-muted" />
                                        <label className="text-sm font-medium text-muted">Usuário</label>
                                    </div>
                                    <p className="text-primary dark:text-white font-medium">{userName || 'Usuário'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                <Mail className="w-5 h-5 text-muted ml-3" />
                                <div>
                                    <label className="text-sm font-medium text-muted">Email</label>
                                    <p className="text-primary dark:text-white font-medium">{userEmail}</p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card variant="glass">
                    <CardBody>
                        <p className="text-sm text-muted text-center">
                            Controle Financeiro Familiar v1.0.0
                        </p>
                    </CardBody>
                </Card>
            </div>
        </Layout>
    );
};

export default Configuracoes;

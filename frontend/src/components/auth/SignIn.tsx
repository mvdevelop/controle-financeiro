import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { login } from '../../store/slices/authSlice';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardBody } from '../ui/Card';

interface StoredUser {
    id: string;
    name: string;
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simula delay de rede
        await new Promise(r => setTimeout(r, 600));

        try {
            const stored = localStorage.getItem('registered_users');
            const users: StoredUser[] = stored ? JSON.parse(stored) : [];

            const found = users.find(u => u.email === email && u.password === password);

            if (found) {
                dispatch(login({ id: found.id, email: found.email, name: found.name }));
                navigate('/dashboard');
            } else {
                // Check if user exists but wrong password
                const exists = users.find(u => u.email === email);
                if (exists) {
                    setError('Senha incorreta. Tente novamente.');
                } else {
                    setError('Conta não encontrada. Verifique seu email ou crie uma nova conta.');
                }
            }
        } catch {
            setError('Erro ao fazer login. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-scale-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-brand shadow-lg mb-4">
                        <span className="text-3xl">💰</span>
                    </div>
                    <h1 className="text-2xl font-bold text-primary dark:text-white">Controle Financeiro</h1>
                    <p className="text-muted text-sm mt-1">Faça login para acessar o sistema</p>
                </div>

                <Card>
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <Input
                                label="Email"
                                type="email"
                                placeholder="seu@email.com"
                                icon={<Mail className="w-4 h-4" />}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />

                            <div>
                                <label className="block text-sm font-medium text-primary dark:text-gray-300 mb-1.5">Senha</label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Sua senha"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-2.5 pl-10 pr-10 rounded-xl border border-border dark:border-border-dark bg-white dark:bg-surface-dark text-primary dark:text-gray-200 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-smooth"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary dark:hover:text-white transition-smooth"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" loading={loading} className="w-full" size="lg">
                                <LogIn className="w-4 h-4" />
                                Entrar
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted">
                                Não tem uma conta?{' '}
                                <Link to="/sign-up" className="text-brand-500 hover:text-brand-600 font-semibold transition-smooth">
                                    Cadastre-se
                                </Link>
                            </p>
                        </div>
                    </CardBody>
                </Card>

                <p className="text-center text-xs text-muted mt-6">
                    Projeto de Extensão — Teresópolis
                </p>
            </div>
        </div>
    );
};

export default SignIn;

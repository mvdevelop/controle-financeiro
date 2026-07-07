import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { signUp } from '../../store/slices/authSlice';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardBody } from '../ui/Card';

const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePassword = (pass: string) => {
        const errors: string[] = [];
        if (pass.length < 6) errors.push('mínimo 6 caracteres');
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validações
        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            setError('Preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não conferem.');
            return;
        }

        if (password.length < 6) {
            setError('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        setLoading(true);
        await new Promise(r => setTimeout(r, 600));

        try {
            // Store user in localStorage
            const stored = localStorage.getItem('registered_users');
            const users: Array<{ id: string; name: string; email: string; password: string }> = stored ? JSON.parse(stored) : [];

            // Check if email already registered
            if (users.find(u => u.email === email)) {
                setError('Este email já está cadastrado. Faça login.');
                setLoading(false);
                return;
            }

            const newUser = {
                id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password,
            };

            users.push(newUser);
            localStorage.setItem('registered_users', JSON.stringify(users));

            // Auto login after signup
            dispatch(signUp({ id: newUser.id, email: newUser.email, name: newUser.name }));
            navigate('/dashboard');
        } catch {
            setError('Erro ao criar conta. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const passwordErrors = validatePassword(password);

    return (
        <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-scale-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-brand shadow-lg mb-4">
                        <span className="text-3xl">💰</span>
                    </div>
                    <h1 className="text-2xl font-bold text-primary dark:text-white">Criar Conta</h1>
                    <p className="text-muted text-sm mt-1">Cadastre-se para começar a usar</p>
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
                                label="Nome"
                                type="text"
                                placeholder="Seu nome completo"
                                icon={<User className="w-4 h-4" />}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />

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
                                        placeholder="Mínimo 6 caracteres"
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
                                {password && (
                                    <div className="mt-2 space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs">
                                            {password.length >= 6
                                                ? <CheckCircle className="w-3 h-3 text-success" />
                                                : <AlertCircle className="w-3 h-3 text-warning" />
                                            }
                                            <span className={password.length >= 6 ? 'text-success' : 'text-muted'}>
                                                Mínimo 6 caracteres
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Input
                                label="Confirmar Senha"
                                type="password"
                                placeholder="Repita a senha"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />

                            <Button type="submit" loading={loading} className="w-full" size="lg">
                                <UserPlus className="w-4 h-4" />
                                Criar Conta
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted">
                                Já tem uma conta?{' '}
                                <Link to="/sign-in" className="text-brand-500 hover:text-brand-600 font-semibold transition-smooth">
                                    Faça login
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

export default SignUp;

import React from 'react';
import { Sun, Moon, User, Mail, Download, Github, Linkedin, Briefcase, Calendar } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTheme } from '../store/slices/uiSlice';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const Configuracoes: React.FC = () => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.ui);
    const { user } = useAppSelector(state => state.auth);

    return (
        <Layout>
            <div className="space-y-8">
                {/* Profile Section */}
                <section>
                    <h1 className="text-3xl font-bold text-primary dark:text-white mb-2">👤 Perfil Profissional</h1>
                    <p className="text-muted">Informações pessoais e redes profissionais</p>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="text-center">
                            <CardBody>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-24 h-24 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-2xl">
                                        {user?.name?.charAt(0) || 'JV'}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary dark:text-white mb-1">
                                            {user?.name || 'John Victor'}
                                        </h3>
                                        <p className="text-muted mb-3">Full Stack Developer</p>
                                        <Badge variant="success" className="mb-3">Disponível para trabalho</Badge>
                                    </div>

                                    <div className="w-full space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                            <Mail className="w-4 h-4 text-muted" />
                                            <span className="text-sm text-muted">{user?.email || 'john@example.com'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                            <Briefcase className="w-4 h-4 text-muted" />
                                            <span className="text-sm text-muted">Desenvolvedor Full Stack</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                            <Calendar className="w-4 h-4 text-muted" />
                                            <span className="text-sm text-muted">5+ anos de experiência</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 w-full">
                                        <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-brand text-white px-4 py-3 rounded-xl font-medium hover:opacity-90 transition-smooth">
                                            <Download className="w-4 h-4" />
                                            Download CV
                                        </button>
                                    </div>

                                    <div className="flex gap-3 w-full">
                                        <a
                                            href="https://github.com/johndev"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-smooth"
                                        >
                                            <Github className="w-4 h-4" />
                                            GitHub
                                        </a>
                                        <a
                                            href="https://linkedin.com/in/johndev"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-smooth"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            LinkedIn
                                        </a>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>

                    {/* Settings Grid */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Appearance Settings */}
                        <Card>
                            <CardBody>
                                <h2 className="text-lg font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
                                    <Sun className="w-5 h-5" />
                                    Preferências de Aparência
                                </h2>
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

                        {/* Professional Information */}
                        <Card variant="glass">
                            <CardBody>
                                <h2 className="text-lg font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5" />
                                    Informações Profissionais
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sobre
                                        </h3>
                                        <p className="text-sm text-muted leading-relaxed">
                                            Full Stack Developer com experiência em desenvolvimento web completo,
                                            desde interfaces de usuário até APIs REST. Especializado em React,
                                            TypeScript, Spring Boot e integração de banco de dados. Apaixonado por
                                            código limpo, arquitetura escalável e constante aprendizado.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Habilidades
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Docker', 'Vercel', 'GitHub'].map((skill) => (
                                                <Badge key={skill} variant="default" className="text-xs">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Portfolio Settings */}
                        <Card variant="glass">
                            <CardBody>
                                <h2 className="text-lg font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
                                    <Linkedin className="w-5 h-5" />
                                    Configurações de Portfolio
                                </h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">Perfil Público</div>
                                            <div className="text-sm text-muted">Tornar perfil visível para recrutadores</div>
                                        </div>
                                        <Badge variant="success">Ativo</Badge>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">Contato por Email</div>
                                            <div className="text-sm text-muted">Receber mensagens de recrutadores</div>
                                        </div>
                                        <Badge variant="success">Permitido</Badge>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">Mostrar Projetos</div>
                                            <div className="text-sm text-muted">Exibir projetos no portfolio público</div>
                                        </div>
                                        <Badge variant="success">Ativado</Badge>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Configuracoes;

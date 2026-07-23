import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BarChart3, User, Briefcase, Target, Github, Linkedin, Mail, FileText, Menu } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';

const PortfolioNavigation: React.FC = () => {
    const location = useLocation();
    const { user } = useAppSelector(state => state.auth);

    const portfolioNavItems = [
        {
            path: '/dashboard',
            icon: BarChart3,
            label: 'Portfolio',
            description: 'Visão geral do meu portfólio profissional'
        },
        {
            path: '/about',
            icon: User,
            label: 'Sobre Mim',
            description: 'Minha história, habilidades e formação'
        },
        {
            path: '/projects',
            icon: Briefcase,
            label: 'Projetos',
            description: 'Trabalhos em destaque e projetos técnicos'
        },
        {
            path: '/skills',
            icon: Target,
            label: 'Habilidades',
            description: 'Technical skills e tecnologias'
        },
        {
            path: '/contact',
            icon: Mail,
            label: 'Contato',
            description: 'Entre em contato para oportunidades'
        }
    ];

    const socialLinks = [
        { icon: Github, url: 'https://github.com/johndev', label: 'GitHub' },
        { icon: Linkedin, url: 'https://linkedin.com/in/johndev', label: 'LinkedIn' },
        { icon: Mail, url: 'mailto:john@example.com', label: 'Email' }
    ];

    return (
        <aside className="hidden lg:flex flex-col w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-brand rounded-full flex items-center justify-center text-white font-bold text-lg">
                        JV
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">JohnVictor</h2>
                        <p className="text-sm text-muted">Full Stack Developer</p>
                    </div>
                </div>
                {user && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
                        <p className="text-xs text-muted mb-1">Conectado como</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                    </div>
                )}
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {portfolioNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-gradient-brand text-white shadow-lg'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <div className="flex-1">
                                <div className="font-medium">{item.label}</div>
                                <div className={`text-xs ${isActive ? 'text-white/70' : 'text-muted'}`}
                                    style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                >
                                    {item.description}
                                </div>
                            </div>
                            {isActive && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Redes Profissionais</h3>
                <div className="flex gap-2">
                    {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                            <a
                                key={social.label}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-primary transition-all"
                                title={social.label}
                            >
                                <Icon className="w-5 h-5" />
                            </a>
                        );
                    })}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Disponível para novos desafios</h3>
                    <p className="text-xs text-muted mb-3">
                        Open to opportunities, freelance projects, and full-time positions
                    </p>
                    <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                            React
                        </span>
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                            TypeScript
                        </span>
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                            Spring Boot
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default PortfolioNavigation;
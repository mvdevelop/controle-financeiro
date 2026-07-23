import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Users, Award, TrendingUp, Banknote, PieChart } from 'lucide-react';

const PortfolioProjects: React.FC = () => {
    const projects = [
        {
            id: 1,
            title: 'Controle Financeiro Familiar',
            subtitle: 'Aplicação completa de controle financeiro familiar',
            description: 'Sistema web full-stack para gerenciamento financeiro familiar, desenvolvido como projeto de extensão universitária. Demonstra experiência completa em desenvolvimento de aplicações React, Spring Boot e integração de banco de dados.',
            technologies: ['React 19', 'TypeScript 6', 'Spring Boot 3.2.4', 'PostgreSQL', 'Docker', 'Vercel', 'Render'],
            image: 'https://picsum.photos/seed/project1/600/400',
            role: 'Lead Developer & Architect',
            duration: '2024 - Presente',
            achievements: [
                'Desenvolvimento completo de CRUD com React + TypeScript',
                'Integração backend com Spring Boot e JPA/Hibernate',
                'Implementação de gráficos avançados com Recharts',
                'Configuração completa de CI/CD com Vercel/Render',
                'Implementação de tema claro/escuro e acessibilidade',
                'Desenvolvimento de pipeline de CI/CD para deploy automático'
            ],
            metrics: [
                { icon: Users, value: '5 famílias', label: 'usuários ativos' },
                { icon: Award, value: '7 categorias', label: 'de despesas' },
                { icon: TrendingUp, value: '90%', label: 'testes de unidade' },
                { icon: Banknote, value: 'R$ 50K+', label: 'valor transacionado' },
            ]
        },
        {
            id: 2,
            title: 'Pipeline CI/CD Multi-Plataforma',
            subtitle: 'Sistema de integração e deploy contínuo',
            description: 'Implementação de pipeline CI/CD completo com Docker, Vercel (frontend) e Render (backend). Demonstra experiência em DevOps, deploy automatizado e infraestrutura como código.',
            technologies: ['Docker', 'GitHub Actions', 'Vercel', 'Render', 'Docker Compose'],
            image: 'https://picsum.photos/seed/project2/600/400',
            role: 'DevOps Engineer',
            duration: '2024 - Presente',
            achievements: [
                'Configuração de containers Docker com multi-stage build',
                'Implementação de workflows GitHub Actions para CI/CD',
                'Setup de monitoring e logs com Spring Boot Actuator',
                'Configuração de variáveis de ambiente seguras',
                'Estrutura de pipelines para teste, build e deploy',
                'Implementação de estratégias de cache e otimização de build'
            ],
            metrics: [
                { icon: Award, value: '99.9%', label: 'tempo de atividade' },
                { icon: Users, value: '2 serviços', label: 'containerizados' },
                { icon: Calendar, value: '24/7', label: 'deploy automático' },
                { icon: TrendingUp, value: '< 2min', label: 'build time' },
            ]
        },
        {
            id: 3,
            title: 'Sistema de Relatórios Financeiros',
            subtitle: 'Análise e visualização de dados financeiros',
            description: 'Módulo avançado de relatórios com gráficos de pizza e barras, filtros por período, família e categoria, além de exportação CSV. Demonstra habilidades em análise de dados e visualização com Recharts.',
            technologies: ['Recharts', 'React', 'TypeScript', 'Spring Boot', 'PostgreSQL'],
            image: 'https://picsum.photos/seed/project3/600/400',
            role: 'Frontend Developer',
            duration: '2024',
            achievements: [
                'Implementação de gráficos responsivos e interativos',
                'Desenvolvimento de sistema avançado de filtros',
                'Criação de relatórios dinâmicos com dados em tempo real',
                'Implementação de componentes de tooltip e legenda',
                'Otimização de performance para grandes conjuntos de dados',
                'Design de componentes UI acessíveis e responsivos'
            ],
            metrics: [
                { icon: PieChart, value: '10+', label: 'gráficos diferentes' },
                { icon: Users, value: '5 períodos', label: 'de análise' },
                { icon: Award, value: '100%', label: 'taxa de sucesso' },
                { icon: TrendingUp, value: '40%', label: 'reducer performance' },
            ]
        }
    ];

    return (
        <section id="projects" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mb-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">Projetos em Destaque</h2>
                <p className="text-muted mb-8">
                    Uma seleção de projetos que demonstram minhas habilidades em desenvolvimento full-stack,
                    resolução de problemas e entrega de soluções completas de início a fim.
                </p>

                <div className="space-y-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                        >
                            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200 dark:border-gray-600 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>                                <div className="p-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                                            <p className="text-primary dark:text-blue-400 font-medium mb-4">{project.subtitle}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                                <Github className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-muted mb-6 leading-relaxed">{project.description}</p>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">TECNOLOGIAS</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, techIndex) => (
                                                <span
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-gradient-brand/10 text-primary dark:text-blue-400 rounded-full text-sm font-medium border border-primary/20"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <div className="text-sm text-muted mb-1">Papel</div>
                                            <div className="font-semibold text-gray-900 dark:text-white">{project.role}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted mb-1">Duração</div>
                                            <div className="font-semibold text-gray-900 dark:text-white">{project.duration}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} space-y-6`}>                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    {project.metrics.map((metric, metricIndex) => {
                                        const Icon = metric.icon;
                                        return (
                                            <div
                                                key={metricIndex}
                                                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon className="w-8 h-8 text-emerald-600" />
                                                    <div>
                                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</div>
                                                        <div className="text-sm text-muted">{metric.label}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default PortfolioProjects;
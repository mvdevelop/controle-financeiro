import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, TrendingUp, Award, Users, Clock, ArrowRight, Download, Mail } from 'lucide-react';

const PortfolioDesignSystem: React.FC = () => {
    const metrics = [
        { icon: TrendingUp, value: '50+', label: 'Linha de código', color: 'text-blue-600' },
        { icon: Users, value: '5', label: 'famílias ativas', color: 'text-emerald-600' },
        { icon: Award, value: '100%', label: 'testes unitários', color: 'text-purple-600' },
        { icon: Clock, value: '2s', label: 'tempo de carregamento', color: 'text-orange-600' },
    ];

    const techStack = [
        { name: 'React 19', category: 'Frontend', level: 90 },
        { name: 'TypeScript 6', category: 'Frontend', level: 85 },
        { name: 'Spring Boot 3.2.4', category: 'Backend', level: 75 },
        { name: 'PostgreSQL', category: 'Banco de dados', level: 80 },
        { name: 'Docker', category: 'DevOps', level: 70 },
        { name: 'Vercel/Render', category: 'Deploy', level: 75 },
    ];

    const achievements = [
        {
            icon: Award,
            title: 'Arquitetura Limpa',
            description: 'Design patterns profissionais e separation de concerns',
            metric: '90% '
        },
        {
            icon: TrendingUp,
            title: 'Performance Otimizada',
            description: 'Build times e carregamento rápido com código splitting',
            metric: '< 2s'
        },
        {
            icon: Users,
            title: 'Acessibilidade Completa',
            description: 'Tema claro/escuro com suporte a alto contraste e fonte grande',
            metric: '100% '
        },
        {
            icon: Star,
            title: 'Testes Robustos',
            description: 'Testes unitários abrangentes e integração end-to-end',
            metric: '95% '
        }
    ];

    return (
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mb-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">Design System & Qualidade</h2>
                <p className="text-muted mb-12">
                    Demonstrando expertise em arquitetura de software, performance e testes de qualidade,
                    com foco em soluções escaláveis e mantenáveis a longo prazo.
                </p>

                {/* Main Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {metrics.map((metric, index) => {
                        const Icon = metric.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 mb-4 ${metric.color}`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                    {metric.value}
                                </div>
                                <div className="text-sm text-muted">{metric.label}</div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Tech Stack */}
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold text-primary dark:text-white mb-8">Tech Stack Avançado</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {techStack.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{tech.name}</h4>
                                        <p className="text-sm text-muted">{tech.category}</p>
                                    </div>
                                    <div className="text-2xl font-bold text-primary dark:text-blue-400">
                                        {tech.level}%
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${tech.level}%` }}
                                        transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                                        viewport={{ once: true }}
                                        className="h-2 bg-gradient-brand rounded-full transition-all duration-300"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Achievement Grid */}
                <div>
                    <h3 className="text-2xl font-semibold text-primary dark:text-white mb-8">Qualidade e Conquistas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {achievements.map((achievement, index) => {
                            const Icon = achievement.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4">
                                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-gradient-brand/10 rounded-xl flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{achievement.title}</h4>
                                            <div className={`text-2xl font-bold ${achievement.icon === Award ? 'text-blue-600' : achievement.icon === TrendingUp ? 'text-emerald-600' : achievement.icon === Users ? 'text-purple-600' : 'text-orange-600'}`}>
                                                {achievement.metric}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-muted leading-relaxed">{achievement.description}</p>

                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                                        <div className="flex items-center gap-2 text-sm text-primary dark:text-blue-400 group-hover:gap-3 transition-all">
                                            <span>Ver detalhes</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 20 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-gradient-start to-gradient-end rounded-2xl p-12 text-center text-white"
                >
                    <h3 className="text-3xl font-bold mb-4">Interessado em trabalhar comigo?</h3>
                    <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                        Estou disponível para desafios técnicos e projetos inovadores.
                        Vamos discutir como minhas habilidades full-stack podem ajudar a transformar suas ideias em realidade.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-smooth shadow-lg">
                            <Mail className="w-5 h-5" />
                            Enviar Mensagem
                        </button>
                        <button className="flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-smooth backdrop-blur-sm">
                            <Download className="w-5 h-5" />
                            Download CV Completo
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default PortfolioDesignSystem;
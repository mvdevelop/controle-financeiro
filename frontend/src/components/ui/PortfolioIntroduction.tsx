import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, Code2, MapPin, Mail, Download, CheckCircle, Calendar } from 'lucide-react';

const PortfolioIntroduction: React.FC = () => {
    const highlights = [
        { icon: Code2, label: 'Full Stack Developer', color: 'text-blue-600' },
        { icon: Award, label: 'Problem Solver', color: 'text-emerald-600' },
        { icon: Briefcase, label: 'Self-Motivated', color: 'text-purple-600' },
        { icon: MapPin, label: 'São Paulo, Brazil', color: 'text-orange-600' },
    ];

    return (
        <section id="about" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mb-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold text-primary dark:text-white mb-6">Sobre Mim</h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <p className="text-muted text-lg leading-relaxed mb-6">
                            Junior Full Stack Developer com experiência prática em React, TypeScript, Spring Boot e PostgreSQL.
                            Transformei um projeto pessoal de controle financeiro em uma aplicação web full-stack completa,
                            demonstrando habilidades técnicas e capacidade de entregar soluções do início ao fim.
                        </p>

                        <p className="text-muted text-lg leading-relaxed mb-6">
                            Com forte interesse em tecnologias cloud e DevOps, busco oportunidades onde possa contribuir
                            com código limpo, soluções escaláveis e成長 contínua. Minha abordagem combina excelência técnica
                            com foco em entregar valor para os usuários.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                <Award className="w-5 h-5 text-emerald-600" />
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">Educação</div>
                                    <div className="text-sm text-muted">Ciências da Computação - Agosto 2024</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                <Calendar className="w-5 h-5 text-purple-600" />
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">Experiência</div>
                                    <div className="text-sm text-muted">6+ meses de projetos práticos</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary dark:text-white mb-4">Destaques</h3>

                        {highlights.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all"
                                >
                                    <Icon className={`w-5 h-5 ${item.color}`} />
                                    <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
                                </motion.div>
                            );
                        })}

                        <div className="mt-8 p-6 bg-gradient-brand/10 dark:bg-gradient-brand/5 rounded-xl border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-primary dark:text-white mb-3">Contate-me</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted">
                                    <Mail className="w-4 h-4" />
                                    <span>seu.email@exemplo.com</span>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 bg-gradient-brand text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-smooth text-sm">
                                        <Mail className="w-4 h-4" />
                                        Enviar Mensagem
                                    </button>
                                    <button className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-smooth text-sm">
                                        <Download className="w-4 h-4" />
                                        Download CV
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default PortfolioIntroduction;
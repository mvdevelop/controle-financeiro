import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Cloud, Terminal, GitBranch, Shield, HardDrive, Wrench } from 'lucide-react';

const PortfolioSkills: React.FC = () => {
    const skillCategories = [
        {
            title: 'Frontend Development',
            icon: Code2,
            color: 'from-blue-500 to-cyan-500',
            skills: [
                { name: 'React 19', level: 85 },
                { name: 'TypeScript 6', level: 90 },
                { name: 'Vite 8', level: 75 },
                { name: 'Tailwind CSS 4', level: 85 },
                { name: 'Redux Toolkit', level: 70 },
                { name: 'React Router', level: 80 },
            ]
        },
        {
            title: 'Backend Development',
            icon: Database,
            color: 'from-emerald-500 to-teal-500',
            skills: [
                { name: 'Java 17', level: 70 },
                { name: 'Spring Boot 3.2.4', level: 75 },
                { name: 'Spring Data JPA', level: 80 },
                { name: 'PostgreSQL', level: 75 },
                { name: 'Flyway', level: 65 },
                { name: 'Spring Security', level: 70 },
            ]
        },
        {
            title: 'DevOps & Tools',
            icon: Cloud,
            color: 'from-purple-500 to-pink-500',
            skills: [
                { name: 'Docker', level: 60 },
                { name: 'Git / GitHub', level: 85 },
                { name: 'Docker Compose', level: 65 },
                { name: 'CI/CD (Vercel/Render)', level: 70 },
                { name: 'Maven', level: 80 },
                { name: ' Postman', level: 75 },
            ]
        },
        {
            title: 'Design & Architecture',
            icon: Shield,
            color: 'from-orange-500 to-red-500',
            skills: [
                { name: 'Clean Architecture', level: 85 },
                { name: 'RESTful APIs', level: 90 },
                { name: 'Component Design', level: 80 },
                { name: 'UI/UX Design', level: 70 },
                { name: 'Testing', level: 75 },
                { name: 'Documentation', level: 85 },
            ]
        },
    ];

    const tools = [
        { name: 'IntelliJ IDEA', icon: Terminal },
        { name: 'VS Code', icon: Code2 },
        { name: 'Postman', icon: Database },
        { name: 'PostgreSQL Client', icon: HardDrive },
        { name: 'GitHub Actions', icon: GitBranch },
        { name: 'Docker Desktop', icon: Cloud },
        { name: 'Vercel CLI', icon: Terminal },
        { name: 'Render Dashboard', icon: Shield },
    ];

    return (
        <section id="skills" className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8 mb-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">Technical Skills</h2>
                <p className="text-muted mb-8">
                    Comprehensive skill set covering the entire development stack, with continuous learning
                    and hands-on experience in modern web development practices.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {skillCategories.map((category, categoryIndex) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={categoryIndex}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-primary dark:text-white">{category.title}</h3>
                                </div>

                                <div className="space-y-4">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex}>
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
                                                <span className="text-sm text-muted">{skill.level}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + skillIndex * 0.05 }}
                                                    viewport={{ once: true }}
                                                    className={`h-2 bg-gradient-to-r ${category.color} rounded-full transition-all duration-300`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-12">
                    <h3 className="text-2xl font-semibold text-primary dark:text-white mb-6">Development Tools</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {tools.map((tool, index) => {
                            const Icon = tool.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                                >
                                    <Icon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                                    <span className="text-sm text-muted text-center">{tool.name}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default PortfolioSkills;
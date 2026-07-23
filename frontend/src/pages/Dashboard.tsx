
import React from 'react';
import Layout from '../components/layout/Layout';
import { useAppSelector } from '../store/hooks';
import { Award, Briefcase, Code2, Download, Mail, MapPin, Target, User } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);

    const skills = [
        { name: 'React & TypeScript', level: 'Advanced' },
        { name: 'Spring Boot & Java', level: 'Intermediate' },
        { name: 'PostgreSQL & SQL', level: 'Intermediate' },
        { name: 'Docker & DevOps', level: 'Learning' },
        { name: 'Tailwind CSS', level: 'Advanced' },
        { name: 'Redux Toolkit', level: 'Intermediate' },
    ];

    const projects = [
        {
            name: 'Controle Financeiro Familiar',
            description: 'Full-stack financial management application',
            technologies: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL'],
            role: 'Lead Developer & Architect',
            duration: '2024 - Present',
            achievements: [
                'Built complete CRUD functionality with real-time data',
                'Implemented advanced filtering and reporting features',
                'Developed responsive UI with dark/light themes',
                'Set up CI/CD deployment pipeline'
            ]
        }
    ];

    return (
        <Layout>
            <div className="space-y-8">
                {/* Portfolio Header */}
                <section className="text-center space-y-4">
                    <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-2xl">
                            {user?.name?.charAt(0) || 'JV'}
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-primary dark:text-white">JohnVictor</h1>
                    <p className="text-xl text-muted max-w-2xl mx-auto">
                        Junior Developer | Transforming complex financial challenges into elegant full-stack solutions
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>Brasília, DF</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            <span>john@example.com</span>
                        </div>
                    </div>
                </section>

                {/* About Me */}
                <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">About Me</h2>
                    <p className="text-muted space-y-4">
                        Passionate Full Stack Developer transitioning into professional software development.
                        I specialize in building robust, user-friendly applications that solve real-world problems.
                        <br /><br />
                        My approach combines technical excellence with a focus on delivering value to end users.
                        I'm currently developing comprehensive financial management solutions while continuously
                        expanding my expertise in cloud technologies and DevOps practices.
                    </p>
                </section>

                {/* Skills Section */}
                <section>
                    <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Technical Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {skills.map((skill, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                                    <span className="text-sm text-muted">{skill.level}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-brand h-2 rounded-full transition-all duration-300"
                                        style={{ width: skill.level === 'Advanced' ? '85%' : '60%' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section>
                    <h2 className="text-2xl font-bold text-primary dark:text-white mb-6">Featured Projects</h2>
                    <div className="space-y-6">
                        {projects.map((project, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{project.name}</h3>
                                        <p className="text-muted mb-2">{project.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-muted">
                                            <div className="flex items-center gap-1">
                                                <Briefcase className="w-4 h-4" />
                                                <span>{project.role}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Code2 className="w-4 h-4" />
                                                <span>{project.technologies.join(', ')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-muted">{project.duration}</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        <Target className="w-4 h-4" />
                                        Key Achievements
                                    </h4>
                                    <ul className="space-y-1 ml-6">
                                        {project.achievements.map((achievement, achIndex) => (
                                            <li key={achIndex} className="text-sm text-muted flex items-start gap-2">
                                                <span className="text-emerald-500 mt-1">•</span>
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-gradient-brand/10 dark:bg-gradient-brand/5 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">Interested in Working Together?</h2>
                    <p className="text-muted mb-6 max-w-2xl mx-auto">
                        I'm currently available for challenging projects and looking to contribute to innovative teams.
                        Let's discuss how my full-stack expertise can help bring your ideas to life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="flex items-center justify-center gap-2 bg-gradient-brand text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-smooth">
                            <Mail className="w-5 h-5" />
                            Get In Touch
                        </button>
                        <button className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-smooth">
                            <Download className="w-5 h-5" />
                            Download Resume
                        </button>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Dashboard;

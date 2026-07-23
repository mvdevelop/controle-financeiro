import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setTheme } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { Award, Briefcase, Code2, Download, Mail, MapPin, Target, User, LogOut, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface PortfolioLayoutProps {
    children: React.ReactNode;
}

const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.ui);
    const { user } = useAppSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
            {/* Professional Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between h-16 px-4 lg:px-6 max-w-7xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-brand rounded-full flex items-center justify-center text-white font-bold text-lg">
                            JV
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 dark:text-white">JohnVictor</h1>
                            <p className="text-xs text-muted">Full Stack Developer</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#about" className="text-sm text-muted hover:text-primary transition-colors">About</a>
                        <a href="#skills" className="text-sm text-muted hover:text-primary transition-colors">Skills</a>
                        <a href="#projects" className="text-sm text-muted hover:text-primary transition-colors">Projects</a>
                        <a href="#contact" className="text-sm text-muted hover:text-primary transition-colors">Contact</a>
                    </nav>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-8 px-4 lg:px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

export default PortfolioLayout;
import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAppSelector } from '../../store/hooks';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { sidebarOpen } = useAppSelector(state => state.ui);

    return (
        <div className="min-h-screen bg-background dark:bg-background-dark">
            <Sidebar />
            <Header />

            <main
                className={`pt-16 transition-all duration-300 ease-in-out min-h-screen
                    ${sidebarOpen ? 'ml-64' : 'ml-[72px]'}`}
            >
                <div className="p-4 lg:p-6 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default Layout;

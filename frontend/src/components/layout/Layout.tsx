import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAppSelector } from '../../store/hooks';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { sidebarOpen } = useAppSelector(state => state.ui);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex pt-16">
                <Sidebar />
                <main className={`flex-1 transition-all duration-300 p-6 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;

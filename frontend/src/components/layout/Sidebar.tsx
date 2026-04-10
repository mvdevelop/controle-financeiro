
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

const Sidebar: React.FC = () => {
    const { sidebarOpen } = useAppSelector(state => state.ui);

    return (
        <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 z-40 overflow-y-auto ${sidebarOpen ? 'w-64' : 'w-20'}`}>
            <nav className="p-4">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-smooth ${
                            isActive
                                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`
                    }
                >
                    <span className="text-xl">📊</span>
                    {sidebarOpen && <span>Dashboard</span>}
                </NavLink>
                
                <NavLink
                    to="/relatorios"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-smooth ${
                            isActive
                                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`
                    }
                >
                    <span className="text-xl">📈</span>
                    {sidebarOpen && <span>Relatórios</span>}
                </NavLink>
                
                <NavLink
                    to="/configuracoes"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-smooth ${
                            isActive
                                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`
                    }
                >
                    <span className="text-xl">⚙️</span>
                    {sidebarOpen && <span>Configurações</span>}
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;

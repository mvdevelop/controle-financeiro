import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    PiggyBank,
    Target,
    RefreshCw,
    Settings,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSidebar } from '../../store/slices/uiSlice';

const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/relatorios', icon: FileText, label: 'Relatórios' },
    { path: '/orcamentos', icon: PiggyBank, label: 'Orçamentos' },
    { path: '/metas', icon: Target, label: 'Metas' },
    { path: '/recorrencias', icon: RefreshCw, label: 'Recorrências' },
    { path: '/configuracoes', icon: Settings, label: 'Configurações' },
];

const Sidebar: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sidebarOpen } = useAppSelector(state => state.ui);
    const location = useLocation();

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-surface dark:bg-surface-dark border-r border-border dark:border-border-dark shadow-lg z-40
                transition-all duration-300 ease-in-out flex flex-col
                ${sidebarOpen ? 'w-64' : 'w-[72px]'}`}
        >
            {/* Logo area */}
            <div className="flex items-center justify-center h-16 border-b border-border dark:border-border-dark">
                <span className="text-2xl">💰</span>
                {sidebarOpen && (
                    <span className="ml-3 font-bold text-primary dark:text-white text-lg tracking-tight">
                        Financeiro
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-smooth group relative
                                ${isActive
                                    ? 'bg-gradient-brand text-white shadow-md'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-white'
                                }`}
                            title={!sidebarOpen ? item.label : undefined}
                        >
                            <Icon className={`w-5 h-5 min-w-[20px] ${isActive ? 'text-white' : ''}`} />
                            {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}

                            {/* Tooltip when collapsed */}
                            {!sidebarOpen && (
                                <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-lg z-50">
                                    {item.label}
                                </div>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Collapse toggle */}
            <div className="p-3 border-t border-border dark:border-border-dark">
                <button
                    onClick={() => dispatch(toggleSidebar())}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth"
                    title={sidebarOpen ? 'Recolher' : 'Expandir'}
                >
                    {sidebarOpen ? (
                        <>
                            <ChevronLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">Recolher</span>
                        </>
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

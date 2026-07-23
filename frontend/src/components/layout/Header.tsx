import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, LogOut, Briefcase, User, FileText, BarChart3 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSidebar, setTheme } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { sidebarOpen, theme } = useAppSelector(state => state.ui);
    const { user } = useAppSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/sign-in');
    };

    const portfolioNavItems = [
        { path: '/dashboard', icon: BarChart3, label: 'Portfolio' },
        { path: '/about', icon: User, label: 'About' },
        { path: '/projects', icon: FileText, label: 'Projects' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between h-16 px-4 lg:px-6 max-w-7xl mx-auto">
                <button onClick={() => dispatch(toggleSidebar())}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-gray-600 dark:text-gray-400">
                    <Menu className={`w-5 h-5 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-90'}`} />
                </button>

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center text-white font-bold text-sm">
                        JV
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-base font-bold text-gray-900 dark:text-white">JohnVictor</h1>
                        <p className="text-xs text-muted">Full Stack Developer</p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    {portfolioNavItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth"
                            >
                                <Icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-gray-600 dark:text-gray-400"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <span className="text-sm text-muted hidden md:inline font-medium ml-1">
                        {user?.name || 'Desenvolvedor'}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth text-gray-600 dark:text-gray-400 ml-1"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

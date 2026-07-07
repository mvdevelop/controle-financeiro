import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, LogOut } from 'lucide-react';
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

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-brand shadow-md">
            <div className="flex items-center justify-between h-full px-4 lg:px-6">
                <button onClick={() => dispatch(toggleSidebar())}
                    className="p-2 rounded-xl hover:bg-white/20 transition-smooth text-white">
                    <Menu className={`w-5 h-5 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-90'}`} />
                </button>

                <div className="flex items-center gap-3">
                    <span className="text-xl">💰</span>
                    <div className="hidden sm:block">
                        <h1 className="text-base font-bold text-white">Controle Financeiro Familiar</h1>
                        <p className="text-xs text-white/70">Projeto de Extensão - Teresópolis</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
                        className="p-2 rounded-xl hover:bg-white/20 transition-smooth text-white">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <span className="text-sm text-white/80 hidden md:inline font-medium ml-1">{user?.name || 'Usuário'}</span>
                    <button onClick={handleLogout}
                        className="p-2 rounded-xl hover:bg-white/20 transition-smooth text-white ml-1">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

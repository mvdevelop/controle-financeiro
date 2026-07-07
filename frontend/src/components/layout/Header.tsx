import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Sun, Moon, LogOut } from 'lucide-react';
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
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="bg-gradient-brand/95 backdrop-blur-md shadow-lg border-b border-white/10">
                <div className="flex justify-between items-center px-4 lg:px-6 py-3">
                    <button
                        className="p-2 rounded-xl hover:bg-white/20 transition-smooth text-white"
                        onClick={() => dispatch(toggleSidebar())}
                        title="Alternar sidebar"
                    >
                        <Menu className={`w-5 h-5 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-90'}`} />
                    </button>

                    <div className="text-center flex items-center gap-3">
                        <span className="text-2xl">💰</span>
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold text-white tracking-tight">Controle Financeiro Familiar</h1>
                            <p className="text-xs text-white/70">Projeto de Extensão - Teresópolis</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
                            className="p-2 rounded-xl hover:bg-white/20 transition-smooth text-white/80 hover:text-white"
                            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <button
                            className="p-2 rounded-xl hover:bg-white/20 transition-smooth text-white/80 hover:text-white relative"
                            title="Notificações"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
                        </button>

                        <span className="text-sm text-white/80 hidden md:inline ml-2 font-medium">{user?.name || 'Usuário'}</span>

                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-xl hover:bg-white/20 transition-smooth text-white/80 hover:text-white ml-1"
                            title="Sair"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

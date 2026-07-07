import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

const Header: React.FC = () => {
    const { sidebarOpen } = useAppSelector(state => state.ui);
    const { userName } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    return (
        <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white shadow-lg z-50">
            <div className="flex justify-between items-center px-6 py-4">
                <button
                    className="hover:bg-white/20 p-2 rounded-lg transition-smooth"
                    onClick={() => dispatch(toggleSidebar())}
                >
                    <span className="text-2xl">☰</span>
                </button>

                <div className="text-center">
                    <h1 className="text-xl font-bold">💰 Controle Financeiro Familiar</h1>
                    <p className="text-sm opacity-90">Projeto de Extensão - Teresópolis</p>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm hidden md:inline">{userName || 'Usuário'}</span>
                    <button
                        onClick={() => dispatch(logout())}
                        className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-smooth"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

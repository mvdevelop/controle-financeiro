import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setUser } from './store/slices/authSlice';
import { fetchDespesas, fetchResumo } from './store/slices/despesaSlice';
import Dashboard from './pages/Dashboard';
import Relatorios from './pages/Relatorios';
import Orcamentos from './pages/Orcamentos';
import Metas from './pages/Metas';
import Recorrencias from './pages/Recorrencias';
import Configuracoes from './pages/Configuracoes';
import { setTheme } from './store/slices/uiSlice';

function App() {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.ui);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        // Usuário padrão (modo single-user sem autenticação)
        dispatch(setUser({
            id: '1',
            email: 'usuario@financeiro.com',
            name: 'Usuário',
        }));
        dispatch(fetchDespesas());
        dispatch(fetchResumo());
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/orcamentos" element={<Orcamentos />} />
                <Route path="/metas" element={<Metas />} />
                <Route path="/recorrencias" element={<Recorrencias />} />
                <Route path="/configuracoes" element={<Configuracoes />} />
                {/* <Route path="/recorrencias" element={<Recorrencias />} /> */}
            </Routes>
        </Router>
    );
}

export default App;

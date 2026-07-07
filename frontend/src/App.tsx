import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { initialize } from './store/slices/authSlice';
import { fetchDespesas, fetchResumo } from './store/slices/despesaSlice';
import PrivateRoute from './components/common/PrivateRoute';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './pages/Dashboard';
import Relatorios from './pages/Relatorios';
import Orcamentos from './pages/Orcamentos';
import Metas from './pages/Metas';
import Recorrencias from './pages/Recorrencias';
import Configuracoes from './pages/Configuracoes';

function App() {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.ui);
    const { isAuthenticated } = useAppSelector(state => state.auth);

    // Initialize auth from localStorage on mount
    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    // Sync theme to <html> element
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Load data when user authenticates
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchDespesas());
            dispatch(fetchResumo());
        }
    }, [isAuthenticated, dispatch]);

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />

                {/* Protected routes */}
                <Route path="/dashboard" element={
                    <PrivateRoute><Dashboard /></PrivateRoute>
                } />
                <Route path="/relatorios" element={
                    <PrivateRoute><Relatorios /></PrivateRoute>
                } />
                <Route path="/orcamentos" element={
                    <PrivateRoute><Orcamentos /></PrivateRoute>
                } />
                <Route path="/metas" element={
                    <PrivateRoute><Metas /></PrivateRoute>
                } />
                <Route path="/recorrencias" element={
                    <PrivateRoute><Recorrencias /></PrivateRoute>
                } />
                <Route path="/configuracoes" element={
                    <PrivateRoute><Configuracoes /></PrivateRoute>
                } />

                {/* Root redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </Router>
    );
}

export default App;

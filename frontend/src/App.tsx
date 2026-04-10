
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setUser, logout } from './store/slices/authSlice';
import { fetchDespesas, fetchResumo } from './store/slices/despesaSlice';
import PrivateRoute from './components/common/PrivateRoute';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './pages/Dashboard';
import Relatorios from './pages/Relatorios';
import Configuracoes from './pages/Configuracoes';
import MenuAcessibilidade from './components/common/MenuAcessibilidade';
import { setTheme } from './store/slices/uiSlice';

function App() {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.ui);

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [theme]);

    useEffect(() => {
        if (isSignedIn && user) {
            dispatch(setUser({
                id: user.id,
                email: user.primaryEmailAddress?.emailAddress || '',
                name: user.fullName || user.username || 'Usuário',
                image: user.imageUrl,
            }));
            dispatch(fetchDespesas());
            dispatch(fetchResumo());
        } else if (isLoaded && !isSignedIn) {
            dispatch(logout());
        }
    }, [isSignedIn, user, dispatch, isLoaded]);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando...</p>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <MenuAcessibilidade />
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/relatorios"
                    element={
                        <PrivateRoute>
                            <Relatorios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/configuracoes"
                    element={
                        <PrivateRoute>
                            <Configuracoes />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

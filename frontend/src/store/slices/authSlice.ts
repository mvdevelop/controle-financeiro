import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    initialized: boolean;
}

function loadAuth(): AuthState {
    try {
        const stored = localStorage.getItem('auth_user');
        if (stored) {
            const user = JSON.parse(stored) as User;
            return { isAuthenticated: true, user, initialized: true };
        }
    } catch {}
    return { isAuthenticated: false, user: null, initialized: true };
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    initialized: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initialize: (state) => {
            const { isAuthenticated, user } = loadAuth();
            state.isAuthenticated = isAuthenticated;
            state.user = user;
            state.initialized = true;
        },
        login: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.initialized = true;
            localStorage.setItem('auth_user', JSON.stringify(action.payload));
        },
        signUp: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.initialized = true;
            localStorage.setItem('auth_user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('auth_user');
        },
    },
});

export const { initialize, login, signUp, logout } = authSlice.actions;
export default authSlice.reducer;

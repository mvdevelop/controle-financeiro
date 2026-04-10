
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    isAuthenticated: boolean;
    userId: string | null;
    userEmail: string | null;
    userName: string | null;
    userImage: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    userId: null,
    userEmail: null,
    userName: null,
    userImage: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{
            id: string;
            email: string;
            name: string;
            image?: string;
        }>) => {
            state.isAuthenticated = true;
            state.userId = action.payload.id;
            state.userEmail = action.payload.email;
            state.userName = action.payload.name;
            state.userImage = action.payload.image || null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userId = null;
            state.userEmail = null;
            state.userName = null;
            state.userImage = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;


import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    sidebarOpen: boolean;
    theme: 'light' | 'dark';
    loading: boolean;
    modalOpen: boolean;
    modalContent: React.ReactNode | null;
}

const initialState: UiState = {
    sidebarOpen: true,
    theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
    loading: false,
    modalOpen: false,
    modalContent: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
            if (action.payload === 'dark') {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        openModal: (state, action: PayloadAction<React.ReactNode>) => {
            state.modalOpen = true;
            state.modalContent = action.payload;
        },
        closeModal: (state) => {
            state.modalOpen = false;
            state.modalContent = null;
        },
    },
});

export const { toggleSidebar, setTheme, setLoading, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;

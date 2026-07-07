
import { configureStore } from '@reduxjs/toolkit';
import despesaReducer from './slices/despesaSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import orcamentoReducer from './slices/orcamentoSlice';
import metaReducer from './slices/metaSlice';
import recorrenciaReducer from './slices/recorrenciaSlice';

export const store = configureStore({
    reducer: {
        despesas: despesaReducer,
        auth: authReducer,
        ui: uiReducer,
        orcamentos: orcamentoReducer,
        metas: metaReducer,
        recorrencias: recorrenciaReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

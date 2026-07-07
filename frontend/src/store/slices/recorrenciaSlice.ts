import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { recorrenciaService } from '../../services/recorrenciaService';
import { Recorrencia } from '../../types/Recorrencia';

interface RecorrenciaState {
    recorrencias: Recorrencia[];
    proximas: Recorrencia[];
    loading: boolean;
    error: string | null;
}

const initialState: RecorrenciaState = {
    recorrencias: [],
    proximas: [],
    loading: false,
    error: null,
};

export const fetchRecorrencias = createAsyncThunk('recorrencias/fetchAll', async () => {
    return await recorrenciaService.listarTodas();
});

export const fetchProximas = createAsyncThunk('recorrencias/fetchProximas', async (dias?: number) => {
    return await recorrenciaService.listarProximas(dias);
});

export const criarRecorrencia = createAsyncThunk('recorrencias/criar', async (data: Omit<Recorrencia, 'id'>) => {
    return await recorrenciaService.criar(data);
});

export const atualizarRecorrencia = createAsyncThunk(
    'recorrencias/atualizar',
    async ({ id, data }: { id: number; data: Partial<Recorrencia> }) => {
        return await recorrenciaService.atualizar(id, data);
    }
);

export const toggleRecorrencia = createAsyncThunk('recorrencias/toggle', async (id: number) => {
    await recorrenciaService.toggleAtivo(id);
    return id;
});

export const deletarRecorrencia = createAsyncThunk('recorrencias/deletar', async (id: number) => {
    await recorrenciaService.deletar(id);
    return id;
});

const recorrenciaSlice = createSlice({
    name: 'recorrencias',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecorrencias.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(fetchRecorrencias.fulfilled, (s, a) => { s.loading = false; s.recorrencias = a.payload; })
            .addCase(fetchRecorrencias.rejected, (s, a) => { s.loading = false; s.error = a.error.message || 'Erro'; })
            .addCase(fetchProximas.fulfilled, (s, a) => { s.proximas = a.payload; })
            .addCase(criarRecorrencia.fulfilled, (s, a) => { s.recorrencias.push(a.payload); })
            .addCase(atualizarRecorrencia.fulfilled, (s, a) => {
                const i = s.recorrencias.findIndex(r => r.id === a.payload.id);
                if (i !== -1) s.recorrencias[i] = a.payload;
            })
            .addCase(toggleRecorrencia.fulfilled, (s, a) => {
                const r = s.recorrencias.find(r => r.id === a.payload);
                if (r) r.ativo = !r.ativo;
            })
            .addCase(deletarRecorrencia.fulfilled, (s, a) => {
                s.recorrencias = s.recorrencias.filter(r => r.id !== a.payload);
            });
    },
});

export default recorrenciaSlice.reducer;

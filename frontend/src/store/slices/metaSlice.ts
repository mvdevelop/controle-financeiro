import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { metaService } from '../../services/metaService';
import { Meta } from '../../types/Meta';

interface MetaState {
    metas: Meta[];
    loading: boolean;
    error: string | null;
}

const initialState: MetaState = {
    metas: [],
    loading: false,
    error: null,
};

export const fetchMetas = createAsyncThunk('metas/fetchAll', async () => {
    return await metaService.listarTodas();
});

export const criarMeta = createAsyncThunk('metas/criar', async (data: Omit<Meta, 'id'>) => {
    return await metaService.criar(data);
});

export const atualizarMeta = createAsyncThunk(
    'metas/atualizar',
    async ({ id, data }: { id: number; data: Partial<Meta> }) => {
        return await metaService.atualizar(id, data);
    }
);

export const atualizarProgressoMeta = createAsyncThunk(
    'metas/progresso',
    async ({ id, valorAtual }: { id: number; valorAtual: number }) => {
        return await metaService.atualizarProgresso(id, valorAtual);
    }
);

export const deletarMeta = createAsyncThunk('metas/deletar', async (id: number) => {
    await metaService.deletar(id);
    return id;
});

const metaSlice = createSlice({
    name: 'metas',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMetas.pending, (s) => { s.loading = true; s.error = null; })
            .addCase(fetchMetas.fulfilled, (s, a) => { s.loading = false; s.metas = a.payload; })
            .addCase(fetchMetas.rejected, (s, a) => { s.loading = false; s.error = a.error.message || 'Erro'; })
            .addCase(criarMeta.fulfilled, (s, a) => { s.metas.push(a.payload); })
            .addCase(atualizarMeta.fulfilled, (s, a) => {
                const i = s.metas.findIndex(m => m.id === a.payload.id);
                if (i !== -1) s.metas[i] = a.payload;
            })
            .addCase(atualizarProgressoMeta.fulfilled, (s, a) => {
                const i = s.metas.findIndex(m => m.id === a.payload.id);
                if (i !== -1) s.metas[i] = a.payload;
            })
            .addCase(deletarMeta.fulfilled, (s, a) => {
                s.metas = s.metas.filter(m => m.id !== a.payload);
            });
    },
});

export default metaSlice.reducer;

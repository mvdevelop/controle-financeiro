
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { despesaService } from '../../services/despesaService';
import { Despesa, ResumoDTO } from '../../types/Despesa';

interface DespesaState {
    despesas: Despesa[];
    resumo: ResumoDTO | null;
    loading: boolean;
    error: string | null;
    filtroFamilia: string;
    filtroCategoria: string;
    filtroDataInicio: string;
    filtroDataFim: string;
}

const initialState: DespesaState = {
    despesas: [],
    resumo: null,
    loading: false,
    error: null,
    filtroFamilia: '',
    filtroCategoria: '',
    filtroDataInicio: '',
    filtroDataFim: '',
};

// Async Thunks
export const fetchDespesas = createAsyncThunk(
    'despesas/fetchAll',
    async () => {
        return await despesaService.listarTodas();
    }
);

export const fetchResumo = createAsyncThunk(
    'despesas/fetchResumo',
    async () => {
        return await despesaService.getResumoCompleto();
    }
);

export const criarDespesa = createAsyncThunk(
    'despesas/criar',
    async (despesa: Omit<Despesa, 'id'>) => {
        return await despesaService.criar(despesa);
    }
);

export const atualizarDespesa = createAsyncThunk(
    'despesas/atualizar',
    async ({ id, despesa }: { id: string; despesa: Partial<Despesa> }) => {
        return await despesaService.atualizar(id, despesa);
    }
);

export const deletarDespesa = createAsyncThunk(
    'despesas/deletar',
    async (id: string) => {
        await despesaService.deletar(id);
        return id;
    }
);

const despesaSlice = createSlice({
    name: 'despesas',
    initialState,
    reducers: {
        setFiltroFamilia: (state, action: PayloadAction<string>) => {
            state.filtroFamilia = action.payload;
        },
        setFiltroCategoria: (state, action: PayloadAction<string>) => {
            state.filtroCategoria = action.payload;
        },
        setFiltroData: (state, action: PayloadAction<{ inicio: string; fim: string }>) => {
            state.filtroDataInicio = action.payload.inicio;
            state.filtroDataFim = action.payload.fim;
        },
        limparFiltros: (state) => {
            state.filtroFamilia = '';
            state.filtroCategoria = '';
            state.filtroDataInicio = '';
            state.filtroDataFim = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Despesas
            .addCase(fetchDespesas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDespesas.fulfilled, (state, action) => {
                state.loading = false;
                state.despesas = action.payload;
            })
            .addCase(fetchDespesas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Erro ao carregar despesas';
            })
            // Fetch Resumo
            .addCase(fetchResumo.fulfilled, (state, action) => {
                state.resumo = action.payload;
            })
            // Criar Despesa
            .addCase(criarDespesa.fulfilled, (state, action) => {
                state.despesas.push(action.payload);
                state.resumo = null;
            })
            // Atualizar Despesa
            .addCase(atualizarDespesa.fulfilled, (state, action) => {
                const index = state.despesas.findIndex(d => d.id === action.payload.id);
                if (index !== -1) {
                    state.despesas[index] = action.payload;
                }
                state.resumo = null;
            })
            // Deletar Despesa
            .addCase(deletarDespesa.fulfilled, (state, action) => {
                state.despesas = state.despesas.filter(d => d.id !== action.payload);
                state.resumo = null;
            });
    },
});

export const { setFiltroFamilia, setFiltroCategoria, setFiltroData, limparFiltros } = despesaSlice.actions;
export default despesaSlice.reducer;

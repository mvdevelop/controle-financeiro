import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orcamentoService } from '../../services/orcamentoService';
import { Orcamento, OrcamentoProgress } from '../../types/Orcamento';

interface OrcamentoState {
    orcamentos: Orcamento[];
    progresso: OrcamentoProgress[];
    loading: boolean;
    error: string | null;
    mes: number;
    ano: number;
}

const hoje = new Date();
const initialState: OrcamentoState = {
    orcamentos: [],
    progresso: [],
    loading: false,
    error: null,
    mes: hoje.getMonth() + 1,
    ano: hoje.getFullYear(),
};

export const fetchOrcamentos = createAsyncThunk(
    'orcamentos/fetchAll',
    async () => {
        return await orcamentoService.listarTodos();
    }
);

export const fetchProgresso = createAsyncThunk(
    'orcamentos/fetchProgresso',
    async ({ mes, ano }: { mes: number; ano: number }) => {
        return await orcamentoService.getProgresso(mes, ano);
    }
);

export const criarOrcamento = createAsyncThunk(
    'orcamentos/criar',
    async (data: Omit<Orcamento, 'id'>) => {
        return await orcamentoService.criar(data);
    }
);

export const atualizarOrcamento = createAsyncThunk(
    'orcamentos/atualizar',
    async ({ id, data }: { id: number; data: Partial<Orcamento> }) => {
        return await orcamentoService.atualizar(id, data);
    }
);

export const deletarOrcamento = createAsyncThunk(
    'orcamentos/deletar',
    async (id: number) => {
        await orcamentoService.deletar(id);
        return id;
    }
);

const orcamentoSlice = createSlice({
    name: 'orcamentos',
    initialState,
    reducers: {
        setMesAno: (state, action: PayloadAction<{ mes: number; ano: number }>) => {
            state.mes = action.payload.mes;
            state.ano = action.payload.ano;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrcamentos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrcamentos.fulfilled, (state, action) => {
                state.loading = false;
                state.orcamentos = action.payload;
            })
            .addCase(fetchOrcamentos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Erro ao carregar orçamentos';
            })
            .addCase(fetchProgresso.fulfilled, (state, action) => {
                state.progresso = action.payload;
            })
            .addCase(criarOrcamento.fulfilled, (state, action) => {
                state.orcamentos.push(action.payload);
            })
            .addCase(atualizarOrcamento.fulfilled, (state, action) => {
                const index = state.orcamentos.findIndex(o => o.id === action.payload.id);
                if (index !== -1) state.orcamentos[index] = action.payload;
            })
            .addCase(deletarOrcamento.fulfilled, (state, action) => {
                state.orcamentos = state.orcamentos.filter(o => o.id !== action.payload);
            });
    },
});

export const { setMesAno } = orcamentoSlice.actions;
export default orcamentoSlice.reducer;

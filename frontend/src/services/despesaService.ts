import api from './api';
import { Despesa, ResumoDTO, RelatorioDTO } from '../types/Despesa';

export const despesaService = {
    listarTodas: async (): Promise<Despesa[]> => {
        const response = await api.get('/despesas');
        return response.data;
    },

    buscarPorId: async (id: number): Promise<Despesa> => {
        const response = await api.get(`/despesas/${id}`);
        return response.data;
    },

    buscarPorFamilia: async (familia: string): Promise<Despesa[]> => {
        const response = await api.get(`/despesas/familia/${familia}`);
        return response.data;
    },

    buscarPorPeriodo: async (inicio: string, fim: string): Promise<Despesa[]> => {
        const response = await api.get(`/despesas/periodo?inicio=${inicio}&fim=${fim}`);
        return response.data;
    },

    criar: async (despesa: Omit<Despesa, 'id'>): Promise<Despesa> => {
        const response = await api.post('/despesas', despesa);
        return response.data;
    },

    atualizar: async (id: number, despesa: Partial<Despesa>): Promise<Despesa> => {
        const response = await api.put(`/despesas/${id}`, despesa);
        return response.data;
    },

    deletar: async (id: number): Promise<void> => {
        await api.delete(`/despesas/${id}`);
    },

    getTotalPorFamilia: async (): Promise<Record<string, number>> => {
        const response = await api.get('/despesas/resumo/familias');
        return response.data;
    },

    getTotalPorCategoria: async (): Promise<Record<string, number>> => {
        const response = await api.get('/despesas/resumo/categorias');
        return response.data;
    },

    getTotalGeral: async (): Promise<number> => {
        const response = await api.get('/despesas/total/geral');
        return response.data;
    },

    getResumoCompleto: async (): Promise<ResumoDTO> => {
        const [totalGeral, totalPorFamilia, totalPorCategoria, todasDespesas] = await Promise.all([
            despesaService.getTotalGeral(),
            despesaService.getTotalPorFamilia(),
            despesaService.getTotalPorCategoria(),
            despesaService.listarTodas(),
        ]);

        return {
            totalGeral,
            totalDespesas: todasDespesas.length,
            totalPorFamilia,
            totalPorCategoria,
        };
    },

    gerarRelatorio: async (inicio: string, fim: string): Promise<RelatorioDTO> => {
        const response = await api.get(`/relatorios/periodo?inicio=${inicio}&fim=${fim}`);
        return response.data;
    },

    exportarCSV: async (inicio: string, fim: string): Promise<Blob> => {
        const response = await api.get(`/relatorios/export/csv?inicio=${inicio}&fim=${fim}`, {
            responseType: 'blob',
        });
        return response.data;
    },
};

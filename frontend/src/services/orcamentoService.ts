import api from './api';
import { Orcamento, OrcamentoProgress } from '../types/Orcamento';

export const orcamentoService = {
    listarTodos: async (): Promise<Orcamento[]> => {
        const response = await api.get('/orcamentos');
        return response.data;
    },

    buscarPorId: async (id: number): Promise<Orcamento> => {
        const response = await api.get(`/orcamentos/${id}`);
        return response.data;
    },

    buscarPorPeriodo: async (mes: number, ano: number): Promise<Orcamento[]> => {
        const response = await api.get(`/orcamentos/periodo?mes=${mes}&ano=${ano}`);
        return response.data;
    },

    getProgresso: async (mes: number, ano: number): Promise<OrcamentoProgress[]> => {
        const response = await api.get(`/orcamentos/progresso?mes=${mes}&ano=${ano}`);
        return response.data;
    },

    criar: async (data: Omit<Orcamento, 'id'>): Promise<Orcamento> => {
        const response = await api.post('/orcamentos', data);
        return response.data;
    },

    atualizar: async (id: number, data: Partial<Orcamento>): Promise<Orcamento> => {
        const response = await api.put(`/orcamentos/${id}`, data);
        return response.data;
    },

    deletar: async (id: number): Promise<void> => {
        await api.delete(`/orcamentos/${id}`);
    },
};

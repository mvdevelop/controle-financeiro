import api from './api';
import { Meta } from '../types/Meta';

export const metaService = {
    listarTodas: async (): Promise<Meta[]> => {
        const response = await api.get('/metas');
        return response.data;
    },

    buscarPorId: async (id: number): Promise<Meta> => {
        const response = await api.get(`/metas/${id}`);
        return response.data;
    },

    criar: async (data: Omit<Meta, 'id'>): Promise<Meta> => {
        const response = await api.post('/metas', data);
        return response.data;
    },

    atualizar: async (id: number, data: Partial<Meta>): Promise<Meta> => {
        const response = await api.put(`/metas/${id}`, data);
        return response.data;
    },

    atualizarProgresso: async (id: number, valorAtual: number): Promise<Meta> => {
        const response = await api.patch(`/metas/${id}/progresso?valorAtual=${valorAtual}`);
        return response.data;
    },

    deletar: async (id: number): Promise<void> => {
        await api.delete(`/metas/${id}`);
    },
};

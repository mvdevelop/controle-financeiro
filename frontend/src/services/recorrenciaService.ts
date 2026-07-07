import api from './api';
import { Recorrencia } from '../types/Recorrencia';

export const recorrenciaService = {
    listarTodas: async (): Promise<Recorrencia[]> => {
        const response = await api.get('/recorrencias');
        return response.data;
    },

    buscarPorId: async (id: number): Promise<Recorrencia> => {
        const response = await api.get(`/recorrencias/${id}`);
        return response.data;
    },

    listarProximas: async (dias: number = 30): Promise<Recorrencia[]> => {
        const response = await api.get(`/recorrencias/proximas?dias=${dias}`);
        return response.data;
    },

    criar: async (data: Omit<Recorrencia, 'id'>): Promise<Recorrencia> => {
        const response = await api.post('/recorrencias', data);
        return response.data;
    },

    atualizar: async (id: number, data: Partial<Recorrencia>): Promise<Recorrencia> => {
        const response = await api.put(`/recorrencias/${id}`, data);
        return response.data;
    },

    toggleAtivo: async (id: number): Promise<void> => {
        await api.patch(`/recorrencias/${id}/toggle`);
    },

    deletar: async (id: number): Promise<void> => {
        await api.delete(`/recorrencias/${id}`);
    },
};

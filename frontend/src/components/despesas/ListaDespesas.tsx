
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deletarDespesa, fetchDespesas, fetchResumo, setFiltroFamilia, setFiltroData } from '../../store/slices/despesaSlice';
import { toast } from 'react-toastify';

const ListaDespesas: React.FC = () => {
    const dispatch = useAppDispatch();
    const { despesas, filtroFamilia, filtroDataInicio, filtroDataFim } = useAppSelector(state => state.despesas);
    const [loading, setLoading] = useState(false);

    const formatarMoeda = (valor: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    const formatarData = (data: string): string => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    const despesasFiltradas = despesas.filter(despesa => {
        let match = true;
        
        if (filtroFamilia && despesa.familia !== filtroFamilia) {
            match = false;
        }
        
        if (filtroDataInicio && new Date(despesa.data) < new Date(filtroDataInicio)) {
            match = false;
        }
        
        if (filtroDataFim && new Date(despesa.data) > new Date(filtroDataFim)) {
            match = false;
        }
        
        return match;
    });

    const handleDeletar = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
            setLoading(true);
            try {
                await dispatch(deletarDespesa(id)).unwrap();
                await dispatch(fetchDespesas());
                await dispatch(fetchResumo());
                toast.success('Despesa excluída com sucesso!');
            } catch (error) {
                toast.error('Erro ao excluir despesa');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-primary">📋 Histórico de Despesas</h2>
                
                <div className="flex flex-wrap gap-3">
                    <select
                        value={filtroFamilia}
                        onChange={(e) => dispatch(setFiltroFamilia(e.target.value))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Todas as famílias</option>
                        <option value="Família 1">Família 1</option>
                        <option value="Família 2">Família 2</option>
                        <option value="Família 3">Família 3</option>
                        <option value="Família 4">Família 4</option>
                        <option value="Família 5">Família 5</option>
                    </select>
                    
                    <input
                        type="date"
                        value={filtroDataInicio}
                        onChange={(e) => dispatch(setFiltroData({ inicio: e.target.value, fim: filtroDataFim }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="Data início"
                    />
                    
                    <input
                        type="date"
                        value={filtroDataFim}
                        onChange={(e) => dispatch(setFiltroData({ inicio: filtroDataInicio, fim: e.target.value }))}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="Data fim"
                    />
                </div>
            </div>

            {despesasFiltradas.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    🗂️ Nenhuma despesa encontrada.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white dark:bg-gray-800/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Família</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Categoria</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Valor</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Data</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Descrição</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {despesasFiltradas.map(despesa => (
                                <tr key={despesa.id} className="hover:bg-gray-50 transition-smooth">
                                    <td className="px-4 py-3">{despesa.familia}</td>
                                    <td className="px-4 py-3">{despesa.categoria}</td>
                                    <td className="px-4 py-3 font-semibold text-success">{formatarMoeda(despesa.valor)}</td>
                                    <td className="px-4 py-3">{formatarData(despesa.data)}</td>
                                    <td className="px-4 py-3">{despesa.descricao || '-'}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => despesa.id && handleDeletar(despesa.id)}
                                            disabled={loading}
                                            className="bg-danger text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-smooth disabled:opacity-50"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ListaDespesas;

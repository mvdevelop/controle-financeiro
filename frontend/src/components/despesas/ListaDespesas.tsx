import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deletarDespesa, fetchDespesas, fetchResumo, setFiltroFamilia, setFiltroData } from '../../store/slices/despesaSlice';
import { toast } from 'react-toastify';

const ListaDespesas: React.FC = () => {
    const dispatch = useAppDispatch();
    const { despesas, filtroFamilia, filtroDataInicio, filtroDataFim } = useAppSelector(state => state.despesas);
    const [loading, setLoading] = useState(false);

    const formatarMoeda = (valor: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
    const formatarData = (data: string) => new Date(data).toLocaleDateString('pt-BR');

    const despesasFiltradas = despesas.filter(d => {
        let match = true;
        if (filtroFamilia && d.familia !== filtroFamilia) match = false;
        if (filtroDataInicio && new Date(d.data) < new Date(filtroDataInicio)) match = false;
        if (filtroDataFim && new Date(d.data) > new Date(filtroDataFim)) match = false;
        return match;
    });

    const handleDeletar = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir esta despesa?')) return;
        setLoading(true);
        try {
            await dispatch(deletarDespesa(id)).unwrap();
            await dispatch(fetchDespesas());
            await dispatch(fetchResumo());
            toast.success('Despesa excluída com sucesso!');
        } catch { toast.error('Erro ao excluir despesa'); }
        finally { setLoading(false); }
    };

    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">📋 Histórico de Despesas</h2>
                <div className="flex flex-wrap gap-3">
                    <select value={filtroFamilia} onChange={e => dispatch(setFiltroFamilia(e.target.value))}
                        className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                        <option value="">Todas as famílias</option>
                        {['Família 1','Família 2','Família 3','Família 4','Família 5'].map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <input type="date" value={filtroDataInicio} onChange={e => dispatch(setFiltroData({ inicio: e.target.value, fim: filtroDataFim }))}
                        className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <input type="date" value={filtroDataFim} onChange={e => dispatch(setFiltroData({ inicio: filtroDataInicio, fim: e.target.value }))}
                        className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
            </div>

            {despesasFiltradas.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">🗂️ Nenhuma despesa encontrada.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                {['Família','Categoria','Valor','Data','Descrição','Ações'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {despesasFiltradas.map(d => (
                                <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-smooth">
                                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{d.familia}</td>
                                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{d.categoria}</td>
                                    <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">{formatarMoeda(d.valor)}</td>
                                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{formatarData(d.data)}</td>
                                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{d.descricao || '-'}</td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => d.id && handleDeletar(d.id)} disabled={loading}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-smooth disabled:opacity-50">
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

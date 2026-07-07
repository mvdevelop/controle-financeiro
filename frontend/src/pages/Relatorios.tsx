
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { despesaService } from '../services/despesaService';
import { toast } from 'react-toastify';
import { RelatorioDTO } from '../types/Despesa';

const Relatorios: React.FC = () => {
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [relatorio, setRelatorio] = useState<RelatorioDTO | null>(null);
    const [loading, setLoading] = useState(false);

    const formatarMoeda = (valor: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    const gerarRelatorio = async () => {
        if (!dataInicio || !dataFim) {
            toast.error('Selecione o período');
            return;
        }

        setLoading(true);
        try {
            const data = await despesaService.gerarRelatorio(dataInicio, dataFim);
            setRelatorio(data);
            toast.success('Relatório gerado com sucesso!');
        } catch (error) {
            toast.error('Erro ao gerar relatório');
        } finally {
            setLoading(false);
        }
    };

    const exportarCSV = async () => {
        if (!dataInicio || !dataFim) {
            toast.error('Selecione o período');
            return;
        }

        try {
            const blob = await despesaService.exportarCSV(dataInicio, dataFim);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `relatorio_${dataInicio}_a_${dataFim}.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success('Relatório exportado com sucesso!');
        } catch (error) {
            toast.error('Erro ao exportar relatório');
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-primary">📊 Relatórios Financeiros</h1>

                <div className="bg-white rounded-xl shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Data Início</label>
                            <input
                                type="date"
                                value={dataInicio}
                                onChange={(e) => setDataInicio(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Data Fim</label>
                            <input
                                type="date"
                                value={dataFim}
                                onChange={(e) => setDataFim(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <button
                            onClick={gerarRelatorio}
                            disabled={loading}
                            className="flex-1 bg-gradient-brand text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-smooth"
                        >
                            {loading ? 'Gerando...' : 'Gerar Relatório'}
                        </button>
                        <button
                            onClick={exportarCSV}
                            className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-smooth"
                        >
                            📥 Exportar CSV
                        </button>
                    </div>
                </div>

                {relatorio && (
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                        <h2 className="text-xl font-semibold text-center">
                            Período: {relatorio.dataInicio} até {relatorio.dataFim}
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-card text-white rounded-xl p-6 text-center">
                                <h3 className="text-lg mb-2">Total Geral</h3>
                                <p className="text-3xl font-bold">{formatarMoeda(relatorio.totalGeral)}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-6 text-center">
                                <h3 className="text-lg mb-2 text-primary">Total de Despesas</h3>
                                <p className="text-3xl font-bold text-primary">{relatorio.totalDespesas}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4">
                                <h3 className="font-semibold text-primary mb-3">Por Família</h3>
                                <ul className="space-y-2">
                                    {Object.entries(relatorio.totalPorFamilia).map(([familia, total]) => (
                                        <li key={familia} className="flex justify-between items-center pb-2 border-b border-gray-200">
                                            <strong>{familia}:</strong>
                                            <span className="font-semibold text-success">{formatarMoeda(total)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4">
                                <h3 className="font-semibold text-primary mb-3">Por Categoria</h3>
                                <ul className="space-y-2">
                                    {Object.entries(relatorio.totalPorCategoria).map(([categoria, total]) => (
                                        <li key={categoria} className="flex justify-between items-center pb-2 border-b border-gray-200">
                                            <strong>{categoria}:</strong>
                                            <span className="font-semibold text-success">{formatarMoeda(total)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Relatorios;

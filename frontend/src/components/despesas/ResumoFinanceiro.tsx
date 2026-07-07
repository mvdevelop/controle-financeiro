
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchResumo } from '../../store/slices/despesaSlice';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '../common/LoadingSpinner';

const ResumoFinanceiro: React.FC = () => {
    const dispatch = useAppDispatch();
    const { resumo, loading } = useAppSelector(state => state.despesas);

    useEffect(() => {
        dispatch(fetchResumo());
    }, [dispatch]);

    const formatarMoeda = (valor: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    if (loading || !resumo) {
        return <LoadingSpinner />;
    }

    const dadosPizza = Object.entries(resumo.totalPorCategoria).map(([name, value]) => ({
        name,
        value,
    }));

    const dadosBarras = Object.entries(resumo.totalPorFamilia).map(([name, value]) => ({
        name,
        gasto: value,
    }));

    const CORES = ['#10b981', '#0d9488', '#14b8a6', '#059669', '#34d399', '#6ee7b7', '#047857'];

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">📊 Resumo Financeiro</h2>

            <div className="bg-gradient-card text-white rounded-xl p-6 mb-6 text-center">
                <h3 className="text-lg mb-2">💰 Total Geral</h3>
                <div className="text-4xl font-bold">{formatarMoeda(resumo.totalGeral)}</div>
                <div className="text-sm opacity-90 mt-2">{resumo.totalDespesas} despesa(s) registrada(s)</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-primary mb-4 text-center">📂 Gastos por Categoria</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={dadosPizza}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {dadosPizza.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => formatarMoeda(value as number)} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-primary mb-4 text-center">👨‍👩‍👧‍👦 Gastos por Família</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dadosBarras}>
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => formatarMoeda(value)} />
                            <Tooltip formatter={(value) => formatarMoeda(value as number)} />
                            <Legend />
                            <Bar dataKey="gasto" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4">
                    <h4 className="font-semibold text-primary mb-3">Por Família</h4>
                    <ul className="space-y-2">
                        {Object.entries(resumo.totalPorFamilia).map(([familia, total]) => (
                            <li key={familia} className="flex justify-between items-center pb-2 border-b border-gray-200">
                                <strong>{familia}:</strong>
                                <span className="font-semibold text-success">{formatarMoeda(total)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white dark:bg-gray-800/50 rounded-xl p-4">
                    <h4 className="font-semibold text-primary mb-3">Por Categoria</h4>
                    <ul className="space-y-2">
                        {Object.entries(resumo.totalPorCategoria).map(([categoria, total]) => (
                            <li key={categoria} className="flex justify-between items-center pb-2 border-b border-gray-200">
                                <strong>{categoria}:</strong>
                                <span className="font-semibold text-success">{formatarMoeda(total)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ResumoFinanceiro;

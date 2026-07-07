import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, PiggyBank, AlertTriangle, RefreshCw } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SkeletonCard } from '../components/ui/Skeleton';
import OrcamentoForm from '../components/orcamentos/OrcamentoForm';
import OrcamentoProgressCard from '../components/orcamentos/OrcamentoProgressCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
    fetchOrcamentos, fetchProgresso, criarOrcamento,
    deletarOrcamento, setMesAno
} from '../store/slices/orcamentoSlice';
import { toast } from 'react-toastify';

const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const formatarMoeda = (valor: number): string =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const Orcamentos: React.FC = () => {
    const dispatch = useAppDispatch();
    const { progresso, loading, mes, ano } = useAppSelector(state => state.orcamentos);
    const [submitting, setSubmitting] = useState(false);
    const [erroCount, setErroCount] = useState(0);

    useEffect(() => {
        dispatch(fetchProgresso({ mes, ano }));
    }, [dispatch, mes, ano]);

    const handleSubmit = useCallback(async (data: {
        familia: string; categoria: string; valorLimite: number; mes: number; ano: number;
    }) => {
        setSubmitting(true);
        try {
            await dispatch(criarOrcamento(data)).unwrap();
            await dispatch(fetchProgresso({ mes, ano }));
            toast.success('Orçamento criado com sucesso!');
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Erro ao criar orçamento');
        } finally {
            setSubmitting(false);
        }
    }, [dispatch, mes, ano]);

    const handleDelete = useCallback(async (id: number) => {
        try {
            await dispatch(deletarOrcamento(id)).unwrap();
            await dispatch(fetchProgresso({ mes, ano }));
            toast.success('Orçamento removido');
        } catch {
            toast.error('Erro ao remover orçamento');
        }
    }, [dispatch, mes, ano]);

    const handleMesAnterior = () => {
        const novaData = mes === 1 ? { mes: 12, ano: ano - 1 } : { mes: mes - 1, ano };
        dispatch(setMesAno(novaData));
    };

    const handleProximoMes = () => {
        const novaData = mes === 12 ? { mes: 1, ano: ano + 1 } : { mes: mes + 1, ano };
        dispatch(setMesAno(novaData));
    };

    // Calculate summary stats
    const stats = progresso.reduce((acc, p) => ({
        totalLimite: acc.totalLimite + p.valorLimite,
        totalGasto: acc.totalGasto + p.valorGasto,
        totalRestante: acc.totalRestante + p.valorRestante,
        emAlerta: acc.emAlerta + (p.status === 'CRITICAL' || p.status === 'EXCEEDED' ? 1 : 0),
    }), { totalLimite: 0, totalGasto: 0, totalRestante: 0, emAlerta: 0 });

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-primary dark:text-white flex items-center gap-2">
                            <PiggyBank className="w-6 h-6 text-brand-500" />
                            Orçamentos
                        </h1>
                        <p className="text-muted text-sm mt-1">Gerencie seus limites de gastos por categoria</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={handleMesAnterior} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth">
                            <ChevronLeft className="w-5 h-5 text-primary dark:text-white" />
                        </button>
                        <span className="font-semibold text-primary dark:text-white min-w-[140px] text-center">
                            {meses[mes - 1]} {ano}
                        </span>
                        <button onClick={handleProximoMes} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth"
                            disabled={mes === new Date().getMonth() + 1 && ano === new Date().getFullYear()}>
                            <ChevronRight className="w-5 h-5 text-primary dark:text-white" />
                        </button>
                        <Button variant="ghost" size="sm" onClick={() => dispatch(fetchProgresso({ mes, ano }))}>
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card variant="gradient">
                        <p className="text-white/80 text-sm">Limite Total</p>
                        <p className="text-2xl font-bold text-white mt-1">{formatarMoeda(stats.totalLimite)}</p>
                    </Card>
                    <Card variant="glass">
                        <p className="text-muted text-sm">Gasto Total</p>
                        <p className="text-2xl font-bold text-primary dark:text-white mt-1">{formatarMoeda(stats.totalGasto)}</p>
                    </Card>
                    <Card variant="glass">
                        <p className="text-muted text-sm">Restante</p>
                        <p className={`text-2xl font-bold mt-1 ${stats.totalRestante >= 0 ? 'text-brand-500' : 'text-danger'}`}>
                            {formatarMoeda(Math.abs(stats.totalRestante))}
                        </p>
                    </Card>
                    <Card variant="glass">
                        <p className="text-muted text-sm flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4 text-warning" />
                            Em Alerta
                        </p>
                        <p className="text-2xl font-bold text-primary dark:text-white mt-1">{stats.emAlerta}</p>
                    </Card>
                </div>

                {/* Form + Progress Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <OrcamentoForm onSubmit={handleSubmit} loading={submitting} />
                    </div>
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <h2 className="text-lg font-semibold text-primary dark:text-white">
                                    Progresso — {meses[mes - 1]} {ano}
                                </h2>
                            </CardHeader>
                            <CardBody>
                                {loading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <SkeletonCard />
                                        <SkeletonCard />
                                    </div>
                                ) : progresso.length === 0 ? (
                                    <div className="text-center py-12 text-muted">
                                        <PiggyBank className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p className="font-medium">Nenhum orçamento para este mês</p>
                                        <p className="text-sm mt-1">Crie orçamentos para acompanhar seus gastos</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {progresso.map(p => (
                                            <OrcamentoProgressCard
                                                key={p.id}
                                                progresso={p}
                                                onDelete={handleDelete}
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orcamentos;

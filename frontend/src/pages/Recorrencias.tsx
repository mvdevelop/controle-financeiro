import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCw, Calendar, Trash2, Power, PowerOff } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SkeletonCard } from '../components/ui/Skeleton';
import RecorrenciaForm from '../components/recorrencias/RecorrenciaForm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchRecorrencias, criarRecorrencia, toggleRecorrencia, deletarRecorrencia } from '../store/slices/recorrenciaSlice';
import { toast } from 'react-toastify';

const formatarMoeda = (valor: number): string =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const Recorrencias: React.FC = () => {
    const dispatch = useAppDispatch();
    const { recorrencias, loading } = useAppSelector(state => state.recorrencias);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchRecorrencias());
    }, [dispatch]);

    const handleSubmit = useCallback(async (data: any) => {
        setSubmitting(true);
        try {
            await dispatch(criarRecorrencia(data)).unwrap();
            toast.success('Recorrência criada!');
        } catch { toast.error('Erro ao criar'); }
        finally { setSubmitting(false); }
    }, [dispatch]);

    const handleToggle = useCallback(async (id: number) => {
        try { await dispatch(toggleRecorrencia(id)).unwrap(); }
        catch { toast.error('Erro ao alternar'); }
    }, [dispatch]);

    const handleDelete = useCallback(async (id: number) => {
        try { await dispatch(deletarRecorrencia(id)).unwrap(); toast.success('Recorrência removida'); }
        catch { toast.error('Erro ao remover'); }
    }, [dispatch]);

    const ativas = recorrencias.filter(r => r.ativo);
    const inativas = recorrencias.filter(r => !r.ativo);
    const totalMensal = ativas.reduce((sum, r) => sum + r.valor, 0);

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-primary dark:text-white flex items-center gap-2">
                        <RefreshCw className="w-6 h-6 text-brand-500" />
                        Pagamentos Recorrentes
                    </h1>
                    <p className="text-muted text-sm mt-1">Gerencie assinaturas e contas fixas</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card variant="gradient">
                        <p className="text-white/80 text-sm">Total em Recorrências</p>
                        <p className="text-2xl font-bold text-white mt-1">{formatarMoeda(totalMensal)}<span className="text-sm font-normal text-white/70">/mês</span></p>
                    </Card>
                    <Card variant="glass">
                        <p className="text-muted text-sm">Ativas</p>
                        <p className="text-2xl font-bold text-brand-500 mt-1">{ativas.length}</p>
                    </Card>
                    <Card variant="glass">
                        <p className="text-muted text-sm">Inativas</p>
                        <p className="text-2xl font-bold text-muted mt-1">{inativas.length}</p>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <RecorrenciaForm onSubmit={handleSubmit} loading={submitting} />
                    </div>

                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <h2 className="text-lg font-semibold text-primary dark:text-white">Recorrências</h2>
                            </CardHeader>
                            <CardBody>
                                {loading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <SkeletonCard /><SkeletonCard />
                                    </div>
                                ) : recorrencias.length === 0 ? (
                                    <div className="text-center py-12 text-muted">
                                        <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p className="font-medium">Nenhuma recorrência cadastrada</p>
                                        <p className="text-sm mt-1">Adicione contas fixas e assinaturas</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {[...ativas, ...inativas].map(r => (
                                            <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-smooth">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${r.ativo ? 'bg-brand-500' : 'bg-gray-300'}`} />
                                                    <div>
                                                        <p className={`font-medium text-primary dark:text-white ${!r.ativo ? 'line-through opacity-50' : ''}`}>
                                                            {r.descricao}
                                                        </p>
                                                        <p className="text-xs text-muted">
                                                            {r.categoria}{r.familia ? ` • ${r.familia}` : ''} • Dia {r.diaVencimento}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-semibold text-primary dark:text-white">{formatarMoeda(r.valor)}</span>
                                                    <Badge variant={r.ativo ? 'success' : 'default'}>{r.ativo ? 'Ativa' : 'Inativa'}</Badge>
                                                    <button onClick={() => handleToggle(r.id!)} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-smooth" title={r.ativo ? 'Desativar' : 'Ativar'}>
                                                        {r.ativo ? <PowerOff className="w-4 h-4 text-warning" /> : <Power className="w-4 h-4 text-brand-500" />}
                                                    </button>
                                                    <button onClick={() => handleDelete(r.id!)} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-muted hover:text-danger transition-smooth">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
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

export default Recorrencias;

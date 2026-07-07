import React, { useEffect, useState, useCallback } from 'react';
import { Target, Trophy } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { SkeletonCard } from '../components/ui/Skeleton';
import MetaCard from '../components/metas/MetaCard';
import MetaForm from '../components/metas/MetaForm';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchMetas, criarMeta, deletarMeta } from '../store/slices/metaSlice';
import { toast } from 'react-toastify';

const Metas: React.FC = () => {
    const dispatch = useAppDispatch();
    const { metas, loading } = useAppSelector(state => state.metas);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchMetas());
    }, [dispatch]);

    const handleSubmit = useCallback(async (data: any) => {
        setSubmitting(true);
        try {
            await dispatch(criarMeta(data)).unwrap();
            toast.success('Meta criada com sucesso!');
        } catch {
            toast.error('Erro ao criar meta');
        } finally {
            setSubmitting(false);
        }
    }, [dispatch]);

    const handleDelete = useCallback(async (id: number) => {
        try {
            await dispatch(deletarMeta(id)).unwrap();
            toast.success('Meta cancelada');
        } catch {
            toast.error('Erro ao cancelar meta');
        }
    }, [dispatch]);

    const concluidas = metas.filter(m => m.status === 'CONCLUIDA');
    const andamento = metas.filter(m => m.status === 'EM_ANDAMENTO');

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-primary dark:text-white flex items-center gap-2">
                        <Target className="w-6 h-6 text-brand-500" />
                        Metas Financeiras
                    </h1>
                    <p className="text-muted text-sm mt-1">Defina e acompanhe suas metas financeiras</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <MetaForm onSubmit={handleSubmit} loading={submitting} />
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <SkeletonCard />
                                <SkeletonCard />
                            </div>
                        ) : metas.length === 0 ? (
                            <Card>
                                <CardBody>
                                    <div className="text-center py-12 text-muted">
                                        <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p className="font-medium">Nenhuma meta cadastrada</p>
                                        <p className="text-sm mt-1">Crie metas para acompanhar seus objetivos</p>
                                    </div>
                                </CardBody>
                            </Card>
                        ) : (
                            <>
                                {andamento.length > 0 && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-primary dark:text-white mb-3">
                                            Em Andamento ({andamento.length})
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {andamento.map(m => (
                                                <MetaCard key={m.id} meta={m} onDelete={handleDelete} />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {concluidas.length > 0 && (
                                    <div>
                                        <h2 className="text-lg font-semibold text-primary dark:text-white mb-3">
                                            Concluídas ({concluidas.length})
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {concluidas.map(m => (
                                                <MetaCard key={m.id} meta={m} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Metas;

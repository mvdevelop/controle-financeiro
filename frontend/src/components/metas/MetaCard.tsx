import React from 'react';
import { Target, Trash2, Plus } from 'lucide-react';
import { Card, CardBody } from '../ui/Card';
import { Badge } from '../ui/Badge';
import CircularProgress from './CircularProgress';
import { Meta } from '../../types/Meta';

interface MetaCardProps {
    meta: Meta;
    onDelete?: (id: number) => void;
    onUpdateProgress?: (id: number, valorAtual: number) => void;
}

const formatarMoeda = (valor: number): string =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const statusConfig: Record<string, { badge: 'success' | 'warning' | 'danger' | 'info'; label: string }> = {
    EM_ANDAMENTO: { badge: 'info', label: 'Em Andamento' },
    CONCLUIDA: { badge: 'success', label: 'Concluída' },
    CANCELADA: { badge: 'danger', label: 'Cancelada' },
};

const MetaCard: React.FC<MetaCardProps> = ({ meta, onDelete }) => {
    const config = statusConfig[meta.status] || statusConfig.EM_ANDAMENTO;
    const percentual = meta.percentual || 0;
    const cor = meta.cor || '#10b981';

    return (
        <Card variant="glass">
            <CardBody>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="font-semibold text-primary dark:text-white">{meta.descricao}</h3>
                        {meta.observacao && (
                            <p className="text-sm text-muted mt-1">{meta.observacao}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={config.badge}>{config.label}</Badge>
                        {onDelete && meta.status !== 'CANCELADA' && (
                            <button onClick={() => onDelete(meta.id!)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-muted hover:text-danger transition-smooth">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="relative flex-shrink-0">
                        <CircularProgress percentual={percentual} color={cor} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold" style={{ color: cor }}>
                                {percentual.toFixed(0)}%
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2">
                        <div>
                            <p className="text-xs text-muted">Meta</p>
                            <p className="font-semibold text-primary dark:text-white">{formatarMoeda(meta.valorMeta)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted">Atual</p>
                            <p className="font-semibold text-brand-500">{formatarMoeda(meta.valorAtual)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted">Restante</p>
                            <p className="font-semibold text-primary dark:text-white">
                                {formatarMoeda(Math.max(meta.valorMeta - meta.valorAtual, 0))}
                            </p>
                        </div>
                        {meta.dataLimite && (
                            <div>
                                <p className="text-xs text-muted">Data Limite</p>
                                <p className="text-sm font-medium text-primary dark:text-white">
                                    {new Date(meta.dataLimite).toLocaleDateString('pt-BR')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default MetaCard;

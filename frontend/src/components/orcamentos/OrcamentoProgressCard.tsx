import React from 'react';
import { Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import BarraProgressoOrcamento from './BarraProgressoOrcamento';
import { OrcamentoProgress } from '../../types/Orcamento';

interface OrcamentoProgressCardProps {
    progresso: OrcamentoProgress;
    onDelete?: (id: number) => void;
}

const statusConfig = {
    SAFE: { badge: 'success' as const, icon: CheckCircle, label: 'OK' },
    WARNING: { badge: 'warning' as const, icon: AlertTriangle, label: 'Atenção' },
    CRITICAL: { badge: 'warning' as const, icon: AlertTriangle, label: 'Crítico' },
    EXCEEDED: { badge: 'danger' as const, icon: XCircle, label: 'Estourado' },
};

const formatarMoeda = (valor: number): string =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const OrcamentoProgressCard: React.FC<OrcamentoProgressCardProps> = ({ progresso, onDelete }) => {
    const config = statusConfig[progresso.status];

    return (
        <Card variant="glass">
            <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="font-semibold text-primary dark:text-white">{progresso.categoria}</h3>
                        <p className="text-sm text-muted">{progresso.familia}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={config.badge}>{config.label}</Badge>
                        {onDelete && (
                            <button
                                onClick={() => onDelete(progresso.id)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-muted hover:text-danger transition-smooth"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <BarraProgressoOrcamento
                    percentual={progresso.percentualUtilizado}
                    status={progresso.status}
                />

                <div className="flex justify-between text-sm">
                    <div>
                        <p className="text-muted">Gasto</p>
                        <p className="font-semibold text-primary dark:text-white">
                            {formatarMoeda(progresso.valorGasto)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-muted">Limite</p>
                        <p className="font-semibold text-primary dark:text-white">
                            {formatarMoeda(progresso.valorLimite)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-muted">Restante</p>
                        <p className={`font-semibold ${
                            progresso.valorRestante >= 0
                                ? 'text-brand-500'
                                : 'text-danger'
                        }`}>
                            {formatarMoeda(Math.abs(progresso.valorRestante))}
                            {progresso.valorRestante < 0 && ' (excedido)'}
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <span className={`text-lg font-bold ${
                        progresso.status === 'EXCEEDED' ? 'text-danger' :
                        progresso.status === 'CRITICAL' ? 'text-orange-500' :
                        progresso.status === 'WARNING' ? 'text-amber-500' :
                        'text-brand-500'
                    }`}>
                        {progresso.percentualUtilizado.toFixed(1)}%
                    </span>
                    <span className="text-muted text-sm ml-1">utilizado</span>
                </div>
            </div>
        </Card>
    );
};

export default OrcamentoProgressCard;

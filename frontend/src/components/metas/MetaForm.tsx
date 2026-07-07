import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface MetaFormProps {
    onSubmit: (data: {
        descricao: string;
        valorMeta: number;
        dataLimite?: string;
        cor?: string;
        observacao?: string;
    }) => Promise<void>;
    loading?: boolean;
}

const MetaForm: React.FC<MetaFormProps> = ({ onSubmit, loading }) => {
    const [descricao, setDescricao] = useState('');
    const [valorMeta, setValorMeta] = useState('');
    const [dataLimite, setDataLimite] = useState('');
    const [observacao, setObservacao] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!descricao || !valorMeta) return;

        await onSubmit({
            descricao,
            valorMeta: parseFloat(valorMeta),
            dataLimite: dataLimite || undefined,
            observacao: observacao || undefined,
        });

        setDescricao('');
        setValorMeta('');
        setDataLimite('');
        setObservacao('');
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-brand-500" />
                    <h2 className="text-lg font-semibold text-primary dark:text-white">Nova Meta</h2>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Descrição"
                        placeholder="Ex: Viagem para praia"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <Input
                        label="Valor da Meta (R$)"
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={valorMeta}
                        onChange={e => setValorMeta(e.target.value)}
                    />
                    <Input
                        label="Data Limite (opcional)"
                        type="date"
                        value={dataLimite}
                        onChange={e => setDataLimite(e.target.value)}
                    />
                    <Input
                        label="Observação (opcional)"
                        placeholder="Motivo da meta..."
                        value={observacao}
                        onChange={e => setObservacao(e.target.value)}
                    />
                    <Button type="submit" loading={loading} className="w-full">
                        <Target className="w-4 h-4" />
                        Criar Meta
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default MetaForm;

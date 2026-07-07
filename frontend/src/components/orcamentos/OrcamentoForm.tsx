import React, { useState } from 'react';
import { PiggyBank } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { Input, Select } from '../ui/Input';
import { Button } from '../ui/Button';

interface OrcamentoFormProps {
    onSubmit: (data: {
        familia: string;
        categoria: string;
        valorLimite: number;
        mes: number;
        ano: number;
    }) => Promise<void>;
    loading?: boolean;
}

const categorias = [
    'Alimentação', 'Moradia', 'Transporte', 'Saúde',
    'Educação', 'Lazer', 'Vestuário', 'Outros'
];

const familias = ['Família 1', 'Família 2', 'Família 3', 'Família 4', 'Família 5'];
const meses = [
    { value: '1', label: 'Janeiro' }, { value: '2', label: 'Fevereiro' },
    { value: '3', label: 'Março' }, { value: '4', label: 'Abril' },
    { value: '5', label: 'Maio' }, { value: '6', label: 'Junho' },
    { value: '7', label: 'Julho' }, { value: '8', label: 'Agosto' },
    { value: '9', label: 'Setembro' }, { value: '10', label: 'Outubro' },
    { value: '11', label: 'Novembro' }, { value: '12', label: 'Dezembro' },
];

const OrcamentoForm: React.FC<OrcamentoFormProps> = ({ onSubmit, loading }) => {
    const [familia, setFamilia] = useState('');
    const [categoria, setCategoria] = useState('');
    const [valorLimite, setValorLimite] = useState('');
    const [mes, setMes] = useState(String(new Date().getMonth() + 1));
    const [ano, setAno] = useState(String(new Date().getFullYear()));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!familia || !categoria || !valorLimite) return;

        await onSubmit({
            familia,
            categoria,
            valorLimite: parseFloat(valorLimite),
            mes: parseInt(mes),
            ano: parseInt(ano),
        });

        setFamilia('');
        setCategoria('');
        setValorLimite('');
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <PiggyBank className="w-5 h-5 text-brand-500" />
                    <h2 className="text-lg font-semibold text-primary dark:text-white">Novo Orçamento</h2>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label="Família"
                            options={familias.map(f => ({ value: f, label: f }))}
                            value={familia}
                            onChange={e => setFamilia(e.target.value)}
                        />
                        <Select
                            label="Categoria"
                            options={categorias.map(c => ({ value: c, label: c }))}
                            value={categoria}
                            onChange={e => setCategoria(e.target.value)}
                        />
                        <Input
                            label="Valor Limite (R$)"
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            value={valorLimite}
                            onChange={e => setValorLimite(e.target.value)}
                        />
                        <div className="grid grid-cols-2 gap-2">
                            <Select
                                label="Mês"
                                options={meses}
                                value={mes}
                                onChange={e => setMes(e.target.value)}
                            />
                            <Input
                                label="Ano"
                                type="number"
                                value={ano}
                                onChange={e => setAno(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button type="submit" loading={loading} className="w-full">
                        <PiggyBank className="w-4 h-4" />
                        Criar Orçamento
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default OrcamentoForm;

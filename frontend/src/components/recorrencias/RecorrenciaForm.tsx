import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../ui/Card';
import { Input, Select } from '../ui/Input';
import { Button } from '../ui/Button';

interface RecorrenciaFormProps {
    onSubmit: (data: {
        descricao: string;
        valor: number;
        categoria: string;
        diaVencimento: number;
        familia?: string;
    }) => Promise<void>;
    loading?: boolean;
}

const categorias = ['Alimentação', 'Moradia', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Vestuário', 'Outros'];
const familias = ['Família 1', 'Família 2', 'Família 3', 'Família 4', 'Família 5'];

const RecorrenciaForm: React.FC<RecorrenciaFormProps> = ({ onSubmit, loading }) => {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [familia, setFamilia] = useState('');
    const [diaVencimento, setDiaVencimento] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!descricao || !valor || !categoria || !diaVencimento) return;

        await onSubmit({
            descricao,
            valor: parseFloat(valor),
            categoria,
            diaVencimento: parseInt(diaVencimento),
            familia: familia || undefined,
        });

        setDescricao(''); setValor(''); setCategoria('');
        setFamilia(''); setDiaVencimento('');
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-brand-500" />
                    <h2 className="text-lg font-semibold text-primary dark:text-white">Nova Recorrência</h2>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Descrição" placeholder="Ex: Assinatura Netflix" value={descricao}
                        onChange={e => setDescricao(e.target.value)} />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Valor (R$)" type="number" step="0.01" placeholder="0,00" value={valor}
                            onChange={e => setValor(e.target.value)} />
                        <Input label="Dia Vencimento" type="number" min="1" max="31" placeholder="15"
                            value={diaVencimento} onChange={e => setDiaVencimento(e.target.value)} />
                    </div>
                    <Select label="Categoria" options={categorias.map(c => ({ value: c, label: c }))}
                        value={categoria} onChange={e => setCategoria(e.target.value)} />
                    <Select label="Família (opcional)" options={familias.map(f => ({ value: f, label: f }))}
                        value={familia} onChange={e => setFamilia(e.target.value)} />
                    <Button type="submit" loading={loading} className="w-full">
                        <RefreshCw className="w-4 h-4" />
                        Criar Recorrência
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default RecorrenciaForm;

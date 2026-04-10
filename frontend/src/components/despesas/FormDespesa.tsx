
import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { criarDespesa, fetchDespesas, fetchResumo } from '../../store/slices/despesaSlice';
import { toast } from 'react-toastify';

const FormDespesa: React.FC = () => {
    const dispatch = useAppDispatch();
    const [form, setForm] = useState({
        familia: '',
        categoria: '',
        valor: '',
        data: new Date().toISOString().split('T')[0],
        descricao: '',
    });
    const [loading, setLoading] = useState(false);

    const familias = ['Família 1', 'Família 2', 'Família 3', 'Família 4', 'Família 5'];
    const categorias = ['Alimentação', 'Moradia', 'Transporte', 'Saúde', 'Educação', 'Lazer', 'Outros'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.familia || !form.categoria || !form.valor || !form.data) {
            toast.error('Preencha todos os campos obrigatórios');
            return;
        }

        setLoading(true);
        try {
            await dispatch(criarDespesa({
                familia: form.familia,
                categoria: form.categoria,
                valor: parseFloat(form.valor),
                data: form.data,
                descricao: form.descricao,
            })).unwrap();

            await dispatch(fetchDespesas());
            await dispatch(fetchResumo());
            
            toast.success('Despesa registrada com sucesso!');
            
            setForm({
                familia: '',
                categoria: '',
                valor: '',
                data: new Date().toISOString().split('T')[0],
                descricao: '',
            });
        } catch (error) {
            toast.error('Erro ao registrar despesa');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-primary mb-6">➕ Registrar Nova Despesa</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Família *</label>
                    <select
                        name="familia"
                        value={form.familia}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    >
                        <option value="">Selecione...</option>
                        {familias.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
                    <select
                        name="categoria"
                        value={form.categoria}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    >
                        <option value="">Selecione...</option>
                        {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$) *</label>
                    <input
                        type="number"
                        step="0.01"
                        name="valor"
                        value={form.valor}
                        onChange={handleChange}
                        placeholder="0,00"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data *</label>
                    <input
                        type="date"
                        name="data"
                        value={form.data}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                    <input
                        type="text"
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        placeholder="Ex: Supermercado, Conta de luz..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-smooth disabled:opacity-50"
                >
                    {loading ? 'Salvando...' : '💾 Salvar Despesa'}
                </button>
            </form>
        </div>
    );
};

export default FormDespesa;

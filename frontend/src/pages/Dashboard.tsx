
import React from 'react';
import Layout from '../components/layout/Layout';
import FormDespesa from '../components/despesas/FormDespesa';
import ListaDespesas from '../components/despesas/ListaDespesas';
import ResumoFinanceiro from '../components/despesas/ResumoFinanceiro';

const Dashboard: React.FC = () => {
    return (
        <Layout>
            <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FormDespesa />
                    <ResumoFinanceiro />
                </div>
                <ListaDespesas />
            </div>
        </Layout>
    );
};

export default Dashboard;

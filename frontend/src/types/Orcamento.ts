export interface Orcamento {
    id?: number;
    familia: string;
    categoria: string;
    valorLimite: number;
    mes: number;
    ano: number;
    valorGasto?: number;
    percentualUtilizado?: number;
    dataCriacao?: string;
    dataAtualizacao?: string;
}

export interface OrcamentoProgress {
    id: number;
    familia: string;
    categoria: string;
    valorLimite: number;
    valorGasto: number;
    percentualUtilizado: number;
    valorRestante: number;
    status: 'SAFE' | 'WARNING' | 'CRITICAL' | 'EXCEEDED';
    mes: number;
    ano: number;
}

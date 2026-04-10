
export interface Despesa {
    id?: string;
    familia: string;
    categoria: string;
    valor: number;
    data: string;
    descricao: string;
    dataCriacao?: string;
    dataAtualizacao?: string;
}

export interface ResumoFamilia {
    familia: string;
    totalGasto: number;
    quantidadeDespesas: number;
    mediaPorDespesa: number;
}

export interface ResumoDTO {
    totalGeral: number;
    totalDespesas: number;
    totalPorFamilia: Record<string, number>;
    totalPorCategoria: Record<string, number>;
}

export interface RelatorioDTO {
    dataInicio: string;
    dataFim: string;
    totalGeral: number;
    totalDespesas: number;
    totalPorFamilia: Record<string, number>;
    totalPorCategoria: Record<string, number>;
    despesas: Despesa[];
}

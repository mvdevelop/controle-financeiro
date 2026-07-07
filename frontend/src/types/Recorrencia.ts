export interface Recorrencia {
    id?: number;
    descricao: string;
    valor: number;
    categoria: string;
    familia?: string;
    diaVencimento: number;
    ativo: boolean;
    dataCriacao?: string;
    dataAtualizacao?: string;
}

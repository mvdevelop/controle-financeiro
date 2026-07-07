CREATE TABLE metas (
    id BIGSERIAL PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    valor_meta DOUBLE PRECISION NOT NULL,
    valor_atual DOUBLE PRECISION NOT NULL DEFAULT 0,
    data_limite DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'EM_ANDAMENTO',
    cor VARCHAR(7) DEFAULT '#059669',
    observacao TEXT,
    data_criacao TIMESTAMP NOT NULL DEFAULT NOW(),
    data_atualizacao TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_metas_status CHECK (status IN ('EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA'))
);

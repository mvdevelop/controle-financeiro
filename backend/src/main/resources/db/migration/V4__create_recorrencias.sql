CREATE TABLE recorrencias (
    id BIGSERIAL PRIMARY KEY,
    descricao VARCHAR(200) NOT NULL,
    valor DOUBLE PRECISION NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    familia VARCHAR(50),
    dia_vencimento INTEGER NOT NULL CHECK (dia_vencimento >= 1 AND dia_vencimento <= 31),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    data_criacao TIMESTAMP NOT NULL DEFAULT NOW(),
    data_atualizacao TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_recorrencias_vencimento ON recorrencias(dia_vencimento);
CREATE INDEX idx_recorrencias_ativo ON recorrencias(ativo);

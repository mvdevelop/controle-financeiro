CREATE TABLE orcamentos (
    id BIGSERIAL PRIMARY KEY,
    familia VARCHAR(50) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    valor_limite DOUBLE PRECISION NOT NULL,
    mes INTEGER NOT NULL CHECK (mes >= 1 AND mes <= 12),
    ano INTEGER NOT NULL,
    data_criacao TIMESTAMP NOT NULL DEFAULT NOW(),
    data_atualizacao TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uk_orcamento_familia_categoria_mes_ano UNIQUE (familia, categoria, mes, ano)
);

CREATE INDEX idx_orcamentos_familia ON orcamentos(familia);
CREATE INDEX idx_orcamentos_mes_ano ON orcamentos(mes, ano);
CREATE INDEX idx_orcamentos_familia_mes_ano ON orcamentos(familia, mes, ano);

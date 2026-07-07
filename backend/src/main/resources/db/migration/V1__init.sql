-- Tabela de categorias
CREATE TABLE categorias (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE
);

-- Tabela de despesas
CREATE TABLE despesas (
    id BIGSERIAL PRIMARY KEY,
    familia VARCHAR(50) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    valor DOUBLE PRECISION NOT NULL,
    data DATE NOT NULL,
    descricao VARCHAR(200),
    data_criacao TIMESTAMP NOT NULL,
    data_atualizacao TIMESTAMP NOT NULL
);

-- Índices
CREATE INDEX idx_despesas_familia ON despesas(familia);
CREATE INDEX idx_despesas_categoria ON despesas(categoria);
CREATE INDEX idx_despesas_data ON despesas(data);
CREATE INDEX idx_despesas_familia_data ON despesas(familia, data);

-- Categorias iniciais
INSERT INTO categorias (nome, descricao, ativo) VALUES
    ('Alimentação', 'Gastos com alimentação e supermercado', TRUE),
    ('Transporte', 'Gastos com transporte e combustível', TRUE),
    ('Moradia', 'Gastos com aluguel, condomínio e contas', TRUE),
    ('Saúde', 'Gastos com saúde e planos', TRUE),
    ('Educação', 'Gastos com educação e cursos', TRUE),
    ('Lazer', 'Gastos com lazer e entretenimento', TRUE),
    ('Vestuário', 'Gastos com roupas e acessórios', TRUE),
    ('Outros', 'Outros gastos', TRUE);

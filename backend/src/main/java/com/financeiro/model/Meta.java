package com.financeiro.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "metas")
public class Meta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String descricao;

    @Column(name = "valor_meta", nullable = false)
    private Double valorMeta;

    @Column(name = "valor_atual", nullable = false)
    private Double valorAtual = 0.0;

    @Column(name = "data_limite")
    private LocalDate dataLimite;

    @Column(nullable = false, length = 20)
    private String status = "EM_ANDAMENTO";

    @Column(length = 7)
    private String cor = "#059669";

    @Column(columnDefinition = "TEXT")
    private String observacao;

    @Column(name = "data_criacao", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "data_atualizacao", nullable = false)
    private LocalDateTime dataAtualizacao;
}

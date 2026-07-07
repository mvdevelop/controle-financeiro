package com.financeiro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MetaResponseDTO {
    private Long id;
    private String descricao;
    private Double valorMeta;
    private Double valorAtual;
    private Double percentual;
    private LocalDate dataLimite;
    private String status;
    private String cor;
    private String observacao;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
}

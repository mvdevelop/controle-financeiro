package com.financeiro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrcamentoResponseDTO {
    private Long id;
    private String familia;
    private String categoria;
    private Double valorLimite;
    private Integer mes;
    private Integer ano;
    private Double valorGasto;
    private Double percentualUtilizado;
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;
}

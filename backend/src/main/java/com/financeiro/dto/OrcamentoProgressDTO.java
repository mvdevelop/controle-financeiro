package com.financeiro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrcamentoProgressDTO {
    private Long id;
    private String familia;
    private String categoria;
    private Double valorLimite;
    private Double valorGasto;
    private Double percentualUtilizado;
    private Double valorRestante;
    private String status; // SAFE, WARNING, CRITICAL, EXCEEDED
    private Integer mes;
    private Integer ano;
}

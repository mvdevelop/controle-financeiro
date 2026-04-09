package com.financeiro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumoFamiliaDTO {
    private String familia;
    private Double totalGasto;
    private Integer quantidadeDespesas;
    private Double mediaPorDespesa;
}

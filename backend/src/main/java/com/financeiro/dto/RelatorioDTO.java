package com.financeiro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelatorioDTO {
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private Double totalGeral;
    private Integer totalDespesas;
    private Map<String, Double> totalPorFamilia;
    private Map<String, Double> totalPorCategoria;
    private List<DespesaResponseDTO> despesas;
}

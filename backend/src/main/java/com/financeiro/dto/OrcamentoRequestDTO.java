package com.financeiro.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrcamentoRequestDTO {

    @NotBlank(message = "Família é obrigatória")
    @Size(min = 3, max = 50)
    private String familia;

    @NotBlank(message = "Categoria é obrigatória")
    private String categoria;

    @NotNull(message = "Valor limite é obrigatório")
    @Positive(message = "Valor limite deve ser positivo")
    @DecimalMin(value = "0.01", message = "Valor mínimo é R$ 0,01")
    private Double valorLimite;

    @NotNull(message = "Mês é obrigatório")
    @Min(value = 1, message = "Mês deve ser entre 1 e 12")
    @Max(value = 12, message = "Mês deve ser entre 1 e 12")
    private Integer mes;

    @NotNull(message = "Ano é obrigatório")
    @Min(value = 2020, message = "Ano inválido")
    private Integer ano;
}

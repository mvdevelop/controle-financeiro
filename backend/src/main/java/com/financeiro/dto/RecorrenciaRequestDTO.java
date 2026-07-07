package com.financeiro.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecorrenciaRequestDTO {

    @NotBlank(message = "Descrição é obrigatória")
    @Size(max = 200)
    private String descricao;

    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    private Double valor;

    @NotBlank(message = "Categoria é obrigatória")
    private String categoria;

    private String familia;

    @NotNull(message = "Dia de vencimento é obrigatório")
    @Min(value = 1, message = "Dia deve ser entre 1 e 31")
    @Max(value = 31, message = "Dia deve ser entre 1 e 31")
    private Integer diaVencimento;
}

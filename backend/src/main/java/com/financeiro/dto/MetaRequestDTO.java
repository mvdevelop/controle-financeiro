package com.financeiro.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MetaRequestDTO {

    @NotBlank(message = "Descrição é obrigatória")
    @Size(max = 200)
    private String descricao;

    @NotNull(message = "Valor da meta é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    private Double valorMeta;

    private Double valorAtual;

    private LocalDate dataLimite;

    private String cor;

    private String observacao;
}

package com.financeiro.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DespesaRequestDTO {
    
    @NotBlank(message = "Família é obrigatória")
    @Size(min = 3, max = 50, message = "Família deve ter entre 3 e 50 caracteres")
    private String familia;
    
    @NotBlank(message = "Categoria é obrigatória")
    private String categoria;
    
    @NotNull(message = "Valor é obrigatório")
    @Positive(message = "Valor deve ser positivo")
    @DecimalMin(value = "0.01", message = "Valor mínimo é R$ 0,01")
    private Double valor;
    
    @NotNull(message = "Data é obrigatória")
    @PastOrPresent(message = "Data não pode ser futura")
    private LocalDate data;
    
    @Size(max = 200, message = "Descrição deve ter no máximo 200 caracteres")
    private String descricao;
}

package com.financeiro.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "despesas")
public class Despesa {
    
    @Id
    private String id;
    
    @Indexed
    @Field("familia")
    private String familia;
    
    @Indexed
    @Field("categoria")
    private String categoria;
    
    @Field("valor")
    private Double valor;
    
    @Field("data")
    private LocalDate data;
    
    @Field("descricao")
    private String descricao;
    
    @Field("data_criacao")
    private LocalDateTime dataCriacao;
    
    @Field("data_atualizacao")
    private LocalDateTime dataAtualizacao;
}

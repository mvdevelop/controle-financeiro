package com.financeiro.repository;

import com.financeiro.model.Despesa;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DespesaRepository extends MongoRepository<Despesa, String> {
    
    // Buscar por família
    List<Despesa> findByFamilia(String familia);
    
    // Buscar por categoria
    List<Despesa> findByCategoria(String categoria);
    
    // Buscar por período
    List<Despesa> findByDataBetween(LocalDate startDate, LocalDate endDate);
    
    // Buscar por família e período
    List<Despesa> findByFamiliaAndDataBetween(String familia, LocalDate startDate, LocalDate endDate);
    
    // Buscar por categoria e período
    List<Despesa> findByCategoriaAndDataBetween(String categoria, LocalDate startDate, LocalDate endDate);
    
    // Query customizada com aggregation
    @Query("{ 'familia': ?0, 'valor': { $gt: ?1 } }")
    List<Despesa> findDespesasByFamiliaAndValorGreaterThan(String familia, Double valor);
    
    // Deletar por família
    void deleteByFamilia(String familia);
    
    // Contar por categoria
    long countByCategoria(String categoria);
    
    // Buscar despesas com valor acima de um limite
    List<Despesa> findByValorGreaterThan(Double valor);
}

package com.financeiro.repository;

import com.financeiro.model.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    List<Despesa> findByFamilia(String familia);

    List<Despesa> findByCategoria(String categoria);

    List<Despesa> findByDataBetween(LocalDate startDate, LocalDate endDate);

    List<Despesa> findByFamiliaAndDataBetween(String familia, LocalDate startDate, LocalDate endDate);

    List<Despesa> findByCategoriaAndDataBetween(String categoria, LocalDate startDate, LocalDate endDate);

    @Query("SELECT d FROM Despesa d WHERE d.familia = ?1 AND d.valor > ?2")
    List<Despesa> findDespesasByFamiliaAndValorGreaterThan(String familia, Double valor);

    void deleteByFamilia(String familia);

    long countByCategoria(String categoria);

    List<Despesa> findByValorGreaterThan(Double valor);
}

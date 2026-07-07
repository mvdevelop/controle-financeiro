package com.financeiro.repository;

import com.financeiro.model.Despesa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DespesaRepository extends JpaRepository<Despesa, Long> {

    List<Despesa> findByFamilia(String familia);

    List<Despesa> findByCategoria(String categoria);

    List<Despesa> findByDataBetween(LocalDate startDate, LocalDate endDate);

    Page<Despesa> findByDataBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);

    List<Despesa> findByFamiliaAndDataBetween(String familia, LocalDate startDate, LocalDate endDate);

    List<Despesa> findByCategoriaAndDataBetween(String categoria, LocalDate startDate, LocalDate endDate);

    @Query("SELECT d FROM Despesa d WHERE d.familia = ?1 AND d.valor > ?2")
    List<Despesa> findDespesasByFamiliaAndValorGreaterThan(String familia, Double valor);

    void deleteByFamilia(String familia);

    long countByCategoria(String categoria);

    List<Despesa> findByValorGreaterThan(Double valor);

    // === Aggregation queries (database-level, replaces in-memory) ===

    @Query("SELECT COALESCE(SUM(d.valor), 0) FROM Despesa d WHERE d.familia = :familia AND d.categoria = :categoria AND d.data BETWEEN :inicio AND :fim")
    Double sumByFamiliaAndCategoriaAndDataBetween(@Param("familia") String familia, @Param("categoria") String categoria, @Param("inicio") LocalDate inicio, @Param("fim") LocalDate fim);

    @Query("SELECT COALESCE(SUM(d.valor), 0) FROM Despesa d WHERE d.categoria = :categoria AND d.data BETWEEN :inicio AND :fim")
    Double sumByCategoriaAndDataBetween(@Param("categoria") String categoria, @Param("inicio") LocalDate inicio, @Param("fim") LocalDate fim);

    @Query("SELECT COALESCE(SUM(d.valor), 0) FROM Despesa d WHERE d.data BETWEEN :inicio AND :fim")
    Double sumByDataBetween(@Param("inicio") LocalDate inicio, @Param("fim") LocalDate fim);

    @Query("SELECT d.familia AS familia, COALESCE(SUM(d.valor), 0) AS total FROM Despesa d GROUP BY d.familia")
    List<Object[]> sumTotalPorFamilia();

    @Query("SELECT d.categoria AS categoria, COALESCE(SUM(d.valor), 0) AS total FROM Despesa d GROUP BY d.categoria")
    List<Object[]> sumTotalPorCategoria();

    @Query("SELECT COALESCE(SUM(d.valor), 0) FROM Despesa d")
    Double sumTotalGeral();

    @Query("SELECT d.familia AS familia, COUNT(d) AS qtd, COALESCE(SUM(d.valor), 0) AS total, COALESCE(AVG(d.valor), 0) AS media FROM Despesa d GROUP BY d.familia")
    List<Object[]> resumoCompletoPorFamilia();

    // === Text search ===
    @Query("SELECT d FROM Despesa d WHERE LOWER(d.descricao) LIKE LOWER(CONCAT('%', :termo, '%'))")
    List<Despesa> searchByDescricao(@Param("termo") String termo);

    @Query("SELECT d FROM Despesa d WHERE LOWER(d.descricao) LIKE LOWER(CONCAT('%', :termo, '%')) AND d.data BETWEEN :inicio AND :fim")
    List<Despesa> searchByDescricaoEPeriodo(@Param("termo") String termo, @Param("inicio") LocalDate inicio, @Param("fim") LocalDate fim);

    // === Monthly aggregation for charts ===
    @Query(value = "SELECT EXTRACT(YEAR FROM d.data) AS ano, EXTRACT(MONTH FROM d.data) AS mes, COALESCE(SUM(d.valor), 0) AS total FROM despesas d WHERE d.data >= :dataInicio GROUP BY EXTRACT(YEAR FROM d.data), EXTRACT(MONTH FROM d.data) ORDER BY ano, mes", nativeQuery = true)
    List<Object[]> sumByMonth(@Param("dataInicio") LocalDate dataInicio);
}

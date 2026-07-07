package com.financeiro.repository;

import com.financeiro.model.Orcamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrcamentoRepository extends JpaRepository<Orcamento, Long> {

    List<Orcamento> findByFamilia(String familia);

    List<Orcamento> findByMesAndAno(Integer mes, Integer ano);

    List<Orcamento> findByFamiliaAndMesAndAno(String familia, Integer mes, Integer ano);

    Optional<Orcamento> findByFamiliaAndCategoriaAndMesAndAno(String familia, String categoria, Integer mes, Integer ano);
}

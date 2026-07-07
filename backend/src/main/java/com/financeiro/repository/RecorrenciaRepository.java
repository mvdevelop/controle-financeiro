package com.financeiro.repository;

import com.financeiro.model.Recorrencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecorrenciaRepository extends JpaRepository<Recorrencia, Long> {

    List<Recorrencia> findByAtivoTrue();

    List<Recorrencia> findByDiaVencimentoAndAtivoTrue(Integer diaVencimento);

    @Query("SELECT r FROM Recorrencia r WHERE r.ativo = true ORDER BY r.diaVencimento ASC")
    List<Recorrencia> findAllAtivasOrderByDiaVencimento();
}

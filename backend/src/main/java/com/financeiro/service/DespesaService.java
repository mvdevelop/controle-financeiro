package com.financeiro.service;

import com.financeiro.dto.DespesaRequestDTO;
import com.financeiro.dto.DespesaResponseDTO;
import com.financeiro.dto.ResumoFamiliaDTO;
import com.financeiro.model.Despesa;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface DespesaService {

    List<DespesaResponseDTO> listarTodas();
    DespesaResponseDTO buscarPorId(Long id);
    DespesaResponseDTO criar(DespesaRequestDTO despesaDTO);
    DespesaResponseDTO atualizar(Long id, DespesaRequestDTO despesaDTO);
    void deletar(Long id);

    List<DespesaResponseDTO> buscarPorFamilia(String familia);
    List<DespesaResponseDTO> buscarPorCategoria(String categoria);
    List<DespesaResponseDTO> buscarPorPeriodo(LocalDate inicio, LocalDate fim);

    Map<String, Double> getTotalPorFamilia();
    Map<String, Double> getTotalPorCategoria();
    List<ResumoFamiliaDTO> getResumoCompletoPorFamilia();
    Double getTotalGeral();

    Double getMediaGastosPorFamilia(String familia);
    Integer getQuantidadeDespesasPorCategoria(String categoria);

    DespesaResponseDTO convertToResponseDTO(Despesa despesa);
}

package com.financeiro.service;

import com.financeiro.dto.DespesaRequestDTO;
import com.financeiro.dto.DespesaResponseDTO;
import com.financeiro.dto.ResumoFamiliaDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface DespesaService {
    
    // CRUD básico
    List<DespesaResponseDTO> listarTodas();
    DespesaResponseDTO buscarPorId(String id);
    DespesaResponseDTO criar(DespesaRequestDTO despesaDTO);
    DespesaResponseDTO atualizar(String id, DespesaRequestDTO despesaDTO);
    void deletar(String id);
    
    // Buscas específicas
    List<DespesaResponseDTO> buscarPorFamilia(String familia);
    List<DespesaResponseDTO> buscarPorCategoria(String categoria);
    List<DespesaResponseDTO> buscarPorPeriodo(LocalDate inicio, LocalDate fim);
    
    // Resumos e relatórios
    Map<String, Double> getTotalPorFamilia();
    Map<String, Double> getTotalPorCategoria();
    List<ResumoFamiliaDTO> getResumoCompletoPorFamilia();
    Double getTotalGeral();
    
    // Estatísticas
    Double getMediaGastosPorFamilia(String familia);
    Integer getQuantidadeDespesasPorCategoria(String categoria);
}

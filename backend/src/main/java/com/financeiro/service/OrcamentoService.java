package com.financeiro.service;

import com.financeiro.dto.OrcamentoProgressDTO;
import com.financeiro.dto.OrcamentoRequestDTO;
import com.financeiro.dto.OrcamentoResponseDTO;

import java.util.List;

public interface OrcamentoService {

    List<OrcamentoResponseDTO> listarTodos();

    OrcamentoResponseDTO buscarPorId(Long id);

    OrcamentoResponseDTO criar(OrcamentoRequestDTO dto);

    OrcamentoResponseDTO atualizar(Long id, OrcamentoRequestDTO dto);

    void deletar(Long id);

    List<OrcamentoResponseDTO> buscarPorPeriodo(Integer mes, Integer ano);

    List<OrcamentoProgressDTO> calcularProgresso(Integer mes, Integer ano);

    List<OrcamentoProgressDTO> calcularProgressoFamilia(String familia, Integer mes, Integer ano);
}

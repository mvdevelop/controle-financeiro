package com.financeiro.service;

import com.financeiro.dto.RecorrenciaRequestDTO;
import com.financeiro.dto.RecorrenciaResponseDTO;

import java.util.List;

public interface RecorrenciaService {

    List<RecorrenciaResponseDTO> listarTodas();

    RecorrenciaResponseDTO buscarPorId(Long id);

    RecorrenciaResponseDTO criar(RecorrenciaRequestDTO dto);

    RecorrenciaResponseDTO atualizar(Long id, RecorrenciaRequestDTO dto);

    void toggleAtivo(Long id);

    void deletar(Long id);

    List<RecorrenciaResponseDTO> listarProximas(Integer dias);
}

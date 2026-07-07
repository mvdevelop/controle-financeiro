package com.financeiro.service;

import com.financeiro.dto.MetaRequestDTO;
import com.financeiro.dto.MetaResponseDTO;

import java.util.List;

public interface MetaService {

    List<MetaResponseDTO> listarTodas();

    MetaResponseDTO buscarPorId(Long id);

    MetaResponseDTO criar(MetaRequestDTO dto);

    MetaResponseDTO atualizar(Long id, MetaRequestDTO dto);

    MetaResponseDTO atualizarProgresso(Long id, Double valorAtual);

    void deletar(Long id);
}

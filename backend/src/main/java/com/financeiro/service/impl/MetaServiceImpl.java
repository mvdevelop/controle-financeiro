package com.financeiro.service.impl;

import com.financeiro.dto.MetaRequestDTO;
import com.financeiro.dto.MetaResponseDTO;
import com.financeiro.exception.ResourceNotFoundException;
import com.financeiro.model.Meta;
import com.financeiro.repository.MetaRepository;
import com.financeiro.service.MetaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MetaServiceImpl implements MetaService {

    private final MetaRepository metaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MetaResponseDTO> listarTodas() {
        return metaRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MetaResponseDTO buscarPorId(Long id) {
        Meta meta = metaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meta não encontrada com ID: " + id));
        return toResponseDTO(meta);
    }

    @Override
    @Transactional
    public MetaResponseDTO criar(MetaRequestDTO dto) {
        Meta meta = new Meta();
        meta.setDescricao(dto.getDescricao());
        meta.setValorMeta(dto.getValorMeta());
        meta.setValorAtual(dto.getValorAtual() != null ? dto.getValorAtual() : 0.0);
        meta.setDataLimite(dto.getDataLimite());
        meta.setStatus("EM_ANDAMENTO");
        meta.setCor(dto.getCor() != null ? dto.getCor() : "#059669");
        meta.setObservacao(dto.getObservacao());
        meta.setDataCriacao(LocalDateTime.now());
        meta.setDataAtualizacao(LocalDateTime.now());

        Meta saved = metaRepository.save(meta);
        return toResponseDTO(saved);
    }

    @Override
    @Transactional
    public MetaResponseDTO atualizar(Long id, MetaRequestDTO dto) {
        Meta meta = metaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meta não encontrada com ID: " + id));

        meta.setDescricao(dto.getDescricao());
        meta.setValorMeta(dto.getValorMeta());
        if (dto.getValorAtual() != null) meta.setValorAtual(dto.getValorAtual());
        meta.setDataLimite(dto.getDataLimite());
        meta.setCor(dto.getCor() != null ? dto.getCor() : meta.getCor());
        meta.setObservacao(dto.getObservacao());
        meta.setDataAtualizacao(LocalDateTime.now());

        // Auto-update status
        if (meta.getValorAtual() >= meta.getValorMeta()) {
            meta.setStatus("CONCLUIDA");
        }

        Meta updated = metaRepository.save(meta);
        return toResponseDTO(updated);
    }

    @Override
    @Transactional
    public MetaResponseDTO atualizarProgresso(Long id, Double valorAtual) {
        Meta meta = metaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meta não encontrada com ID: " + id));

        meta.setValorAtual(valorAtual);
        meta.setDataAtualizacao(LocalDateTime.now());

        if (meta.getValorAtual() >= meta.getValorMeta()) {
            meta.setStatus("CONCLUIDA");
        }

        Meta updated = metaRepository.save(meta);
        return toResponseDTO(updated);
    }

    @Override
    @Transactional
    public void deletar(Long id) {
        Meta meta = metaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meta não encontrada com ID: " + id));
        meta.setStatus("CANCELADA");
        meta.setDataAtualizacao(LocalDateTime.now());
        metaRepository.save(meta);
    }

    private MetaResponseDTO toResponseDTO(Meta meta) {
        double percentual = meta.getValorMeta() > 0
                ? (meta.getValorAtual() / meta.getValorMeta()) * 100.0
                : 0.0;

        return new MetaResponseDTO(
                meta.getId(), meta.getDescricao(),
                meta.getValorMeta(), meta.getValorAtual(),
                percentual, meta.getDataLimite(),
                meta.getStatus(), meta.getCor(),
                meta.getObservacao(),
                meta.getDataCriacao(), meta.getDataAtualizacao()
        );
    }
}

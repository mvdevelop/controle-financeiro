package com.financeiro.service.impl;

import com.financeiro.dto.RecorrenciaRequestDTO;
import com.financeiro.dto.RecorrenciaResponseDTO;
import com.financeiro.exception.ResourceNotFoundException;
import com.financeiro.model.Recorrencia;
import com.financeiro.repository.RecorrenciaRepository;
import com.financeiro.service.RecorrenciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecorrenciaServiceImpl implements RecorrenciaService {

    private final RecorrenciaRepository recorrenciaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<RecorrenciaResponseDTO> listarTodas() {
        return recorrenciaRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public RecorrenciaResponseDTO buscarPorId(Long id) {
        Recorrencia r = recorrenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recorrência não encontrada com ID: " + id));
        return toResponseDTO(r);
    }

    @Override
    @Transactional
    public RecorrenciaResponseDTO criar(RecorrenciaRequestDTO dto) {
        Recorrencia r = new Recorrencia();
        r.setDescricao(dto.getDescricao());
        r.setValor(dto.getValor());
        r.setCategoria(dto.getCategoria());
        r.setFamilia(dto.getFamilia());
        r.setDiaVencimento(dto.getDiaVencimento());
        r.setAtivo(true);
        r.setDataCriacao(java.time.LocalDateTime.now());
        r.setDataAtualizacao(java.time.LocalDateTime.now());
        return toResponseDTO(recorrenciaRepository.save(r));
    }

    @Override
    @Transactional
    public RecorrenciaResponseDTO atualizar(Long id, RecorrenciaRequestDTO dto) {
        Recorrencia r = recorrenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recorrência não encontrada com ID: " + id));
        r.setDescricao(dto.getDescricao());
        r.setValor(dto.getValor());
        r.setCategoria(dto.getCategoria());
        r.setFamilia(dto.getFamilia());
        r.setDiaVencimento(dto.getDiaVencimento());
        r.setDataAtualizacao(java.time.LocalDateTime.now());
        return toResponseDTO(recorrenciaRepository.save(r));
    }

    @Override
    @Transactional
    public void toggleAtivo(Long id) {
        Recorrencia r = recorrenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recorrência não encontrada com ID: " + id));
        r.setAtivo(!r.getAtivo());
        r.setDataAtualizacao(java.time.LocalDateTime.now());
        recorrenciaRepository.save(r);
    }

    @Override
    @Transactional
    public void deletar(Long id) {
        if (!recorrenciaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Recorrência não encontrada com ID: " + id);
        }
        recorrenciaRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RecorrenciaResponseDTO> listarProximas(Integer dias) {
        LocalDate hoje = LocalDate.now();
        List<Recorrencia> ativas = recorrenciaRepository.findAllAtivasOrderByDiaVencimento();

        return ativas.stream()
                .filter(r -> {
                    // Verifica se o dia de vencimento está nos próximos N dias
                    int diaAtual = hoje.getDayOfMonth();
                    int diasNoMes = hoje.lengthOfMonth();
                    int diaVenc = r.getDiaVencimento();

                    if (diaVenc >= diaAtual && diaVenc <= diaAtual + dias) {
                        return true; // Vence este mês
                    }
                    // Vence no próximo mês dentro do período
                    int diasRestantesNoMes = diasNoMes - diaAtual;
                    if (diasRestantesNoMes < dias && diaVenc <= dias - diasRestantesNoMes) {
                        return true;
                    }
                    return false;
                })
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    private RecorrenciaResponseDTO toResponseDTO(Recorrencia r) {
        return new RecorrenciaResponseDTO(
                r.getId(), r.getDescricao(), r.getValor(),
                r.getCategoria(), r.getFamilia(), r.getDiaVencimento(),
                r.getAtivo(), r.getDataCriacao(), r.getDataAtualizacao()
        );
    }
}

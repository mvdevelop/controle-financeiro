package com.financeiro.service.impl;

import com.financeiro.dto.DespesaRequestDTO;
import com.financeiro.dto.DespesaResponseDTO;
import com.financeiro.dto.ResumoFamiliaDTO;
import com.financeiro.exception.ResourceNotFoundException;
import com.financeiro.model.Despesa;
import com.financeiro.repository.DespesaRepository;
import com.financeiro.service.DespesaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DespesaServiceImpl implements DespesaService {

    private final DespesaRepository despesaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<DespesaResponseDTO> listarTodas() {
        return despesaRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DespesaResponseDTO buscarPorId(Long id) {
        Despesa despesa = despesaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrada com ID: " + id));
        return convertToResponseDTO(despesa);
    }

    @Override
    @Transactional
    public DespesaResponseDTO criar(DespesaRequestDTO despesaDTO) {
        Despesa despesa = convertToEntity(despesaDTO);
        despesa.setDataCriacao(LocalDateTime.now());
        despesa.setDataAtualizacao(LocalDateTime.now());

        Despesa saved = despesaRepository.save(despesa);
        return convertToResponseDTO(saved);
    }

    @Override
    @Transactional
    public DespesaResponseDTO atualizar(Long id, DespesaRequestDTO despesaDTO) {
        Despesa despesaExistente = despesaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrada com ID: " + id));

        despesaExistente.setFamilia(despesaDTO.getFamilia());
        despesaExistente.setCategoria(despesaDTO.getCategoria());
        despesaExistente.setValor(despesaDTO.getValor());
        despesaExistente.setData(despesaDTO.getData());
        despesaExistente.setDescricao(despesaDTO.getDescricao());
        despesaExistente.setDataAtualizacao(LocalDateTime.now());

        Despesa updated = despesaRepository.save(despesaExistente);
        return convertToResponseDTO(updated);
    }

    @Override
    @Transactional
    public void deletar(Long id) {
        if (!despesaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Despesa não encontrada com ID: " + id);
        }
        despesaRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DespesaResponseDTO> buscarPorFamilia(String familia) {
        return despesaRepository.findByFamilia(familia)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DespesaResponseDTO> buscarPorCategoria(String categoria) {
        return despesaRepository.findByCategoria(categoria)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DespesaResponseDTO> buscarPorPeriodo(LocalDate inicio, LocalDate fim) {
        return despesaRepository.findByDataBetween(inicio, fim)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getTotalPorFamilia() {
        List<Object[]> result = despesaRepository.sumTotalPorFamilia();
        Map<String, Double> totalPorFamilia = new HashMap<>();
        for (Object[] row : result) {
            totalPorFamilia.put((String) row[0], (Double) row[1]);
        }
        return totalPorFamilia;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Double> getTotalPorCategoria() {
        List<Object[]> result = despesaRepository.sumTotalPorCategoria();
        Map<String, Double> totalPorCategoria = new HashMap<>();
        for (Object[] row : result) {
            totalPorCategoria.put((String) row[0], (Double) row[1]);
        }
        return totalPorCategoria;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ResumoFamiliaDTO> getResumoCompletoPorFamilia() {
        List<Object[]> result = despesaRepository.resumoCompletoPorFamilia();
        return result.stream()
                .map(row -> new ResumoFamiliaDTO(
                        (String) row[0],
                        ((Number) row[2]).doubleValue(),
                        ((Number) row[1]).intValue(),
                        ((Number) row[3]).doubleValue()
                ))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Double getTotalGeral() {
        Double total = despesaRepository.sumTotalGeral();
        return total != null ? total : 0.0;
    }

    @Override
    @Transactional(readOnly = true)
    public Double getMediaGastosPorFamilia(String familia) {
        List<Despesa> despesasFamilia = despesaRepository.findByFamilia(familia);
        if (despesasFamilia.isEmpty()) return 0.0;

        Double total = despesasFamilia.stream()
                .mapToDouble(Despesa::getValor)
                .sum();

        return total / despesasFamilia.size();
    }

    @Override
    @Transactional(readOnly = true)
    public Integer getQuantidadeDespesasPorCategoria(String categoria) {
        return (int) despesaRepository.countByCategoria(categoria);
    }

    @Override
    public DespesaResponseDTO convertToResponseDTO(Despesa despesa) {
        return new DespesaResponseDTO(
                despesa.getId(),
                despesa.getFamilia(),
                despesa.getCategoria(),
                despesa.getValor(),
                despesa.getData(),
                despesa.getDescricao(),
                despesa.getDataCriacao(),
                despesa.getDataAtualizacao()
        );
    }

    private Despesa convertToEntity(DespesaRequestDTO dto) {
        Despesa despesa = new Despesa();
        despesa.setFamilia(dto.getFamilia());
        despesa.setCategoria(dto.getCategoria());
        despesa.setValor(dto.getValor());
        despesa.setData(dto.getData());
        despesa.setDescricao(dto.getDescricao());
        return despesa;
    }
}

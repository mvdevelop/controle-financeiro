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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DespesaServiceImpl implements DespesaService {
    
    private final DespesaRepository despesaRepository;
    
    @Override
    public List<DespesaResponseDTO> listarTodas() {
        return despesaRepository.findAll()
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public DespesaResponseDTO buscarPorId(String id) {
        Despesa despesa = despesaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrada com ID: " + id));
        return convertToResponseDTO(despesa);
    }
    
    @Override
    public DespesaResponseDTO criar(DespesaRequestDTO despesaDTO) {
        Despesa despesa = convertToEntity(despesaDTO);
        despesa.setDataCriacao(LocalDateTime.now());
        despesa.setDataAtualizacao(LocalDateTime.now());
        
        Despesa saved = despesaRepository.save(despesa);
        return convertToResponseDTO(saved);
    }
    
    @Override
    public DespesaResponseDTO atualizar(String id, DespesaRequestDTO despesaDTO) {
        Despesa despesaExistente = despesaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Despesa não encontrada com ID: " + id));
        
        // Atualizar campos
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
    public void deletar(String id) {
        if (!despesaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Despesa não encontrada com ID: " + id);
        }
        despesaRepository.deleteById(id);
    }
    
    @Override
    public List<DespesaResponseDTO> buscarPorFamilia(String familia) {
        return despesaRepository.findByFamilia(familia)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<DespesaResponseDTO> buscarPorCategoria(String categoria) {
        return despesaRepository.findByCategoria(categoria)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<DespesaResponseDTO> buscarPorPeriodo(LocalDate inicio, LocalDate fim) {
        return despesaRepository.findByDataBetween(inicio, fim)
                .stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public Map<String, Double> getTotalPorFamilia() {
        List<Despesa> despesas = despesaRepository.findAll();
        Map<String, Double> totalPorFamilia = new HashMap<>();
        
        for (Despesa despesa : despesas) {
            totalPorFamilia.merge(despesa.getFamilia(), despesa.getValor(), Double::sum);
        }
        
        return totalPorFamilia;
    }
    
    @Override
    public Map<String, Double> getTotalPorCategoria() {
        List<Despesa> despesas = despesaRepository.findAll();
        Map<String, Double> totalPorCategoria = new HashMap<>();
        
        for (Despesa despesa : despesas) {
            totalPorCategoria.merge(despesa.getCategoria(), despesa.getValor(), Double::sum);
        }
        
        return totalPorCategoria;
    }
    
    @Override
    public List<ResumoFamiliaDTO> getResumoCompletoPorFamilia() {
        List<Despesa> despesas = despesaRepository.findAll();
        Map<String, List<Despesa>> despesasPorFamilia = despesas.stream()
                .collect(Collectors.groupingBy(Despesa::getFamilia));
        
        return despesasPorFamilia.entrySet().stream()
                .map(entry -> {
                    String familia = entry.getKey();
                    List<Despesa> despesasFamilia = entry.getValue();
                    Double total = despesasFamilia.stream()
                            .mapToDouble(Despesa::getValor)
                            .sum();
                    Integer quantidade = despesasFamilia.size();
                    Double media = quantidade > 0 ? total / quantidade : 0.0;
                    
                    return new ResumoFamiliaDTO(familia, total, quantidade, media);
                })
                .collect(Collectors.toList());
    }
    
    @Override
    public Double getTotalGeral() {
        return despesaRepository.findAll()
                .stream()
                .mapToDouble(Despesa::getValor)
                .sum();
    }
    
    @Override
    public Double getMediaGastosPorFamilia(String familia) {
        List<Despesa> despesasFamilia = despesaRepository.findByFamilia(familia);
        if (despesasFamilia.isEmpty()) return 0.0;
        
        Double total = despesasFamilia.stream()
                .mapToDouble(Despesa::getValor)
                .sum();
        
        return total / despesasFamilia.size();
    }
    
    @Override
    public Integer getQuantidadeDespesasPorCategoria(String categoria) {
        return (int) despesaRepository.countByCategoria(categoria);
    }
    
    // Métodos privados de conversão
    private DespesaResponseDTO convertToResponseDTO(Despesa despesa) {
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

package com.financeiro.service.impl;

import com.financeiro.dto.DespesaResponseDTO;
import com.financeiro.dto.RelatorioDTO;
import com.financeiro.model.Despesa;
import com.financeiro.repository.DespesaRepository;
import com.financeiro.service.RelatorioService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RelatorioServiceImpl implements RelatorioService {
    
    private final DespesaRepository despesaRepository;
    private final DespesaServiceImpl despesaService;
    
    @Override
    public RelatorioDTO gerarRelatorioPeriodo(LocalDate inicio, LocalDate fim) {
        List<Despesa> despesas = despesaRepository.findByDataBetween(inicio, fim);
        
        Map<String, Double> totalPorFamilia = new HashMap<>();
        Map<String, Double> totalPorCategoria = new HashMap<>();
        Double totalGeral = 0.0;
        
        for (Despesa despesa : despesas) {
            totalGeral += despesa.getValor();
            totalPorFamilia.merge(despesa.getFamilia(), despesa.getValor(), Double::sum);
            totalPorCategoria.merge(despesa.getCategoria(), despesa.getValor(), Double::sum);
        }
        
        List<DespesaResponseDTO> despesasDTO = despesas.stream()
                .map(despesaService::convertToResponseDTO)
                .collect(Collectors.toList());
        
        return new RelatorioDTO(
                inicio, fim, totalGeral, despesas.size(),
                totalPorFamilia, totalPorCategoria, despesasDTO
        );
    }
    
    @Override
    public RelatorioDTO gerarRelatorioFamilia(String familia, LocalDate inicio, LocalDate fim) {
        List<Despesa> despesas = despesaRepository.findByFamiliaAndDataBetween(familia, inicio, fim);
        
        Map<String, Double> totalPorCategoria = new HashMap<>();
        Double totalGeral = 0.0;
        
        for (Despesa despesa : despesas) {
            totalGeral += despesa.getValor();
            totalPorCategoria.merge(despesa.getCategoria(), despesa.getValor(), Double::sum);
        }
        
        Map<String, Double> totalPorFamilia = new HashMap<>();
        totalPorFamilia.put(familia, totalGeral);
        
        List<DespesaResponseDTO> despesasDTO = despesas.stream()
                .map(despesaService::convertToResponseDTO)
                .collect(Collectors.toList());
        
        return new RelatorioDTO(
                inicio, fim, totalGeral, despesas.size(),
                totalPorFamilia, totalPorCategoria, despesasDTO
        );
    }
    
    @Override
    public byte[] exportarRelatorioCSV(LocalDate inicio, LocalDate fim) {
        RelatorioDTO relatorio = gerarRelatorioPeriodo(inicio, fim);
        
        StringBuilder csv = new StringBuilder();
        csv.append("ID,Família,Categoria,Valor,Data,Descrição\n");
        
        for (DespesaResponseDTO despesa : relatorio.getDespesas()) {
            csv.append(String.format("%s,%s,%s,%.2f,%s,%s\n",
                    despesa.getId(),
                    despesa.getFamilia(),
                    despesa.getCategoria(),
                    despesa.getValor(),
                    despesa.getData(),
                    despesa.getDescricao() != null ? despesa.getDescricao() : ""
            ));
        }
        
        csv.append("\n");
        csv.append("Total Geral,").append(relatorio.getTotalGeral()).append("\n");
        
        return csv.toString().getBytes();
    }
}

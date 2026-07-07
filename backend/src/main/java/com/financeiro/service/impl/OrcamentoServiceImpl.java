package com.financeiro.service.impl;

import com.financeiro.dto.OrcamentoProgressDTO;
import com.financeiro.dto.OrcamentoRequestDTO;
import com.financeiro.dto.OrcamentoResponseDTO;
import com.financeiro.exception.ResourceNotFoundException;
import com.financeiro.model.Orcamento;
import com.financeiro.repository.DespesaRepository;
import com.financeiro.repository.OrcamentoRepository;
import com.financeiro.service.OrcamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrcamentoServiceImpl implements OrcamentoService {

    private final OrcamentoRepository orcamentoRepository;
    private final DespesaRepository despesaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<OrcamentoResponseDTO> listarTodos() {
        return orcamentoRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OrcamentoResponseDTO buscarPorId(Long id) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Orçamento não encontrado com ID: " + id));
        return toResponseDTO(orcamento);
    }

    @Override
    @Transactional
    public OrcamentoResponseDTO criar(OrcamentoRequestDTO dto) {
        Orcamento orcamento = new Orcamento();
        orcamento.setFamilia(dto.getFamilia());
        orcamento.setCategoria(dto.getCategoria());
        orcamento.setValorLimite(dto.getValorLimite());
        orcamento.setMes(dto.getMes());
        orcamento.setAno(dto.getAno());
        orcamento.setDataCriacao(LocalDateTime.now());
        orcamento.setDataAtualizacao(LocalDateTime.now());

        Orcamento saved = orcamentoRepository.save(orcamento);
        return toResponseDTO(saved);
    }

    @Override
    @Transactional
    public OrcamentoResponseDTO atualizar(Long id, OrcamentoRequestDTO dto) {
        Orcamento orcamento = orcamentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Orçamento não encontrado com ID: " + id));

        orcamento.setFamilia(dto.getFamilia());
        orcamento.setCategoria(dto.getCategoria());
        orcamento.setValorLimite(dto.getValorLimite());
        orcamento.setMes(dto.getMes());
        orcamento.setAno(dto.getAno());
        orcamento.setDataAtualizacao(LocalDateTime.now());

        Orcamento updated = orcamentoRepository.save(orcamento);
        return toResponseDTO(updated);
    }

    @Override
    @Transactional
    public void deletar(Long id) {
        if (!orcamentoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Orçamento não encontrado com ID: " + id);
        }
        orcamentoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrcamentoResponseDTO> buscarPorPeriodo(Integer mes, Integer ano) {
        return orcamentoRepository.findByMesAndAno(mes, ano).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrcamentoProgressDTO> calcularProgresso(Integer mes, Integer ano) {
        List<Orcamento> orcamentos = orcamentoRepository.findByMesAndAno(mes, ano);
        return calcularProgresso(orcamentos, mes, ano);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrcamentoProgressDTO> calcularProgressoFamilia(String familia, Integer mes, Integer ano) {
        List<Orcamento> orcamentos = orcamentoRepository.findByFamiliaAndMesAndAno(familia, mes, ano);
        return calcularProgresso(orcamentos, mes, ano);
    }

    private List<OrcamentoProgressDTO> calcularProgresso(List<Orcamento> orcamentos, Integer mes, Integer ano) {
        LocalDate inicio = LocalDate.of(ano, mes, 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());

        List<OrcamentoProgressDTO> progressos = new ArrayList<>();

        for (Orcamento orc : orcamentos) {
            Double gastoAtual;
            if (orc.getFamilia() != null && !orc.getFamilia().isEmpty()) {
                gastoAtual = despesaRepository.sumByFamiliaAndCategoriaAndDataBetween(
                        orc.getFamilia(), orc.getCategoria(), inicio, fim);
            } else {
                gastoAtual = despesaRepository.sumByCategoriaAndDataBetween(
                        orc.getCategoria(), inicio, fim);
            }

            if (gastoAtual == null) gastoAtual = 0.0;

            double percentual = orc.getValorLimite() > 0 ? (gastoAtual / orc.getValorLimite()) * 100.0 : 0.0;
            double restante = orc.getValorLimite() - gastoAtual;

            String status;
            if (percentual > 100) status = "EXCEEDED";
            else if (percentual >= 80) status = "CRITICAL";
            else if (percentual >= 60) status = "WARNING";
            else status = "SAFE";

            progressos.add(new OrcamentoProgressDTO(
                    orc.getId(), orc.getFamilia(), orc.getCategoria(),
                    orc.getValorLimite(), gastoAtual, percentual, restante,
                    status, mes, ano));
        }

        return progressos;
    }

    private OrcamentoResponseDTO toResponseDTO(Orcamento orcamento) {
        LocalDate inicio = LocalDate.of(orcamento.getAno(), orcamento.getMes(), 1);
        LocalDate fim = inicio.withDayOfMonth(inicio.lengthOfMonth());

        Double gastoAtual = despesaRepository.sumByFamiliaAndCategoriaAndDataBetween(
                orcamento.getFamilia(), orcamento.getCategoria(), inicio, fim);
        if (gastoAtual == null) gastoAtual = 0.0;

        double percentual = orcamento.getValorLimite() > 0 ? (gastoAtual / orcamento.getValorLimite()) * 100.0 : 0.0;

        return new OrcamentoResponseDTO(
                orcamento.getId(),
                orcamento.getFamilia(),
                orcamento.getCategoria(),
                orcamento.getValorLimite(),
                orcamento.getMes(),
                orcamento.getAno(),
                gastoAtual,
                percentual,
                orcamento.getDataCriacao(),
                orcamento.getDataAtualizacao()
        );
    }
}

package com.financeiro.service;

import com.financeiro.dto.RelatorioDTO;

import java.time.LocalDate;

public interface RelatorioService {
    RelatorioDTO gerarRelatorioPeriodo(LocalDate inicio, LocalDate fim);
    RelatorioDTO gerarRelatorioFamilia(String familia, LocalDate inicio, LocalDate fim);
    byte[] exportarRelatorioCSV(LocalDate inicio, LocalDate fim);
}

package com.financeiro.controller;

import com.financeiro.dto.RelatorioDTO;
import com.financeiro.service.RelatorioService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/relatorios")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class RelatorioController {
    
    private final RelatorioService relatorioService;
    
    @GetMapping("/periodo")
    public ResponseEntity<RelatorioDTO> gerarRelatorioPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return ResponseEntity.ok(relatorioService.gerarRelatorioPeriodo(inicio, fim));
    }
    
    @GetMapping("/familia/{familia}")
    public ResponseEntity<RelatorioDTO> gerarRelatorioFamilia(
            @PathVariable String familia,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return ResponseEntity.ok(relatorioService.gerarRelatorioFamilia(familia, inicio, fim));
    }
    
    @GetMapping("/export/csv")
    public ResponseEntity<byte[]> exportarCSV(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        
        byte[] csvData = relatorioService.exportarRelatorioCSV(inicio, fim);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_PLAIN);
        headers.setContentDispositionFormData("attachment", "relatorio_despesas.csv");
        headers.setContentLength(csvData.length);
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(csvData);
    }
}

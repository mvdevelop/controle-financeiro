package com.financeiro.controller;

import com.financeiro.dto.DespesaRequestDTO;
import com.financeiro.dto.DespesaResponseDTO;
import com.financeiro.dto.ResumoFamiliaDTO;
import com.financeiro.service.DespesaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/despesas")
@RequiredArgsConstructor
public class DespesaController {

    private final DespesaService despesaService;

    @GetMapping
    public ResponseEntity<List<DespesaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(despesaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DespesaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(despesaService.buscarPorId(id));
    }

    @GetMapping("/familia/{familia}")
    public ResponseEntity<List<DespesaResponseDTO>> buscarPorFamilia(@PathVariable String familia) {
        return ResponseEntity.ok(despesaService.buscarPorFamilia(familia));
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<DespesaResponseDTO>> buscarPorCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(despesaService.buscarPorCategoria(categoria));
    }

    @GetMapping("/periodo")
    public ResponseEntity<List<DespesaResponseDTO>> buscarPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return ResponseEntity.ok(despesaService.buscarPorPeriodo(inicio, fim));
    }

    @GetMapping("/resumo/familias")
    public ResponseEntity<Map<String, Double>> getTotalPorFamilia() {
        return ResponseEntity.ok(despesaService.getTotalPorFamilia());
    }

    @GetMapping("/resumo/categorias")
    public ResponseEntity<Map<String, Double>> getTotalPorCategoria() {
        return ResponseEntity.ok(despesaService.getTotalPorCategoria());
    }

    @GetMapping("/resumo/completo")
    public ResponseEntity<List<ResumoFamiliaDTO>> getResumoCompleto() {
        return ResponseEntity.ok(despesaService.getResumoCompletoPorFamilia());
    }

    @GetMapping("/total/geral")
    public ResponseEntity<Double> getTotalGeral() {
        return ResponseEntity.ok(despesaService.getTotalGeral());
    }

    @PostMapping
    public ResponseEntity<DespesaResponseDTO> criar(@Valid @RequestBody DespesaRequestDTO despesaDTO) {
        DespesaResponseDTO novaDespesa = despesaService.criar(despesaDTO);
        return new ResponseEntity<>(novaDespesa, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DespesaResponseDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody DespesaRequestDTO despesaDTO) {
        return ResponseEntity.ok(despesaService.atualizar(id, despesaDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        despesaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

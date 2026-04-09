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
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class DespesaController {
    
    private final DespesaService despesaService;
    
    // GET /api/despesas - Listar todas
    @GetMapping
    public ResponseEntity<List<DespesaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(despesaService.listarTodas());
    }
    
    // GET /api/despesas/{id} - Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<DespesaResponseDTO> buscarPorId(@PathVariable String id) {
        return ResponseEntity.ok(despesaService.buscarPorId(id));
    }
    
    // GET /api/despesas/familia/{familia} - Buscar por família
    @GetMapping("/familia/{familia}")
    public ResponseEntity<List<DespesaResponseDTO>> buscarPorFamilia(@PathVariable String familia) {
        return ResponseEntity.ok(despesaService.buscarPorFamilia(familia));
    }
    
    // GET /api/despesas/categoria/{categoria} - Buscar por categoria
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<DespesaResponseDTO>> buscarPorCategoria(@PathVariable String categoria) {
        return ResponseEntity.ok(despesaService.buscarPorCategoria(categoria));
    }
    
    // GET /api/despesas/periodo?inicio=2024-01-01&fim=2024-12-31
    @GetMapping("/periodo")
    public ResponseEntity<List<DespesaResponseDTO>> buscarPorPeriodo(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return ResponseEntity.ok(despesaService.buscarPorPeriodo(inicio, fim));
    }
    
    // GET /api/despesas/resumo/familias - Resumo por família
    @GetMapping("/resumo/familias")
    public ResponseEntity<Map<String, Double>> getTotalPorFamilia() {
        return ResponseEntity.ok(despesaService.getTotalPorFamilia());
    }
    
    // GET /api/despesas/resumo/categorias - Resumo por categoria
    @GetMapping("/resumo/categorias")
    public ResponseEntity<Map<String, Double>> getTotalPorCategoria() {
        return ResponseEntity.ok(despesaService.getTotalPorCategoria());
    }
    
    // GET /api/despesas/resumo/completo - Resumo completo
    @GetMapping("/resumo/completo")
    public ResponseEntity<List<ResumoFamiliaDTO>> getResumoCompleto() {
        return ResponseEntity.ok(despesaService.getResumoCompletoPorFamilia());
    }
    
    // GET /api/despesas/total/geral - Total geral
    @GetMapping("/total/geral")
    public ResponseEntity<Double> getTotalGeral() {
        return ResponseEntity.ok(despesaService.getTotalGeral());
    }
    
    // POST /api/despesas - Criar nova despesa
    @PostMapping
    public ResponseEntity<DespesaResponseDTO> criar(@Valid @RequestBody DespesaRequestDTO despesaDTO) {
        DespesaResponseDTO novaDespesa = despesaService.criar(despesaDTO);
        return new ResponseEntity<>(novaDespesa, HttpStatus.CREATED);
    }
    
    // PUT /api/despesas/{id} - Atualizar despesa
    @PutMapping("/{id}")
    public ResponseEntity<DespesaResponseDTO> atualizar(
            @PathVariable String id,
            @Valid @RequestBody DespesaRequestDTO despesaDTO) {
        return ResponseEntity.ok(despesaService.atualizar(id, despesaDTO));
    }
    
    // DELETE /api/despesas/{id} - Deletar despesa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable String id) {
        despesaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

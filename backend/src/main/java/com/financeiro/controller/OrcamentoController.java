package com.financeiro.controller;

import com.financeiro.dto.OrcamentoProgressDTO;
import com.financeiro.dto.OrcamentoRequestDTO;
import com.financeiro.dto.OrcamentoResponseDTO;
import com.financeiro.service.OrcamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orcamentos")
@RequiredArgsConstructor
public class OrcamentoController {

    private final OrcamentoService orcamentoService;

    @GetMapping
    public ResponseEntity<List<OrcamentoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(orcamentoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrcamentoResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(orcamentoService.buscarPorId(id));
    }

    @GetMapping("/periodo")
    public ResponseEntity<List<OrcamentoResponseDTO>> buscarPorPeriodo(
            @RequestParam Integer mes, @RequestParam Integer ano) {
        return ResponseEntity.ok(orcamentoService.buscarPorPeriodo(mes, ano));
    }

    @GetMapping("/progresso")
    public ResponseEntity<List<OrcamentoProgressDTO>> calcularProgresso(
            @RequestParam Integer mes, @RequestParam Integer ano) {
        return ResponseEntity.ok(orcamentoService.calcularProgresso(mes, ano));
    }

    @GetMapping("/progresso/familia/{familia}")
    public ResponseEntity<List<OrcamentoProgressDTO>> calcularProgressoFamilia(
            @PathVariable String familia,
            @RequestParam Integer mes, @RequestParam Integer ano) {
        return ResponseEntity.ok(orcamentoService.calcularProgressoFamilia(familia, mes, ano));
    }

    @PostMapping
    public ResponseEntity<OrcamentoResponseDTO> criar(@Valid @RequestBody OrcamentoRequestDTO dto) {
        OrcamentoResponseDTO response = orcamentoService.criar(dto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrcamentoResponseDTO> atualizar(
            @PathVariable Long id, @Valid @RequestBody OrcamentoRequestDTO dto) {
        return ResponseEntity.ok(orcamentoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        orcamentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

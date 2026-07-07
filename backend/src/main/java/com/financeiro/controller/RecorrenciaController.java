package com.financeiro.controller;

import com.financeiro.dto.RecorrenciaRequestDTO;
import com.financeiro.dto.RecorrenciaResponseDTO;
import com.financeiro.service.RecorrenciaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recorrencias")
@RequiredArgsConstructor
public class RecorrenciaController {

    private final RecorrenciaService recorrenciaService;

    @GetMapping
    public ResponseEntity<List<RecorrenciaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(recorrenciaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecorrenciaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(recorrenciaService.buscarPorId(id));
    }

    @GetMapping("/proximas")
    public ResponseEntity<List<RecorrenciaResponseDTO>> listarProximas(
            @RequestParam(defaultValue = "30") Integer dias) {
        return ResponseEntity.ok(recorrenciaService.listarProximas(dias));
    }

    @PostMapping
    public ResponseEntity<RecorrenciaResponseDTO> criar(@Valid @RequestBody RecorrenciaRequestDTO dto) {
        return new ResponseEntity<>(recorrenciaService.criar(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecorrenciaResponseDTO> atualizar(
            @PathVariable Long id, @Valid @RequestBody RecorrenciaRequestDTO dto) {
        return ResponseEntity.ok(recorrenciaService.atualizar(id, dto));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Void> toggleAtivo(@PathVariable Long id) {
        recorrenciaService.toggleAtivo(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        recorrenciaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

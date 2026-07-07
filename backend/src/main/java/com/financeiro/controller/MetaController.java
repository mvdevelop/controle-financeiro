package com.financeiro.controller;

import com.financeiro.dto.MetaRequestDTO;
import com.financeiro.dto.MetaResponseDTO;
import com.financeiro.service.MetaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metas")
@RequiredArgsConstructor
public class MetaController {

    private final MetaService metaService;

    @GetMapping
    public ResponseEntity<List<MetaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(metaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MetaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(metaService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<MetaResponseDTO> criar(@Valid @RequestBody MetaRequestDTO dto) {
        return new ResponseEntity<>(metaService.criar(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MetaResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody MetaRequestDTO dto) {
        return ResponseEntity.ok(metaService.atualizar(id, dto));
    }

    @PatchMapping("/{id}/progresso")
    public ResponseEntity<MetaResponseDTO> atualizarProgresso(
            @PathVariable Long id, @RequestParam Double valorAtual) {
        return ResponseEntity.ok(metaService.atualizarProgresso(id, valorAtual));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        metaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}

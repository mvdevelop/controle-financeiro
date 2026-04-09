package com.financeiro.controller;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@RequiredArgsConstructor
public class HealthController {
    
    private final MongoClient mongoClient;
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            MongoDatabase database = mongoClient.getDatabase("financeiro_familiar");
            database.runCommand(org.bson.Document.parse("{ping: 1}"));
            
            response.put("status", "UP");
            response.put("database", "MongoDB Atlas");
            response.put("connection", "Connected");
            response.put("timestamp", java.time.LocalDateTime.now().toString());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "DOWN");
            response.put("database", "MongoDB Atlas");
            response.put("error", e.getMessage());
            response.put("timestamp", java.time.LocalDateTime.now().toString());
            
            return ResponseEntity.status(503).body(response);
        }
    }
    
    @GetMapping("/info")
    public ResponseEntity<Map<String, String>> getInfo() {
        Map<String, String> info = new HashMap<>();
        info.put("application", "Controle Financeiro Familiar");
        info.put("version", "1.0.0");
        info.put("database", "MongoDB Atlas - Cloud");
        info.put("environment", "Production Ready");
        return ResponseEntity.ok(info);
    }
}

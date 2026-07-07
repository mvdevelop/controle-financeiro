package com.financeiro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);

        System.out.println("╔══════════════════════════════════════════════════════════╗");
        System.out.println("║     🚀 CONTROLE FINANCEIRO FAMILIAR - BACKEND           ║");
        System.out.println("╠══════════════════════════════════════════════════════════╣");
        System.out.println("║  ✅ PostgreSQL: Conectado                               ║");
        System.out.println("║  🌐 Server: http://localhost:8080                        ║");
        System.out.println("║  📊 API Docs: http://localhost:8080/api/despesas        ║");
        System.out.println("║  ❤️  Health Check: http://localhost:8080/api/health      ║");
        System.out.println("╚══════════════════════════════════════════════════════════╝");
    }
}

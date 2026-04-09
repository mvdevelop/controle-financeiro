package com.financeiro.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableMongoRepositories(basePackages = "com.financeiro.repository")
public class MongoDBConfig extends AbstractMongoClientConfiguration {
    
    @Value("${spring.data.mongodb.uri}")
    private String connectionUri;
    
    @Value("${spring.data.mongodb.database}")
    private String databaseName;
    
    @Override
    protected String getDatabaseName() {
        return databaseName;
    }
    
    @Override
    public MongoClient mongoClient() {
        ConnectionString connectionString = new ConnectionString(connectionUri);
        
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .applyToConnectionPoolSettings(builder -> 
                    builder.maxSize(10)
                           .minSize(5)
                           .maxWaitTime(120, TimeUnit.SECONDS)
                           .maxConnectionLifeTime(0, TimeUnit.MILLISECONDS)
                )
                .applyToSocketSettings(builder ->
                    builder.connectTimeout(30, TimeUnit.SECONDS)
                           .readTimeout(30, TimeUnit.SECONDS)
                )
                .build();
        
        return MongoClients.create(mongoClientSettings);
    }
}

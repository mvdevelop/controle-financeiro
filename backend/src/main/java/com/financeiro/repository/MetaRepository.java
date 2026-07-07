package com.financeiro.repository;

import com.financeiro.model.Meta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MetaRepository extends JpaRepository<Meta, Long> {

    List<Meta> findByStatus(String status);

    List<Meta> findByStatusNot(String status);
}

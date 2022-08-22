package com.conacti.controlacapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.conacti.controlacapi.entities.Curso;

import java.util.Optional;
import java.util.List;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
	
	@Query("SELECT c FROM Curso c WHERE c.estado LIKE 'A'")
    public Optional<List<Curso>> findActives();
}

package com.misiontic.controlacapi.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.misiontic.controlacapi.entities.Asignatura;
import com.misiontic.controlacapi.entities.Curso;
import com.misiontic.controlacapi.entities.Tarea;
import com.misiontic.controlacapi.entities.Usuario;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {
	
	@Query("SELECT t FROM Tarea t WHERE t.idCurso = :idCurso AND t.estado LIKE 'A'")
	public Optional<List<Tarea>> findByIdCurso(@Param("idCurso") Curso idCurso);
	
	@Query("SELECT t FROM Tarea t WHERE t.idDocente = :idDocente AND t.estado LIKE 'A'")
	public Optional<List<Tarea>> findByIdDocente(@Param("idDocente") Usuario idDocente);
	
	@Query("SELECT t FROM Tarea t WHERE t.idAsignatura = :idAsignatura AND t.estado LIKE 'A'")
	public Optional<List<Tarea>> findByIdAsignatura(@Param("idAsignatura") Asignatura idAsignatura);
	
	
	@Query("SELECT t FROM Tarea t WHERE t.idCurso = :idCurso AND t.idAsignatura = :idAsignatura AND t.idDocente = :idDocente")
	public Optional<List<Tarea>> find(@Param("idCurso") Curso idCurso, @Param("idAsignatura") Asignatura idAsignatura, @Param("idDocente") Usuario idDocente);
	
	@Query("SELECT t FROM Tarea t WHERE t.estado LIKE 'A'")
    public Optional<List<Tarea>> findActives();
}

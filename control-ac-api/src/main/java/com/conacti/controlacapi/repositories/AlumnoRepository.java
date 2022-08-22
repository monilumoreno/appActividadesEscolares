package com.conacti.controlacapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.conacti.controlacapi.entities.Alumno;
import com.conacti.controlacapi.entities.Curso;
import com.conacti.controlacapi.entities.Usuario;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
	
	public Optional<List<Alumno>> findByidCurso(Curso idCurso);
	public Optional<List<Alumno>> findByIdAcudiente(Usuario idAcudiente);
	
	@Query("SELECT a FROM Alumno a WHERE a.estado LIKE 'A'")
    public Optional<List<Alumno>> findActives();
	
	@Query("SELECT a FROM Alumno a WHERE a.idAcudiente = :idAcudiente AND a.estado LIKE 'A'")
	public Optional<List<Alumno>> findActivosByIdAcudiente(@Param("idAcudiente") Usuario idAcudiente);
	
	@Query("SELECT a FROM Alumno a WHERE a.idCurso = :idCurso AND a.estado LIKE 'A'")
	public Optional<List<Alumno>> findActivosByIdCurso(@Param("idCurso") Curso idCurso);
}

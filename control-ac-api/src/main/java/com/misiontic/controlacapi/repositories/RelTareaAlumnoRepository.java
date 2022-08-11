package com.misiontic.controlacapi.repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.misiontic.controlacapi.entities.Alumno;
import com.misiontic.controlacapi.entities.RelTareaAlumno;
import com.misiontic.controlacapi.entities.Tarea;

@Repository
public interface RelTareaAlumnoRepository extends JpaRepository<RelTareaAlumno, Long>  {

	@Query("SELECT r FROM RelTareaAlumno r WHERE r.idAlumno = :idAlumno AND r.idTarea.estado LIKE 'A' AND r.estado LIKE 'A'")
	public Optional<List<RelTareaAlumno>> findByIdAlumno(@Param("idAlumno") Alumno idAlumno);
	
	@Query("SELECT r FROM RelTareaAlumno r WHERE r.idAlumno.idAlumno = :idAlumno AND r.idTarea.idAsignatura.idAsignatura = :idAsignatura AND r.idTarea.estado LIKE 'A' AND r.estado LIKE 'A'")
	public Optional<List<RelTareaAlumno>> findByIdAlumnoAsignatura(
			@Param("idAlumno") Long idAlumno, @Param("idAsignatura") Long idAsignatura);
	
	@Query("SELECT r FROM RelTareaAlumno r WHERE r.idAlumno.idAlumno = :idAlumno AND r.idTarea.idAsignatura.idAsignatura = :idAsignatura AND r.idTarea.fechaEntrega = :fechaEntrega AND r.idTarea.estado LIKE 'A' AND r.estado LIKE 'A'")
	public Optional<List<RelTareaAlumno>> findByIdAlumnoAsignaturaFechaEntrega(
			@Param("idAlumno") Long idAlumno, @Param("idAsignatura") Long idAsignatura, @Param("fechaEntrega") LocalDate fechaEntrega);
		
	@Query("SELECT r FROM RelTareaAlumno r WHERE r.idAlumno.idAlumno = :idAlumno AND r.idTarea.fechaEntrega = :fechaEntrega AND r.idTarea.estado LIKE 'A' AND r.estado LIKE 'A'")
	public Optional<List<RelTareaAlumno>> findByIdAlumnoFechaEntrega(
			@Param("idAlumno") Long idAlumno, @Param("fechaEntrega") LocalDate fechaEntrega);
	
	@Query("SELECT r FROM RelTareaAlumno r WHERE r.idTarea = :idTarea AND r.idTarea.estado LIKE 'A' AND r.estado LIKE 'A'")
	public Optional<List<RelTareaAlumno>> findByIdTarea(@Param("idTarea") Tarea idTarea);
	
	@Query("SELECT r FROM RelTareaAlumno r WHERE r.estado LIKE 'A'")
    public Optional<List<RelTareaAlumno>> findActives();
}

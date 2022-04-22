package com.misiontic.controlacapi.repositories;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.misiontic.controlacapi.entities.Alumno;
import com.misiontic.controlacapi.entities.RelTareaAlumno;
import com.misiontic.controlacapi.entities.Tarea;

@Repository
public interface RelTareaAlumnoRepository extends JpaRepository<RelTareaAlumno, Long>  {
	public Optional<List<RelTareaAlumno>> findByidAlumno(Alumno idAlumno);
	public Optional<List<RelTareaAlumno>> findByidTarea(Tarea idTarea);
}

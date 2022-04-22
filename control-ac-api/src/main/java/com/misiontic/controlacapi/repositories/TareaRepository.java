package com.misiontic.controlacapi.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.misiontic.controlacapi.entities.Asignatura;
import com.misiontic.controlacapi.entities.Curso;
import com.misiontic.controlacapi.entities.Tarea;
import com.misiontic.controlacapi.entities.Usuario;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, Long> {
	public Optional<List<Tarea>> findByidCurso(Curso idCurso);
	public Optional<List<Tarea>> findByidDocente(Usuario idDocente);
	public Optional<List<Tarea>> findByidAsignatura(Asignatura idAsignatura);	
}

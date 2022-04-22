package com.misiontic.controlacapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.misiontic.controlacapi.entities.Alumno;
import com.misiontic.controlacapi.entities.Curso;
import com.misiontic.controlacapi.entities.Usuario;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
	
	public Optional<List<Alumno>> findByidCurso(Curso idCurso);
	public Optional<List<Alumno>> findByIdAcudiente(Usuario idAcudiente);
}

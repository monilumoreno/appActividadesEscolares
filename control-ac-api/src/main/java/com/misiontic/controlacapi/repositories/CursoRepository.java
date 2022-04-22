package com.misiontic.controlacapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.misiontic.controlacapi.entities.Curso;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

}

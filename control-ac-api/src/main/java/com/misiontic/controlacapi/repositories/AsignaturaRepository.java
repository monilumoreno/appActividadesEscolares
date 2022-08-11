package com.misiontic.controlacapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.misiontic.controlacapi.entities.Asignatura;
import java.util.Optional;
import java.util.List;

@Repository
public interface AsignaturaRepository extends JpaRepository<Asignatura, Long> {
	
	@Query("SELECT a FROM Asignatura a WHERE a.estado LIKE 'A' ORDER BY a.descripcionAsignatura ASC")
	public Optional<List<Asignatura>> findActives();
}

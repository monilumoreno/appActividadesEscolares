package com.misiontic.controlacapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import com.misiontic.controlacapi.entities.Perfil;
import java.util.Optional;
import java.util.List;

@Repository
public interface PerfilRepository extends JpaRepository<Perfil, Long> {
	
	@Query("SELECT p FROM Perfil p WHERE p.estado LIKE 'A'")
    public Optional<List<Perfil>> findActives();
}

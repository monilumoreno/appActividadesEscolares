package com.misiontic.controlacapi.repositories;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.misiontic.controlacapi.entities.Usuario;
import com.misiontic.controlacapi.entities.Perfil;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	public Optional<Usuario> findByusuario(String nombreusuario);
	
	@Query("SELECT u FROM Usuario u WHERE u.estado LIKE 'A'")
    public Optional<List<Usuario>> findActives();
	
	@Query("SELECT u FROM Usuario u WHERE u.idPerfil = :idPerfil AND u.estado LIKE 'A'")
	public Optional<List<Usuario>> findByIdPerfil(@Param("idPerfil") Perfil idPerfil);
}
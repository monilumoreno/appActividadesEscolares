package com.misiontic.controlacapi.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.misiontic.controlacapi.repositories.PerfilRepository;
import com.misiontic.controlacapi.entities.Perfil;
import com.misiontic.controlacapi.exceptions.GeneralServiceException;
import com.misiontic.controlacapi.exceptions.NoDataFoundException;
import com.misiontic.controlacapi.exceptions.ValidateServiceException;
import com.misiontic.controlacapi.validators.PerfilValidator;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PerfilService {

	@Autowired
	private PerfilRepository perfilRepo;

	public Perfil findById(Long perfilId) {

		try {
			Perfil perfil = perfilRepo.findById(perfilId)
					.orElseThrow(() -> new NoDataFoundException("El perfil no existe"));
			return perfil;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public void delete(Long perfilId) {
		try {
			Perfil perfil = perfilRepo.findById(perfilId)
					.orElseThrow(() -> new NoDataFoundException("El perfil no existe"));
			perfilRepo.delete(perfil);
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public List<Perfil> findAll() {
		try {
			List<Perfil> arregloPerfiles = perfilRepo.findAll();
			return arregloPerfiles;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public Perfil create(Perfil perfil) {
		try {
			perfil.setEstado('A');
			PerfilValidator.validador(perfil);
			Perfil nuevoPerfil = perfilRepo.save(perfil);
			return nuevoPerfil;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public Perfil update(Perfil perfil) {
		try {
			PerfilValidator.validador(perfil);
			Perfil existePerfil = perfilRepo.findById(perfil.getIdPerfil())
					.orElseThrow(() -> new NoDataFoundException("El perfil no existe"));
			
			existePerfil.setDescripcionPerfil(perfil.getDescripcionPerfil());			
			perfilRepo.save(existePerfil);
			return existePerfil;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public Perfil disable(Long idPerfil) {
		try {
			Perfil perfil = perfilRepo.findById(idPerfil)
					.orElseThrow(() -> new NoDataFoundException("El perfil no registrado"));			
			perfil.setEstado('I');
			perfilRepo.save(perfil);
			return perfil;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
}
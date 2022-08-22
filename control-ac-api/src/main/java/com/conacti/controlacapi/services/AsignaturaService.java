package com.conacti.controlacapi.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conacti.controlacapi.entities.Asignatura;
import com.conacti.controlacapi.exceptions.GeneralServiceException;
import com.conacti.controlacapi.exceptions.NoDataFoundException;
import com.conacti.controlacapi.exceptions.ValidateServiceException;
import com.conacti.controlacapi.repositories.AsignaturaRepository;
import com.conacti.controlacapi.validators.AsignaturaValidator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AsignaturaService {

	@Autowired
	private AsignaturaRepository asignaturaRepo;

	public Asignatura findById(Long idAsignatura) {

		try {
			Asignatura asignatura = asignaturaRepo.findById(idAsignatura)
					.orElseThrow(() -> new NoDataFoundException("Asignatura no registrada"));
			return asignatura;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public void delete(Long idAsignatura) {
		try {
			Asignatura asignatura = asignaturaRepo.findById(idAsignatura)
					.orElseThrow(() -> new NoDataFoundException("Asignatura no registrada"));
			asignaturaRepo.delete(asignatura);
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public List<Asignatura> findAll() {
		try {
			List<Asignatura> arregloAsignaturas = asignaturaRepo.findAll();
			return arregloAsignaturas;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public Asignatura create(Asignatura asignatura) {
		try {
			asignatura.setEstado('A');
			AsignaturaValidator.validador(asignatura);
			Asignatura nuevaAsignatura = asignaturaRepo.save(asignatura);
			return nuevaAsignatura;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public List<Asignatura> findActives() {
        try {
            List<Asignatura> listaAsignaturas = asignaturaRepo.findActives()
            		.orElseThrow(() -> new NoDataFoundException("Asignaturas no registradas"));
            return listaAsignaturas;
        } catch (ValidateServiceException | NoDataFoundException e) {
            log.info(e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GeneralServiceException(e.getMessage(), e);
        }
    }
	
	public Asignatura update(Asignatura asignatura) {
		try {
			asignatura.setEstado('A');
			AsignaturaValidator.validador(asignatura);
			Asignatura existeAsignatura = asignaturaRepo.findById(asignatura.getIdAsignatura())
					.orElseThrow(() -> new NoDataFoundException("Asignatura no registrada"));
			
			existeAsignatura.setDescripcionAsignatura(asignatura.getDescripcionAsignatura());
			existeAsignatura.setEstado(asignatura.getEstado());
			asignaturaRepo.save(existeAsignatura);
			return existeAsignatura;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public Asignatura disable (Long idAsignatura) {
		try {
			Asignatura asignatura = asignaturaRepo.findById(idAsignatura)
					.orElseThrow(() -> new NoDataFoundException("Asignatura no registrada"));
			asignatura.setEstado('I');
			asignaturaRepo.save(asignatura);
			return asignatura;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}		
}
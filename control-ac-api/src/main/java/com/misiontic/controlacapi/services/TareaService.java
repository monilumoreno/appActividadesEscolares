package com.misiontic.controlacapi.services;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.misiontic.controlacapi.entities.Tarea;
import com.misiontic.controlacapi.exceptions.GeneralServiceException;
import com.misiontic.controlacapi.exceptions.NoDataFoundException;
import com.misiontic.controlacapi.exceptions.ValidateServiceException;
import com.misiontic.controlacapi.repositories.TareaRepository;
import com.misiontic.controlacapi.validators.TareaValidator;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TareaService {
	
	@Autowired
	private TareaRepository tareaRepo;
	
	public Tarea findById(Long idTarea) {
		try {
			Tarea tarea = tareaRepo.findById(idTarea)
					.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			return tarea;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public List<Tarea> findAll() {
		try {
			List<Tarea> listaTareas = tareaRepo.findAll();
			return listaTareas;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public Tarea create(Tarea tarea) {
		try {
			tarea.setFechaCreacion(LocalDate.now());
			tarea.setEstado('A');
			TareaValidator.validador(tarea);
			Tarea nuevaTarea = tareaRepo.save(tarea);			
			return nuevaTarea;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public Tarea update(Tarea tarea) {
		try {
			Tarea existeTarea = tareaRepo.findById(tarea.getIdTarea())
					.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			
			existeTarea.setDescripcionTarea(tarea.getDescripcionTarea());
			existeTarea.setFechaEntrega(tarea.getFechaEntrega());
			TareaValidator.validador(existeTarea);			
			tareaRepo.save(existeTarea);
			return existeTarea;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public void delete(Long idTarea) {
		try {
			Tarea tarea = tareaRepo.findById(idTarea)
					.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			tareaRepo.delete(tarea);
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public Tarea disable(Long idTarea) {
		try {
			Tarea tarea = tareaRepo.findById(idTarea)
					.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			tarea.setEstado('I');
			tareaRepo.save(tarea);
			return tarea;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
}	
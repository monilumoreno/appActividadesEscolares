package com.conacti.controlacapi.services;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conacti.controlacapi.dtos.TareaRequestDTO;
import com.conacti.controlacapi.entities.Asignatura;
import com.conacti.controlacapi.entities.Curso;
import com.conacti.controlacapi.entities.Tarea;
import com.conacti.controlacapi.entities.Usuario;
import com.conacti.controlacapi.exceptions.GeneralServiceException;
import com.conacti.controlacapi.exceptions.NoDataFoundException;
import com.conacti.controlacapi.exceptions.ValidateServiceException;
import com.conacti.controlacapi.repositories.AsignaturaRepository;
import com.conacti.controlacapi.repositories.CursoRepository;
import com.conacti.controlacapi.repositories.TareaRepository;
import com.conacti.controlacapi.repositories.UsuarioRepository;
import com.conacti.controlacapi.validators.TareaValidator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TareaService {
	
	@Autowired
	private TareaRepository tareaRepo;
	@Autowired
	private CursoRepository cursoRepo;
	@Autowired
	private AsignaturaRepository asignaturaRepo;
	@Autowired
	private UsuarioRepository usuarioRepo;
	
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
	
	public List<Tarea> findByDocente(Long idDocente) {
        try {
        	Usuario docente = usuarioRepo.findById(idDocente)
					.orElseThrow(null);
            List<Tarea> listaTareas = tareaRepo.findByIdDocente(docente)
                    .orElseThrow(() -> new NoDataFoundException("Tareas no registradas"));
            return listaTareas;
        } catch (ValidateServiceException | NoDataFoundException e) {
            log.info(e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GeneralServiceException(e.getMessage(), e);
        }
    }

	public List<Tarea> find(TareaRequestDTO request) {
		try {
			Curso curso = null;
			Asignatura asignatura = null;
			List<Tarea> listaTareas = null;
			
			if (request.getIdCurso() != 0) {
				curso = cursoRepo.findById(request.getIdCurso())
						.orElseThrow(null);
			}
			if (request.getIdAsignatura() != 0) {
				asignatura = asignaturaRepo.findById(request.getIdAsignatura())
						.orElseThrow(null);
			}
			Usuario docente = usuarioRepo.findById(request.getIdDocente())
					.orElseThrow(null);
				
			if (request.getIdCurso() == 0 && request.getIdAsignatura() == 0
					&& request.getFechaEntrega() == null) {
				listaTareas = tareaRepo.findByIdDocente(docente)
						.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			} else if (request.getIdCurso() == 0 && request.getIdAsignatura() == 0) {
				listaTareas = tareaRepo.findByIdDocenteFechaEntrega(docente, request.getFechaEntrega())
						.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			} else if (request.getIdCurso() == 0 && request.getFechaEntrega() == null) {
				listaTareas = tareaRepo.findByIdAsignaturaIdDocente(asignatura, docente)
						.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			} else if (request.getIdAsignatura() == 0 && request.getFechaEntrega() == null) {
				listaTareas = tareaRepo.findByIdCursoIdDocente(curso, docente)
						.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			} else if (request.getIdCurso() == 0){
				listaTareas = tareaRepo.findByIdAsignaturaIdDocenteFechaEntrega(asignatura, docente, request.getFechaEntrega())
						.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			} else if (request.getIdAsignatura() == 0){
				listaTareas = tareaRepo.findByIdCursoIdDocenteFechaEntrega(curso, docente, request.getFechaEntrega())
						.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			} else if (request.getFechaEntrega() == null){
				listaTareas = tareaRepo.findByIdCursoIdAsignaturaIdDocente(curso, asignatura, docente)
						.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			} else {
				listaTareas = tareaRepo.find(curso, asignatura, docente, request.getFechaEntrega())
						.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			}			
			return listaTareas;			
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

	public List<Tarea> findActives() {
        try {
            List<Tarea> listaTareas = tareaRepo.findActives()
                    .orElseThrow(() -> new NoDataFoundException("Tareas no registradas"));
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
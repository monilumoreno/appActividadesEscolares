package com.conacti.controlacapi.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conacti.controlacapi.dtos.RelTareaAlumnoRequestDTO;
import com.conacti.controlacapi.dtos.TareaGradeRequestDTO;
import com.conacti.controlacapi.entities.Alumno;
import com.conacti.controlacapi.entities.RelTareaAlumno;
import com.conacti.controlacapi.entities.Tarea;
import com.conacti.controlacapi.exceptions.GeneralServiceException;
import com.conacti.controlacapi.exceptions.NoDataFoundException;
import com.conacti.controlacapi.exceptions.ValidateServiceException;
import com.conacti.controlacapi.repositories.AlumnoRepository;
import com.conacti.controlacapi.repositories.RelTareaAlumnoRepository;
import com.conacti.controlacapi.repositories.TareaRepository;
import com.conacti.controlacapi.validators.RelTareaAlumnoValidator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RelTareaAlumnoService {
	@Autowired
	private RelTareaAlumnoRepository relTareaAlumnoRepo;
	@Autowired
	private AlumnoRepository alumnoRepo;
	@Autowired
	private TareaRepository tareaRepo;
	
	public RelTareaAlumno findById(Long idRelTareaAlumno) {		 
		try {
			RelTareaAlumno  relTareaAlumno = relTareaAlumnoRepo.findById(idRelTareaAlumno)
					.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			return relTareaAlumno;			
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public List<RelTareaAlumno> findByIdTarea(Long idTarea) {
	    
	    try {
	        Tarea tarea = tareaRepo.getById(idTarea);
	        List<RelTareaAlumno> listaRelTareaAlumno = relTareaAlumnoRepo.findByIdTarea(tarea)
	        .orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
	        return listaRelTareaAlumno;
	    } catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}	    
	}
	
	public List<RelTareaAlumno> findByIdAlumno(Long idAlumno) {
	    
	    try {
	        Alumno alumno = alumnoRepo.getById(idAlumno);
	        List<RelTareaAlumno> listaRelTareaAlumno = relTareaAlumnoRepo.findByIdAlumno(alumno)
	        .orElseThrow(() -> new NoDataFoundException("Tareas no registradas"));
	        return listaRelTareaAlumno;
	    } catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}	    
	}
	
	public List<RelTareaAlumno> find(RelTareaAlumnoRequestDTO request) {
	    
	    try {
	    	List<RelTareaAlumno> listaRelTareaAlumno = null;
	        Alumno alumno = alumnoRepo.getById(request.getIdAlumno());
	        
	        if (request.getIdAsignatura() == 0 && request.getFechaEntrega() == null) {
	        	listaRelTareaAlumno = relTareaAlumnoRepo.findByIdAlumno(alumno)
	        	        .orElseThrow(() -> new NoDataFoundException("Tareas no registradas"));
	        } else if (request.getIdAsignatura() == 0) {
	        	listaRelTareaAlumno = relTareaAlumnoRepo.findByIdAlumnoFechaEntrega(alumno.getIdAlumno(), request.getFechaEntrega())
	        	        .orElseThrow(() -> new NoDataFoundException("Tareas no registradas"));
	        } else if (request.getFechaEntrega() == null) {
	        	listaRelTareaAlumno = relTareaAlumnoRepo.findByIdAlumnoAsignatura(alumno.getIdAlumno(), request.getIdAsignatura())
	        	        .orElseThrow(() -> new NoDataFoundException("Tareas no registradas"));
	        } else {
	        	listaRelTareaAlumno = relTareaAlumnoRepo.findByIdAlumnoAsignaturaFechaEntrega(alumno.getIdAlumno(), request.getIdAsignatura(), request.getFechaEntrega())
	        	        .orElseThrow(() -> new NoDataFoundException("Tareas no registradas"));
	        }
	        
	        return listaRelTareaAlumno;
	    } catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}	    
	}
	public List<RelTareaAlumno> findAll() {
		try {
			List<RelTareaAlumno> listaRelTareasAlumnos = relTareaAlumnoRepo.findAll();
			return listaRelTareasAlumnos;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public List<RelTareaAlumno> findActives() {
        try {
            List<RelTareaAlumno> listaTareasAlumnos = relTareaAlumnoRepo.findActives()
                    .orElseThrow(() -> new NoDataFoundException("Tareas no registradas"));
            return listaTareasAlumnos;
        } catch (ValidateServiceException | NoDataFoundException e) {
            log.info(e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GeneralServiceException(e.getMessage(), e);
        }
    }
	
	public RelTareaAlumno create(RelTareaAlumno relTareaAlumno) {
		try {
			relTareaAlumno.setEstado('A');
			RelTareaAlumnoValidator.validador(relTareaAlumno);
			RelTareaAlumno nuevaRelTareaAlumno = relTareaAlumnoRepo.save(relTareaAlumno);
			return nuevaRelTareaAlumno;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public void delete(Long idRelTareaAlumno) {
		try {
			RelTareaAlumno relTareaAlumno = relTareaAlumnoRepo.findById(idRelTareaAlumno)
					.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			relTareaAlumnoRepo.delete(relTareaAlumno);
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public RelTareaAlumno update(RelTareaAlumno relTareaAlumno) {
		try {
			relTareaAlumno.setEstado('A');
			RelTareaAlumnoValidator.validador(relTareaAlumno);
			RelTareaAlumno existeRelTareaAlumno = relTareaAlumnoRepo.findById(relTareaAlumno.getIdRelTareaAlumno())
					.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			
			existeRelTareaAlumno.setEstado(relTareaAlumno.getEstado());
			existeRelTareaAlumno.setCalificacion(relTareaAlumno.getCalificacion());
			existeRelTareaAlumno.setObservaciones(relTareaAlumno.getObservaciones());
			existeRelTareaAlumno.setFechaCalificacion(relTareaAlumno.getFechaCalificacion());
			relTareaAlumnoRepo.save(existeRelTareaAlumno);
			return existeRelTareaAlumno;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public RelTareaAlumno disable(Long idRelTareaAlumno) {
		try {
			RelTareaAlumno relTareaAlumno = relTareaAlumnoRepo.findById(idRelTareaAlumno)
					.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			
			relTareaAlumno.setEstado('I');	
			relTareaAlumno.setDescripcion("Inactiva");
			relTareaAlumnoRepo.save(relTareaAlumno);
			return relTareaAlumno;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public RelTareaAlumno grade(TareaGradeRequestDTO tareaGrade) {
		try {
			RelTareaAlumno existeRelTareaAlumno = relTareaAlumnoRepo.findById(tareaGrade.getIdRelTareaAlumno())
					.orElseThrow(() -> new NoDataFoundException("Tarea no registrada"));
			existeRelTareaAlumno.setDescripcion("Calificada");
			existeRelTareaAlumno.setCalificacion(tareaGrade.getCalificacion());
			existeRelTareaAlumno.setObservaciones(tareaGrade.getObservaciones());
			existeRelTareaAlumno.setFechaCalificacion(LocalDate.now());
			RelTareaAlumnoValidator.validador(existeRelTareaAlumno);
			relTareaAlumnoRepo.save(existeRelTareaAlumno);
			return existeRelTareaAlumno;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public List<RelTareaAlumno> createAll(Tarea tarea) {
        try {
            List<RelTareaAlumno> listaRelTareasAlumnos = new ArrayList<RelTareaAlumno>();           
                        
            List<Alumno> listaAlumnos = alumnoRepo.findActivosByIdCurso(tarea.getIdCurso())
                    .orElseThrow(() -> new NoDataFoundException("El curso no tiene alumnos registrados"));
            
            for (Alumno alumno : listaAlumnos) {
                RelTareaAlumno nuevaRelTareaAlumno = RelTareaAlumno.builder()
                		.descripcion("Pendiente")
                		.calificacion(0f)
                		.observaciones(null)
                		.idAlumno(alumno)
                		.idTarea(tarea)
                		.estado('A')
                		.build();    
                listaRelTareasAlumnos.add(relTareaAlumnoRepo.save(nuevaRelTareaAlumno));                
            }
            return listaRelTareasAlumnos;
        } catch (ValidateServiceException e) {
            log.info(e.getMessage(), e);
            throw e;
        }         
          catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GeneralServiceException(e.getMessage(), e); 
        }
    }
	
	public void disableByTarea(Long idTarea) {
		try {
	        List<RelTareaAlumno> listaRelTareaAlumno = this.findByIdTarea(idTarea);        		
						
			for (RelTareaAlumno relTareaAlumno : listaRelTareaAlumno) {								
				this.disable(relTareaAlumno.getIdRelTareaAlumno());
			}
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
}

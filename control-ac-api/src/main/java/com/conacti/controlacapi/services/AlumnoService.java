package com.conacti.controlacapi.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conacti.controlacapi.entities.Alumno;
import com.conacti.controlacapi.entities.Curso;
import com.conacti.controlacapi.entities.Usuario;
import com.conacti.controlacapi.exceptions.GeneralServiceException;
import com.conacti.controlacapi.exceptions.NoDataFoundException;
import com.conacti.controlacapi.exceptions.ValidateServiceException;
import com.conacti.controlacapi.repositories.AlumnoRepository;
import com.conacti.controlacapi.repositories.CursoRepository;
import com.conacti.controlacapi.repositories.UsuarioRepository;
import com.conacti.controlacapi.validators.AlumnoValidator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AlumnoService {

	@Autowired
	private AlumnoRepository alumnoRepo;
	@Autowired
	private CursoRepository cursoRepo;
	@Autowired
	private UsuarioRepository usuarioRepo;
		
	public Alumno findById(Long idAlumno) {
		try {
			Alumno alumno = alumnoRepo.findById(idAlumno)
					.orElseThrow(() -> new NoDataFoundException("Alumno no registrado"));
			return alumno;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public List<Alumno> findByIdCurso(Long idCurso) {
		try {			
			Curso curso = cursoRepo.findById(idCurso)
				.orElseThrow(() -> new NoDataFoundException("Curso no registrado"));
			//List<Alumno> listaAlumnos = alumnoRepo.findByidCurso(curso)
				List<Alumno> listaAlumnos = alumnoRepo.findActivosByIdCurso(curso)
				.orElseThrow(() -> new NoDataFoundException("El curso no tine alumnos registrados"));
			return listaAlumnos;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public List<Alumno> findByIdAcudiente(Long idAcudiente) {
		try {			
			Usuario acudiente = usuarioRepo.findById(idAcudiente)
				.orElseThrow(() -> new NoDataFoundException("Acudiente no registrado"));
			//List<Alumno> listaAlumnos = alumnoRepo.findByIdAcudiente(acudiente)
			List<Alumno> listaAlumnos = alumnoRepo.findActivosByIdAcudiente(acudiente)
				.orElseThrow(() -> new NoDataFoundException("El acudiente no tine alumnos registrados"));
			return listaAlumnos;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public List<Alumno> findAll() {
		try {
			List<Alumno> listaAlumnos = alumnoRepo.findAll();
			return listaAlumnos;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public List<Alumno> findActives() {
        try {
            List<Alumno> listaAlumnos = alumnoRepo.findActives()
                    .orElseThrow(() -> new NoDataFoundException("Alumnos no registrados"));
            return listaAlumnos;
        } catch (ValidateServiceException | NoDataFoundException e) {
            log.info(e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GeneralServiceException(e.getMessage(), e);
        }
    }
	
	public Alumno create(Alumno alumno) {
		try {
			alumno.setEstado('A');
			AlumnoValidator.validador(alumno);
			Alumno nuevoAlumno = alumnoRepo.save(alumno);
			return nuevoAlumno;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public Alumno update(Alumno alumno) {
		try {
			Alumno existeAlumno = alumnoRepo.findById(alumno.getIdAlumno())
					.orElseThrow(() -> new NoDataFoundException("Alumno no registrado"));
			
			existeAlumno.setTipoDocumento(alumno.getTipoDocumento());
			existeAlumno.setNumeroDocumento(alumno.getNumeroDocumento());
			existeAlumno.setNombres(alumno.getNombres());
			existeAlumno.setApellidos(alumno.getApellidos());
			existeAlumno.setTelefono(alumno.getTelefono());
			existeAlumno.setDireccion(alumno.getDireccion());
			existeAlumno.setCorreo(alumno.getCorreo());			
			existeAlumno.setIdAcudiente(alumno.getIdAcudiente());
			existeAlumno.setIdCurso(alumno.getIdCurso());
			AlumnoValidator.validador(existeAlumno);
			alumnoRepo.save(existeAlumno);
			return existeAlumno;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public void delete(Long idAlumno) {
		try {
			Alumno alumno = alumnoRepo.findById(idAlumno)
					.orElseThrow(() -> new NoDataFoundException("Alumno no registrado"));
			alumnoRepo.delete(alumno);
		} catch (ValidateServiceException | NoDataFoundException e) {
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public Alumno disable(long idAlumno) {
		try {
			Alumno alumno = alumnoRepo.findById(idAlumno)
					.orElseThrow(() -> new NoDataFoundException("Alumno no registrado"));
			alumno.setEstado('I');
			alumnoRepo.save(alumno);
			return alumno;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
}

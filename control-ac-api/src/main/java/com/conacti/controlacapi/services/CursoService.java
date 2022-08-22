package com.conacti.controlacapi.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conacti.controlacapi.entities.Curso;
import com.conacti.controlacapi.exceptions.GeneralServiceException;
import com.conacti.controlacapi.exceptions.NoDataFoundException;
import com.conacti.controlacapi.exceptions.ValidateServiceException;
import com.conacti.controlacapi.repositories.CursoRepository;
import com.conacti.controlacapi.validators.CursoValidator;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CursoService {
	
	@Autowired
	private CursoRepository cursoRepo;

	public Curso findById(Long idCurso) {

		try {
			Curso curso = cursoRepo.findById(idCurso)
					.orElseThrow(() -> new NoDataFoundException("Curso no registrada"));
			return curso;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public void delete(Long idCurso) {
		try {
			Curso curso = cursoRepo.findById(idCurso)
					.orElseThrow(() -> new NoDataFoundException("Curso no registrada"));
			cursoRepo.delete(curso);
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public List<Curso> findAll() {
		try {
			List<Curso> arregloCursos = cursoRepo.findAll();
			return arregloCursos;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public List<Curso> findActives() {
        try {
            List<Curso> listaCursos = cursoRepo.findActives()
                    .orElseThrow(() -> new NoDataFoundException("Cursos no registrados"));
            return listaCursos;
        } catch (ValidateServiceException | NoDataFoundException e) {
            log.info(e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GeneralServiceException(e.getMessage(), e);
        }
    }
	
	public Curso create(Curso curso) {
		try {
			curso.setEstado('A');
			CursoValidator.validador(curso);
			Curso nuevoCurso = cursoRepo.save(curso);
			return nuevoCurso;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public Curso update(Curso curso) {
		try {
			curso.setEstado('A');
			CursoValidator.validador(curso);
			Curso existeCurso = cursoRepo.findById(curso.getIdCurso())
					.orElseThrow(() -> new NoDataFoundException("Curso no registrado"));			
			existeCurso.setDescripcionCurso(curso.getDescripcionCurso());
			existeCurso.setEstado(curso.getEstado());
			cursoRepo.save(existeCurso);
			return existeCurso;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public Curso disable(Long idCurso) {
		try {
			Curso curso = cursoRepo.findById(idCurso)
					.orElseThrow(() -> new NoDataFoundException("Curso no registrado"));			
			curso.setEstado('I');
			cursoRepo.save(curso);
			return curso;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
}
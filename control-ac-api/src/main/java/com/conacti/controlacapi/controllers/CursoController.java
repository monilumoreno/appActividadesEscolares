package com.conacti.controlacapi.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.conacti.controlacapi.converters.CursoConverter;
import com.conacti.controlacapi.dtos.CursoDTO;
import com.conacti.controlacapi.entities.Curso;
import com.conacti.controlacapi.services.CursoService;
import com.conacti.controlacapi.utilities.WrapperResponse;

@RestController
@CrossOrigin(origins = "*")
public class CursoController {
	
	@Autowired
	private CursoService cursoService;
	private CursoConverter converter = new CursoConverter();
	
	/**
	 * Encuentra un curso por ID
	 * Parámetros: ID del curso
	 * Retorna: Datos del curso
	 */	
	@GetMapping(value = "/cursos/{cursoId}")
	public ResponseEntity<WrapperResponse<CursoDTO>> findById(@PathVariable("cursoId") Long cursoId) {
		Curso curso = cursoService.findById(cursoId);
		CursoDTO cursoDTO = converter.fromEntity(curso);
		return new WrapperResponse<>(true, "Curso encontrado", cursoDTO).createResponse(HttpStatus.OK);
	}

	/**
	 * Recupera los cursos registrados
	 * Parámetros: Ninguno
	 * Retorna: Listado de cursos
	 */		
	@GetMapping(value = "/cursos")
	public ResponseEntity<WrapperResponse<List<CursoDTO>>> findAll() {
		List<Curso> arregloCursos = cursoService.findAll();
		List<CursoDTO> cursosDTO = converter.fromEntity(arregloCursos);
		return new WrapperResponse<>(true, "Cursos encontrados", cursosDTO).createResponse(HttpStatus.OK);
	}

	/**
	 * Recupera los cursos con la propiedad estado = 'A'
	 * Parámetros: Ninguno
	 * Retorna: Listado de cursos
	 */	
	@GetMapping(value = "/cursos-activos")
    public ResponseEntity<WrapperResponse<List<CursoDTO>>> findActives() {
        List<Curso> listaCursos = cursoService.findActives();
        List<CursoDTO> cursosDTO = converter.fromEntity(listaCursos);
        return new WrapperResponse<>(true, "Cursos registrados", cursosDTO).createResponse(HttpStatus.OK);
    }
	
	/**
	 * Crea un nuevo curso
	 * Parámetros: Datos del curso
	 * Retorna: Datos del curso creado
	 */	
	@PostMapping(value = "/cursos")
	public ResponseEntity<WrapperResponse<CursoDTO>> create(@RequestBody CursoDTO curso) {
		Curso nuevoCurso = cursoService.create(converter.fromDTO(curso));
		CursoDTO cursoDTO = converter.fromEntity(nuevoCurso);
		return new WrapperResponse<>(true, "El curso se ha creado correctamente", cursoDTO).createResponse(HttpStatus.CREATED);
	}

	/**
	 * Actualiza un curso
	 * Parámetros: Nuevos datos del curso
	 * Retorna: Datos del curso actualizado
	 */	
	@PutMapping(value = "/cursos")
	public ResponseEntity<WrapperResponse<CursoDTO>> update(@RequestBody CursoDTO curso) {
		Curso existeCurso = cursoService.update(converter.fromDTO(curso));
		CursoDTO cursoDTO = converter.fromEntity(existeCurso);
		return new WrapperResponse<>(true, "El curso se ha actualizado correctamente", cursoDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Actualiza el valor de la propiedad estado a 'I' de un curso
	 * Parámetros: ID del curso
	 * Retorna: Datos del curso
	 */	
	@PutMapping(value = "/cursos/{cursoId}")
	public ResponseEntity<WrapperResponse<CursoDTO>> disable(@PathVariable("cursoId") Long cursoId) {
		Curso curso = cursoService.disable(cursoId);
		CursoDTO cursoDTO = converter.fromEntity(curso);
		return new WrapperResponse<>(true, "El curso se ha eliminado correctamente", cursoDTO).createResponse(HttpStatus.OK);
	}

	/**
	 * Elimina un curso
	 * Parámetros: ID del curso
	 * Retorna: 
	 */	
	@DeleteMapping(value = "/cursos/{cursoId}")
	public ResponseEntity<?> delete(@PathVariable("cursoId") Long cursoId) {
		cursoService.delete(cursoId);
		return new WrapperResponse<>(true, "El curso se ha eliminado correctamente", null).createResponse(HttpStatus.OK);
	}
}
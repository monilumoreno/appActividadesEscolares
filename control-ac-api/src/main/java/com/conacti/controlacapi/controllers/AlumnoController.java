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

import com.conacti.controlacapi.converters.AlumnoConverter;
import com.conacti.controlacapi.dtos.AlumnoDTO;
import com.conacti.controlacapi.entities.Alumno;
import com.conacti.controlacapi.services.AlumnoService;
import com.conacti.controlacapi.utilities.WrapperResponse;

@RestController
@CrossOrigin(origins = "*")
public class AlumnoController {
	
	@Autowired
	private AlumnoService alumnoService;
	private AlumnoConverter converter = new AlumnoConverter();

	
	/**
	 * Encuentra alumnos por ID
	 * Parámetros: ID del alumno
	 * Retorna: Datos del alumno
	 */	  	
	@GetMapping(value = "/alumnos/{alumnoId}")
	public ResponseEntity<WrapperResponse<AlumnoDTO>> findById(@PathVariable("alumnoId") Long alumnoId) {
		Alumno alumno = alumnoService.findById(alumnoId);
		AlumnoDTO alumnoDTO = converter.fromEntity(alumno);
		return new WrapperResponse<>(true, "Alumno registrado", alumnoDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Obtiene todos los alumnos registrados
	 * Parámetros: 
	 * Retorna: Listado de alumnos registrados
	 */
	@GetMapping(value = "/alumnos")
	public ResponseEntity<WrapperResponse<List<AlumnoDTO>>> findAll() {
		List<Alumno> listaAlumnos = alumnoService.findAll();
		List<AlumnoDTO> listaAlumnosDTO = converter.fromEntity(listaAlumnos);
		return new WrapperResponse<>(true, "Alumnos registrados", listaAlumnosDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Obtiene los alumnos de un curso
	 * Parámetros: ID del curso
	 * Retorna: Listaso con los datos de los alumnos del curso
	 */
	@GetMapping(value = "/alumnos-curso/{cursoId}")
	public ResponseEntity<WrapperResponse<List<AlumnoDTO>>> findByIdCurso(@PathVariable("cursoId") Long cursoId) {
		List<Alumno> listaAlumnos = alumnoService.findByIdCurso(cursoId);
		List<AlumnoDTO> listaAlumnosDTO = converter.fromEntity(listaAlumnos);
		return new WrapperResponse<>(true, "Alumnos registrados", listaAlumnosDTO).createResponse(HttpStatus.OK);
	}	

	/**
	 * Recupera los alumnos que un acudiente tiene a cargo
	 * Parámetros: ID del acudiente
	 * Retorna: Listado de alumnos
	 */
	@GetMapping(value = "/alumnos-acudiente/{acudienteId}")
	public ResponseEntity<WrapperResponse<List<AlumnoDTO>>> findByIdAcudiente(@PathVariable("acudienteId") Long acudienteId) {
		List<Alumno> listaAlumnos = alumnoService.findByIdAcudiente(acudienteId);
		List<AlumnoDTO> listaAlumnosDTO = converter.fromEntity(listaAlumnos);
		return new WrapperResponse<>(true, "Alumnos registrados", listaAlumnosDTO).createResponse(HttpStatus.OK);
	}

	/**
	 * Recupera todos los alumnos con la propiedad estado = 'A'
	 * Parámetros: 
	 * Retorna: Listado de alumnos
	 */
	@GetMapping(value = "/alumnos-activos")
    public ResponseEntity<WrapperResponse<List<AlumnoDTO>>> findActives() {
        List<Alumno> listaAlumnos = alumnoService.findActives();
        List<AlumnoDTO> alumnosDTO = converter.fromEntity(listaAlumnos);
        return new WrapperResponse<>(true, "Alumnos registrados", alumnosDTO).createResponse(HttpStatus.OK);
    }
	
	/**
	 * Crea un nuevo alumno
	 * Parámetros: Objeto de la clase AlumnoDTO
	 * Retorna: Objeto de la clase AlumnoDTO
	 */
	@PostMapping(value = "/alumnos")
	public ResponseEntity<WrapperResponse<AlumnoDTO>> create(@RequestBody AlumnoDTO alumno) {
		Alumno nuevoAlumno = alumnoService.create(converter.fromDTO(alumno));
		AlumnoDTO alumnoDTO = converter.fromEntity(nuevoAlumno);
		return new WrapperResponse<>(true, "El alumno se ha creado correctamente", alumnoDTO).createResponse(HttpStatus.CREATED);
	}
	
	/**
	 * Elimina un alumno registrado
	 * Parámetros: ID del alumno
	 * Retorna: 
	 */
	@DeleteMapping(value = "/alumnos/{alumnoId}")
	public ResponseEntity<?> delete(@PathVariable("alumnoId") Long alumnoId) {
		alumnoService.delete(alumnoId);
		return new WrapperResponse<>(true, "El alumno se ha eliminado correctamente", null).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Actualiza los datos de un alumno
	 * Parámetros: ID del alumno
	 * Retorna: Objeto de la clase AlumnoDTO con los datos del alumno
	 */
	@PutMapping(value = "/alumnos")
	public ResponseEntity<WrapperResponse<AlumnoDTO>> update(@RequestBody AlumnoDTO alumno) {
		Alumno existeAlumno = alumnoService.update(converter.fromDTO(alumno));
		AlumnoDTO alumnoDTO = converter.fromEntity(existeAlumno);
		return new WrapperResponse<>(true, "El alumno se ha actualizado correctamente", alumnoDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Actualiza el valor de estado a 'I' del alumno
	 * Parámetros: ID del alumno
	 * Retorna: Datos del alumno
	 */
	@PutMapping(value = "/alumnos/{alumnoId}")
	public ResponseEntity<WrapperResponse<AlumnoDTO>> disable(@PathVariable("alumnoId") Long alumnoId) {
	    Alumno alumno = alumnoService.disable(alumnoId);
	    AlumnoDTO alumnoDTO = converter.fromEntity(alumno);
	    return new WrapperResponse<>(true, "El alumno se ha eliminado correctamente", alumnoDTO).createResponse(HttpStatus.OK);
	}
}
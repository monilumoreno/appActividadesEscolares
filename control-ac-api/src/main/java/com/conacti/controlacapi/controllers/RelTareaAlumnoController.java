package com.conacti.controlacapi.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.conacti.controlacapi.converters.RelTareaAlumnoConverter;
import com.conacti.controlacapi.dtos.RelTareaAlumnoDTO;
import com.conacti.controlacapi.dtos.RelTareaAlumnoRequestDTO;
import com.conacti.controlacapi.dtos.TareaGradeRequestDTO;
import com.conacti.controlacapi.entities.RelTareaAlumno;
import com.conacti.controlacapi.services.RelTareaAlumnoService;
import com.conacti.controlacapi.utilities.WrapperResponse;

@RestController
@CrossOrigin(origins = "*")
public class RelTareaAlumnoController {
	@Autowired
	private RelTareaAlumnoService relTareaAlumnoService;
	private RelTareaAlumnoConverter converter = new RelTareaAlumnoConverter();

	/**
	 * Crea un nuevo registro con los datos particulares de una tarea
	 * Parámetros: Descripción, calificación, observaciones, fechaCalificación, ID alumno, ID tarea.
	 * Retorna: Datos particulares de la tarea
	 */		
	@PostMapping(value = "/alumnos-tareas")
	public ResponseEntity<WrapperResponse<RelTareaAlumnoDTO>> create(@RequestBody RelTareaAlumnoDTO relTareaAlumno) {
		RelTareaAlumno nuevaRelTareaAlumno = relTareaAlumnoService.create(converter.fromDTO(relTareaAlumno));
		RelTareaAlumnoDTO relTareaAlumnoDTO = converter.fromEntity(nuevaRelTareaAlumno);
		return new WrapperResponse<>(true, "La tarea se ha creado correctamente", relTareaAlumnoDTO).createResponse(HttpStatus.CREATED);
	}

	/**
	 * Encuentra los datos particulares de una tarea de un alumno
	 * Parámetros: ID de la relación tareas-alumnos
	 * Retorna: Datos particulares de las tareas
	 */		
	@GetMapping(value = "/alumnos-tareas/{tareaAlumnoId}")
	public ResponseEntity<WrapperResponse<RelTareaAlumnoDTO>> findById(@PathVariable("tareaAlumnoId") Long tareaAlumnoId) {
		RelTareaAlumno relTareaAlumno = relTareaAlumnoService.findById(tareaAlumnoId);
		RelTareaAlumnoDTO relTareaAlumnoDTO = converter.fromEntity(relTareaAlumno);
		return new WrapperResponse<>(true, "Tarea encontrada", relTareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Recupera los detos particulares de las tareas
	 * Parámetros: Ninguno
	 * Retorna: Listado con los detos particulares de las tareas
	 */	
	@GetMapping(value = "/alumnos-tareas")
	public ResponseEntity<WrapperResponse<List<RelTareaAlumnoDTO>>> findAll() {
		List<RelTareaAlumno> listaRelTareaAlumno = relTareaAlumnoService.findAll();
		List<RelTareaAlumnoDTO> listaRelTareaAlumnoDTO = converter.fromEntity(listaRelTareaAlumno);
		return new WrapperResponse<>(true, "Tarea encontrada", listaRelTareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Recupera los detos particulares de las tareas
	 * Parámetros: ID de la tarea
	 * Retorna: Listado con los detos particulares de las tareas
	 */	
	@GetMapping(value = "/alumnos-tareas-lista/{tareaId}")
	public ResponseEntity<WrapperResponse<List<RelTareaAlumnoDTO>>> findByIdTarea(@PathVariable("tareaId") Long tareaId) {
		List<RelTareaAlumno> listaRelTareaAlumo = relTareaAlumnoService.findByIdTarea(tareaId);
		List<RelTareaAlumnoDTO> listaRelTareaAlumnoDTO = converter.fromEntity(listaRelTareaAlumo);
		return new WrapperResponse<>(true, "Tareas registradas", listaRelTareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Recupera los detos particulares de las tareas de un alumno
	 * Parámetros: ID del alumno
	 * Retorna: Listado con los detos particulares de las tareas de un alumno
	 */		
	@GetMapping(value = "/lista-por-alumno/{alumnoId}")
	public ResponseEntity<WrapperResponse<List<RelTareaAlumnoDTO>>> findByIdAlumno(@PathVariable("alumnoId") Long alumnoId) {
		List<RelTareaAlumno> listaRelTareaAlumo = relTareaAlumnoService.findByIdAlumno(alumnoId);
		List<RelTareaAlumnoDTO> listaRelTareaAlumnoDTO = converter.fromEntity(listaRelTareaAlumo);
		return new WrapperResponse<>(true, "Tareas registradas", listaRelTareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
	
	@PostMapping(value = "/lista-por-alumno")
	public ResponseEntity<WrapperResponse<List<RelTareaAlumnoDTO>>> find(@RequestBody RelTareaAlumnoRequestDTO request) {
		List<RelTareaAlumno> listaRelTareaAlumo = relTareaAlumnoService.find(request);
		List<RelTareaAlumnoDTO> listaRelTareaAlumnoDTO = converter.fromEntity(listaRelTareaAlumo);
		return new WrapperResponse<>(true, "Tareas registradas", listaRelTareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Recupera los datos particulares de las tareas con propiedad estado = 'A'
	 * Parámetros: 
	 * Retorna: Listado con los datos particulares de las tareas con propiedad estado = 'A'
	 */	
	@GetMapping(value = "/alumnos-tareas-activos")
    public ResponseEntity<WrapperResponse<List<RelTareaAlumnoDTO>>> findActives() {
        List<RelTareaAlumno> listaTareasAlumnos = relTareaAlumnoService.findActives();
        List<RelTareaAlumnoDTO> tareasAlumnosDTO = converter.fromEntity(listaTareasAlumnos);
        return new WrapperResponse<>(true, "Tareas registradas", tareasAlumnosDTO).createResponse(HttpStatus.OK);
    }	
	
	/**
	 * Actualiza el valor de la propiedad calificacion de la tarea
	 * Parámetros: ID RelTareaAlumno, calificacion, observaciones
	 * Retorna: Datos particulares de la tarea
	 */	
	@PutMapping(value = "/alumnos-tareas")
	public ResponseEntity<WrapperResponse<RelTareaAlumnoDTO>> grade(@RequestBody TareaGradeRequestDTO tareaGrade) {
	    RelTareaAlumno relTareaAlumno = relTareaAlumnoService.grade(tareaGrade);
	    RelTareaAlumnoDTO relTareaAlumnoDTO = converter.fromEntity(relTareaAlumno);
	    return new WrapperResponse<>(true, "La tarea se ha calificado correctamente", relTareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Actualiza el valor de la propiedad estado a 'I'
	 * Parámetros: ID
	 * Retorna: Datos particulares de la tarea
	 */	
	@PutMapping(value = "/alumnos-tareas/{tareaAlumnoId}")
	private ResponseEntity<WrapperResponse<RelTareaAlumnoDTO>> disable(@PathVariable("tareaAlumnoId") Long tareaAlumnoId){
		RelTareaAlumno tareaAlumno = relTareaAlumnoService.disable(tareaAlumnoId);
		RelTareaAlumnoDTO tareaAlumnoDTO = converter.fromEntity(tareaAlumno);
		return new WrapperResponse<>(true, "La tarea se ha eliminado correctamente", tareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
}
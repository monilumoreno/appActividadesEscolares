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

import com.conacti.controlacapi.converters.RelTareaAlumnoConverter;
import com.conacti.controlacapi.converters.TareaConverter;
import com.conacti.controlacapi.dtos.RelTareaAlumnoDTO;
import com.conacti.controlacapi.dtos.TareaDTO;
import com.conacti.controlacapi.dtos.TareaRequestDTO;
import com.conacti.controlacapi.entities.RelTareaAlumno;
import com.conacti.controlacapi.entities.Tarea;
import com.conacti.controlacapi.services.RelTareaAlumnoService;
import com.conacti.controlacapi.services.TareaService;
import com.conacti.controlacapi.utilities.WrapperResponse;

@RestController
@CrossOrigin(origins = "*")
public class TareaController {
	
	@Autowired
	private TareaService tareaService;
	@Autowired
	private RelTareaAlumnoService relTareaAlumnoService;
	private TareaConverter converter = new TareaConverter();
	private RelTareaAlumnoConverter relConverter = new RelTareaAlumnoConverter();
	
	/**
	 * Encuentra los datos generales de una tarea por ID
	 * Parámetros: ID de la tarea
	 * Retorna: Datos generales de la tarea: ID, descripción, fecha creación, estado, ID curso,
	 * 			ID docente, ID asignatura. 
	 */			
	@GetMapping(value = "/tareas/{tareaId}")
	public ResponseEntity<WrapperResponse<TareaDTO>> findById(@PathVariable("tareaId") Long tareaId) {
		Tarea tarea = tareaService.findById(tareaId);
		TareaDTO tareaDTO = converter.fromEntity(tarea);
		return new WrapperResponse<>(true, "Tarea encontrada", tareaDTO).createResponse(HttpStatus.OK);
	}	

	/**
	 * Encuentra los datos generales de todas las tareas registradas
	 * Parámetros: Ninguno
	 * Retorna: Datos generales de las tareas
	 */			
	@GetMapping(value = "/tareas")
	public ResponseEntity<WrapperResponse<List<TareaDTO>>> findAll() {
		List<Tarea> arregloTareas = tareaService.findAll();
		List<TareaDTO> tareasDTO = converter.fromEntity(arregloTareas);
		return new WrapperResponse<>(true, "Tareas encontradas", tareasDTO).createResponse(HttpStatus.OK);
	}

	/**
	 * Recupera las tareas con propiedad estado = 'A'
	 * Parámetros: 
	 * Retorna: Listado de tareas
	 */	
	@GetMapping(value = "/tareas-activas")
    public ResponseEntity<WrapperResponse<List<TareaDTO>>> findActives() {
        List<Tarea> listaTareas = tareaService.findActives();
        List<TareaDTO> tareasDTO = converter.fromEntity(listaTareas);
        return new WrapperResponse<>(true, "Tareas registradas", tareasDTO).createResponse(HttpStatus.OK);
    }
	
	@GetMapping(value = "/tareas-docente/{docenteId}")
    public ResponseEntity<WrapperResponse<List<TareaDTO>>> findByDocente(@PathVariable("docenteId") Long docenteId) {
        List<Tarea> listaTareas = tareaService.findByDocente(docenteId);
        List<TareaDTO> tareasDTO = converter.fromEntity(listaTareas);
        return new WrapperResponse<>(true, "Tareas registradas", tareasDTO).createResponse(HttpStatus.OK);
    }
	
	/**
	 * Recupera una tarea por ID curso, ID asignatura, ID docente
	 * Parámetros: ID curso, ID asignatura, ID docente
	 * Retorna: Listado de tareas
	 */	
	@PostMapping(value = "/tareas-request")
	public ResponseEntity<WrapperResponse<List<TareaDTO>>> find(@RequestBody TareaRequestDTO request) {
		List<Tarea> listaTareas = tareaService.find(request);
		List<TareaDTO> listaTareasDTO = converter.fromEntity(listaTareas);
		return new WrapperResponse<>(true, "Tareas registradas", listaTareasDTO).createResponse(HttpStatus.OK);		
	}
	
	/**
	 * Crea una nueva tarea
	 * Parámetros: Objeto TareaDTO
	 * Retorna: Listado con los datos específicos de la tarea por cada alumno
	 */	
	@PostMapping(value = "/tareas")
	public ResponseEntity<WrapperResponse<List<RelTareaAlumnoDTO>>> create(@RequestBody TareaDTO tarea) {
		Tarea nuevaTarea = tareaService.create(converter.fromDTO(tarea));		
		List<RelTareaAlumno> listaRel = relTareaAlumnoService.createAll(nuevaTarea);
		List<RelTareaAlumnoDTO> listaRelDTO = relConverter.fromEntity(listaRel); 
		return new WrapperResponse<>(true, "La tarea se ha creado correctamente", listaRelDTO).createResponse(HttpStatus.CREATED);
	}
	
	/**
	 * Actualiza una tarea
	 * Parámetros: Objeto TareaDTO
	 * Retorna: Datos de la tarea creada
	 */	
	@PutMapping(value = "/tareas")
	public ResponseEntity<WrapperResponse<TareaDTO>> update(@RequestBody TareaDTO tarea) {
		Tarea existeTarea = tareaService.update(converter.fromDTO(tarea));
		TareaDTO tareaDTO = converter.fromEntity(existeTarea);
		return new WrapperResponse<>(true, "La tarea se ha actualizado correctamente", tareaDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Elimina una tarea
	 * Parámetros: ID de la tarea
	 * Retorna: 
	 */	
	@DeleteMapping(value = "/tareas/{tareaId}")
	public ResponseEntity<?> delete(@PathVariable("tareaId") Long tareaId) {
		tareaService.delete(tareaId);
		return new WrapperResponse<>(true, "La tarea se ha eliminado correctamente", null).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Actualiza el valor del atributo estado a 'I'
	 * Parámetros: ID de la tarea
	 * Retorna: Datos de la tarea
	 */	
	@PutMapping(value = "/tareas/{tareaId}")
	private ResponseEntity<WrapperResponse<TareaDTO>> disable(@PathVariable("tareaId") Long tareaId){
		relTareaAlumnoService.disableByTarea(tareaId);
		Tarea tarea = tareaService.disable(tareaId);
		TareaDTO tareaDTO = converter.fromEntity(tarea);		
		return new WrapperResponse<>(true, "La tarea se ha eliminado correctamente", tareaDTO).createResponse(HttpStatus.OK);
	}	
}
package com.misiontic.controlacapi.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.misiontic.controlacapi.converters.RelTareaAlumnoConverter;
import com.misiontic.controlacapi.converters.TareaConverter;
import com.misiontic.controlacapi.dtos.RelTareaAlumnoDTO;
import com.misiontic.controlacapi.dtos.TareaDTO;
import com.misiontic.controlacapi.entities.RelTareaAlumno;
import com.misiontic.controlacapi.entities.Tarea;
import com.misiontic.controlacapi.services.RelTareaAlumnoService;
import com.misiontic.controlacapi.services.TareaService;
import com.misiontic.controlacapi.utilities.WrapperResponse;

@RestController
@CrossOrigin(origins = "*")
public class TareaController {
	
	@Autowired
	private TareaService tareaService;
	@Autowired
	private RelTareaAlumnoService relTareaAlumnoService;
	private TareaConverter converter = new TareaConverter();
	private RelTareaAlumnoConverter relConverter = new RelTareaAlumnoConverter();
	
	@GetMapping(value = "/tareas/{tareaId}")
	public ResponseEntity<WrapperResponse<TareaDTO>> findById(@PathVariable("tareaId") Long tareaId) {
		Tarea tarea = tareaService.findById(tareaId);
		TareaDTO tareaDTO = converter.fromEntity(tarea);
		return new WrapperResponse<>(true, "Tarea encontrada", tareaDTO).createResponse(HttpStatus.OK);
	}	

	@GetMapping(value = "/tareas")
	public ResponseEntity<WrapperResponse<List<TareaDTO>>> findAll() {
		List<Tarea> arregloTareas = tareaService.findAll();
		List<TareaDTO> tareasDTO = converter.fromEntity(arregloTareas);
		return new WrapperResponse<>(true, "Tareas encontradas", tareasDTO).createResponse(HttpStatus.OK);
	}

	@PostMapping(value = "/tareas")
	public ResponseEntity<WrapperResponse<List<RelTareaAlumnoDTO>>> create(@RequestBody TareaDTO tarea) {
		Tarea nuevaTarea = tareaService.create(converter.fromDTO(tarea));		
		List<RelTareaAlumno> listaRel = relTareaAlumnoService.createAll(nuevaTarea);
		List<RelTareaAlumnoDTO> listaRelDTO = relConverter.fromEntity(listaRel); 
		return new WrapperResponse<>(true, "La tarea se ha creado correctamente", listaRelDTO).createResponse(HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/tareas")
	public ResponseEntity<WrapperResponse<TareaDTO>> update(@RequestBody TareaDTO tarea) {
		Tarea existeTarea = tareaService.update(converter.fromDTO(tarea));
		TareaDTO tareaDTO = converter.fromEntity(existeTarea);
		return new WrapperResponse<>(true, "La tarea se ha actualizado correctamente", tareaDTO).createResponse(HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/tareas/{tareaId}")
	public ResponseEntity<?> delete(@PathVariable("tareaId") Long tareaId) {
		tareaService.delete(tareaId);
		return new WrapperResponse<>(true, "La tarea se ha eliminado correctamente", null).createResponse(HttpStatus.OK);
	}
	
	@PatchMapping(value = "/tareas/{tareaId}")
	private ResponseEntity<WrapperResponse<TareaDTO>> disable(@PathVariable("tareaId") Long tareaId){
		Tarea tarea = tareaService.disable(tareaId);
		TareaDTO tareaDTO = converter.fromEntity(tarea);
		return new WrapperResponse<>(true, "La tarea se ha inactivado correctamente", tareaDTO).createResponse(HttpStatus.OK);
	}	
}
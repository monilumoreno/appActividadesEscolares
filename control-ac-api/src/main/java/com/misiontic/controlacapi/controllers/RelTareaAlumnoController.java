package com.misiontic.controlacapi.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.misiontic.controlacapi.converters.RelTareaAlumnoConverter;
import com.misiontic.controlacapi.dtos.RelTareaAlumnoDTO;
import com.misiontic.controlacapi.dtos.TareaGradeRequestDTO;
import com.misiontic.controlacapi.entities.RelTareaAlumno;
import com.misiontic.controlacapi.services.RelTareaAlumnoService;
import com.misiontic.controlacapi.utilities.WrapperResponse;

@RestController
@CrossOrigin(origins = "*")
public class RelTareaAlumnoController {
	@Autowired
	private RelTareaAlumnoService relTareaAlumnoService;
	private RelTareaAlumnoConverter converter = new RelTareaAlumnoConverter();
	
	@GetMapping(value = "/alumnos-tareas/{tareasalumnosId}")
	public ResponseEntity<WrapperResponse<RelTareaAlumnoDTO>> findById(@PathVariable("tareasalumnosId") Long tareasalumnosId) {
		RelTareaAlumno relTareaAlumno = relTareaAlumnoService.findById(tareasalumnosId);
		RelTareaAlumnoDTO relTareaAlumnoDTO = converter.fromEntity(relTareaAlumno);
		return new WrapperResponse<>(true, "Tarea encontrada", relTareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
	
	@GetMapping(value = "/alumnos-tareas")
	public ResponseEntity<WrapperResponse<List<RelTareaAlumnoDTO>>> findAll() {
		List<RelTareaAlumno> listaRelTareaAlumno = relTareaAlumnoService.findAll();
		List<RelTareaAlumnoDTO> listaRelTareaAlumnoDTO = converter.fromEntity(listaRelTareaAlumno);
		return new WrapperResponse<>(true, "Tarea encontrada", listaRelTareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
	
	@GetMapping(value = "/alumnos-tareas-lista/{tareaId}")
	public ResponseEntity<WrapperResponse<List<RelTareaAlumnoDTO>>> findByIdTarea(@PathVariable("tareaId") Long tareaId) {
		List<RelTareaAlumno> listaRelTareaAlumo = relTareaAlumnoService.findByIdTarea(tareaId);
		List<RelTareaAlumnoDTO> listaRelTareaAlumnoDTO = converter.fromEntity(listaRelTareaAlumo);
		return new WrapperResponse<>(true, "Tareas registradas", listaRelTareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
	
	@PostMapping(value = "/alumnos-tareas")
	public ResponseEntity<WrapperResponse<RelTareaAlumnoDTO>> create(@RequestBody RelTareaAlumnoDTO relTareaAlumno) {
		RelTareaAlumno nuevaRelTareaAlumno = relTareaAlumnoService.create(converter.fromDTO(relTareaAlumno));
		RelTareaAlumnoDTO relTareaAlumnoDTO = converter.fromEntity(nuevaRelTareaAlumno);
		return new WrapperResponse<>(true, "La tarea se ha creado correctamente", relTareaAlumnoDTO).createResponse(HttpStatus.CREATED);
	}
	
	@PatchMapping(value = "/alumnos-tareas")
	public ResponseEntity<WrapperResponse<RelTareaAlumnoDTO>> grade(@RequestBody TareaGradeRequestDTO tareaGrade) {
	    RelTareaAlumno relTareaAlumno = relTareaAlumnoService.grade(tareaGrade);
	    RelTareaAlumnoDTO relTareaAlumnoDTO = converter.fromEntity(relTareaAlumno);
	    return new WrapperResponse<>(true, "La tarea se ha calificado correctamente", relTareaAlumnoDTO).createResponse(HttpStatus.OK);
	}
}

package com.misiontic.controlacapi.controllers;

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
import com.misiontic.controlacapi.converters.AlumnoConverter;
import com.misiontic.controlacapi.dtos.AlumnoDTO;
import com.misiontic.controlacapi.entities.Alumno;
import com.misiontic.controlacapi.services.AlumnoService;
import com.misiontic.controlacapi.utilities.WrapperResponse;

@RestController
@CrossOrigin(origins = "*")
public class AlumnoController {
	
	@Autowired
	private AlumnoService alumnoService;
	private AlumnoConverter converter = new AlumnoConverter();
	
	@GetMapping(value = "/alumnos/{alumnoId}")
	public ResponseEntity<WrapperResponse<AlumnoDTO>> findById(@PathVariable("alumnoId") Long alumnoId) {
		Alumno alumno = alumnoService.findById(alumnoId);
		AlumnoDTO alumnoDTO = converter.fromEntity(alumno);
		return new WrapperResponse<>(true, "Alumno encontrado", alumnoDTO).createResponse(HttpStatus.OK);
	}
	
	@GetMapping(value = "/alumnos")
	public ResponseEntity<WrapperResponse<List<AlumnoDTO>>> findAll() {
		List<Alumno> listaAlumnos = alumnoService.findAll();
		List<AlumnoDTO> listaAlumnosDTO = converter.fromEntity(listaAlumnos);
		return new WrapperResponse<>(true, "Alumnos registrados", listaAlumnosDTO).createResponse(HttpStatus.OK);
	}
	
	@GetMapping(value = "/alumnos-curso/{cursoId}")
	public ResponseEntity<WrapperResponse<List<AlumnoDTO>>> findByIdCurso(@PathVariable("cursoId") Long cursoId) {
		List<Alumno> listaAlumnos = alumnoService.findByIdCurso(cursoId);
		List<AlumnoDTO> listaAlumnosDTO = converter.fromEntity(listaAlumnos);
		return new WrapperResponse<>(true, "Alumnos registrados", listaAlumnosDTO).createResponse(HttpStatus.OK);
	}
	
	@GetMapping(value = "/alumnos-acudiente/{acudienteId}")
	public ResponseEntity<WrapperResponse<List<AlumnoDTO>>> findByIdAcudiente(@PathVariable("acudienteId") Long acudienteId) {
		List<Alumno> listaAlumnos = alumnoService.findByIdAcudiente(acudienteId);
		List<AlumnoDTO> listaAlumnosDTO = converter.fromEntity(listaAlumnos);
		return new WrapperResponse<>(true, "Alumnos registrados", listaAlumnosDTO).createResponse(HttpStatus.OK);
	}

	@PostMapping(value = "/alumnos")
	public ResponseEntity<WrapperResponse<AlumnoDTO>> create(@RequestBody AlumnoDTO alumno) {
		Alumno nuevoAlumno = alumnoService.create(converter.fromDTO(alumno));
		AlumnoDTO alumnoDTO = converter.fromEntity(nuevoAlumno);
		return new WrapperResponse<>(true, "El alumno se ha creado correctamente", alumnoDTO).createResponse(HttpStatus.CREATED);
	}
	
	@DeleteMapping(value = "/alumnos/{alumnoId}")
	public ResponseEntity<?> delete(@PathVariable("alumnoId") Long alumnoId) {
		alumnoService.delete(alumnoId);
		return new WrapperResponse<>(true, "El alumno se ha eliminado correctamente", null).createResponse(HttpStatus.OK);
	}
	
	@PutMapping(value = "/alumnos")
	public ResponseEntity<WrapperResponse<AlumnoDTO>> update(@RequestBody AlumnoDTO alumno) {
		Alumno existeAlumno = alumnoService.update(converter.fromDTO(alumno));
		AlumnoDTO alumnoDTO = converter.fromEntity(existeAlumno);
		return new WrapperResponse<>(true, "El alumno se ha actualizado correctamente", alumnoDTO).createResponse(HttpStatus.OK);
	}
	
	@PutMapping(value = "/alumnos/{alumnoId}")
	public ResponseEntity<WrapperResponse<AlumnoDTO>> disable(@PathVariable("alumnoId") Long alumnoId) {
	    Alumno alumno = alumnoService.disable(alumnoId);
	    AlumnoDTO alumnoDTO = converter.fromEntity(alumno);
	    return new WrapperResponse<>(true, "El alumno se ha desactivado correctamente", alumnoDTO).createResponse(HttpStatus.OK);
	}
}
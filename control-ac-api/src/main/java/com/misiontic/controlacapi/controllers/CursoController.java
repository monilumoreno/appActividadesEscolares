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
import com.misiontic.controlacapi.converters.CursoConverter;
import com.misiontic.controlacapi.dtos.CursoDTO;
import com.misiontic.controlacapi.entities.Curso;
import com.misiontic.controlacapi.services.CursoService;
import com.misiontic.controlacapi.utilities.WrapperResponse;

@RestController
@CrossOrigin(origins = "*")
public class CursoController {
	
	@Autowired
	private CursoService cursoService;
	private CursoConverter converter = new CursoConverter();
	
	@GetMapping(value = "/cursos/{cursoId}")
	public ResponseEntity<WrapperResponse<CursoDTO>> findById(@PathVariable("cursoId") Long cursoId) {
		Curso curso = cursoService.findById(cursoId);
		CursoDTO cursoDTO = converter.fromEntity(curso);
		return new WrapperResponse<>(true, "Curso encontrado", cursoDTO).createResponse(HttpStatus.OK);
	}

	@DeleteMapping(value = "/cursos/{cursoId}")
	public ResponseEntity<?> delete(@PathVariable("cursoId") Long cursoId) {
		cursoService.delete(cursoId);
		return new WrapperResponse<>(true, "El curso se ha eliminado correctamente", null).createResponse(HttpStatus.OK);
	}

	@GetMapping(value = "/cursos")
	public ResponseEntity<WrapperResponse<List<CursoDTO>>> findAll() {
		List<Curso> arregloCursos = cursoService.findAll();
		List<CursoDTO> cursosDTO = converter.fromEntity(arregloCursos);
		return new WrapperResponse<>(true, "Cursos encontrados", cursosDTO).createResponse(HttpStatus.OK);
	}

	@PostMapping(value = "/cursos")
	public ResponseEntity<WrapperResponse<CursoDTO>> create(@RequestBody CursoDTO curso) {
		Curso nuevoCurso = cursoService.create(converter.fromDTO(curso));
		CursoDTO cursoDTO = converter.fromEntity(nuevoCurso);
		return new WrapperResponse<>(true, "El curso se ha creado correctamente", cursoDTO).createResponse(HttpStatus.CREATED);
	}

	@PutMapping(value = "/cursos")
	public ResponseEntity<WrapperResponse<CursoDTO>> update(@RequestBody CursoDTO curso) {
		Curso existeCurso = cursoService.update(converter.fromDTO(curso));
		CursoDTO cursoDTO = converter.fromEntity(existeCurso);
		return new WrapperResponse<>(true, "El curso se ha actualizado correctamente", cursoDTO).createResponse(HttpStatus.OK);
	}
	
	@PatchMapping(value = "/cursos/{cursoId}")
	public ResponseEntity<WrapperResponse<CursoDTO>> disable(@PathVariable("cursoId") Long cursoId) {
		Curso curso = cursoService.disable(cursoId);
		CursoDTO cursoDTO = converter.fromEntity(curso);
		return new WrapperResponse<>(true, "El curso se ha desactivado correctamente", cursoDTO).createResponse(HttpStatus.OK);
	}
}
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
import com.misiontic.controlacapi.converters.PerfilConverter;
import com.misiontic.controlacapi.dtos.PerfilDTO;
import com.misiontic.controlacapi.entities.Perfil;
import com.misiontic.controlacapi.services.PerfilService;
import com.misiontic.controlacapi.utilities.WrapperResponse;

@RestController
@CrossOrigin(origins = "*")
public class PerfilController {
	
	@Autowired
	private PerfilService perfilService;
	private PerfilConverter converter = new PerfilConverter();
	
	@GetMapping(value = "/perfiles/{perfilId}")
	public ResponseEntity<WrapperResponse<PerfilDTO>> findById(@PathVariable("perfilId") Long perfilId) {
		Perfil perfil = perfilService.findById(perfilId);
		PerfilDTO perfilDTO = converter.fromEntity(perfil);
		return new WrapperResponse<>(true, "Perfil encontrado", perfilDTO).createResponse(HttpStatus.OK);
	}

	@DeleteMapping(value = "/perfiles/{perfilId}")
	public ResponseEntity<?> delete(@PathVariable("perfilId") Long perfilId) {
		perfilService.delete(perfilId);
		return new WrapperResponse<>(true, "El perfil se ha eliminado correctamente", null).createResponse(HttpStatus.OK);
	}

	@PutMapping(value = "/perfiles/{perfilId}")
	public ResponseEntity<WrapperResponse<PerfilDTO>> disable(@PathVariable("perfilId") Long perfilId) {
		Perfil perfil = perfilService.disable(perfilId);
		PerfilDTO perfilDTO = converter.fromEntity(perfil);
		return new WrapperResponse<>(true, "El perfil se ha desactivado correctamente", perfilDTO).createResponse(HttpStatus.OK);
	}
	
	@GetMapping(value = "/perfiles")
	public ResponseEntity<WrapperResponse<List<PerfilDTO>>> findAll() {
		
		List<Perfil> arregloPerfiles = perfilService.findAll();
		List<PerfilDTO> DTOperfiles = converter.fromEntity(arregloPerfiles);
		return new WrapperResponse<>(true, "Perfiles encontrados", DTOperfiles).createResponse(HttpStatus.OK);
	}

	@PostMapping(value = "/perfiles")
	public ResponseEntity<WrapperResponse<PerfilDTO>> create(@RequestBody PerfilDTO perfil) {
		Perfil nuevoPerfil = perfilService.create(converter.fromDTO(perfil));
		PerfilDTO perfilDTO = converter.fromEntity(nuevoPerfil);
		return new WrapperResponse<>(true, "El perfil se ha creado correctamente", perfilDTO).createResponse(HttpStatus.CREATED);
	}

	@PutMapping(value = "/perfiles")
	public ResponseEntity<WrapperResponse<PerfilDTO>> update(@RequestBody PerfilDTO perfil) {
		Perfil existePerfil = perfilService.update(converter.fromDTO(perfil));
		PerfilDTO perfilDTO = converter.fromEntity(existePerfil);
		return new WrapperResponse<>(true, "El perfil se ha actualizado correctamente", perfilDTO).createResponse(HttpStatus.OK);
	}
}
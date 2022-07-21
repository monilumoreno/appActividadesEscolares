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
	
	/**
	 * Encuentra un perfil por ID
	 * Parámetros: ID del perfil
	 * Retorna: Datos del perfil
	 */	
	@GetMapping(value = "/perfiles/{perfilId}")
	public ResponseEntity<WrapperResponse<PerfilDTO>> findById(@PathVariable("perfilId") Long perfilId) {
		Perfil perfil = perfilService.findById(perfilId);
		PerfilDTO perfilDTO = converter.fromEntity(perfil);
		return new WrapperResponse<>(true, "Perfil encontrado", perfilDTO).createResponse(HttpStatus.OK);
	}

	/**
	 * Obtiene los Perfiles registrados
	 * Parámetros: Ninguno
	 * Retorna: Listado de los perfiles
	 */		
	@GetMapping(value = "/perfiles")
	public ResponseEntity<WrapperResponse<List<PerfilDTO>>> findAll() {
		
		List<Perfil> arregloPerfiles = perfilService.findAll();
		List<PerfilDTO> DTOperfiles = converter.fromEntity(arregloPerfiles);
		return new WrapperResponse<>(true, "Perfiles encontrados", DTOperfiles).createResponse(HttpStatus.OK);
	}

	/**
	 * Recupera los perfiles con la propiedad estado = 'A'
	 * Parámetros: Ninguno
	 * Retorna: Listado de perfiles
	 */	
	@GetMapping(value = "/perfiles-activos")
    public ResponseEntity<WrapperResponse<List<PerfilDTO>>> findActives() {
        List<Perfil> listaPerfiles = perfilService.findActives();
        List<PerfilDTO> perfilesDTO = converter.fromEntity(listaPerfiles);
        return new WrapperResponse<>(true, "Perfiles registrados", perfilesDTO).createResponse(HttpStatus.OK);
    }
	
	/**
	 * Crea un nuevo perfil
	 * Parámetros: Datos del perfil
	 * Retorna: Datos del perfil creado
	 */	
	@PostMapping(value = "/perfiles")
	public ResponseEntity<WrapperResponse<PerfilDTO>> create(@RequestBody PerfilDTO perfil) {
		Perfil nuevoPerfil = perfilService.create(converter.fromDTO(perfil));
		PerfilDTO perfilDTO = converter.fromEntity(nuevoPerfil);
		return new WrapperResponse<>(true, "El perfil se ha creado correctamente", perfilDTO).createResponse(HttpStatus.CREATED);
	}

	/**
	 * Actualiza un perfil
	 * Parámetros: Nuevos datos del perfil
	 * Retorna: Datos del perfil actualizado
	 */	
	@PutMapping(value = "/perfiles")
	public ResponseEntity<WrapperResponse<PerfilDTO>> update(@RequestBody PerfilDTO perfil) {
		Perfil existePerfil = perfilService.update(converter.fromDTO(perfil));
		PerfilDTO perfilDTO = converter.fromEntity(existePerfil);
		return new WrapperResponse<>(true, "El perfil se ha actualizado correctamente", perfilDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Actualiza el valor de la propiedad estado a 'I' de un perfil
	 * Parámetros: ID del perfil
	 * Retorna: Datos del perfil
	 */	
	@PutMapping(value = "/perfiles/{perfilId}")
	public ResponseEntity<WrapperResponse<PerfilDTO>> disable(@PathVariable("perfilId") Long perfilId) {
		Perfil perfil = perfilService.disable(perfilId);
		PerfilDTO perfilDTO = converter.fromEntity(perfil);
		return new WrapperResponse<>(true, "El perfil se ha eliminado correctamente", perfilDTO).createResponse(HttpStatus.OK);
	}

	/**
	 * Elimina un perfil
	 * Parámetros: ID del perfil
	 * Retorna: 
	 */	
	@DeleteMapping(value = "/perfiles/{perfilId}")
	public ResponseEntity<?> delete(@PathVariable("perfilId") Long perfilId) {
		perfilService.delete(perfilId);
		return new WrapperResponse<>(true, "El perfil se ha eliminado correctamente", null).createResponse(HttpStatus.OK);
	}
}
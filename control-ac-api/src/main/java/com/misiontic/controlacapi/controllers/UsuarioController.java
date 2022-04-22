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
import com.misiontic.controlacapi.converters.UsuarioConverter;
import com.misiontic.controlacapi.dtos.LoginRequestDTO;
import com.misiontic.controlacapi.dtos.LoginResponseDTO;
import com.misiontic.controlacapi.dtos.UsuarioDTO;
import com.misiontic.controlacapi.entities.Usuario;
import com.misiontic.controlacapi.services.UsuarioService;
import com.misiontic.controlacapi.utilities.WrapperResponse;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;
	private UsuarioConverter converter = new UsuarioConverter();
	
	@GetMapping(value = "/usuarios/{usuarioId}")
	public ResponseEntity<WrapperResponse<UsuarioDTO>> findById(@PathVariable("usuarioId") Long usuarioId) {
		Usuario usuario = usuarioService.findById(usuarioId);
		UsuarioDTO usuarioDTO = converter.fromEntity(usuario);
		return new WrapperResponse<>(true, "Usuario encontrado", usuarioDTO).createResponse(HttpStatus.OK);
	}

	@GetMapping(value = "/usuarios")
	public ResponseEntity<WrapperResponse<List<UsuarioDTO>>> findAll() {
		List<Usuario> arregloUsuarios = usuarioService.findAll();
		List<UsuarioDTO> usuariosDTO = converter.fromEntity(arregloUsuarios);
		return new WrapperResponse<>(true, "Usuarios encontrados", usuariosDTO).createResponse(HttpStatus.OK);
	}

	@PostMapping(value = "/usuarios")
	public ResponseEntity<WrapperResponse<UsuarioDTO>> create(@RequestBody UsuarioDTO usuario) {
		Usuario nuevoUsuario = usuarioService.create(converter.fromDTO(usuario));
		UsuarioDTO usuarioDTO = converter.fromEntity(nuevoUsuario);
		return new WrapperResponse<>(true, "El usuario se ha creado correctamente", usuarioDTO).createResponse(HttpStatus.CREATED);
	}

	@DeleteMapping(value = "/usuarios/{usuarioId}")
	public ResponseEntity<?> delete(@PathVariable("usuarioId") Long usuarioId) {
		usuarioService.delete(usuarioId);
		return new WrapperResponse<>(true, "El usuario se ha eliminado correctamente", null).createResponse(HttpStatus.OK);
	}
	
	@PutMapping(value = "/usuarios")
	public ResponseEntity<WrapperResponse<UsuarioDTO>> update(@RequestBody UsuarioDTO usuario) {
		Usuario existeUsuario = usuarioService.update(converter.fromDTO(usuario));
		UsuarioDTO usuarioDTO = converter.fromEntity(existeUsuario);
		return new WrapperResponse<>(true, "El usuario se ha actualizado correctamente", usuarioDTO).createResponse(HttpStatus.OK);
	}
	
	@PostMapping(value = "/login")
	public ResponseEntity<WrapperResponse<LoginResponseDTO>> login(@RequestBody LoginRequestDTO request) {
		LoginResponseDTO response = usuarioService.login(request);
		return new WrapperResponse<>(true, "Login exitoso", response).createResponse(HttpStatus.OK);
	}
	
	@PutMapping(value = "/usuarios/{usuarioId}")
	public ResponseEntity<WrapperResponse<UsuarioDTO>> disable(@PathVariable("usuarioId") Long usuarioId) {
		Usuario usuario = usuarioService.disable(usuarioId);
		UsuarioDTO usuarioDTO = converter.fromEntity(usuario);
		return new WrapperResponse<>(true, "El usuario se ha desactivado correctamente", usuarioDTO).createResponse(HttpStatus.OK);
	}
}
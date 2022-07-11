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
	
	/**
	 * Encuentra un usuario por ID
	 * Parámetros: ID deL usuario
	 * Retorna: Datos del usuario
	 */				
	@GetMapping(value = "/usuarios/{usuarioId}")
	public ResponseEntity<WrapperResponse<UsuarioDTO>> findById(@PathVariable("usuarioId") Long usuarioId) {
		Usuario usuario = usuarioService.findById(usuarioId);
		UsuarioDTO usuarioDTO = converter.fromEntity(usuario);
		return new WrapperResponse<>(true, "Usuario encontrado", usuarioDTO).createResponse(HttpStatus.OK);
	}

	@GetMapping(value = "/usuarios-perfil/{perfilId}")
	public ResponseEntity<WrapperResponse<List<UsuarioDTO>>> findByIdPerfil(@PathVariable("perfilId") Long perfilId) {
		List<Usuario> listaUsuarios = usuarioService.findByIdPerfil(perfilId);
		List<UsuarioDTO> listaUsuariosDTO = converter.fromEntity(listaUsuarios);
		return new WrapperResponse<>(true, "Usuarios encontrados", listaUsuariosDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Obtiene los usuarios registrados
	 * Parámetros: 
	 * Retorna: Listado de los usuarios
	 */
	@GetMapping(value = "/usuarios")
	public ResponseEntity<WrapperResponse<List<UsuarioDTO>>> findAll() {
		List<Usuario> arregloUsuarios = usuarioService.findAll();
		List<UsuarioDTO> usuariosDTO = converter.fromEntity(arregloUsuarios);
		return new WrapperResponse<>(true, "Usuarios encontrados", usuariosDTO).createResponse(HttpStatus.OK);
	}

	/**
	 * Encuentra los usuarios con el atributo igual a 'A'
	 * Parámetros:
	 * Retorna: Listado de usuarios con atributo estado igual a 'A'
	 */
	@GetMapping(value = "/usuarios-activos")
    public ResponseEntity<WrapperResponse<List<UsuarioDTO>>> findActives() {
        List<Usuario> listaUsuarios = usuarioService.findActives();
        List<UsuarioDTO> usuariosDTO = converter.fromEntity(listaUsuarios);
        return new WrapperResponse<>(true, "Usuarios registrados", usuariosDTO).createResponse(HttpStatus.OK);
    }
	
	/**
	 * Crea un usuario
	 * Parámetros: Objeto UsuarioDTO
	 * Retorna: Datos del usuario creado
	 */
	@PostMapping(value = "/usuarios")
	public ResponseEntity<WrapperResponse<UsuarioDTO>> create(@RequestBody UsuarioDTO usuario) {
		Usuario nuevoUsuario = usuarioService.create(converter.fromDTO(usuario));
		UsuarioDTO usuarioDTO = converter.fromEntity(nuevoUsuario);
		return new WrapperResponse<>(true, "El usuario se ha creado correctamente", usuarioDTO).createResponse(HttpStatus.CREATED);
	}

	/**
	 * Elimina un usuario
	 * Parámetros: ID deL usuario
	 * Retorna:
	 */
	@DeleteMapping(value = "/usuarios/{usuarioId}")
	public ResponseEntity<?> delete(@PathVariable("usuarioId") Long usuarioId) {
		usuarioService.delete(usuarioId);
		return new WrapperResponse<>(true, "El usuario se ha eliminado correctamente", null).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Actualiza un usuario
	 * Parámetros: Objeto UsuarioDTO
	 * Retorna: Datos actualizados del usuario
	 */
	@PutMapping(value = "/usuarios")
	public ResponseEntity<WrapperResponse<UsuarioDTO>> update(@RequestBody UsuarioDTO usuario) {
		Usuario existeUsuario = usuarioService.update(converter.fromDTO(usuario));
		UsuarioDTO usuarioDTO = converter.fromEntity(existeUsuario);
		return new WrapperResponse<>(true, "El usuario se ha actualizado correctamente", usuarioDTO).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Obtiene los datos del usuario y el token
	 * Parámetros: Nombre de usuario y contraseña
	 * Retorna: Datos del usuario y token
	 */
	@PostMapping(value = "/login")
	public ResponseEntity<WrapperResponse<LoginResponseDTO>> login(@RequestBody LoginRequestDTO request) {
		LoginResponseDTO response = usuarioService.login(request);
		return new WrapperResponse<>(true, "Login exitoso", response).createResponse(HttpStatus.OK);
	}
	
	/**
	 * Actualiza el valor del atributo estado a 'I'
	 * Parámetros: ID deL usuario
	 * Retorna: Datos del usuario
	 */
	@PatchMapping(value = "/usuarios/{usuarioId}")
	public ResponseEntity<WrapperResponse<UsuarioDTO>> disable(@PathVariable("usuarioId") Long usuarioId) {
		Usuario usuario = usuarioService.disable(usuarioId);
		UsuarioDTO usuarioDTO = converter.fromEntity(usuario);
		return new WrapperResponse<>(true, "El usuario se ha desactivado correctamente", usuarioDTO).createResponse(HttpStatus.OK);
	}
}
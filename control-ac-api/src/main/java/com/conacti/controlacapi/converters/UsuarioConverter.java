package com.conacti.controlacapi.converters;

import com.conacti.controlacapi.dtos.UsuarioDTO;
import com.conacti.controlacapi.entities.Usuario;

public class UsuarioConverter extends AbstractConverter<Usuario, UsuarioDTO> {
	
	@Override
	public UsuarioDTO fromEntity(Usuario entity) {
		return UsuarioDTO.builder()
				.idUsuario(entity.getIdUsuario())
				.tipoDocumento(entity.getTipoDocumento())
				.numeroDocumento(entity.getNumeroDocumento())
				.nombres(entity.getNombres())
				.apellidos(entity.getApellidos())
				.telefono(entity.getTelefono())
				.direccion(entity.getDireccion())
				.correo(entity.getCorreo())
				.usuario(entity.getUsuario())
				.clave(entity.getClave())
				.estado(entity.getEstado())
				.idPerfil(entity.getIdPerfil())				
				.build();
	}

	@Override
	public Usuario fromDTO(UsuarioDTO dto) {
		return Usuario.builder()
				.idUsuario(dto.getIdUsuario())
				.tipoDocumento(dto.getTipoDocumento())
				.numeroDocumento(dto.getNumeroDocumento())				
				.nombres(dto.getNombres())
				.apellidos(dto.getApellidos())
				.telefono(dto.getTelefono())
				.direccion(dto.getDireccion())
				.correo(dto.getCorreo())
				.usuario(dto.getUsuario())
				.clave(dto.getClave())
				.estado(dto.getEstado())
				.idPerfil(dto.getIdPerfil())				
				.build();
	}
}
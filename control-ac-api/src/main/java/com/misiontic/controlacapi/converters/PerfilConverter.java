package com.misiontic.controlacapi.converters;

import com.misiontic.controlacapi.entities.Perfil;
import com.misiontic.controlacapi.dtos.PerfilDTO;

public class PerfilConverter extends AbstractConverter<Perfil, PerfilDTO> {

	@Override
	public PerfilDTO fromEntity(Perfil entity) {
		return PerfilDTO.builder()
				.idPerfil(entity.getIdPerfil())
				.descripcionPerfil(entity.getDescripcionPerfil())
				.estado(entity.getEstado())
				.build();
	}

	@Override
	public Perfil fromDTO(PerfilDTO dto) {
		return Perfil.builder()
				.idPerfil(dto.getIdPerfil())
				.descripcionPerfil(dto.getDescripcionPerfil())
				.estado(dto.getEstado())
				.build();
	}
}

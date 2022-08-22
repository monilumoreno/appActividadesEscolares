package com.conacti.controlacapi.converters;

import com.conacti.controlacapi.dtos.AsignaturaDTO;
import com.conacti.controlacapi.entities.Asignatura;


public class AsignaturaConverter extends AbstractConverter<Asignatura, AsignaturaDTO> {

	@Override
	public AsignaturaDTO fromEntity(Asignatura entity) {
		return AsignaturaDTO.builder()
				.idAsignatura(entity.getIdAsignatura())
				.descripcionAsignatura(entity.getDescripcionAsignatura())
				.estado(entity.getEstado())
				.build();
	}

	@Override
	public Asignatura fromDTO(AsignaturaDTO dto) {
		return Asignatura.builder()
				.idAsignatura(dto.getIdAsignatura())
				.descripcionAsignatura(dto.getDescripcionAsignatura())
				.estado(dto.getEstado())
				.build();
	}
}
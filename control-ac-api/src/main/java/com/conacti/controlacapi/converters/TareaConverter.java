package com.conacti.controlacapi.converters;

import com.conacti.controlacapi.dtos.TareaDTO;
import com.conacti.controlacapi.entities.Tarea;

public class TareaConverter extends AbstractConverter<Tarea, TareaDTO> {
	
	@Override
	public TareaDTO fromEntity(Tarea entity) {
		return TareaDTO.builder()
				.idTarea(entity.getIdTarea())
				.descripcionTarea(entity.getDescripcionTarea())
				.fechaCreacion(entity.getFechaCreacion())
				.fechaEntrega(entity.getFechaEntrega())
				.estado(entity.getEstado())
				.idCurso(entity.getIdCurso())
				.idAsignatura(entity.getIdAsignatura())
				.idDocente(entity.getIdDocente())
				.build();
	}

	@Override
	public Tarea fromDTO(TareaDTO dto) {
		return Tarea.builder()
				.idTarea(dto.getIdTarea())
				.descripcionTarea(dto.getDescripcionTarea())
				.fechaCreacion(dto.getFechaCreacion())
				.fechaEntrega(dto.getFechaEntrega())
				.estado(dto.getEstado())
				.idCurso(dto.getIdCurso())
				.idAsignatura(dto.getIdAsignatura())
				.idDocente(dto.getIdDocente())				
				.build();
	}
}
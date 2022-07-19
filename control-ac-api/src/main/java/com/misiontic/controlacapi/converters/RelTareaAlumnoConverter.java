package com.misiontic.controlacapi.converters;

import com.misiontic.controlacapi.dtos.RelTareaAlumnoDTO;
import com.misiontic.controlacapi.entities.RelTareaAlumno;

public class RelTareaAlumnoConverter extends AbstractConverter<RelTareaAlumno, RelTareaAlumnoDTO> {

	@Override
	public RelTareaAlumnoDTO fromEntity(RelTareaAlumno entity) {
		return RelTareaAlumnoDTO.builder()
				.idRelTareaAlumno(entity.getIdRelTareaAlumno())
				.descripcion(entity.getDescripcion())
				.calificacion(entity.getCalificacion())
				.observaciones(entity.getObservaciones())
				.fechaCalificacion(entity.getFechaCalificacion())
				.estado(entity.getEstado())
				.idAlumno(entity.getIdAlumno())
				.idTarea(entity.getIdTarea())
				.build();
	}

	@Override
	public RelTareaAlumno fromDTO(RelTareaAlumnoDTO dto) {
		return RelTareaAlumno.builder()
				.idRelTareaAlumno(dto.getIdRelTareaAlumno())
				.descripcion(dto.getDescripcion())
				.calificacion(dto.getCalificacion())
				.observaciones(dto.getObservaciones())
				.fechaCalificacion(dto.getFechaCalificacion())
				.estado(dto.getEstado())
				.idAlumno(dto.getIdAlumno())
				.idTarea(dto.getIdTarea())
				.build();
	}
}

package com.misiontic.controlacapi.converters;

import com.misiontic.controlacapi.dtos.CursoDTO;
import com.misiontic.controlacapi.entities.Curso;

public class CursoConverter extends AbstractConverter<Curso, CursoDTO> {
	
	@Override
	public CursoDTO fromEntity(Curso entity) {
		return CursoDTO.builder()
				.idCurso(entity.getIdCurso())
				.descripcionCurso(entity.getDescripcionCurso())
				.estado(entity.getEstado())
				.build();
	}

	@Override
	public Curso fromDTO(CursoDTO dto) {
		return Curso.builder()
				.idCurso(dto.getIdCurso())
				.descripcionCurso(dto.getDescripcionCurso())
				.estado(dto.getEstado())
				.build();
	}
}
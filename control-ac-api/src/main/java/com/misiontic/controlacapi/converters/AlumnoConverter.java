package com.misiontic.controlacapi.converters;

import com.misiontic.controlacapi.dtos.AlumnoDTO;
import com.misiontic.controlacapi.entities.Alumno;

public class AlumnoConverter extends AbstractConverter<Alumno, AlumnoDTO> {

	@Override
	public AlumnoDTO fromEntity(Alumno entity) {
		return AlumnoDTO.builder()
				.idAlumno(entity.getIdAlumno())
				.tipoDocumento(entity.getTipoDocumento())
				.numeroDocumento(entity.getNumeroDocumento())
				.nombres(entity.getNombres())
				.apellidos(entity.getApellidos())
				.telefono(entity.getTelefono())
				.direccion(entity.getDireccion())
				.correo(entity.getCorreo())
				.estado(entity.getEstado())
				.idAcudiente(entity.getIdAcudiente())
				.idCurso(entity.getIdCurso())
				.build();
	}

	@Override
	public Alumno fromDTO(AlumnoDTO dto) {
		return Alumno.builder()
				.idAlumno(dto.getIdAlumno())
				.tipoDocumento(dto.getTipoDocumento())
				.numeroDocumento(dto.getNumeroDocumento())
				.nombres(dto.getNombres())
				.apellidos(dto.getApellidos())
				.telefono(dto.getTelefono())
				.direccion(dto.getDireccion())
				.correo(dto.getCorreo())
				.estado(dto.getEstado())
				.idAcudiente(dto.getIdAcudiente())
				.idCurso(dto.getIdCurso())				
				.build();
	}
}

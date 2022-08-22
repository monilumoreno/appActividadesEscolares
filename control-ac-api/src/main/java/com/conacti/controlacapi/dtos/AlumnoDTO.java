package com.conacti.controlacapi.dtos;

import com.conacti.controlacapi.entities.Curso;
import com.conacti.controlacapi.entities.Usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlumnoDTO {
	private Long idAlumno;
	private Character tipoDocumento;
	private String numeroDocumento;
	private String nombres;
	private String apellidos;	
	private String telefono;	
	private String direccion;	
	private String correo;
	private Character estado;
	private Usuario idAcudiente;
	private Curso idCurso;
}

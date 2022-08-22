package com.conacti.controlacapi.dtos;

import java.time.LocalDate;

import com.conacti.controlacapi.entities.Asignatura;
import com.conacti.controlacapi.entities.Curso;
import com.conacti.controlacapi.entities.Usuario;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class TareaDTO {

	private Long idTarea;
	private String descripcionTarea;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate fechaCreacion;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate fechaEntrega;
	
	private Character estado;
	private Curso idCurso;	
	private Usuario idDocente;
	private Asignatura idAsignatura;
}
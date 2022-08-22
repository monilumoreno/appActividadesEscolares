package com.conacti.controlacapi.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * Clase que permite almacenar y transportar los parámetros para calificar una tarea   
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TareaGradeRequestDTO {
	private Long idRelTareaAlumno;
	private Float calificacion;
	private String observaciones;
}
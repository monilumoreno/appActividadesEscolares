package com.conacti.controlacapi.dtos;

import java.time.LocalDate;

import com.conacti.controlacapi.entities.Alumno;
import com.conacti.controlacapi.entities.Tarea;
import com.fasterxml.jackson.annotation.JsonFormat;

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
public class RelTareaAlumnoDTO {
	private Long idRelTareaAlumno;
	private String descripcion;
	private Float calificacion;
	private String observaciones;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate fechaCalificacion;
	private Character estado;
	private Alumno idAlumno;
	private Tarea idTarea;
}
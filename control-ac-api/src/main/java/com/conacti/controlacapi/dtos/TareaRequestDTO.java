package com.conacti.controlacapi.dtos;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TareaRequestDTO {
	private Long idCurso;
	private Long idAsignatura;
	private Long idDocente;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate fechaEntrega;
}

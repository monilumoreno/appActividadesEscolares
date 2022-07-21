package com.misiontic.controlacapi.dtos;

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
}

package com.misiontic.controlacapi.dtos;

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
public class AsignaturaDTO {
	private Long idAsignatura;
	private String descripcionAsignatura;
	private Character estado;
}

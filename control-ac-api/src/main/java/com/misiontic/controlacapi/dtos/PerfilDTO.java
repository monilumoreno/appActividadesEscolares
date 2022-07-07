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
public class PerfilDTO {
	
	private Long idPerfil;
	private String descripcionPerfil;
	private Character estado;
}

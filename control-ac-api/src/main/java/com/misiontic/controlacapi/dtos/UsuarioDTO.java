package com.misiontic.controlacapi.dtos;

import com.misiontic.controlacapi.entities.Perfil;
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
public class UsuarioDTO {

	private Long idUsuario;
	private Character tipoDocumento;
	private String numeroDocumento;
	private String nombres;
	private String apellidos;
	private String telefono;
	private String direccion;
	private String correo;
	private String usuario;	
	private String clave;
	private Character estado;
	private Perfil idPerfil;
}

package com.misiontic.controlacapi.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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
@Entity
@Table(name = "usuarios")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idusuario", nullable = false)
	private Long idUsuario;
	
	@Column(name = "tipodocumento", length = 1, nullable = false)
	private Character tipoDocumento;
	
	@Column(name = "numerodocumento", length = 20, nullable = false)
	private String numeroDocumento;
	
	@Column(name = "nombres", length = 50, nullable = false)
	private String nombres;

	@Column(name = "apellidos", length = 50, nullable = false)
	private String apellidos;
	
	@Column(name = "telefono", length = 15, nullable = false)
	private String telefono;
	
	@Column(name = "direccion", length = 100, nullable = false)
	private String direccion;
	
	@Column(name = "correo", length = 100, nullable = false)
	private String correo;
	
	@Column(name = "usuario", length = 100, nullable = false)
	private String usuario;

	@Column(name = "clave", length = 500, nullable = false)
	private String clave;
	
	@Column(name = "estado", length = 1, nullable = false)
	private Character estado;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "idperfil", nullable = false, updatable = true, referencedColumnName = "idperfil")
	private Perfil idPerfil;
}
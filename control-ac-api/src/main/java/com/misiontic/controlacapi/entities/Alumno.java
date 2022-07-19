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
@NoArgsConstructor
@AllArgsConstructor
@Entity // Indica a JPA que esta clase es una entidad y que debe ser persistida

@Table (name = "alumnos") // Indica que esta clase mapea contra la tabla alumnos en
public class Alumno {

	@Id // Indica que esta propiedad es el ID de esta entidad
	// Indica que esta propiedad es autoincremental
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	// Indica que esta propiedad debe ser persistida en el campo "idalumno" en la BD.
	@Column(name = "idalumno", nullable = false)   
	private Long idAlumno;
	
	@Column(name = "tipodocumento", nullable = false, length = 1)
	private Character tipoDocumento;
	
	@Column (name = "numerodocumento", nullable = false, length = 20)
	private String numeroDocumento;
	
	@Column (name = "nombres", nullable = false, length = 50)
	private String nombres;
	
	@Column (name = "apellidos", nullable = false, length = 50)
	private String apellidos;
	
	@Column (name = "telefono", nullable = false, length = 15)
	private String telefono;
	
	@Column (name = "direccion", nullable = false, length = 100)
	private String direccion;
	
	@Column (name = "correo", nullable = false, length = 100)
	private String correo;

	@Column (name = "estado", nullable = false, length = 1)
	private Character estado;
	
	@ManyToOne (fetch = FetchType.EAGER)
	@JoinColumn (name = "idacudiente", nullable = false, updatable = true, referencedColumnName = "idusuario")
	private Usuario idAcudiente;
	
	@ManyToOne (fetch = FetchType.EAGER)
	@JoinColumn (name = "idcurso", nullable = false, updatable = true, referencedColumnName = "idcurso")
	private Curso idCurso;
}

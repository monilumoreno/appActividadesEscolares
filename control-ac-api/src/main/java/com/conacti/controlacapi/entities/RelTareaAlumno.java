package com.conacti.controlacapi.entities;

import java.time.LocalDate;
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
@Entity

@Table (name = "reltareasalumnos")
public class RelTareaAlumno {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	@Column (name = "idreltareasalumnos", nullable = false)
	private Long idRelTareaAlumno;
	
	@Column (name = "descripcion", nullable = false, length = 10)
	private String descripcion;
	
	@Column (name = "calificacion", nullable = false)
	private Float calificacion;
	
	@Column (name = "observaciones", nullable = true, length = 500)
	private String observaciones;
	
	@Column (name = "fechacalificacion", nullable = true)
	private LocalDate fechaCalificacion;
	
	@Column (name = "estado", nullable = true, length = 1)
	private Character estado;
	
	@ManyToOne (fetch = FetchType.EAGER)
	@JoinColumn (name = "idalumno", nullable = false, updatable = true, referencedColumnName = "idalumno")
	private Alumno idAlumno;
	
	@ManyToOne (fetch = FetchType.EAGER)
	@JoinColumn (name = "idtarea", nullable = false, updatable = true, referencedColumnName = "idtarea")
	private Tarea idTarea;
}

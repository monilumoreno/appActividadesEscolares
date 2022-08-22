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
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tareas")
public class Tarea {

	@Id
	@Column(name = "idtarea")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idTarea;

	@Column(name = "descripciontarea", nullable = false, length = 500)
	private String descripcionTarea;
	
	@Column(name = "fechacreacion", nullable = false)
	private LocalDate fechaCreacion;

	@Column(name = "fechaentrega", nullable = false)
	private LocalDate fechaEntrega;
	
	@Column(name = "estado", length = 1, nullable = false)
	private Character estado;
	
	@ManyToOne (fetch = FetchType.EAGER)
	@JoinColumn (name = "idcurso", nullable = false, updatable = true, referencedColumnName = "idcurso")
	private Curso idCurso;	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "iddocente", nullable = false, updatable = true, referencedColumnName = "idusuario")
	private Usuario idDocente;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "idasignatura", nullable = false, updatable = true, referencedColumnName = "idasignatura")	
	private Asignatura idAsignatura;
}

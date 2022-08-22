package com.conacti.controlacapi.entities;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "asignaturas")
public class Asignatura {

	@Id
	@Column(name = "idasignatura")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idAsignatura;

	@Column(name = "descripcionasignatura", length = 100, nullable = false)
	private String descripcionAsignatura;
	
	@Column (name = "estado", nullable = false, length = 1)
	private Character estado;
}
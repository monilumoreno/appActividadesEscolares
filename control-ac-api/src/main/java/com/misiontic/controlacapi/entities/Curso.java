package com.misiontic.controlacapi.entities;

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
@Table(name = "cursos")
public class Curso {

	@Id
	@Column(name = "idcurso")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCurso;

	@Column(name = "descripcioncurso", length = 50, nullable = false)
	private String descripcionCurso;
	
	@Column (name = "estado", nullable = false, length = 1)
	private Character estado;
}

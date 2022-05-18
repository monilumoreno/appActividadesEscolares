package com.misiontic.controlacapi.validators;

import com.misiontic.controlacapi.entities.Curso;
import com.misiontic.controlacapi.exceptions.ValidateServiceException;

public class CursoValidator {
	public static void validador(Curso curso) {
		if (curso.getDescripcionCurso() == null 
			|| curso.getDescripcionCurso().trim().isEmpty()) {
				throw new ValidateServiceException("La descripción del curso es obligatoria");
		}			
		if (curso.getDescripcionCurso().length() > 50) {
				throw new ValidateServiceException("La descripción del curso debe tener máximo de 50 caracteres.");
		}
		if (curso.getEstado() == null) {
			throw new ValidateServiceException("El estado es obligatorio");
		}
	}
}

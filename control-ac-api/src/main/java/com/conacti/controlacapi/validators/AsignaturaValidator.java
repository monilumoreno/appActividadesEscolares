package com.conacti.controlacapi.validators;

import com.conacti.controlacapi.entities.Asignatura;
import com.conacti.controlacapi.exceptions.ValidateServiceException;

public class AsignaturaValidator {
	
	public static void validador(Asignatura asignatura) {
		
		if (asignatura.getDescripcionAsignatura() == null 
				|| asignatura.getDescripcionAsignatura().trim().isEmpty()) {
			throw new ValidateServiceException("La descripción de la asignatura es obligatoria");
		}
		
		if (asignatura.getDescripcionAsignatura().length() > 100) {
			throw new ValidateServiceException("La descripción de la asignatura debe tener máximo 100 caracteres.");
		}
		/*if (asignatura.getEstado() == null) {
			throw new ValidateServiceException("El estado es obligatorio");
		}*/
	}
}
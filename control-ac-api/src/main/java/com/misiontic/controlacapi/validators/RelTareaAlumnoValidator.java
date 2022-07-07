package com.misiontic.controlacapi.validators;

import com.misiontic.controlacapi.entities.RelTareaAlumno;
import com.misiontic.controlacapi.exceptions.ValidateServiceException;

public class RelTareaAlumnoValidator {
	public static void validador(RelTareaAlumno relTareaAlumno) {
		if (relTareaAlumno.getCalificacion() < 0 || relTareaAlumno.getCalificacion() > 5) {
			throw new ValidateServiceException("La calificación debe estar entre 0 y 5");
		}
		if (relTareaAlumno.getObservaciones().length() > 500) {
				throw new ValidateServiceException("La observación debe ser de máximo 500 caracteres");
		}
		if (relTareaAlumno.getIdAlumno() == null) {
			throw new ValidateServiceException("El Id del alumno es obligatorio");
		}
		if (relTareaAlumno.getIdTarea() == null) {
			throw new ValidateServiceException("El Id de la tarea es obligatorio");
		}
	}
}

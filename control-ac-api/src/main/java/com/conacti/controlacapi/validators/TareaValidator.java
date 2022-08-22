package com.conacti.controlacapi.validators;

import java.time.LocalDate;

import com.conacti.controlacapi.entities.Tarea;
import com.conacti.controlacapi.exceptions.ValidateServiceException;

public class TareaValidator {
	public static void validador(Tarea tarea) {
		if (tarea.getDescripcionTarea() == null
				||	tarea.getDescripcionTarea().trim().isEmpty()) {
			throw new ValidateServiceException("La descripción es obligatoria");
		}
		if (tarea.getFechaCreacion() == null) {
			throw new ValidateServiceException("La fecha de creación es obligatoria");			
		}
		if (tarea.getFechaEntrega() == null) {
			throw new ValidateServiceException("La fecha de entrega es obligatoria");			
		}		
		if (tarea.getFechaEntrega().isBefore(LocalDate.now())) {
			throw new ValidateServiceException("La fecha de entrega debe ser mayor o igual a la fecha actual");
		}					
		if (tarea.getIdCurso() == null) {
			throw new ValidateServiceException("El curso es obligatorio");
		}		
		if (tarea.getIdDocente() == null) {
			throw new ValidateServiceException("El docente es obligatorio");
		}		
		if (tarea.getIdAsignatura() == null) {
			throw new ValidateServiceException("La asignatura es obligatoria");
		}
		if (tarea.getEstado() == null) {
			throw new ValidateServiceException("El estado es obligatorio");
		}
	}
}
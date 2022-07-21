package com.misiontic.controlacapi.validators;

import com.misiontic.controlacapi.entities.Alumno;
import com.misiontic.controlacapi.exceptions.ValidateServiceException;

public class AlumnoValidator {
	public static void validador(Alumno alumno) {
		if (alumno.getTipoDocumento() == null) {
			throw new ValidateServiceException("El tipo de documento es obligatorio"); 
		}
		if (alumno.getNumeroDocumento() == null || alumno.getNumeroDocumento().trim().isEmpty()) {
			throw new ValidateServiceException("El número de documento es obligatorio");		
		}
		if (alumno.getNumeroDocumento().length() > 20) {
			throw new ValidateServiceException("El número de documento debe ser de máximo 20 caracteres");
		}
		if (alumno.getNombres() == null || alumno.getNombres().trim().isEmpty()) {
			throw new ValidateServiceException("El nombre es obligatorio");
		}
		if (alumno.getNombres().length() > 50) {
			throw new ValidateServiceException("El nombre debe terner máximo 50 caracteres");
		}
		if (alumno.getApellidos() == null || alumno.getApellidos().trim().isEmpty()) {
			throw new ValidateServiceException("El apellido es obligatorio");
		}
		if (alumno.getApellidos().length() > 50) {
			throw new ValidateServiceException("El apellido debe tener máximo 50 caracteres");
		}
		if (alumno.getTelefono() == null || alumno.getTelefono().trim().isEmpty()) {
			throw new ValidateServiceException("El teléfono es obligatorio");
		}
		if (alumno.getTelefono().length() > 15) {
			throw new ValidateServiceException("El teléfono debe ser de máximo 15 caracteres");
		}
		if (alumno.getDireccion() == null || alumno.getDireccion().trim().isEmpty()) {
			throw new ValidateServiceException("La dirección es obligatoria");
		}
		if (alumno.getDireccion().length() > 100) {
			throw new ValidateServiceException("La dirección debe ser de máximo 100 caracteres");
		}
		if (alumno.getCorreo() == null || alumno.getCorreo().trim().isEmpty()) {
			throw new ValidateServiceException("El correo es obligatorio");
		}
		if (alumno.getCorreo().length() > 100) {
			throw new ValidateServiceException("El correo debe tener máximo 100 caracteres");
		}
		if (alumno.getEstado() == null) {
			throw new ValidateServiceException("El estado es obligatorio");
		}
	}
}
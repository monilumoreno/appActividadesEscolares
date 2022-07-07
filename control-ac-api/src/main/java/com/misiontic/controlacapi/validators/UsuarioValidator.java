package com.misiontic.controlacapi.validators;

import com.misiontic.controlacapi.entities.Usuario;
import com.misiontic.controlacapi.exceptions.ValidateServiceException;

public class UsuarioValidator {
	
	public static void validador(Usuario usuario) {
		if (usuario.getNumeroDocumento() == null || usuario.getNumeroDocumento().trim().isEmpty()) {
			throw new ValidateServiceException("El número de documento es obligatorio");
		}	
		if (usuario.getNumeroDocumento().length() > 20) {
			throw new ValidateServiceException("El número de documento debe ser de máximo 20 caracteres");
		}		
		if (usuario.getNombres() == null || usuario.getNombres().trim().isEmpty()) {
				throw new ValidateServiceException("Los nombres son obligatorios");
		}		
		if (usuario.getNombres().length() > 50) {
			throw new ValidateServiceException("Los nombres deben ser de máximo 50 caracteres");
		}		
		if (usuario.getApellidos() == null || usuario.getApellidos().trim().isEmpty()) {
				throw new ValidateServiceException("Los apellidos son obligatorios");
		}		
		if (usuario.getApellidos().length() > 50) {
			throw new ValidateServiceException("Los apellidos deben ser de máximo 50 caracteres");
		}		
		if (usuario.getTelefono() == null || usuario.getTelefono().trim().isEmpty()) {
				throw new ValidateServiceException("El número de teléfono es obligatorio");
		}		
		if (usuario.getTelefono().length() > 15) {
			throw new ValidateServiceException("El número de teléfono debe ser de máximo 15 caracteres");
		}		
		if (usuario.getDireccion() == null || usuario.getDireccion().trim().isEmpty()) {
				throw new ValidateServiceException("La dirección es obligatoria");
		}		
		if (usuario.getDireccion().length() > 100) {
			throw new ValidateServiceException("La dirección debe ser de máximo 100 caracteres");
		}
		if (usuario.getCorreo() == null || usuario.getCorreo().trim().isEmpty()) {
			throw new ValidateServiceException("El correo es obligatorio");
		}		
		if (usuario.getCorreo().length() > 100) {
			throw new ValidateServiceException("El correo debe ser de máximo 100 caracteres");
		}
		if (usuario.getUsuario() == null || usuario.getUsuario().trim().isEmpty()) {
			throw new ValidateServiceException("El nombre de usuario es obligatorio");
		}		
		if (usuario.getUsuario().length() > 100) {
			throw new ValidateServiceException("El nombre de usuario debe ser de máximo 100 caracteres");
		}		
		if (usuario.getClave() == null || usuario.getClave().trim().isEmpty()) {
				throw new ValidateServiceException("La contraseña es obligatoria");
		}		
		if (usuario.getClave().length() > 500) {
			throw new ValidateServiceException("La contraseña debe ser de máximo 250 caracteres");
		}		
		if (usuario.getIdPerfil() == null) {
			throw new ValidateServiceException("El Id del perfil es obligatorio");
		}		
	}
}
package com.misiontic.controlacapi.validators;

import com.misiontic.controlacapi.entities.Perfil;
import com.misiontic.controlacapi.exceptions.ValidateServiceException;

public class PerfilValidator {
	public static void validador(Perfil perfil) {
		if (perfil.getDescripcionPerfil() == null 
				|| perfil.getDescripcionPerfil().trim().isEmpty()) {
			throw new ValidateServiceException("La descripción del perfil es obligatoria.");
		}		
		if (perfil.getDescripcionPerfil().length() > 45) {
			throw new ValidateServiceException("La descripción del perfil debe tener máximo 45 caracteres.");
		}		
	}
}

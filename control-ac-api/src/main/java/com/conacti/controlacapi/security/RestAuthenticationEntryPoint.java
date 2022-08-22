package com.conacti.controlacapi.security;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

/**
 * Configura el tipo de respuestas que se lanzan cada vez que se intente una autenticación. 
 */

public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
	
	/**
	 * Genera el mensaje Unauthorized cada vez que se se lanza una excepción al intentar
	 * una autenticación. 
	 */
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException e) throws IOException, ServletException {
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getLocalizedMessage());
		
	}
}
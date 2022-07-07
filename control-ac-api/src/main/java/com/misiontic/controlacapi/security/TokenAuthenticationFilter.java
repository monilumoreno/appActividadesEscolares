package com.misiontic.controlacapi.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.misiontic.controlacapi.entities.Usuario;
import com.misiontic.controlacapi.exceptions.NoDataFoundException;
import com.misiontic.controlacapi.repositories.UsuarioRepository;
import com.misiontic.controlacapi.services.UsuarioService;
import lombok.extern.slf4j.Slf4j;

/*
 * Valida las peticiones
*/
@Slf4j
public class TokenAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private UsuarioRepository usuarioRepo;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		try {
			String jwt = getJwtFromRequest(request);
			
			if (StringUtils.hasText(jwt) && usuarioService.validateToken(jwt)) {
				
				String nombreUsuario = usuarioService.getNombreUsuarioFromToken(jwt);
				
				Usuario usuario = usuarioRepo.findByusuario(nombreUsuario)
						.orElseThrow(() -> new NoDataFoundException("El usuario no existe"));
				
				UsuarioPrincipal principal = UsuarioPrincipal.create(usuario);
				
				//Asigna a la clase encargada los datos para que realice la autenticación en.
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
				
				//Asigna al contexto de Spring para que la autenticación sea válida
				SecurityContextHolder.getContext().setAuthentication(authentication);				
			}
			
		} catch (Exception e) {
			log.error("Error al auntenticar al usuario.");
		}
		
		//Se llama de nuevo el filtro
		filterChain.doFilter(request, response);
	}

	/**
	 * Valida el token. Que sea un Hash y que inicie por bearer
	**/
	public String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken ) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7, bearerToken.length());
		}
		return null;
	}
}

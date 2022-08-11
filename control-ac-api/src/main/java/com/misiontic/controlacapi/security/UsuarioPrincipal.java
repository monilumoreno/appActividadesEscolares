package com.misiontic.controlacapi.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.misiontic.controlacapi.entities.Usuario;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 *	Contiene los datos de la clase Usuario y la lista de permisos
 *	para realizar la autenticación.  
**/

@Getter
@AllArgsConstructor
public class UsuarioPrincipal implements UserDetails {

	private Usuario usuario;
	private Collection<? extends GrantedAuthority> authorities;

	public static UsuarioPrincipal create(Usuario usuario) {
		List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
		return new UsuarioPrincipal(usuario, authorities);
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return usuario.getClave();
	}

	@Override
	public String getUsername() {
		return usuario.getUsuario();
	}

	@Override
	public boolean isAccountNonExpired() {
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return false;
	}

	@Override
	public boolean isEnabled() {
		return false;
	}
}
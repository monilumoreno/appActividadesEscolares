 package com.conacti.controlacapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.conacti.controlacapi.security.RestAuthenticationEntryPoint;
import com.conacti.controlacapi.security.TokenAuthenticationFilter;

/**
  * Permite configurar y administrar las políticas de acceso a los servicios del BackEnd
*/

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	/**
	 * Retorna el filtro.
	*/
	@Bean //Visible a nivel de super clase
	public TokenAuthenticationFilter createTokenAutenticationFilter() {
		return new TokenAuthenticationFilter();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http
		.cors()
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
		.csrf()
			.disable()
		.formLogin()
			.disable()
		.httpBasic()
			.disable()
		.exceptionHandling()
			.authenticationEntryPoint(new RestAuthenticationEntryPoint())
			.and()
		.authorizeRequests()
			.antMatchers(
					"/login",
					"/signup",
					"/perfiles",
					"/tareas",
					"/cursos",
					"/asignaturas"
					)
				.permitAll() 
			.anyRequest()
				.authenticated();		
		
		//Agrega el filtro para que se ejecute.
		http.addFilterBefore(createTokenAutenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	}
}
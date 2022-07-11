package com.misiontic.controlacapi.services;

import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.misiontic.controlacapi.converters.UsuarioConverter;
import com.misiontic.controlacapi.dtos.LoginRequestDTO;
import com.misiontic.controlacapi.dtos.LoginResponseDTO;
import com.misiontic.controlacapi.entities.Perfil;
import com.misiontic.controlacapi.entities.Usuario;
import com.misiontic.controlacapi.exceptions.GeneralServiceException;
import com.misiontic.controlacapi.exceptions.NoDataFoundException;
import com.misiontic.controlacapi.exceptions.ValidateServiceException;
import com.misiontic.controlacapi.repositories.PerfilRepository;
import com.misiontic.controlacapi.repositories.UsuarioRepository;
import com.misiontic.controlacapi.validators.UsuarioValidator;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UsuarioService {

	//Trae valores desde el archivo properties
	@Value("${jwt.clave}")
	private String jwtSecret;
		
	@Autowired
	private UsuarioRepository usuarioRepo;
	@Autowired
	private PerfilRepository perfilRepo;
	private UsuarioConverter converter = new UsuarioConverter();
	
	public Usuario findById(Long idUsuario) {
		try {
			Usuario usuario = usuarioRepo.findById(idUsuario)
					.orElseThrow(() -> new NoDataFoundException("Usuario no registrado"));
			return usuario;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public List<Usuario> findByIdPerfil(Long idPerfil) {
		    
		    try {
		        Perfil perfil = perfilRepo.findById(idPerfil)
		        		.orElseThrow(() -> new NoDataFoundException("Perfil no registrado"));
		        List<Usuario> listaUsuarios = usuarioRepo.findByIdPerfil(perfil)
		        .orElseThrow(() -> new NoDataFoundException("Usuarios no registrados"));
		        return listaUsuarios;
		    } catch (ValidateServiceException | NoDataFoundException e) {
				log.info(e.getMessage(), e);
				throw e;
			} catch (Exception e) {
				log.error(e.getMessage(), e);
				throw new GeneralServiceException(e.getMessage(), e);
			}	    
		}

	public void delete(Long idUsuario) {
		try {
			Usuario usuario = usuarioRepo.findById(idUsuario)
					.orElseThrow(() -> new NoDataFoundException("Usuario no registrado"));
			usuarioRepo.delete(usuario);
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public List<Usuario> findAll() {
		try {
			List<Usuario> arregloUsuarios = usuarioRepo.findAll();
			return arregloUsuarios;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public List<Usuario> findActives() {
        try {
            List<Usuario> listaUsuarios = usuarioRepo.findActives()
                    .orElseThrow(() -> new NoDataFoundException("Usuarios no registrados"));
            return listaUsuarios;
        } catch (ValidateServiceException | NoDataFoundException e) {
            log.info(e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new GeneralServiceException(e.getMessage(), e);
        }
    }
	
	public Usuario create(Usuario usuario) {
		try {
			usuario.setEstado('A');
			Usuario existeUsuario = usuarioRepo.findByusuario(usuario.getUsuario())
					.orElse(null);
			
			if (existeUsuario != null) {
				throw new ValidateServiceException("El nombre de usuario ya existe");
			}			
			UsuarioValidator.validador(usuario);
			Usuario nuevoUsuario = usuarioRepo.save(usuario);
			return nuevoUsuario;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public Usuario update(Usuario usuario) {
		try {
			usuario.setEstado('A');
			UsuarioValidator.validador(usuario);
			Usuario existeUsuario = usuarioRepo.findById(usuario.getIdUsuario())
					.orElseThrow(() -> new NoDataFoundException("Usuario no registrado"));
			
			existeUsuario.setTipoDocumento(usuario.getTipoDocumento());
			existeUsuario.setNumeroDocumento(usuario.getNumeroDocumento());
			existeUsuario.setNombres(usuario.getNombres());
			existeUsuario.setApellidos(usuario.getApellidos());
			existeUsuario.setTelefono(usuario.getTelefono());
			existeUsuario.setDireccion(usuario.getDireccion());
			existeUsuario.setCorreo(usuario.getCorreo());
			existeUsuario.setUsuario(usuario.getUsuario());
			existeUsuario.setClave(usuario.getClave());
			existeUsuario.setEstado(usuario.getEstado());
			existeUsuario.setIdPerfil(usuario.getIdPerfil());
			usuarioRepo.save(existeUsuario);
			return existeUsuario;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}

	public Usuario disable(Long idUsuario) {
		try {
			Usuario usuario = usuarioRepo.findById(idUsuario)
					.orElseThrow(() -> new NoDataFoundException("Usuario no registrado"));
			usuario.setEstado('I');
			usuarioRepo.save(usuario);
			return usuario;
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}
	}
	
	public LoginResponseDTO login(LoginRequestDTO request) {			
		try {			
			Usuario usuario = usuarioRepo.findByusuario(request.getNombreUsuario())
					.orElseThrow(() -> new ValidateServiceException("Nombre de usuario o clave incorrecta"));
	
			if (!usuario.getClave().equals(request.getClave())) {
				throw new ValidateServiceException("Nombre de usuario o clave incorrecta");
			}
	
			String token = createToken(usuario);
			
			return new LoginResponseDTO(converter.fromEntity(usuario), token);
			
		} catch (ValidateServiceException | NoDataFoundException e) {
			log.info(e.getMessage(), e);
			throw e;
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new GeneralServiceException(e.getMessage(), e);
		}	
	}	
	
	public String createToken(Usuario usuario) {
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + (1000 * 60 * 60));
		
		return Jwts.builder()
				.setSubject(usuario.getUsuario())
				.setIssuedAt(now)
				.setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}
	
	public boolean validateToken(String token) {
		try {
			
			//Valida que el token incluya la clve secreta.
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
			return true;
		} catch (UnsupportedJwtException e) {
			log.error("JWT in a particular format/configuration that does not match the format expected");
		} catch (MalformedJwtException e) {
			log.error("JWT was not correctly constructed and should be rejected.");
		} catch (SignatureException e) {
			log.error("signature or verifying an existing signature of a JWT failed.");
		} catch (ExpiredJwtException e) {
			log.error("JWT was accepted after it expired and must be rejected.");
		}
		return false;
	}
	
	public String getNombreUsuarioFromToken(String jwt) {
		try {
			return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(jwt).getBody().getSubject();
		} catch (Exception e) {
			log.error(e.getMessage(), e);
			throw new ValidateServiceException("Token inválido");
		}
	}
}
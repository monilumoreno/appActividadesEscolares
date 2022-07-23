import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cifrador from 'js-sha512';
import APIInvoke from '../../utils/APIInvoke';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert';

const Login = () => {

	//Declara una variable para navegar entre links
	const navigate = useNavigate();

	//Declara un estado y los valores iniciales de sus propiedades
	const [ usuario, setUsuario ] = useState({
		nombreUsuario: '',
		clave: ''
	});

	//Extrae los valores del estado para poder utilizar las variables
	const { nombreUsuario, clave } = usuario;

	//Actualiza los valores de las variables cada vez que cambian los valores en los elementos web
	const onChange = (e) => {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value
		})
	}

	//Se ejecuta cada vez que se carga el componente
	useEffect(() => {
		document.getElementById("nombreUsuario").focus();
	}, [])

	const iniciarSesion = async () => {
		const data = {
			nombreUsuario: usuario.nombreUsuario,
			clave: cifrador.sha512(usuario.clave)						
			//clave: usuario.clave,						
		}

		const response = await APIInvoke.invokePOST(`/login`, data);
		
		setTimeout(() => {
			if (response.ok) {
				//Guarda los datos que provienen del backend
				const jwt = response.body.token;
				const idUsuario = response.body.usuario.idUsuario;
				const nombres = response.body.usuario.nombres;
				const apellidos = response.body.usuario.apellidos;
				const idPerfil = response.body.usuario.idPerfil.idPerfil;
				const nomPerfil = response.body.usuario.idPerfil.descripcionPerfil;
				const nombreCompleto = `${nombres} ${apellidos}`;
				
				//Valida el token y lo decodifica
				jwtDecode(jwt);

				//Guarda los datos en el navegador para poder utilizarlos durante la ejecución de la app
				localStorage.setItem('token', jwt);
				localStorage.setItem('nombreCompleto', nombreCompleto);
				localStorage.setItem('idUsuario', idUsuario);
				localStorage.setItem('idPerfil', idPerfil);
				localStorage.setItem('nomPerfil', nomPerfil);

				//Redirecciona según el perfil
					switch (idPerfil) {
						case 1:
							navigate('/homeadmin');
							break;
						case 2:
							navigate('/homedocente');
							break;
						case 3:
							navigate('/homeacudiente');
							break;		
					}					
			} else {
				const mensaje = response.message;
				swal({
					title: 'Iniciar sesión',
					text: mensaje,
					icon: 'error',
					buttons: {
						confirm: {
							text: 'Aceptar',
							value: true,
							visible: true,
							className: 'btn btn-danger',
							closeModal: true
						}
					}
				});				
					setUsuario({
					nombreUsuario: '',
					clave: ''
				});		
				document.getElementById('nombreUsuario').focus();				
			}		
		}, 0);
	}

	const onSubmit = (e) => {
		//Evita que el formulario se envíe vacio
		e.preventDefault(); 
		iniciarSesion();
	}
	

	return (
		<Fragment>
			<div id="app" className="app">
				<div className="login login-with-news-feed">
					<div className="news-feed">
						<div className="news-image" style={{ backgroundImage: "url(../assets/img/login-bg/pizarra2.png)" }}></div>
						<div className="news-caption">
							<p>
								La aplicación que acerca el acudiente al entorno escolar y a revisar el cumplimiento de las actividades escolares.
							</p>
						</div>
					</div>
					<div className="login-container">
					<div className="login-header mb-30px">
                            <div className="brand">
                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <img className="rounded-circle"  src="../assets/img/logo/logoControl.jpg" width="70px" alt="Control de Actividades Escolares"/>
                                    </div>							
                                    <b>Inicio de sesión</b>
						        </div>	
					        </div>
                            <div className="icon">
                                <i className="fa fa-lock"></i>
                            </div>
                        </div>
						<div className="login-content">
							<form onSubmit={onSubmit} className="needs-validation" noValidate>
								<div className="form-floating mb-15px">
									<input type="text" className="form-control h-45px fs-13px"
										id="nombreUsuario"
										name="nombreUsuario"
										value={nombreUsuario}
										onChange={onChange}
										tabIndex="1"										
										placeholder="Nombre de Usuario"
										required
									/>
									<label htmlFor="nombreUsuario" className="d-flex align-items-center fs-13px text-gray-600">Nombre de Usuario</label>
									<div className="invalid-feedback">Ingrese nombre de usuario</div>
								</div>
								<div className="form-floating mb-15px">
									<input type="password" className="form-control h-45px fs-13px"
		 								id="clave"
										name="clave"
										value={clave}
										onChange={onChange}
										tabIndex="2"										
										placeholder="Contraseña"
										required
									/>
									<label htmlFor="password" className="d-flex align-items-center fs-13px text-gray-600">Contraseña</label>
									<div className="invalid-feedback">Ingrese contraseña</div>
								</div>
								<div className="mt-25px">
									<button type="submit" className="btn btn-success d-block h-45px w-100 btn-lg fs-14px" tabindex="3">Entrar</button>
								</div>
								<hr className="bg-gray-600 opacity-2" />
							</form>
						</div>
					</div>
				</div>				
			</div>
		</Fragment>
	);
}

export default Login;
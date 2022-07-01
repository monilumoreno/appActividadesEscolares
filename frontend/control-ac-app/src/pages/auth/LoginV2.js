import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cifrador from 'js-sha512';
import APIInvoke from '../../utils/APIInvoke';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert';

const LoginV2 = () => {

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
			//clave: cifrador.sha512(usuario.clave)
			clave: usuario.clave
		}

		//Consume el servicio /login del backend
		const response = await APIInvoke.invokePOST(`/login`, data);

		setTimeout(() => {

			if (response.ok) {
				const jwt = response.body.token;
				const idUsuario = response.body.usuario.idUsuario;
				const nombres = response.body.usuario.nombres;
				const apellidos = response.body.usuario.apellidos;
				const idPerfil = response.body.usuario.idPerfil.idPerfil;
				const nomPerfil = response.body.usuario.idPerfil.descripcionPerfil;
				const nombreCompleto = `${nombres} ${apellidos}`;
				jwtDecode(jwt);

				//Guarda datos en el navegador para ser utilizados diramte la ejecución de la app
				localStorage.setItem('token', jwt);
				localStorage.setItem('nombreCompleto', nombreCompleto);
				localStorage.setItem('idUsuario', idUsuario);
				localStorage.setItem('idPerfil', idPerfil);
				localStorage.setItem('nomPerfil', nomPerfil);

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
				//navigate('/');

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
				
			}
		}, 7000);
	}

	const onSubmit = (e) => {
		e.preventDevfault();
		iniciarSesion();
	}


    return (
        <Fragment>
            <div id="app" className="app">                
                <div className="login login-v2 fw-bold">                    
					<div className="login-cover">
						<div className="login-cover-img" style={{ backgroundImage: "url(../assets/img/login-bg/pizarra3.png)" }} data-id="login-cover-image"></div>
						<div className="login-cover-bg"></div>
					</div>
                    <div className="login-container col-lg-4 offset-6">                        
                        <div className="login-header">
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
                            <form onSubmit={onSubmit} data-parsley-validate="true">
                                <div className="form-floating mb-20px">
                                    <input type="text" className="form-control fs-13px h-45px border-0" 
                                        id="nombreUsuario"
										name="nombreUsuario"
										data-parsley-required="true"
										value={nombreUsuario}
										onChange={onChange}
										tabIndex="1"
										placeholder="Nombre de Usuario"
										required />                                    
                                    <label htmlFor="nombreUsuario" className="d-flex align-items-center text-gray-600 fs-13px">Nombre de Usuario</label>
                                    <div className="invalid-feedback">Ingrese nombre de usuario</div>
                                </div>
                                <div className="form-floating mb-20px">
                                    <input type="password" className="form-control fs-13px h-45px border-0" 
                                        id="clave"
										name="clave"
										value={clave}
										onChange={onChange}
										data-parsley-required="true"
										tabIndex="2"
										placeholder="Contraseña"
										required />
                                    <label htmlFor="password" className="d-flex align-items-center text-gray-600 fs-13px">Contraseña</label>
                                    <div className="invalid-feedback">Ingrese contraseña</div>
                                </div>                                
                                <div className="mb-20px">
                                    <button type="submit" className="btn btn-success d-block w-100 h-45px btn-lg">Ingresar</button>
                                </div>                                
                            </form>
                            <div className="text-white fs-13pz">
                                La aplicación que acerca el acudiente al entorno escolar y a revisar el cumplimiento de las actividades escolares.
                            </div>
                        </div>
                    </div>                    
                </div>                
                <Link to="#" className="btn btn-icon btn-circle btn-success btn-scroll-to-top" data-toggle="scroll-to-top"><i className="fa fa-angle-up"></i></Link>                
            </div>
        </Fragment>
    );
}

export default LoginV2;
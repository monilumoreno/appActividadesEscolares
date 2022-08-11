import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

	const navigate = useNavigate();
	const nombreUsuario = localStorage.nombreCompleto;
	
	//Elimina los datos guardados en el navegador
	const cerrarSesion = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('nombreCompleto');
		localStorage.removeItem('idUsuario');
		localStorage.removeItem('idPerfil');
		localStorage.removeItem('nomPerfil');
		navigate('/');
	}

    return ( 
        <Fragment>
			<div id="header" className="app-header">
				<div className="navbar-header">
					<Link to="#" className="navbar-brand">
						<img className="rounded-circle" src="../assets/img/logo/logoControl.jpg" alt="Control de Actividades Escolares"/>
						<span className="navbar-brand mb-0 h1"><b>Control Actividades Escolares</b></span>											
					</Link>
					<button type="button" className="navbar-mobile-toggler" data-toggle="app-sidebar-mobile">
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
				</div>			
				<div className="navbar-nav">
					<div className="navbar-item navbar-user dropdown">
						<Link to="#" className="navbar-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
							<div className="image image-icon bg-gray-800 text-gray-600">
								<i className="fa fa-user"></i>
							</div>
							<span className="d-md-inline fw-bold">{nombreUsuario}</span><b className="caret ms-10px"></b>
						</Link>
						<div className="dropdown-menu dropdown-menu-end me-1">
							<Link to="/perfil-editar" className="dropdown-item">Editar Perfil</Link>
							<div className="dropdown-divider"></div>
							<button onClick={cerrarSesion} className="dropdown-item">Cerrar sesión</button>
						</div>
					</div>
				</div>
			</div>
        </Fragment>
    );
}
 
export default Header;

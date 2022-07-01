import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

	const navigate = useNavigate();

	const [usuario, setUsuario] = useState({
		nombreUsuario: localStorage.nombreCompleto		
	});

	const { nombreUsuario } = usuario;


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
        <Fragment>SS
            <div id="header" className="app-header">
				<div className="navbar-header">
					<Link to="/" className="navbar-brand">
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
							<div className="image">
								<img src="../assets/img/user/admin.png" alt=""/>
							</div>
							<span className="d-none d-md-inline fw-bold">{nombreUsuario}</span> <b className="caret ms-10px"></b>
						</Link>
						<div className="dropdown-menu dropdown-menu-end me-1">
							<Link to="#" className="dropdown-item">Editar Perfil</Link>						
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

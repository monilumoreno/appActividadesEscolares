import React, {Fragment, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {

    const navigate = useNavigate();

	const [usuario, setUsuario] = useState({
		nombreUsuario: localStorage.nombreCompleto,
		perfil: localStorage.nomPerfil
	});
		
	const { nombreUsuario, perfil } = usuario;
	
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
				<div className="menu">
					<div className="menu-profile">
						<Link to="#" className="menu-profile-link" data-toggle="app-sidebar-profile" data-target="#appSidebarProfileMenu">
							<div className="menu-profile-cover with-shadow"></div>
							<div className="menu-profile-image menu-profile-image-icon bg-gray-900 text-gray-600">
								<i className="fa fa-user"></i>
							</div>
							<div className="menu-profile-info">
								<div className="d-flex align-items-center">
									<div className="flex-grow-1">
										{nombreUsuario}
									</div>
									<div className="menu-caret ms-auto"></div>
								</div>
								<small>{perfil}</small>
							</div>
						</Link>
					</div>
					<div id="appSidebarProfileMenu" className="collapse">
						<div className="menu-item pt-5px">
							<Link to="#" className="menu-link">
								<div className="menu-icon"><i className="fa fa-id-card"></i></div>
								<div className="menu-text">Editar Perfil</div>
							</Link>
						</div>
						<div className="menu-item">
							<div className="menu-link">
								<div className="menu-icon"><i className="fa fa-sign-out-alt"></i></div>
								<div className="menu-text" onClick={cerrarSesion} style={{cursor: "pointer"}}> Salir</div>
							</div>
						</div>
						<div className="menu-divider m-0"></div>
					</div>
					<div className="menu-header">Menú Principal</div>
					<div className="menu-item active">
						<Link to="/homeadmin" className="menu-link">
							<div className="menu-icon">
								<i className="fa fa-th-large"></i>
							</div>
							<div className="menu-text">Inicio</div>
						</Link>
					</div>
					
					<div className="menu-item has-sub">
						<Link to="#" className="menu-link">
							<div className="menu-icon">
								<i className="fa fa-cogs"></i>
							</div>
							<div className="menu-text">Configuración</div>
							<div className="menu-caret"></div>
						</Link>
						<div className="menu-submenu">							
							<div className="menu-item"><Link to="#" className="menu-link"><div className="menu-text">Usuarios</div></Link></div>
							<div className="menu-item"><Link to="#" className="menu-link"><div className="menu-text">Cursos</div></Link></div>
							<div className="menu-item"><Link to="#" className="menu-link"><div className="menu-text">Asignaturas</div></Link></div>
							<div className="menu-item"><Link to="#" className="menu-link"><div className="menu-text">Alumnos</div></Link></div>
						</div>
					</div>					
					
					<div className="menu-item d-flex">
						<Link to="#" className="app-sidebar-minify-btn ms-auto" data-toggle="app-sidebar-minify"><i className="fa fa-angle-double-left"></i></Link>
					</div>	
				</div>
        </Fragment>
     );
}
 
export default Menu;
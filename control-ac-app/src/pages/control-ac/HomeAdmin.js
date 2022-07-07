import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarAdmin from '../../components/SidebarAdmin';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert';

const HomeAdmin = () => {


    const navigate = useNavigate();

    const validarPermisos = () => {
        
        try {
            const jwt = localStorage.getItem('token');
            jwtDecode(jwt);
            return true;
        } catch (error) {
            return false;
        }
    }

    useEffect(() => {
        if(!validarPermisos()) {
            swal({
                title: 'Error',
                text: 'No tiene permisos para acceder a este recurso',
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
            navigate('/')
        }
    }, [])


    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header> </Header>
                <SidebarAdmin />
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item active"><Link to="">Inicio</Link></li>								
                    </ol>
                    <h1 className="page-header">Tablero</h1>
                    
                    <div className="row mt-5">                        
                        <div className="col-xl-3 col-md-2">
                            <div className="widget widget-stats bg-blue">
                                <div className="stats-icon"><i className="fa fa-desktop"></i></div>
                                <div className="stats-info">
                                    <p>Usuarios</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="/usuarios">Ingresar<i className="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>                        
                        <div className="col-xl-3 col-md-2">
                            <div className="widget widget-stats bg-info">
                                <div className="stats-icon"><i className="fa fa-link"></i></div>
                                <div className="stats-info">
                                    <p>Cursos</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="">Ingresar<i className="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    
                        <div className="col-xl-3 col-md-2">
                            <div className="widget widget-stats bg-orange">
                                <div className="stats-icon"><i clclassNameass="fa fa-book"></i></div>
                                <div className="stats-info">
                                    <p>Asignaturas</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="">Ingresar<i class="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-2">
                            <div className="widget widget-stats bg-yellow">
                                <div className="stats-icon"><i className="fa fa-users"></i></div>
                                <div className="stats-info">
                                    <p>Alumnos</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="">Ingresar<i class="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HomeAdmin;
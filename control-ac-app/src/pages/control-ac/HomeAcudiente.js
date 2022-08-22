import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarActe from '../../components/SidebarActe';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert';

const HomeAcudiente = () => {

    const navigate = useNavigate();
    
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

    const validarPermisos = () => {
        
        try {
            const jwt = localStorage.getItem('token');
            jwtDecode(jwt);
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header> </Header>
                <SidebarActe />
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item active">Inicio</li>								
                    </ol>
                    <h1 className="page-header">Tablero</h1>
                    
                    <div className="row mt-5">                        
                        <div className="col-xl-3 col-md-2">
                            <div className="widget widget-stats bg-blue">
                                <div className="stats-icon"><i className="fa fa-desktop"></i></div>
                                <div className="stats-info">
                                    <p>Revisar Actividades</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="/alumnos-listar">Ingresar<i className="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default HomeAcudiente;
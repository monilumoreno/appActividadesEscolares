import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarDocte from '../../components/SidebarDocte'


const HomeDocente = () => {
    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header> </Header>
                <SidebarDocte />
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item active"><Link to="">Inicio</Link></li>								
                    </ol>
                    <h1 className="page-header">Tablero</h1>
                    
                    <div className="row offset-2 mt-5">                        
                        <div className="col-xl-4 col-md-2 col-l2">
                            <div className="widget widget-stats bg-blue">
                                <div className="stats-icon"><i className="fa fa-desktop"></i></div>
                                <div className="stats-info">
                                    <p>Crear Actividad</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="/tareas-crear">Ingresar<i className="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>                        
                        <div className="col-xl-4 col-md-2 col-l2">
                            <div className="widget widget-stats bg-info">
                                <div className="stats-icon"><i className="fa fa-link"></i></div>
                                <div className="stats-info">
                                    <p>Calificar Actividad</p>
                                </div>
                                <div className="stats-link">
                                    <Link to="">Ingresar<i className="fa fa-arrow-alt-circle-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </Fragment>
    );
}

export default HomeDocente;

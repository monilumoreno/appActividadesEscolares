import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import PanelHeading from '../../components/PanelHeading.';

const PageBlank = () => {
    return (
        <Fragment>
          <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <Sidebar></Sidebar>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="">Inicio</Link></li>                        
                        <li className="breadcrumb-item active"><Link to=""></Link></li>								
                    </ol>
                    <h1 className="page-header"></h1>
                    <div className="panel panel-inverse col-lg-6 offset-3" id="">
                        <PanelHeading></PanelHeading>  
                        <div className="panel-body">
                        <div className="table-responsive">
                                <table className="table table-striped mb-0 align-middle">
                                    <thead>
                                        <tr>
                                            <th>DOCUMENTO No.</th>
                                            <th>NOMBRES</th>
                                            <th>APELLIDOS</th>
                                            <th>TELÉFONO</th>
                                            <th>DIRECCIÓN</th>
                                            <th>CORREO</th>
                                            <th>PERFIL</th>
                                            <th width="1%">ACCIONES</th>
                                        </tr>
                                    </thead>
                                    <tbody>                                        
                                        <tr>
                                            <td></td>
                                            <td></td>                                                        
                                            <td nowrap="">
                                                <Link to={``} className="btn btn-sm btn-primary w-60px me-1">Editar</Link>
                                                <button onClick={(e) => elimniarUsuario()} className="btn btn-sm btn-danger w-60px">Eliminar</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </Fragment>
      );    
}
 
export default PageBlank;
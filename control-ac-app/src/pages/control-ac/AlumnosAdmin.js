import React, {Fragment, useEffect, useState} from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import APIInvoke from '../../utils/APIInvoke';
import Header from '../../components/Header';
import PanelHeading from '../../components/PanelHeading';
import { Link } from 'react-router-dom';

const AlumnosAdmin = () => {

    const [alumnos, setAlumnos] = useState([]);

    const cargarAlumnos = async () => {
        const response = await APIInvoke.invokeGET(`/alumnos`);
        setAlumnos(response.body);
    }

    useEffect(() => {
        cargarAlumnos();
    }, []);



    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarAdmin></SidebarAdmin>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="">Inicio</Link></li>                        
                        <li className="breadcrumb-item active"><Link to="">Alumnos</Link></li>								
                    </ol>
                    <h1 className="page-header"></h1>
                    <div className="panel panel-inverse" id="">
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
                                            <th>CURSO</th>
                                            <th>ACUDIENTE</th>
                                            <th width="1%">ACCIONES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            alumnos.map(
                                                item =>
                                                <tr key={item.idAlumno}>
                                                    <td>{item.numeroDocumento}</td>
                                                    <td>{item.nombres}</td>
                                                    <td>{item.apellidos}</td>
                                                    <td>{item.telefono}</td>
                                                    <td>{item.direccion}</td>
                                                    <td>{item.correo}</td>
                                                    <td>{item.idCurso.descripcionCurso}</td>
                                                    <td>{`${item.idAcudiente.nombres} ${item.idAcudiente.apellidos}`}</td>
                                                    
                                                    <td nowrap="">
                                                        <Link to={``} className="btn btn-sm btn-primary w-60px me-1">Editar</Link>
                                                        <button  className="btn btn-sm btn-danger w-60px">Eliminar</button>
                                                    </td>
                                                </tr>

                                            )
                                        }
                                        
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

export default AlumnosAdmin;
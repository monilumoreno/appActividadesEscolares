import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarActe from '../../components/SidebarActe';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const AlumnosListar = () => {

    const idAcudiente = localStorage.idUsuario
    const [ alumnos, setAlumnos ] = useState([]);
    const navigate = useNavigate()

    const cargarAlumnos = async () => {
        const response = await APIInvoke.invokeGET(`/alumnos-acudiente/${idAcudiente}`);
        setTimeout(() => {
            if (response.body.length > 0) {                
                setAlumnos(response.body);                    
            } else {
                swal({
                    title: 'Información',
                    text: 'No tiene alumnos registradas',
                    icon: 'info',
                    buttons: {
                        confirm: {
                            text: 'Aceptar',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                })                   
                navigate('/homeacudiente');
            }   
        }, 0);                 
    }

    useEffect(() => {
        cargarAlumnos();
    }, [])

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarActe></SidebarActe>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="">Inicio</Link></li>
                        <li className="breadcrumb-item active">Alumnos</li>
                    </ol>
                    <h1 className="page-header">Actividades</h1>
                    <div className="panel panel-inverse col-lg-6 offset-3" id="">
                        <PanelHeading>titulo={"Listado de Alumnos"}</PanelHeading>
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-striped mb-0 align-middle">
                                    <thead>
                                        <tr>
                                            <th>DOCUMENTO No.</th>
                                            <th>NOMBRE</th>
                                            <th>CURSO</th>                                            
                                            <th width="1%">ACCIÓN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            alumnos.map(
                                                item =>
                                                    <tr key={item.idAlumno}>
                                                        <td>{item.numeroDocumento}</td>
                                                        <td className="text-upper">
                                                            {`${item.nombres} ${item.apellidos}`}
                                                        </td>                                                        
                                                        <td className="text-upper">{item.idCurso.descripcionCurso}</td>
                                                        <td nowrap="">
                                                            <Link to={`/tareas-listar/${item.idAlumno}`} className="btn btn-sm btn-primary w-70px me-1">Revisar</Link>
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
    )
}

export default AlumnosListar
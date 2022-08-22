import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarActe from '../../components/SidebarActe';
import PanelHeading from '../../components/PanelHeading';
import Spinner from '../../components/Spinner';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import ReactTooltip from 'react-tooltip';
import ErrorAlert from '../../utils/ErrorAlert';

const AlumnosListar = () => {

    const idAcudiente = localStorage.idUsuario
    const navigate = useNavigate()
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarAlumnos();
    }, [])

    const cargarAlumnos = async () => {
        setLoading(true);
        try {
            const response = await APIInvoke.invokeGET(`/alumnos-acudiente/${idAcudiente}`);
            if (response.ok) {
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
                    setTimeout(() => {
                        navigate('/homeacudiente');
                    }, 1000);
                }
            } else {
                ErrorAlert.showAlert(response.message);    
            }            
        } catch (error) {
            console.log(error);            
            ErrorAlert.showAlert("Error al cargar los alumnos");
        } 
        setLoading(false);
    }


    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarActe></SidebarActe>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homeacudiente">Inicio</Link></li>
                        <li className="breadcrumb-item active">Alumnos</li>
                    </ol>
                    <h1 className="page-header">Actividades</h1>
                    {
                        loading
                            ?
                                <div className="col-lg-2 offset-5">
                                    <Spinner />
                                </div>
                            :
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
                                                                        <Link to={`/tareas-listar/${item.idAlumno}`}
                                                                            className="btn btn-sm btn-primary w-40px me-1"
                                                                            data-tip='tooltip' data-for='revisar'
                                                                        >
                                                                            <i className="fa fa-list-alt"></i>
                                                                        </Link>
                                                                        <ReactTooltip
                                                                            id='revisar'
                                                                            place='top'
                                                                            type='info'
                                                                            effect='solid'
                                                                        >
                                                                            Revisar actividades
                                                                        </ReactTooltip>
                                                                    </td>
                                                                </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default AlumnosListar
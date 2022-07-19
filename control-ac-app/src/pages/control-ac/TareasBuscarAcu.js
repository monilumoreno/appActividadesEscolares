import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarActe from '../../components/SidebarActe';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';

const TareasBuscarAcu = () => {

    const idAcudiente = localStorage.idUsuario

    const [paramsTarea, setParamsTarea] = useState({
        idAlumno: '0',
        idAsignatura: '0',        
    })

    const { idAlumno, idAsignatura } = paramsTarea;

    const onChange = e => {
        setParamsTarea({
            ...paramsTarea,
            [e.target.name]: e.target.value
        })
    }

    const [alumnos, setAlumnos] = useState([]);

    const cargarAlumnos = async () => {
        const response = await APIInvoke.invokeGET(`/alumnos-acudiente/${idAcudiente}`);
        setAlumnos(response.body);
    }

    const [asignaturas, setAsignaturas] = useState([]);

    const cargarAsignaturas = async () => {
        const response = await APIInvoke.invokeGET(`/asignaturas`);
        setAsignaturas(response.body);
    }

    
    useEffect(() => {
        cargarAlumnos();
        cargarAsignaturas();             
    }, [])

    const onSubmit = e => {
        e.preventDefault();        
    }

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarActe></SidebarActe>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="">Inicio</Link></li>
                        <li className="breadcrumb-item active">Buscar</li>
                    </ol>
                    <h1 className="page-header">Actividades</h1>
                    <div className="panel panel-inverse col-lg-5 offset-3" id="">
                        <PanelHeading></PanelHeading>
                        <div className="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div className="card-header center text-center border-light">
                                                <h4>BUSCAR ACTIVIDADES</h4>
                                            </div>
                                            <div className="card-body">
                                                <form className="needs-validation" onSubmit={onSubmit} novalidate>
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="idAlumno" className="form-label fw-bold">Alumno:</label>
                                                            <select className="form-select"
                                                                id="idAlumno"
                                                                name="idAlumno"
                                                                tabIndex="1"
                                                                style={{ cursor: 'pointer' }}
                                                                value={idAlumno}
                                                                onChange={onChange}
                                                                required
                                                            >
                                                                {
                                                                    alumnos.map(
                                                                        item =>
                                                                            <option key={item.idAlumno} value={item.idAlumno}>{`${item.nombres} ${item.apellidos}`}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <div className="invalid-feedback">Selecciona grado</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="idAsignatura" className="form-label fw-bold">Asignatura:</label>
                                                            <select className="form-control"
                                                                id="idAsignatura"
                                                                name="idAsignatura"
                                                                tabIndex="2"
                                                                style={{ cursor: 'pointer' }}
                                                                value={idAsignatura}
                                                                onChange={onChange}
                                                                required
                                                            >
                                                                {
                                                                    asignaturas.map(
                                                                        item =>
                                                                            <option key={item.idAsignatura} value={item.idAsignatura}>{item.descripcionAsignatura}</option>
                                                                    )
                                                                }

                                                            </select>
                                                            <div className="invalid-feedback">Selecciona asignatura</div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-2">
                                                            <Link to={`/tareas-lista-acu/${paramsTarea.idAlumno}/${paramsTarea.idAsignatura}`} className="btn btn-success me-1" id="crear">Buscar</Link>                                                            
                                                            <Link to="/homedocente" className="btn btn-success  me-1" id="cerrar">Cerrar</Link>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </Fragment>
    );
}

export default TareasBuscarAcu
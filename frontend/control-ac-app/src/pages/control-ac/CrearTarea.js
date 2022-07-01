import React, { useState, useEffect, Fragment } from 'react';
import Header from '../../components/Header';
import SidebarDocte from '../../components/SidebarDocte';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const CrearTarea = () => {

    const [tarea, setTarea] = useState({
        descripcionTarea: '',
        fechaEntrega: '',        
        idCurso: '1',
        idAsignatura: '1',
        idDocente: localStorage.idUsuario
    })

    const { descripcionTarea, fechaEntrega, idDocente, idCurso, idAsignatura } = tarea;

    const onChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const [cursos, setCursos] = useState([]);

    const cargarCursos = async () => {

        const response = await APIInvoke.invokeGET(`/cursos`);

        setTimeout(() => {
            setCursos(response.body);
        }, 10000);
    }
    
    //Define un estado para consumir el servicio
    const [asignaturas, setAsignaturas] = useState([]);

    //Método para consumir el servicio
    const cargarAsignaturas = async () => {
        const response = await APIInvoke.invokeGET(`/asignaturas`);

        setTimeout(() => {
            setAsignaturas(response.body);
        }, 10000);
        
    }

    useEffect(() => {
        cargarCursos();
        cargarAsignaturas();
    }, [])

    const crearActividad = async () => {
        const data = {
            descripcionTarea: tarea.descripcionTarea,            
            fechaEntrega: tarea.fechaEntrega,
            idDocente: {
                idUsuario: tarea.idDocente
            },
            idCurso: {
                idCurso: tarea.idCurso
            },
            idAsignatura: {
                idAsignatura: tarea.idAsignatura
            }
        }

        const response = await APIInvoke.invokePOST(`/tareas`, data);

        if (response.ok === true) {
            const mensaje = response.message;
            swal({
                title: 'Información',
                text: mensaje,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
        } else {
            const mensaje = response.message;
            swal({
                title: 'Error',
                text: mensaje,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }

        setTarea({
            descripcionTarea: '',            
            fechaEntrega: '',            
            idCurso: '1',
            idAsignatura: '1',
            idDocente: localStorage.idUsuario
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        crearActividad();
    }

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarDocte></SidebarDocte>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homedocente">Inicio</Link></li>
                        <li className="breadcrumb-item active"><Link to="">Crear actividad</Link></li>
                    </ol>
                    <h1 className="page-header">Crear Actividad</h1>
                    <div className="panel panel-inverse col-lg-6 offset-3" id="">
                        <PanelHeading></PanelHeading>
                        <div className="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div className="card-header center text-center border-light">
                                                <h4>REGISTRO TAREAS</h4>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={onSubmit} className="needs-validation" novalidate>
                                                    <div className="row my-2">
                                                        <div className="col-md-4 mb-3">
                                                            <label htmlFor="idCurso" className="form-label fw-bold">Grado:</label>
                                                            <select className="form-select"
                                                                id="idCurso"
                                                                name="idCurso"                                                                
                                                                tabIndex="1"
                                                                style={{ cursor: 'pointer' }}
                                                                value={idCurso}
                                                                onChange={onChange}
                                                                required
                                                            >
                                                                {
                                                                    cursos.map(
                                                                        item =>
                                                                            <option key={item.idCurso} value={item.idCurso}>{item.descripcionCurso}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <div className="invalid-feedback">Selecciona grado</div>
                                                        </div>
                                                        <div className="col-md-8 mb-3">
                                                            <label htmlFor="idAsignatura" className="form-label fw-bold">Asignatura:</label>
                                                            <select className="form-control"
                                                                id="idAsignatura"
                                                                name="idAsignatura"
                                                                tabIndex="2"
                                                                style={{ cursor: 'pointer'}}
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
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="descripcionTarea" className="form-label fw-bold">Descripcion:</label>
                                                            <textarea className="form-control"
                                                                id="descripcionTarea"
                                                                name="descripcionTarea"
                                                                tabIndex="3"
                                                                value={descripcionTarea}
                                                                onChange={onChange}
                                                                required
                                                            ></textarea>
                                                            <div className="invalid-feedback">Ingresa descripción de la tarea:</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-4 mb-3">
                                                            <label htmlFor="fechaEntrega" className="form-label fw-bold">Fecha de entrega:</label>
                                                            <input type="date" className="form-control"
                                                                id="fechaEntrega"
                                                                name="fechaEntrega"
                                                                tabIndex="4" min=""
                                                                value={fechaEntrega}
                                                                onChange={onChange}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa fecha limite</div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-2 mb-md-0">
                                                            <button type="submit" className="btn btn-outline-success" tabIndex="5" id="crear">Crear</button>
                                                            <button type="reset" className="btn btn-outline-success" tabIndex="6" id="cancelar">Cancelar</button>
                                                            <Link to="/homedocente" className="btn btn-outline-success" tabIndex="7" id="cerrar">Cerrar</Link>
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

export default CrearTarea;
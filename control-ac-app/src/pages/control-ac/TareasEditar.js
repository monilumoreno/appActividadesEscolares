import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import SidebarDocte from '../../components/SidebarDocte'
import PanelHeading from '../../components/PanelHeading'
import APIInvoke from '../../utils/APIInvoke'
import swal from 'sweetalert'

const TareasEditar = () => {

    const { idtarea } = useParams();
    const navigate = useNavigate();

    const [tarea, setTarea] = useState({
        idTarea: '',
        descripcionTarea: '',
        fechaCreacion: '',
        fechaEntrega: '',
        asignatura: '',
        curso: ''
    })

    const { idTarea, descripcionTarea, fechaCreacion, fechaEntrega, asignatura, curso } = tarea;

    const onChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const findTarea = async () => {
        const response = await APIInvoke.invokeGET(`/tareas/${idtarea}`);

        setTimeout(() => {
            if (response.ok === true) {
                setTarea({
                    idTarea: response.body.idTarea,
                    descripcionTarea: response.body.descripcionTarea,
                    fechaCreacion: response.body.fechaCreacion,
                    fechaEntrega: response.body.fechaEntrega,
                    asignatura: response.body.idAsignatura.descripcionAsignatura,
                    curso: response.body.idCurso.descripcionCurso
                })
            } else {
                swal({
                    title: 'Error',
                    text: response.message,
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
                })
            }
        }, 0)
    }

    const confirmarModificacion = () =>{
        swal({
            title: 'Editar Actividad',
            text: '¿Está seguro que quiere guardar los cambios?',
            icon: 'warning',
            buttons: {
                confirm: {
                    text: 'Guardar',
                    value: true,
                    visible: true,
                    className: 'btn btn-danger',
                    closeModal: true
                },
                cancel: {
                    text: 'Cancelar',
                    value: false,
                    visible: true,
                    dangerMode: true,
                    className: 'btn btn-success',
                    closeModal: true
                }
            }
        }).then((respuesta) => {
            if (respuesta) {
                editarActividad();            
            } else {
                findTarea();
            }
        });
    }

    const editarActividad = async () => {
        const data = {
            idTarea: tarea.idTarea,
            descripcionTarea: tarea.descripcionTarea,
            fechaEntrega: tarea.fechaEntrega
        }

        const response = await APIInvoke.invokePUT('/tareas', data);

        if (response.ok === true) {
            setTimeout(() => {
                navigate('/tareas');
            }, 2000);           
            
            swal({
                title: 'Información',
                text: response.message,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Aceptar',
                        value: true,
                        visible: true,
                        className: 'btn btn-success',
                        closeModal: true
                    }
                }
            });
        } else {            
            swal({
                title: 'Error',
                text: response.message,
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
            })
        }
    }

    useEffect(() => {
        findTarea();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        confirmarModificacion();
    }

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarDocte></SidebarDocte>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/tareas">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to=""></Link>Actividades</li>
                        <li className="breadcrumb-item active">Editar</li>
                    </ol>
                    <h1 className="page-header">Actividades</h1>
                    <div className="panel panel-inverse col-lg-6 offset-3" id="">
                        <PanelHeading></PanelHeading>
                        <div className="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div className="card-header center text-center border-light">
                                                <h4>EDITAR ACTIVIDAD</h4>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={onSubmit} className="needs-validation" novalidate>
                                                    <div className="row my-2">
                                                        <div className="col-md-3 mb-3">
                                                            <label htmlFor="curso" className="form-label fw-bold">Grado:</label>
                                                            <input type="text" className="form-control"
                                                                id="curso"
                                                                name="curso"
                                                                value={curso}                                                                
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div className="col-md-9 mb-3">
                                                            <label htmlFor="asignatura" className="form-label fw-bold">Asignatura:</label>
                                                            <input type="text" className="form-control"
                                                                id="asignatura"
                                                                name="asignatura"
                                                                value={asignatura}                                                                
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="descripcionTarea" className="form-label fw-bold">Descripcion:</label>
                                                            <textarea className="form-control"
                                                                id="descripcionTarea"
                                                                name="descripcionTarea"
                                                                tabIndex="1"
                                                                value={descripcionTarea}
                                                                onChange={onChange}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa descripción de la actividad</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-4 mb-3">
                                                            <label htmlFor="fechaCreacion" className="form-label fw-bold">Fecha de creación:</label>
                                                            <input type="date" className="form-control"
                                                                id="fechaCreacion"
                                                                name="fechaCreacion"                                                                
                                                                value={fechaCreacion}
                                                                readOnly
                                                            />                                                            
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label htmlFor="fechaEntrega" className="form-label fw-bold">Fecha de entrega:</label>
                                                            <input type="date" className="form-control"
                                                                id="fechaEntrega"
                                                                name="fechaEntrega"
                                                                tabIndex="2"
                                                                min=""
                                                                value={fechaEntrega}
                                                                onChange={onChange}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa fecha limite</div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-2 mb-md-0">
                                                            <button type="submit" className="btn btn-success me-1" tabIndex="5" id="crear">Editar</button>
                                                            <button type="reset" className="btn btn-success me-1" tabIndex="6" id="cancelar">Cancelar</button>
                                                            <Link to="/tareas" className="btn btn-success me-1" tabIndex="7" id="cerrar">Cerrar</Link>
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
    )
}

export default TareasEditar
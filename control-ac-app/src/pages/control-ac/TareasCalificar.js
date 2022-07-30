import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarDocte from '../../components/SidebarDocte';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const TareasCalificar = () => {

    const  { idreltareas } = useParams();    
    const navigate = useNavigate();

    const [ relTareasAlumno, setRelTareaAlumno ] = useState({
        numeroDocumento: '',
        nombres: '',
        apellidos: '',
        curso: '',
        asignatura: '',
        tarea: '',
        observaciones: '',
        calificacion: '',
        idTarea: ''
    })

    const { numeroDocumento, nombres, apellidos, curso, asignatura, tarea, observaciones, calificacion } = relTareasAlumno;

    const findRelTareaAlumno = async () => {             
        const response = await APIInvoke.invokeGET(`/alumnos-tareas/${idreltareas}`);
        setTimeout(() => {
            if (response.ok === true) {
                setRelTareaAlumno({
                    numeroDocumento: response.body.idAlumno.numeroDocumento,
                    nombres: response.body.idAlumno.nombres,
                    apellidos: response.body.idAlumno.apellidos,
                    curso: response.body.idAlumno.idCurso.descripcionCurso,
                    asignatura: response.body.idTarea.idAsignatura.descripcionAsignatura,
                    tarea: response.body.idTarea.descripcionTarea,
                    idTarea: response.body.idTarea.idTarea,
                    observaciones: response.body.observaciones,
                    calificacion: response.body.calificacion                    
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

    const calificarActividad = async () => {
        const data = {
            idRelTareaAlumno: idreltareas,            
            observaciones: relTareasAlumno.observaciones,
            calificacion: relTareasAlumno.calificacion
        }

        const response = await APIInvoke.invokePUT('/alumnos-tareas', data);

        if (response.ok === true) {            
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
        
        setTimeout(() => {
            navigate(`/tareas-detalle/${relTareasAlumno.idTarea}`);    
        }, 3000);        
    }

    const reset = () => {
        setRelTareaAlumno({
            observaciones: '',
            calificacion: 0,
        })
        document.getElementById('observaciones').focus();
    }
    const onChange = (e) => {
        setRelTareaAlumno({
            ...relTareasAlumno,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        calificarActividad();
    }

    useEffect(() => {
        findRelTareaAlumno();
    }, [])

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarDocte></SidebarDocte>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homedocente">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to="/tareas">Actividades</Link></li>
                        <li className="breadcrumb-item active">Calificar</li>
                    </ol>
                    <h1 className="page-header">Actividades</h1>
                    <div className="panel panel-inverse col-lg-7 offset-2" id="">
                        <PanelHeading
                            titulo={""}
                        />
                        <div className="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div class="card-header center text-center border-light">
                                                <h4>CALIFICAR ACTIVIDAD</h4>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={onSubmit} className="needs-validation" novalidate>
                                                    <div className="row my-2">
                                                        <div className="col-md-4 mb-3">
                                                        <label htmlFor="numeroDocumento" className="form-label fw-bold">Número de documento: </label>
                                                            <input type="number" class="form-control"
                                                                id="numeroDocumento"
                                                                name="numeroDocumento"
                                                                value={numeroDocumento}
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div class="col-md-8 mb-3">
                                                            <label htmlFor="nombres" className="form-label fw-bold">Nombres:</label>
                                                            <input type="text" className="form-control"
                                                                id="nombres"
                                                                name="nombres"
                                                                value={`${nombres} ${apellidos}`}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="row my-2">
                                                        <div class="col-md-4 mb-3">
                                                        <label htmlFor="curso" className="form-label fw-bold">Grado:</label>
                                                            <input type="text" className="form-control"
                                                                id="curso"
                                                                name="curso"
                                                                value={curso}                                                                
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div class="col-md-8 mb-3">
                                                        <label htmlFor="asignatura" className="form-label fw-bold">Asignatura:</label>
                                                            <input type="text" className="form-control"
                                                                id="asignatura"
                                                                name="asignatura"
                                                                value={asignatura}                                                                
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="row my-2">
                                                        <div class="col-md-12 mb-3">
                                                        <label htmlFor="tarea" className="form-label fw-bold">Descripcion:</label>
                                                            <textarea className="form-control"
                                                                id="tarea"
                                                                name="tarea"                                                                
                                                                value={tarea}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">                                                        
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="observaciones" className="form-label fw-bold">Observaciones:</label>
                                                            <textarea class="form-control" 
                                                                id="observaciones" 
                                                                name="observaciones"
                                                                cols="" rows="3"
                                                                value={observaciones}
                                                                onChange={onChange}
                                                                tabIndex="1"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa calificación</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-2 mb-3">
                                                            <label htmlFor="calificacion" className="form-label fw-bold">Calificación:</label>
                                                            <input type="number" className="form-control" 
                                                                id="calificacion"
                                                                name="calificacion"
                                                                value={calificacion}
                                                                onChange={onChange}
                                                                tabIndex="2"
                                                                min={0}
                                                                required 
                                                            />
                                                            <div className="invalid-feedback">Ingresa calificación</div>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12 mb-2">
                                                            <button type="submit" class="btn btn-success me-1" id="guardar">Guardar</button>
                                                            <button onClick={reset} type="reset" class="btn btn-success me-1" id="cancelar">Cancelar</button>
                                                            <Link to={`/tareas-detalle/${relTareasAlumno.idTarea}`} class="btn btn-success" id="cerrar">Cerrar</Link>
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

export default TareasCalificar;
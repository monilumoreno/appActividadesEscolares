import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarAdmin from '../../components/SidebarAdmin';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const AlumnosEditar = () => {
    const { idalumno } = useParams();
    const navigate = useNavigate();

    const [alumno, setAlumno] = useState({
        tipoDocumento: '1',
        numeroDocumento: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        correo: '',
        idAcudiente: {
            idUsuario: '',
        },
        idCurso: {
            idCurso: '1'
        }	
    })

    const { tipoDocumento, numeroDocumento, nombres, apellidos, telefono, direccion, correo, idAcudiente, idCurso } = alumno;

    const onChange = (e) => {
        setAlumno({
            ...alumno,
            [e.target.name]: e.target.value
        })
    }

    const [cursos, setCursos] = useState([]);

    const cargarCursos = async () => {
        const response = await APIInvoke.invokeGET(`/cursos`);

        setTimeout(() => {
            setCursos(response.body);
        }, 0)
    }

    const [acudientes, setAcudientes] = useState([]);

    const cargarAcudientes = async () => {
        const response = await APIInvoke.invokeGET(`/usuarios-perfil/${3}`);

        setTimeout(() => {
            setAcudientes(response.body);
        }, 0)
    }

    const findById = async () => {
        const response = await APIInvoke.invokeGET(`/alumnos/${idalumno}`);

        setTimeout(() => {
            if (response.ok === true) {
                setAlumno({
                    tipoDocumento: response.body.tipoDocumento,
                    numeroDocumento: response.body.numeroDocumento,
                    nombres: response.body.nombres,
                    apellidos: response.body.apellidos,
                    telefono: response.body.telefono,
                    direccion: response.body.direccion,
                    correo: response.body.correo,
                    idAcudiente: response.body.idAcudiente.idUsuario,
                    idCurso: response.body.idCurso.idCurso
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
    
    const confirmarEdicion = () => {
        swal({
            title: 'Editar Alumno',
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
                editarAlumno();            
            } 
        });
    }

    const editarAlumno = async () => {
        const data = {
            idAlumno: idalumno,
            tipoDocumento: alumno.tipoDocumento,
            numeroDocumento: alumno.numeroDocumento,
            nombres: alumno.nombres,
            apellidos: alumno.apellidos,
            telefono: alumno.telefono,
            direccion: alumno.direccion,
            correo: alumno.correo,            
            idAcudiente: {
                idUsuario: alumno.idAcudiente
            },
            idCurso: {
                idCurso: alumno.idCurso
            }	
        }

        const response = await APIInvoke.invokePUT(`/alumnos`, data);

        if (response.ok === true) {
            setTimeout(() => {
                navigate(`/alumnos`);    
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
        cargarCursos();
        cargarAcudientes();
        findById();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        confirmarEdicion();
    }


    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header> </Header>
                <SidebarAdmin />
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homeadmin">Inicio</Link></li>
                        <li className="breadcrumb-item active"><Link to="/alumnos">Alumnos</Link></li>
                        <li className="breadcrumb-item active">Editar</li>
                    </ol>
                    <h1 className="page-header">Alumnos</h1>
                    <div className="panel panel-inverse col-lg-8 offset-2" data-sortable-id="crearUsuarios">
                        <PanelHeading />
                        <div className="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div className="card-header center text-center border-light">
                                                <h4>EDITAR ALUMNOS</h4>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={onSubmit} className="needs-validation" novalidate>
                                                    <div className="row my-2">
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="tipoDocumento" className="form-label fw-bold">Tipo de documento:</label>
                                                            <select className="form-select"
                                                                id="tipoDocumento"
                                                                name="tipoDocumento"
                                                                value={tipoDocumento}
                                                                onChange={onChange}
                                                                style={{ cursor: 'pointer' }}
                                                                tabIndex="1"
                                                                required
                                                            >
                                                                <option value="1">Tarjeta de identidad</option>
                                                                <option value="2">Cédula de ciudadanía</option>
                                                                <option value="3">Cédula de extranjería</option>
                                                                <option value="4">Pasaporte</option>
                                                                <option value="5">Permiso Especial de Permanencia</option>
                                                            </select>
                                                            <div className="invalid-feedback">Selecciona tipo de documento</div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="numeroDocumento" className="form-label fw-bold">Número de documento: </label>
                                                            <input type="number" class="form-control"
                                                                id="numeroDocumento"
                                                                name="numeroDocumento"
                                                                value={numeroDocumento}
                                                                onChange={onChange}
                                                                tabIndex="2"
                                                                placeholder="Ingrese número de documento"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa número de documento</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="nombres" className="form-label fw-bold">Nombres:</label>
                                                            <input type="text" className="form-control"
                                                                id="nombres"
                                                                name="nombres"
                                                                value={nombres}
                                                                onChange={onChange}
                                                                tabIndex="3"
                                                                placeholder="Ingrese nombres"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa nombres</div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="apellidos" className="form-label fw-bold">Apellidos:</label>
                                                            <input type="text" className="form-control"
                                                                id="apellidos"
                                                                name="apellidos"
                                                                value={apellidos}
                                                                onChange={onChange}
                                                                tabIndex="4"
                                                                placeholder="Ingrese apellidos"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa apellidos</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="direccion" className="form-label fw-bold">Dirección:</label>
                                                            <input type="text" className="form-control"
                                                                id="direccion"
                                                                name="direccion"
                                                                value={direccion}
                                                                onChange={onChange}
                                                                tabIndex="5"
                                                                placeholder="Ingrese dirección"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa dirección</div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="telefono" className="form-label fw-bold">Teléfono:</label>
                                                            <input type="number" className="form-control"
                                                                id="telefono"
                                                                name="telefono"
                                                                value={telefono}
                                                                onChange={onChange}
                                                                tabIndex="6"
                                                                placeholder="Ingrese teléfono"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa teléfono</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="correo" className="form-label fw-bold">Correo electrónico:</label>
                                                            <input type="email" className="form-control"
                                                                id="correo"
                                                                name="correo"
                                                                value={correo}
                                                                onChange={onChange}
                                                                tabIndex="7"
                                                                placeholder="Ingrese correo"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa correo</div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="idCurso" className="form-label fw-bold">Curso:</label>
                                                            <select className="form-select"
                                                                id="idCurso"
                                                                name="idCurso"
                                                                value={idCurso}
                                                                onChange={onChange}
                                                                style={{cursor: 'pointer'}}
                                                                tabIndex="8"
                                                                required
                                                            >
                                                                {
                                                                    cursos.map(
                                                                        item => 
                                                                            <option key={item.idCurso} value={item.idCurso}>{item.descripcionCurso}</option>
                                                                    )
                                                                }                                                                
                                                            </select>
                                                            <div className="invalid-feedback">Selecciona tipo de usuario</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="idAcudiente" className="form-label fw-bold">Acudiente:</label>
                                                            <select className="form-control" 
                                                                id="idAcudiente"
                                                                name="idAcudiente"
                                                                value={idAcudiente}
                                                                onChange={onChange}
                                                                style={{cursor: 'pointer'}}
                                                                tabIndex="9"
                                                                required
                                                            >
                                                                {
                                                                    acudientes.map(
                                                                        item =>
                                                                            <option key={item.idUsuario} value={item.idUsuario}>
                                                                                {`${item.nombres} ${item.apellidos}`}</option>
                                                                    )
                                                                }                                                                
                                                            </select>
                                                            <div className="invalid-feedback">Seleccione acudiente</div>
                                                        </div>                                              
                                                    </div>                                              
                                                    <div className="row">
                                                        <div className="col-md-6 mb-2 mb-md-0">
                                                            <button type="submit" className="btn btn-success me-1" id="guardar" tabindex="9">Guardar</button>
                                                            <button type="reset" className="btn btn-success me-1" id="cancelar" tabindex="10">Cancelar</button>
                                                            <Link to="/usuarios" className="btn btn-success me-1" id="cerrar" tabindex="11">Cerrar</Link>
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
 
export default AlumnosEditar;
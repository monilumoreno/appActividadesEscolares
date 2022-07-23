import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarAdmin from '../../components/SidebarAdmin';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const AsignaturasEditar = () => {

    const { idasignatura } = useParams();
    const navigate = useNavigate();

    const [asignatura, setAsignatura] = useState({
        idAsignatura: '',
        descripcionAsignatura: '',
    })

    const { descripcionAsignatura, idAsignatura } = asignatura;

    const onChange = (e) => {
        setAsignatura({
            ...asignatura,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById('descripcionAsignatura').focus();
    }, [])

    const findById = async () => {
        const response = await APIInvoke.invokeGET(`/asignaturas/${idasignatura}`);

        setTimeout(() => {
            if (response.ok === true) {
                setAsignatura({
                    idAsignatura: response.body.idAsignatura,
                    descripcionAsignatura: response.body.descripcionAsignatura,
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
            title: 'Editar Asignatura',
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
                editarAsignatura();
            }
        });
    }

    const editarAsignatura = async () => {
        const data = {
            idAsignatura: asignatura.idAsignatura,
            descripcionAsignatura: asignatura.descripcionAsignatura,
        }

        const response = await APIInvoke.invokePUT(`/asignaturas`, data);

        if (response.ok === true) {
            setTimeout(() => {
                navigate(`/asignaturas`);
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
                        <li className="breadcrumb-item active"><Link to="/asignaturas">Asignaturas</Link></li>
                        <li className="breadcrumb-item active">Editar</li>
                    </ol>
                    <h1 className="page-header">Asignaturas</h1>
                    <div className="panel panel-inverse col-lg-5 offset-3" data-sortable-id="crearCurso">
                        <PanelHeading />
                        <div claclassNames="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div className="card-header center text-center border-light">
                                                <h4>EDITAR ASIGNATURAS</h4>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={onSubmit} className="needs-validation" novalidate>
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="idAsignatura" className="form-label fw-bold">Asignatura ID:</label>
                                                            <input type="text" className="form-control"
                                                                id="idAsignatura"
                                                                name="idAsignatura"
                                                                value={idAsignatura}  
                                                                readOnly
                                                            />                                                            
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="descripcionAsignatura" className="form-label fw-bold">Nombre:</label>
                                                            <input type="text" className="form-control"
                                                                id="descripcionAsignatura"
                                                                name="descripcionAsignatura"
                                                                value={descripcionAsignatura}
                                                                onChange={onChange}
                                                                tabIndex="1"
                                                                placeholder="Ingrese nombre de la asignatura"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa nombre de la asignatura</div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-2 mb-md-0">
                                                            <button type="submit" className="btn btn-success me-1" id="crear" tabindex="9">Crear</button>
                                                            <button type="reset" className="btn btn-success me-1" id="cancelar" tabindex="10">Cancelar</button>
                                                            <Link to="/asignaturas" className="btn btn-success me-1" id="cerrar" tabindex="11">Cerrar</Link>
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

export default AsignaturasEditar
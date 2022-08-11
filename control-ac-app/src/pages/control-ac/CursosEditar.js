import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarAdmin from '../../components/SidebarAdmin';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import ErrorAlert from '../../utils/ErrorAlert';

const CursosEditar = () => {

    const { idcurso } = useParams();
    const navigate = useNavigate();

    const [curso, setCurso] = useState({
        idCurso: '',
        descripcionCurso: '',
    })

    const { idCurso, descripcionCurso } = curso;

    useEffect(() => {
        findById();
        document.getElementById('descripcionCurso').focus();
    }, [])
    
    const onChange = (e) => {
        setCurso({
            ...curso,
            [e.target.name]: e.target.value
        })
    }    

    const findById = async () => {
        try {
            const response = await APIInvoke.invokeGET(`/cursos/${idcurso}`);
            if (response.ok) {
                setCurso({
                    idCurso: response.body.idCurso,
                    descripcionCurso: response.body.descripcionCurso,
                })
            } else {
                ErrorAlert.showAlert(response.message);
            }
        } catch (error) {
            console.log(error);
            ErrorAlert.showAlert("Error al conectar con el servidor");
        }
    }

    const confirmarEdicion = () => {
        swal({
            title: 'Editar Curso',
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
                editarCurso();
            }
        });
    }

    const editarCurso = async () => {
        const data = {
            idCurso: idcurso,
            descripcionCurso: curso.descripcionCurso,
        }

        try {
            const response = await APIInvoke.invokePUT(`/cursos`, data);
            if (response.ok) {
                setTimeout(() => {
                    navigate(`/cursos`);
                }, 1000);            

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
                ErrorAlert.showAlert(response.message);
            }
        } catch (error) {
            console.log(error);
        }        
    }

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
                        <li className="breadcrumb-item active"><Link to="/cursos">Cursos</Link></li>
                        <li className="breadcrumb-item active">Editar</li>
                    </ol>
                    <h1 className="page-header">Cursos</h1>
                    <div className="panel panel-inverse col-lg-4 offset-4" data-sortable-id="crearCurso">
                        <PanelHeading />
                        <div claclassNames="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div className="card-header center text-center border-light">
                                                <h4>EDITAR CURSOS</h4>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={onSubmit} className="needs-validation" novalidate>
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="idCurso" className="form-label fw-bold">Curso ID:</label>
                                                            <input type="text" className="form-control"
                                                                id="idCurso"
                                                                name="idCurso"
                                                                value={idCurso}
                                                                readOnly
                                                            />                                                            
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="descripcionCurso" className="form-label fw-bold">Nombre:</label>
                                                            <input type="text" className="form-control"
                                                                id="descripcionCurso"
                                                                name="descripcionCurso"
                                                                value={descripcionCurso}
                                                                onChange={onChange}
                                                                tabIndex="1"
                                                                placeholder="Ingrese nombre del curso"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa nombre del curso</div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-2 mb-md-0">
                                                            <button type="submit" className="btn btn-success me-1" id="crear" tabindex="9">Crear</button>
                                                            <button type="reset" className="btn btn-success me-1" id="cancelar" tabindex="10">Cancelar</button>
                                                            <Link to="/cursos" className="btn btn-success me-1" id="cerrar" tabindex="11">Cerrar</Link>
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

export default CursosEditar
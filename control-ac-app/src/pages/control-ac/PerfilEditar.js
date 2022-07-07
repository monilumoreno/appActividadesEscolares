import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../components/Header';
import PanelHeading from '../../components/PanelHeading';
import { useNavigate } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import cifrador from 'js-sha512';
import swal from 'sweetalert';

const PerfilEditar = () => {

    const idusuario = localStorage.idUsuario;    
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        tipoDocumento: '2',
        numeroDocumento: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        correo: '',
        nomUsuario: '',
        clave: '',
        claveConfirmacion: '',
        idPerfil: localStorage.idPerfil
    })

    const { tipoDocumento, numeroDocumento, nombres, apellidos, telefono, direccion, correo, nomUsuario, clave, claveConfirmacion, idPerfil } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }    

    const findById = async () => {
        const response = await APIInvoke.invokeGET(`/usuarios/${idusuario}`);

        if (response.ok === true) {
            setUsuario({
                tipoDocumento: response.body.tipoDocumento,
                numeroDocumento: response.body.numeroDocumento,
                nombres: response.body.nombres,
                apellidos: response.body.apellidos,
                telefono: response.body.telefono,
                direccion: response.body.direccion,
                correo: response.body.correo,
                nomUsuario: response.body.usuario,
                clave: response.body.clave,
                claveConfirmacion: response.body.clave,
                idPerfil: response.body.idPerfil.idPerfil            
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
    }

    const editarUsuario = async () => {
        const data = {
            idUsuario: idusuario,
            tipoDocumento: usuario.tipoDocumento,
            numeroDocumento: usuario.numeroDocumento,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            telefono: usuario.telefono,
            direccion: usuario.direccion,
            correo: usuario.correo,
            usuario: usuario.nomUsuario,
            clave: cifrador.sha512(usuario.clave),
            idPerfil: {
                idPerfil: usuario.idPerfil
            }
        }

        const response = await APIInvoke.invokePUT(`/usuarios`, data);

        setTimeout(() => {
            
        
            if (response.ok === true) {            
                const mensaje = response.message;
                swal({
                    title: 'Información',
                    text: mensaje,
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
            redireccionar();
        }, 2000);        
    }

    useEffect(() => {        
        findById();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const password1 = document.getElementById('clave');
        const password2 = document.getElementById('claveConfirmacion');

        // Verificamos si las constraseñas no coinciden 
        if (password1.value != '' && password2.value != '') {

            if (password1.value === password2.value) {
                editarUsuario();
            } else {
                swal({
                    title: 'Error',
                    text: 'La contraseña y la confirmación no coinciden',
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
                document.getElementById("clave").focus();
            }
        }
    }

    const redireccionar = () => {
        switch (usuario.idPerfil) {
            case 1:
                navigate('/homeadmin');
                break;
            case 2:
                navigate('/homedocente');
                break;
            case 3:
                navigate('/homeacudiente');
                break;									
        }
    }

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header> </Header>
                <div id="content" className="app-content">                                        
                    <div className="panel panel-inverse col-lg-8 offset-2" data-sortable-id="crearUsuarios">
                        <PanelHeading />
                        <div className="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div className="card-header center text-center border-light">
                                                <h4>EDITAR PERFIL</h4>
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
                                                            <label htmlFor="nomUsuario" className="form-label fw-bold">Nombre de usuario:</label>
                                                            <input type="text" className="form-control"
                                                                id="nomUsuario"
                                                                name="nomUsuario"
                                                                value={nomUsuario}
                                                                onChange={onChange}
                                                                tabIndex="8"
                                                                placeholder="Ingrese nombre de usuario"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingrese nombre de usuario</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="clave" className="form-label fw-bold">Contraseña:</label>
                                                            <input type="password" className="form-control"
                                                                id="clave"
                                                                name="clave"
                                                                value={clave}
                                                                onChange={onChange}
                                                                tabIndex="9"
                                                                placeholder="Ingrese contraseña"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa contraseña</div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="claveConfirmacion" className="form-label fw-bold">Confirmación contraseña:</label>
                                                            <input type="password" className="form-control"
                                                                id="claveConfirmacion"
                                                                name="claveConfirmacion"
                                                                value={claveConfirmacion}
                                                                onChange={onChange}
                                                                tabIndex="10"
                                                                placeholder="Ingrese de nuevo la contraseña"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingrese de nuevo la contraseña</div>
                                                        </div>
                                                    </div>                                                    
                                                    <div className="row">
                                                        <div className="col-md-6 mb-2 mb-md-0">
                                                            <button type="submit" className="btn btn-outline-success" id="guardar" tabindex="9">Guardar</button>
                                                            <button type="reset" className="btn btn-outline-success" id="cancelar" tabindex="10">Cancelar</button>
                                                            <button type="submit" className="btn btn-outline-success" id="cerrar" tabindex="11" onClick={redireccionar} >Cerrar</button>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div id="msg"></div>
                                                <div id="error" className="alert alert-danger ocultar" role="alert">Las Contraseñas no coinciden, vuelve a intentar !</div>
                                                <div id="ok" className="alert alert-success ocultar" role="alert">(Procesando formulario ... )</div>
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

export default PerfilEditar;
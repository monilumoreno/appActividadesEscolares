import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../components/Header';
import PanelHeading from '../../components/PanelHeading';
import SidebarAdmin from '../../components/SidebarAdmin';
import { Link, useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import cifrador from 'js-sha512';
import swal from 'sweetalert';

const UsuariosEditar = () => {

    const { idusuario } = useParams();
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
        idPerfil: '2'
    })

    const { tipoDocumento, numeroDocumento, nombres, apellidos, telefono, direccion, correo, nomUsuario, clave, claveConfirmacion, idPerfil } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const [perfiles, setPerfiles] = useState([]);

    const cargarPerfiles = async () => {
        //const response = await APIInvoke.invokeGET(`/perfiles`);
        const response = await APIInvoke.invokeGET(`/perfiles-activos`);

        setTimeout(() => {
            setPerfiles(response.body);
        }, 0)
    }

    const findById = async () => {
        const response = await APIInvoke.invokeGET(`/usuarios/${idusuario}`);

        setTimeout(() => {
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
        }, 0)
    }

    
        const confirmarModificacion = () =>{
            swal({
                title: 'Editar Usuario',
                text: '??Est?? seguro que quiere guardar los cambios?',
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
                    editarUsuario();            
                } 
            });
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

        if (response.ok === true) {
            setTimeout(() => {
                navigate(`/usuarios`);
            }, 2000);
            
            const mensaje = response.message;
            swal({
                title: 'Informaci??n',
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
            const mensaje = response.message;
            swal({
                title: 'Error',
                text: mensaje,
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
        cargarPerfiles();
        findById();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const password1 = document.getElementById('clave');
        const password2 = document.getElementById('claveConfirmacion');

        // Verificamos si las constrase??as no coinciden ;
        if (password1.value != '' && password2.value != '') {

            if (password1.value === password2.value) {                
                confirmarModificacion();
            } else {
                swal({
                    title: 'Error',
                    text: 'La contrase??a y la confirmaci??n no coinciden',
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


    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header> </Header>
                <SidebarAdmin />
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homeadmin">Inicio</Link></li>
                        <li className="breadcrumb-item active"><Link to="">Usuarios</Link></li>
                        <li className="breadcrumb-item active"><Link to="">Editar</Link></li>
                    </ol>
                    <h1 className="page-header"><span className="badge bg-success ms-5px">Usuarios</span></h1>
                    <div className="panel panel-inverse col-lg-8 offset-2" data-sortable-id="crearUsuarios">
                        <PanelHeading />
                        <div className="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div className="card-header center text-center border-light">
                                                <h4>EDITAR USUARIOS</h4>
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
                                                                <option value="2">C??dula de ciudadan??a</option>
                                                                <option value="3">C??dula de extranjer??a</option>
                                                                <option value="4">Pasaporte</option>
                                                                <option value="5">Permiso Especial de Permanencia</option>
                                                            </select>
                                                            <div className="invalid-feedback">Selecciona tipo de documento</div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="numeroDocumento" className="form-label fw-bold">N??mero de documento: </label>
                                                            <input type="number" class="form-control"
                                                                id="numeroDocumento"
                                                                name="numeroDocumento"
                                                                value={numeroDocumento}
                                                                onChange={onChange}
                                                                tabIndex="2"
                                                                placeholder="Ingrese n??mero de documento"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa n??mero de documento</div>
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
                                                            <label htmlFor="direccion" className="form-label fw-bold">Direcci??n:</label>
                                                            <input type="text" className="form-control"
                                                                id="direccion"
                                                                name="direccion"
                                                                value={direccion}
                                                                onChange={onChange}
                                                                tabIndex="5"
                                                                placeholder="Ingrese direcci??n"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa direcci??n</div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="telefono" className="form-label fw-bold">Tel??fono:</label>
                                                            <input type="number" className="form-control"
                                                                id="telefono"
                                                                name="telefono"
                                                                value={telefono}
                                                                onChange={onChange}
                                                                tabIndex="6"
                                                                placeholder="Ingrese tel??fono"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa tel??fono</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="correo" className="form-label fw-bold">Correo electr??nico:</label>
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
                                                            <label htmlFor="clave" className="form-label fw-bold">Contrase??a:</label>
                                                            <input type="password" className="form-control"
                                                                id="clave"
                                                                name="clave"
                                                                value={clave}
                                                                onChange={onChange}
                                                                tabIndex="9"
                                                                placeholder="Ingrese contrase??a"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingresa contrase??a</div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="claveConfirmacion" className="form-label fw-bold">Confirmaci??n contrase??a:</label>
                                                            <input type="password" className="form-control"
                                                                id="claveConfirmacion"
                                                                name="claveConfirmacion"
                                                                value={claveConfirmacion}
                                                                onChange={onChange}
                                                                tabIndex="10"
                                                                placeholder="Ingrese de nuevo la contrase??a"
                                                                required
                                                            />
                                                            <div className="invalid-feedback">Ingrese de nuevo la contrase??a</div>
                                                        </div>
                                                    </div>
                                                    <div className="my-2">
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="idPerfil" className="form-label fw-bold">Perfil de usuario:</label>
                                                            <select className="form-select"
                                                                id="idPerfil"
                                                                name="idPerfil"
                                                                value={idPerfil}
                                                                onChange={onChange}
                                                                style={{ cursor: 'pointer' }}
                                                                tabIndex="11"
                                                                required
                                                            >
                                                                {
                                                                    perfiles.map(
                                                                        item =>
                                                                            <option key={item.idPerfil} value={item.idPerfil}>{item.descripcionPerfil}</option>
                                                                    )
                                                                }
                                                            </select>
                                                            <div className="invalid-feedback">Selecciona tipo de usuario</div>
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

export default UsuariosEditar;

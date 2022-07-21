import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../components/Header';
import PanelHeading from '../../components/PanelHeading';
import SidebarAdmin from '../../components/SidebarAdmin';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import cifrador from 'js-sha512';
import swal from 'sweetalert';

const UsuariosCrear = () => {

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
        idPerfil: '2'        
    })

    const { tipoDocumento, numeroDocumento, nombres, apellidos, telefono, direccion, correo, nomUsuario, clave, idPerfil } = usuario;

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

    const crearUsuario = async () => {
        const data  = {
            tipoDocumento: usuario.tipoDocumento,
	 		numeroDocumento: usuario.numeroDocumento,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            telefono: usuario.telefono,
            direccion: usuario.direccion,
	 		correo: usuario.correo,
            usuario: usuario.correo,
            clave: cifrador.sha512(usuario.numeroDocumento),
            //clave: usuario.numeroDocumento,
            idPerfil: {
                idPerfil: usuario.idPerfil
            }
        }        

        const response = await APIInvoke.invokePOST(`/usuarios`, data);

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
            const mensaje= response.message;
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
        setUsuario({
            tipoDocumento: '2',
            numeroDocumento: '',
            nombres: '',
            apellidos: '',
            telefono: '',
            direccion: '',
            correo: '',
            nomUsuario: '',
            clave: ''
        })
    }

    useEffect(() => {
        cargarPerfiles();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();        
        crearUsuario();
    }


    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header> </Header>
                <SidebarAdmin />
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homeadmin">Inicio</Link></li>
                        <li className="breadcrumb-item active"><Link to="/usuarios">Usuarios</Link></li>
                        <li className="breadcrumb-item active">Crear</li>
                    </ol>
                    <h1 className="page-header">Usuarios</h1>
                    <div className="panel panel-inverse col-lg-8 offset-2" data-sortable-id="crearUsuarios">
                        <PanelHeading />
                        <div className="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div className="card-header center text-center border-light">
                                                <h4>REGISTRO USUARIOS</h4>
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
                                                                style={{cursor: 'pointer'}}
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
                                                            <div className ="invalid-feedback">Ingresa número de documento</div>
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
                                                            <div className ="invalid-feedback">Ingresa nombres</div>
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
                                                            <div className ="invalid-feedback">Ingresa apellidos</div>
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
                                                            <div className ="invalid-feedback">Ingresa dirección</div>
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
                                                            <div className ="invalid-feedback">Ingresa teléfono</div>
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
                                                            <div className ="invalid-feedback">Ingresa correo</div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label htmlFor="idPerfil" className="form-label fw-bold">Perfil de usuario:</label>
                                                            <select className="form-select"
                                                                id="idPerfil"
                                                                name="idPerfil"
                                                                value={idPerfil}
                                                                onChange={onChange}
                                                                style={{cursor: 'pointer'}}
                                                                tabIndex="8"
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
                                                            <button type="submit" className="btn btn-success me-1" id="crear" tabindex="9">Crear</button>
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

export default UsuariosCrear;

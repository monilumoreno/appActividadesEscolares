import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../components/Header';
import SidebarAdmin from '../../components/SidebarAdmin';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import PanelHeading from '../../components/PanelHeading';
import swal from 'sweetalert';
import ReactTooltip from 'react-tooltip';
import Spinner from '../../components/Spinner';
import ErrorAlert from '../../utils/ErrorAlert';

const UsuariosAdmin = () => {
    //Definición de las variables de estado y la función que las actualizan o alteran
    const [usuarios, setUsuarios] = useState([]);
    const [perfiles, setPerfiles] = useState([]);
    // Define un estado para guardar la palabra clave para filtrar
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarPerfiles();
        cargarUsuarios();
    }, [])

    const cargarPerfiles = async () => {
        try {
            const response = await APIInvoke.invokeGET(`/perfiles-activos`);
            if (response.ok) {
                const temporal = response.body;
                temporal.unshift({
                    idPerfil: 0,
                    descripcionPerfil: 'Todos',
                    estado: 'A'
                })
                setPerfiles(temporal);
            } else {
                ErrorAlert.showAlert(response.message);       
            }
        } catch (error) {
            console.log(error);            
            ErrorAlert.showAlert("Error al cargar los perfiles");   
        }        
    }

    const cargarUsuarios = async (idPerfil) => {
        setLoading(true);        
        try {
            let response        
            if (idPerfil && idPerfil > 0) {
                response = await APIInvoke.invokeGET(`/usuarios-perfil/${idPerfil}`);
            } else {            
                response = await APIInvoke.invokeGET(`/usuarios-activos`);                                                            
            }
            if (response.ok) {
                setUsuarios(response.body);                        
            } else {
                ErrorAlert.showAlert(response.message);       
            }
            //setLoading(false);                
        } catch (error) {
            console.log(error);            
            ErrorAlert.showAlert("Error al cargar los usuarios");   
            //setLoading(false);                
        }
        setLoading(false);                
    }

    const confrimarElimnacion = (e, idUsuario) => {
        e.preventDefault();
        swal({
            title: 'Eliminar Usuario',
            text: '¿Está seguro que quiere eliminar el registro?',
            icon: 'warning',
            buttons: {
                confirm: {
                    text: 'Eliminar',
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
                elimniarUsuario(idUsuario);
            }
        });
    }

    const elimniarUsuario = async (idUsuario) => {
        try {
            const response = await APIInvoke.invokePUT(`/usuarios/${idUsuario}`);        
            if (response.ok) {
                cargarUsuarios(document.getElementById('idPerfil').value);
                swal({
                    title: 'Eliminar Usuario',
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
                })
            } else {
                ErrorAlert.showAlert(response.message);
            }
        } catch (error) {
            console.log(error);
            ErrorAlert.showAlert("Error al conectar con el servidor");
        }
    }

    const onChange = (e) => {
        cargarUsuarios(e.target.value)        
    }

    //Captura los valores que se digitan en la caja de búsqueda
    const buscador = (e) => {
        //Actualiza el estado busqueda con el valor que guarda la caja de texto
        setBusqueda(e.target.value)
    }

    let resultados = []

    if (!busqueda) {
        resultados = usuarios
    } else { //Si el usuario ingresa datos
        //filter crea un nuevo array y lo devuelve con todos los elementos
        //que cumplan una condición
        //includes determina si un array incluye un elemento. Retorna true o false
        resultados = usuarios.filter(
            (dato) => (`${dato.nombres} ${dato.apellidos}`).toLowerCase().includes(busqueda.toLocaleLowerCase())
        )
    }

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarAdmin />
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homeadmin">Inicio</Link></li>
                        <li className="breadcrumb-item active">Usuarios</li>
                    </ol>
                    <h1 className="page-header">Usuarios</h1>
                    <div className="row my-3">
                        <div className="col-4">
                            <Link to="/usuarios-crear" className="btn btn-green fs-bold me-3">Crear Usuario</Link>
                        </div>
                        <div className="col-3">
                            <div className="input-group">
                                <label class="input-group-text" id="id0erfil">Perfil:</label>
                                <select className="form-select"
                                    id="idPerfil"
                                    name="idPerfil"
                                    style={{ cursor: 'pointer' }}
                                    onChange={onChange}
                                    required
                                >
                                    {
                                        perfiles.map(
                                            item =>
                                                <option key={item.idPerfil} value={item.idPerfil}>{item.descripcionPerfil}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="input-group">
                                <label class="input-group-text" id="filtrar">Filtrar:</label>
                                <input type="text" className="form-control"
                                    value={busqueda}
                                    onChange={buscador}
                                    placeholder="Ingrese palabra clave en el nombre"
                                />
                            </div>
                        </div>
                    </div>
                    {
                        loading
                            ? 
                                <div className="col-lg-2 offset-5">
                                    <Spinner />
                                </div>
                            :
                            <div className="panel panel-inverse" data-sortable-id="listaUsuarios">
                                <PanelHeading
                                    titulo={"Listado de Usuarios"}
                                />
                                <div className="panel-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped mb-0 align-middle">
                                            <thead>
                                                <tr>
                                                    <th>DOCUMENTO No.</th>
                                                    <th>NOMBRE</th>
                                                    <th>TELÉFONO</th>
                                                    <th>DIRECCIÓN</th>
                                                    <th>CORREO</th>
                                                    <th>PERFIL</th>
                                                    <th width="1%">ACCIONES</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    resultados.map(
                                                        item =>
                                                            <tr key={item.idUsuario}>
                                                                <td>{item.numeroDocumento}</td>
                                                                <td className="text-upper">
                                                                    {`${item.nombres} ${item.apellidos}`}
                                                                </td>
                                                                <td>{item.telefono}</td>
                                                                <td className="text-upper">{item.direccion}</td>
                                                                <td>{item.correo}</td>
                                                                <td className="text-upper">{item.idPerfil.descripcionPerfil}</td>
                                                                <td nowrap="">
                                                                    <Link to={`/usuarios-editar/${item.idUsuario}`}
                                                                        className="btn btn-sm btn-success w-40px me-1"
                                                                        data-tip=''
                                                                        data-for='editar'
                                                                    >
                                                                        <i className="fa fa-edit"></i>
                                                                    </Link>
                                                                    <ReactTooltip
                                                                        id='editar'
                                                                        place='top'
                                                                        type='success'
                                                                        effect='solid'
                                                                    >
                                                                        Editar información del usuario
                                                                    </ReactTooltip>
                                                                    <button onClick={(e) => confrimarElimnacion(e, item.idUsuario)}
                                                                        className="btn btn-sm btn-danger w-40px"
                                                                        data-tip=''
                                                                        data-for='eliminar'
                                                                    >
                                                                        <i className="fa fa-trash-alt"></i>
                                                                    </button>
                                                                    <ReactTooltip
                                                                        id='eliminar'
                                                                        place='top'
                                                                        type='error'
                                                                        effect='solid'
                                                                    >
                                                                        Eliminar registro del usuario
                                                                    </ReactTooltip>
                                                                </td>
                                                            </tr>
                                                    )
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                    }

                </div>
            </div>
        </Fragment>
    );
}

export default UsuariosAdmin;
import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../components/Header';
import SidebarAdmin from '../../components/SidebarAdmin';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import PanelHeading from '../../components/PanelHeading';
import swal from 'sweetalert';

const UsuariosAdmin = () => {
    //Definición de las variables de estado
    const [ usuarios, setUsuarios ] = useState([]);
    
    const [ busqueda, setBusqueda ] = useState('');

    const cargarUsuarios = async () => {
        const response = await APIInvoke.invokeGET(`/usuarios`);
        
        setTimeout(() => {
            setUsuarios(response.body);    
        }, 0);        
    }

    useEffect(() => {
        cargarUsuarios();
    }, []);

   
    const elimniarUsuario = async (e, idUsuario) => {  
        e.preventDefault();
        
        const response = await APIInvoke.invokeDELETE(`/usuarios/${idUsuario}`);        
        
        setTimeout(() => {
            if (response.ok === true) {            
                cargarUsuarios();
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
                swal({
                    title: 'Eliminar Usuario',
                    text: response.message,
                    icon: 'error',
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
            }    
        }, 0);        
    }
    
    const buscador = (e) => {
        setBusqueda(e.target.value)
    }

    let resultados = []

    if(!busqueda) {
        resultados = usuarios
    } else {
        resultados = usuarios.filter( 
            (dato) => dato.nombres.toLowerCase().includes(busqueda.toLocaleLowerCase())
        ) 
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
                    </ol>
                    <h1 className="page-header">Usuarios</h1>
                    <div className="row my-3">
                        <div className="col">
                            <Link to="/usuarios-crear" className="btn btn-green fs-bold me-3">Crear nuevo usuario</Link>                                                
                        </div>
                        <div className="col">                                 
                                <input type="text" className="form-control" 
                                    value={busqueda}
                                    onChange={buscador}
                                    placeholder="Ingrese palabra clave"
                                />
                        </div>                             
                    </div>                    
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
                                            <th>NOMBRES</th>
                                            <th>APELLIDOS</th>
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
                                                        <td className="text-upper">{item.nombres}</td>
                                                        <td className="text-upper">{item.apellidos}</td>
                                                        <td>{item.telefono}</td>
                                                        <td className="text-upper">{item.direccion}</td>
                                                        <td>{item.correo}</td>
                                                        <td className="text-upper">{item.idPerfil.descripcionPerfil}</td>
                                                        <td nowrap="">
                                                            <Link to={`/usuarios-editar/${item.idUsuario}`} className="btn btn-sm btn-primary w-60px me-1">Editar</Link>
                                                            <button onClick={(e) => elimniarUsuario(e, item.idUsuario)} className="btn btn-sm btn-danger w-60px">Eliminar</button>
                                                        </td>
                                                    </tr>    
                                            )
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default UsuariosAdmin;
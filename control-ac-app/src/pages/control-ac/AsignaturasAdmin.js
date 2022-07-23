import React, {Fragment, useEffect, useState} from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import APIInvoke from '../../utils/APIInvoke';
import Header from '../../components/Header';
import PanelHeading from '../../components/PanelHeading';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const AsignaturasAdmin = () => {
    const [ asignaturas, setAsignaturas ] = useState([]);

    const cargarAsignaturas = async () => {           
        const response = await APIInvoke.invokeGET(`/asignaturas-activas`);            
        setAsignaturas(response.body);
    }
    
    useEffect(() => {        
        cargarAsignaturas();
    }, [])    
    
    const confirmarEliminacion = (e, idAsignatura) => {
        e.preventDefault();
        swal({
            title: 'Eliminar Asignatura',
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
                eliminarAsignatura(idAsignatura);
            }
        });
    }

    const eliminarAsignatura = async (idAsignatura) => {
        //const response = await APIInvoke.invokeDELETE(`/asignaturas/${idAsignatura}`);
        const response = await APIInvoke.invokePUT(`/asignaturas/${idAsignatura}`);
        setTimeout(() => {
            if (response.ok === true) {
                cargarAsignaturas();
                swal({
                    title: 'Eliminar Asignatura',
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
                    title: 'Eliminar Asignatura',
                    text: '!! Ocurrió un error al intentar eliminar el registro ¡¡',
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
        }, 0);        
    }    

    const [busqueda, setBusqueda] = useState('');
    const buscador = (e) => {        
        setBusqueda(e.target.value)
    }

    let resultados = []

    if (!busqueda) {
        resultados = asignaturas
    } else { 
        resultados = asignaturas.filter(            
            (dato) => (dato.descripcionAsignatura).toLowerCase().includes(busqueda.toLocaleLowerCase())
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
                        <li className="breadcrumb-item active">Asignaturas</li>
                    </ol>
                    <h1 className="page-header">Asignaturas</h1>
                    <div className='col-6 offset-3'>
                        <div className="row mb-2">
                            <div className="col-4">
                                <Link to="/asignaturas-crear" className="btn btn-green fs-bold me-3">Crear Asignatura</Link>
                            </div>                            
                            <div className="col-8">
                                <div className="input-group">
                                    <label class="input-group-text" id="filtrar">Filtrar:</label>
                                    <input type="text" className="form-control"
                                        value={busqueda}
                                        onChange={buscador}
                                        placeholder="Ingrese palabra clave en Descripción"
                                    />
                                </div>
                            </div>
                        </div>
                    
                    
                        <div className="panel panel-inverse" data-sortable-id="lstAlumnos">
                            <PanelHeading
                                titulo={"Listado de Asignaturas"}
                            />
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <table className="table table-striped mb-0 align-middle">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>DESCRIPCIÓN</th>                                                                                        
                                                <th width="1%">ACCIONES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                resultados.map(
                                                    item =>
                                                    <tr key={item.idAsignatura}>
                                                        <td>{item.idAsignatura}</td>                                                    
                                                        <td>{item.descripcionAsignatura}</td>                                                    
                                                        <td nowrap="">
                                                            <Link to={`/asignaturas-editar/${item.idAsignatura}`} className="btn btn-sm btn-primary w-70px me-1">Editar</Link>
                                                            <button onClick={(e) => confirmarEliminacion(e, item.idAsignatura)} className="btn btn-sm btn-danger w-70px">Eliminar</button>
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
            </div>
        </Fragment>
    );
}
 
export default AsignaturasAdmin;
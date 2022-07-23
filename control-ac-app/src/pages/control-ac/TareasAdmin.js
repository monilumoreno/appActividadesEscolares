import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarDocte from '../../components/SidebarDocte';
import APIInvoke from '../../utils/APIInvoke';
import PanelHeading from '../../components/PanelHeading';
import swal from 'sweetalert';

const TareasAdmin = () => {

   
    //Define un estado para consumir el servicio
    const [ tareas, setTareas ] = useState([]);
    const [ cursos, setCursos ] = useState([]);
    const [ asignaturas, setAsignaturas ] = useState([]);
    const [ busqueda, setBusqueda] = useState('');
    
    const [ paramsRequest, setParamsRequest ] = useState({
        idCurso: 0,
        idAsignatura: 0,
        idDocente: localStorage.idUsuario,
    })
    const { idCurso, idAsignatura, idDocente } = paramsRequest;

    const cargarCursos = async () => {
        
        const response = await APIInvoke.invokeGET(`/cursos-activos`);
        setTimeout(() => {
            const temporal = response.body;
            temporal.unshift({
                idCurso: 0,
                descripcionCurso: 'Todos',
                estado: 'A'
            })
            setCursos(temporal);
        }, 0);
    }    

    //Método para consumir el servicio
    const cargarAsignaturas = async () => {
        //const response = await APIInvoke.invokeGET(`/asignaturas`);
        const response = await APIInvoke.invokeGET(`/asignaturas-activas`);
        setTimeout(() => {
            const temporal = response.body;
            temporal.unshift({
                idAsignatura: 0,
                descripcionAsignatura: 'Todas',
                estado: 'A'
            })
            setAsignaturas(temporal);
        }, 0);
    }

    const cargarTareas = async () => {
        //const response = await APIInvoke.invokeGET(`/tareas-docente/${idDocente}`);        
        //const response = await APIInvoke.invokeGET('/tareas');        
        const response = await APIInvoke.invokeGET('/tareas-activas');        
        setTimeout(() => {
            if (response.body.length > 0) {                
                    setTareas(response.body);                    
            } else {
                swal({
                    title: 'Información',
                    text: 'No hay tareas registradas',
                    icon: 'info',
                    buttons: {
                        confirm: {
                            text: 'Aceptar',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                })                   
                //navigate('/homedocente');
            }   
        }, 0);                 
    }

    const onChange = (e) => {
        setParamsRequest({
            ...paramsRequest,
            [e.target.name]: e.target.value
        })
    }

    const buscarTareas = async () => {
        
        const response = await APIInvoke.invokePOST(`/tareas-request`, paramsRequest);
        
        setTimeout(() => {
            if (response.ok === true) {
                if (response.body.length === 0) {
                    swal({
                        title: 'Información',
                        text: 'No hay tareas registradas para los criterios de búsqueda',
                        icon: 'info',
                        buttons: {
                            confirm: {
                                text: 'Aceptar',
                                value: true,
                                visible: true,
                                className: 'btn btn-primary',
                                closeModal: true
                            }
                        }
                    })                    
                    cargarTareas();
                } else {
                    setTareas(response.body)                    
                }            
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
        }, 0);     
        
    }

    const confirmarElimninacion = (e, idTarea) => {
        e.preventDefault();        
        swal({
            title: 'Eliminar Actividad',
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
                elimniarActividad(idTarea);
            }
        });
    }

    const elimniarActividad = async (idTarea) => {        
        //const response = await APIInvoke.invokeDELETE(`/tareas/${idTarea}`);
        const response = await APIInvoke.invokePUT(`/tareas/${idTarea}`);
        setTimeout(() => {
            if (response.ok === true) {                
                cargarTareas();
                swal({
                    title: 'Eliminar Actividad',
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
                    title: 'Eliminar Actividad',
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

    useEffect(() => {
        cargarCursos();
        cargarAsignaturas();        
        //cargarTareas();
        buscarTareas();
    }, []);

    const buscador = (e) => {        
        setBusqueda(e.target.value)
    }

    let resultados = []

    if (!busqueda) {
        resultados = tareas
    } else { 
        resultados = tareas.filter(            
            (dato) => (dato.descripcionTarea).toLowerCase().includes(busqueda.toLocaleLowerCase())
        )
    }

    return (
        <Fragment> 
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarDocte />
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end"> 
                        <li className="breadcrumb-item"><Link to="/homedocente">Inicio</Link></li>								                       
                        <li className="breadcrumb-item active">Admin Actividades</li>
                    </ol>
                    <h1 className="page-header">Actividades</h1>
                    <div className="row mb-2">
                        <div className="col-2">
                            <Link to="/tareas-crear" className="btn btn-green fs-bold me-3">Crear Actividad</Link>
                        </div>                        
                        <div className="col">   
                                <div className="input-group">
                                        <label class="input-group-text" id="idCurso">Curso:</label>
                                        <select className="form-select"
                                            id="idCurso"
                                            name="idCurso"
                                            style={{ cursor: 'pointer' }}
                                            value={idCurso}
                                            onChange={onChange}
                                            required
                                        >
                                            {
                                                cursos.map(
                                                    item =>
                                                        <option key={item.idCurso} value={item.idCurso}>{item.descripcionCurso}</option>
                                                )
                                            }
                                        </select>
                                        <label class="input-group-text" id="idAsignatura">Asignatura:</label>
                                        <select className="form-select"
                                            id="idAsignatura"
                                            name="idAsignatura"
                                            style={{ cursor: 'pointer' }}
                                            value={idAsignatura}
                                            onChange={onChange}
                                            required
                                        >
                                            {
                                                asignaturas.map(
                                                    item =>
                                                        <option key={item.idAsignatura} value={item.idAsignatura}>{item.descripcionAsignatura}</option>
                                                )
                                            }
                                        </select>
                                        <button onClick={buscarTareas} type="submit" class="btn btn-search"><i class="fa fa-search"></i></button>
                                    </div>
                        </div>
                        <div className="col-4">
                            <div className="input-group">
                                <label class="input-group-text" id="filtrar">Filtrar:</label>
                                <input type="text" className="form-control"
                                    value={busqueda}
                                    onChange={buscador}
                                    placeholder="Ingrese palabra clave de la Descripción"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-inverse" data-sortable-id="lstTareas">
                        <PanelHeading
                            titulo={"Listado de Actividades"}
                        />
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-striped mb-0 align-middle">
                                    <thead>
                                        <tr>
                                            <th>ID.</th>
                                            <th>DESCRIPCIÓN</th>
                                            <th>FECHA CREACIÓN</th>                                            
                                            <th>FECHA ENTREGA</th>
                                            <th>ASIGNATURA</th>
                                            <th>CURSO</th>                                            
                                            <th width="1%">ACCIONES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            resultados.map(
                                                item =>
                                                <tr key={item.idTarea}>
                                                    <td>{item.idTarea}</td>
                                                    <td>{item.descripcionTarea}</td>
                                                    <td>{item.fechaCreacion}</td>
                                                    <td>{item.fechaEntrega}</td>
                                                    <td>{item.idAsignatura.descripcionAsignatura}</td>
                                                    <td>{item.idCurso.descripcionCurso}</td>                                                    
                                                    <td nowrap="">
                                                        <Link to={`/tareas-detalle/${item.idTarea}`} className="btn btn-sm btn-primary w-40px me-1">
                                                            <i className="fa fa-check-square"></i>
                                                        </Link>
                                                        <Link to={`/tareas-editar/${item.idTarea}`} className="btn btn-sm btn-success w-40px me-1">
                                                            <i className="fa fa-edit"></i>
                                                        </Link>
                                                        <button onClick={(e) => confirmarElimninacion(e, item.idTarea)} className="btn btn-sm btn-danger w-40px">
                                                            <i className="fa fa-trash-alt"></i>
                                                        </button>
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
 
export default TareasAdmin;
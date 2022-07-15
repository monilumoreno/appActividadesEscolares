import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarDocte from '../../components/SidebarDocte';
import APIInvoke from '../../utils/APIInvoke';
import PanelHeading from '../../components/PanelHeading';
import swal from 'sweetalert';

const TareasAdmin = () => {

    //Recupera del almacenamieto del navegador el ID del docente
    const idDocente = localStorage.idUsuario;
    const navigate = useNavigate();

    //Define un estado para consumir el servicio
    const [ tareas, setTareas ] = useState([]);
    const [ cursos, setCursos ] = useState([]);
    const [ asignaturas, setAsignaturas ] = useState([]);
    const [ busqueda, setBusqueda] = useState('');
    const [ idCurso, setIdCurso ] = useState('0');
    const [ idAsignatura, setIdAsignatura ] = useState('0');

    const cargarCursos = async () => {
        const response = await APIInvoke.invokeGET(`/cursos`);
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
        const response = await APIInvoke.invokeGET(`/asignaturas`);
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
        const response = await APIInvoke.invokeGET(`/tareas-docente/${idDocente}`);        
        if (response.body.length > 0) {
            setTimeout(() => {
                setTareas(response.body);    
            }, 0);            
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
            navigate('/homedocente');
        }        
    }

    const buscarTareas = async () => {
        const data = {
            idCurso: idCurso,
            idAsignatura: idAsignatura,
            idDocente: idDocente       
        }

        const response = await APIInvoke.invokePOST(`/tareas-request`, data);

        if (response.ok === true) {
            if (response.body.length === 0) {
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
    }

    const confrimar = (e, idTarea) => {
        alert(idTarea);
    }

    useEffect(() => {
        cargarTareas();
        cargarCursos();
        cargarAsignaturas();        
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
                        <li className="breadcrumb-item active">Inicio</li>
                    </ol>
                    <h1 className="page-header">Tareas</h1>
                    <div className="row mb-2">
                        <div className="col-2">
                            <Link to="/tareas-crear" className="btn btn-green fs-bold me-3">Crear nueva tarea</Link>
                        </div>                        
                        <div className="col">                            
                            
                                <div className="input-group">
                                        <label class="input-group-text" id="idCurso">Curso:</label>
                                        <select className="form-select"
                                            id="idCurso"
                                            name="idCurso"
                                            style={{ cursor: 'pointer' }}
                                            value={idCurso}
                                            onChange={(e) => {setIdCurso(e.target.value)}} 
                                            required
                                        >
                                            {
                                                cursos.map(
                                                    item =>
                                                        <option key={item.idCurso} value={item.idCurso}>{item.descripcionCurso}</option>
                                                )
                                            }
                                        </select>

                                        <label class="input-group-text" id="asignatura">Asignatura:</label>
                                        <select className="form-select"
                                            id="idAignatura"
                                            name="idAignatura"
                                            style={{ cursor: 'pointer' }}
                                            value={idAsignatura}
                                            onChange={(e) => {setIdAsignatura(e.target.value)}} 
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
                                    placeholder="Ingrese palabra clave"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-inverse" data-sortable-id="listaUsuarios">
                        <PanelHeading
                            titulo={"Listado de Tareas"}
                        />
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-striped mb-0 align-middle">
                                    <thead>
                                        <tr>                                            
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
                                                    <tr key={item.idTarea} className="text-upper">
                                                        <td>{item.descripcionTarea}</td>
                                                        <td>{item.fechaCreacion}</td>                                                        
                                                        <td>{item.fechaEntrega}</td>
                                                        <td>{item.idAsignatura.descripcionAsignatura}</td>                                                        
                                                        <td>{item.idCurso.descripcionCurso}</td>
                                                        <td nowrap="">
                                                            <Link to={`/tareas-detalle/${item.idTarea}`} className="btn btn-sm btn-primary w-60px me-1">Revisar</Link>
                                                            <button onClick='' className="btn btn-sm btn-danger w-60px">Eliminar</button>
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
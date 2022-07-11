import React, { Fragment, useState, useEffect } from 'react';
import Header from '../../components/Header';
import SidebarDocte from '../../components/SidebarDocte';
import { Link } from 'react-router-dom';
import APIInvoke from '../../utils/APIInvoke';
import PanelHeading from '../../components/PanelHeading';
import swal from 'sweetalert';

const TareasAdmin = () => {

    //Recupera del almacenamieto del navegador el ID del docente
    const idDocente = localStorage.idUsuario;
    
    //Definición de las variables de estado y la función que las actualizan o alteran
    const [ tareas, setTareas ] = useState([]);
    const [ cursos, setCursos ] = useState([]);
    const [ asignaturas, setAsignaturas ] = useState([]);
    
    //Extracción de las variables para poder utilizarlas
    const { idAsignatura } = asignaturas;
    const { idCurso } = cursos;
    

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
        setTimeout(() => {
            setTareas(response.body);
        }, 0);        
    }

    const onChange = (e) => {        
    }

    useEffect(() => {
        cargarCursos();
        cargarAsignaturas();
        //cargarTareas();
    }, []);
    

    // Define un estado para guardar la palabra clave para la búsqueda
    const [busqueda, setBusqueda] = useState('');

    //Captura los valores que se digitan en la caja de búsqueda
    const buscador = (e) => {
        //Actualiza el estado busqueda con el valor que guarda la caja de texto
        setBusqueda(e.target.value)
    }

    let resultados = []

    if (!busqueda) {
        resultados = tareas
    } else { //Si el usuario ingresa datos
        //filter crea un nuevo array y lo devuelve con todos los elementos
        //que cumplan una condición
        //includes determina si un array incluye un elemento. Retorna true o false
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
                    <div className="row my-2">
                        <div className="col">
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
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group">
                                <label class="input-group-text" id="asignatura">Asignatura:</label>
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
                            </div>
                        </div>
                        <div className="col">
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
                                            <th>TAREA ID.</th>
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
                                                    <tr key={item.idAsignatura} className="text-upper">
                                                        <td>{item.idAsignatura}</td>
                                                        <td>{item.descripcionAsignatura}</td>
                                                        <td>{item.fechaCreacion}</td>                                                        
                                                        <td>{item.fechaEntrega}</td>
                                                        <td>{item.idAsignatura.descripcionAsignatura}</td>                                                        
                                                        <td>{item.idCurso.descripcionCurso}</td>
                                                        <td nowrap="">
                                                            <Link to={`/usuarios-editar/${item.idUsuario}`} className="btn btn-sm btn-primary w-60px me-1">Editar</Link>
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
import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import SidebarActe from '../../components/SidebarActe';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const TareasListaAcu = () => {

    const { idalumno } = useParams();
    const navigate = useNavigate();

    const [tareas, setTareas] = useState([]);

    const cargarTareas = async () => {
        const response = await APIInvoke.invokeGET(`/lista-por-alumno/${idalumno}`);
        
            if (response.body.length > 0) {
                setTareas(response.body);
            } else {
                swal({
                    title: 'Información',
                    text: 'No tiene tareas registradas',
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
                setTimeout(() => {
                    navigate('/alumnos-listar');
                }, 200);
                
            }
        
    }

    useEffect(() => {
        cargarTareas();
    }, [])

    const [ busqueda, setBusqueda] = useState('');
    const buscador = (e) => {        
        setBusqueda(e.target.value)
    }

    let resultados = []

    if (!busqueda) {
        resultados = tareas
    } else { 
        resultados = tareas.filter(            
            (dato) => (dato.idTarea.descripcionTarea).toLowerCase().includes(busqueda.toLocaleLowerCase())
        )
    }

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarActe></SidebarActe>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homeacudiente">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to="/alumnos-listar">Alumnos</Link></li>
                        <li className="breadcrumb-item active">Lista</li>
                    </ol>
                    <h1 className="page-header">Actividades</h1>
                    <div className='row mb-2'>
                        <div className='col-7'></div>                        
                        <div className='col-5'>
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
                    <div className="panel panel-inverse" data-sortable-id="listaActividades">
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
                                            <th>FECHA LÍMITE</th>
                                            <th>ESTADO</th>
                                            <th>CALIFICACIÓN</th>
                                            <th>OBSERVACIONES</th>
                                            <th>ASIGNATURA</th>
                                            <th>DOCENTE</th>                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            resultados.map(
                                                item =>
                                                    <tr key={item.idRelTareaAlumno}>
                                                        <td>{item.idTarea.idTarea}</td>
                                                        <td>{item.idTarea.descripcionTarea}</td>
                                                        <td>{item.idTarea.fechaCreacion}</td>
                                                        <td>{item.idTarea.fechaEntrega}</td>
                                                        <td>{item.descripcion}</td>
                                                        <td>{item.calificacion}</td>
                                                        <td>{item.observaciones}</td>
                                                        <td>{item.idTarea.idAsignatura.descripcionAsignatura}</td>
                                                        <td>{`${item.idTarea.idDocente.nombres} ${item.idTarea.idDocente.apellidos}`}</td>                                                        
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
    )
}

export default TareasListaAcu
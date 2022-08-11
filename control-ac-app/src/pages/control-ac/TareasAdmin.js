import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarDocte from '../../components/SidebarDocte';
import PanelHeading from '../../components/PanelHeading';
import Spinner from '../../components/Spinner';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import ReactTooltip from 'react-tooltip';
import ErrorAlert from '../../utils/ErrorAlert';

const TareasAdmin = () => {

    //Define un estado para consumir el servicio
    const [tareas, setTareas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(false);

    const [paramsRequest, setParamsRequest] = useState({
        idCurso: 0,
        idAsignatura: 0,
        idDocente: localStorage.idUsuario,
        fechaEntrega: null,
    })

    const { idCurso, idAsignatura, idDocente, fechaEntrega } = paramsRequest;

    useEffect(() => {
        cargarCursos();
        cargarAsignaturas();
        cargarTareas();
    }, []);

    const onChange = (e) => {
        setParamsRequest({
            ...paramsRequest,
            [e.target.name]: e.target.value
        })
    }

    const cargarCursos = async () => {
        try {
            const response = await APIInvoke.invokeGET(`/cursos-activos`);
            if (response.ok) {
                const temporal = response.body;
                temporal.unshift({
                    idCurso: 0,
                    descripcionCurso: 'Todos',
                    estado: 'A'
                })
                setCursos(temporal);
            }
        } catch (error) {
            console.log(error);
            ErrorAlert.showAlert("Error al cargar los cursos");
        }
    }

    //Método para consumir el servicio
    const cargarAsignaturas = async () => {
        try {
            const response = await APIInvoke.invokeGET(`/asignaturas-activas`);
            const temporal = response.body;
            temporal.unshift({
                idAsignatura: 0,
                descripcionAsignatura: 'Todas',
                estado: 'A'
            })
            setAsignaturas(temporal);

        } catch (error) {
            console.log(error);
            ErrorAlert.showAlert("Error al cargar las asignaturas");
        }
    }

    const cargarTareas = async () => {
        setLoading(true);
        try {
            const response = await APIInvoke.invokeGET(`/tareas-docente/${idDocente}`);
            if (response.ok) {
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
                }
            } else {
                ErrorAlert.showAlert(response.message);
            }
        } catch (error) {
            console.log(error);
            ErrorAlert.showAlert("Error al conectar con el servidor");
        }
        setLoading(false);
    }

    const buscarTareas = async () => {
        setLoading(false);
        try {
            const response = await APIInvoke.invokePOST(`/tareas-request`, paramsRequest);
            if (response.ok) {
                if (response.body.length > 0) {
                    setTareas(response.body)
                } else {
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
                    });
                    cargarTareas();
                }
            } else {
                ErrorAlert.showAlert(response.message);
            }
        } catch (error) {
            console.log(error);
            ErrorAlert.showAlert("Error al conectar con el servidor");
        }
        setLoading(false);
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
        try {
            const response = await APIInvoke.invokePUT(`/tareas/${idTarea}`);
            if (response.ok) {
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
                ErrorAlert.showAlert(response.message);
            }
        } catch (error) {
            console.log(error);
            ErrorAlert.showAlert("Error al conectar con el servidor");
        }
    }

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

    const reset = ()  => {
        setParamsRequest({
            idCurso: 0,
            idAsignatura: 0,
            idDocente: localStorage.idUsuario,
            fechaEntrega: '',
        })
    }

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarDocte />
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homedocente">Inicio</Link></li>
                        <li className="breadcrumb-item active">Actividades</li>
                    </ol>
                    <h1 className="page-header">Actividades</h1>
                    <div className="row mb-2">                        
                        <div className="col-2">                        
                            <div className="input-group">
                                <label class="input-group-text" id="idCurso">Curso:</label>
                                <select className="form-select"
                                    id="idCurso"
                                    name="idCurso"
                                    style={{ cursor: 'pointer' }}
                                    value={idCurso}
                                    onChange={onChange}                                    
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
                        <div className="col-3">                        
                            <div className="input-group">
                                <label class="input-group-text" id="idAsignatura">Asignatura:</label>
                                <select className="form-select"
                                    id="idAsignatura"
                                    name="idAsignatura"
                                    style={{ cursor: 'pointer' }}
                                    value={idAsignatura}
                                    onChange={onChange}                                    
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
                        <div className="col-4">                        
                            <div className="input-group">
                                <label class="input-group-text" id="fechaEntrega">F. Entrega:</label>
                                <input type="date" className="form-control"
                                    id="fechaEntrega"
                                    name="fechaEntrega"                                    
                                    value={fechaEntrega}
                                    onChange={onChange}                                    
                                />
                                <button onClick={buscarTareas} type="submit" class="btn btn-search"><i class="fa fa-search"></i></button>
                                <button onClick={reset} type="submit" class="btn btn-search ms-1">Limpiar</button>                                
                            </div>                                
                        </div>
                        <div className="col-3">
                            <div className="input-group">
                                <label class="input-group-text" id="filtrar">Filtrar:</label>
                                <input type="text" className="form-control"
                                    value={busqueda}
                                    onChange={buscador}
                                    placeholder="Por Descripción"
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
                            <div className="panel panel-inverse" data-sortable-id="lstTareas">
                                <PanelHeading
                                    titulo={"Listado de Actividades"}
                                />
                                <div className="panel-body">
                                    <div className="col">                            
                                        <Link to="/tareas-crear" className="btn btn-green fs-bold me-3">Crear Actividad</Link>
                                    </div>
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
                                                                    <Link to={`/tareas-detalle/${item.idTarea}`}
                                                                        className="btn btn-sm btn-primary w-40px me-1"
                                                                        data-tip='tooltip' data-for='revisar'
                                                                    >
                                                                        <i className="fa fa-list-alt"></i>
                                                                    </Link>
                                                                    <ReactTooltip
                                                                        id='revisar'
                                                                        place='top'
                                                                        type='info'
                                                                        effect='solid'
                                                                    >
                                                                        Revisar Actividad
                                                                    </ReactTooltip>
                                                                    <Link to={`/tareas-editar/${item.idTarea}`}
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
                                                                        Editar Actividad
                                                                    </ReactTooltip>
                                                                    <button onClick={(e) => confirmarElimninacion(e, item.idTarea)}
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
                                                                        Eliminar Actividad
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

export default TareasAdmin;
import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../../components/Header';
import SidebarActe from '../../components/SidebarActe';
import PanelHeading from '../../components/PanelHeading';
import Spinner from '../../components/Spinner';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import ErrorAlert from '../../utils/ErrorAlert';

const TareasListaAcu = () => {

    
    const { idalumno } = useParams();
    const [tareas, setTareas] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(false);

    const [paramsRequest, setParamsRequest] = useState({
        idAsignatura: 0,
        idAlumno: idalumno,
        fechaEntrega: null,
    })

    const { idAsignatura, fechaEntrega } = paramsRequest;

    useEffect(() => {
        cargarAsignaturas();
        cargarTareas();
    }, []);

    const onChange = (e) => {
        setParamsRequest({
            ...paramsRequest,
            [e.target.name]: e.target.value
        })
    }

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
            //const response = await APIInvoke.invokeGET(`/lista-por-alumno/${idalumno}`);
            const response = await APIInvoke.invokePOST('/lista-por-alumno', paramsRequest);
            if (response.ok) {
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

    const reset = ()  => {
        setParamsRequest({
            idAsignatura: 0,
            idAlumno: idalumno,
            fechaEntrega: '',
        })
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
                        <div className="col-4">
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
                                <button onClick={cargarTareas} type="submit" class="btn btn-search"><i class="fa fa-search"></i></button>
                                <button onClick={reset} type="submit" class="btn btn-search ms-1">Limpiar</button>
                            </div>
                        </div>
                        <div className='col-4'>
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
                    {
                        loading
                            ?
                            <div className="col-lg-2 offset-5">
                                <Spinner />
                            </div>
                            :
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
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default TareasListaAcu
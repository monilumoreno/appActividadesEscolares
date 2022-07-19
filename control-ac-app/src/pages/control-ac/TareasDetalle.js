import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarDocte from '../../components/SidebarDocte';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';

const TareasDetalle = () => {

    const { idtarea } = useParams();
    const [ busqueda, setBusqueda] = useState('');
    
    const [tarea, setTarea] = useState({
        idTarea: '',
        descripcionTarea: '',
        fechaCreacion: '',
        fechaEntrega: '',
        asignatura: '',
        curso: ''
    })

    const { idTarea, descripcionTarea, fechaCreacion, fechaEntrega, asignatura, curso } = tarea;

    const findTarea = async () => {
        const response = await APIInvoke.invokeGET(`/tareas/${idtarea}`);

        setTimeout(() => {

            if (response.ok === true) {
                setTarea({
                    idTarea: response.body.idTarea,
                    descripcionTarea: response.body.descripcionTarea,
                    fechaCreacion: response.body.fechaCreacion,
                    fechaEntrega: response.body.fechaEntrega,
                    asignatura: response.body.idAsignatura.descripcionAsignatura,
                    curso: response.body.idCurso.descripcionCurso
                })
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

    const [relTareasAlumno, setRelTareasAlumno] = useState([]);
    //await: indica que se debe esperar a que termine el proceso antes de utilizar
    //       la constante response.
    const cargarRelTareasAlumno = async () => {
        const response = await APIInvoke.invokeGET(`/alumnos-tareas-lista/${idtarea}`);
        setTimeout(() => {
            setRelTareasAlumno(response.body)
        }, 0);

    }   

    useEffect(() => {
        findTarea();
        cargarRelTareasAlumno();
    }, [])

    const buscador = (e) => {        
        setBusqueda(e.target.value)
    }

    let resultados = []

    if (!busqueda) {
        resultados = relTareasAlumno
    } else { 
        resultados = relTareasAlumno.filter(            
            (dato) => (`${dato.idAlumno.nombres} ${dato.idAlumno.apellidos}`).toLowerCase().includes(busqueda.toLocaleLowerCase())
        )
    }


    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarDocte></SidebarDocte>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homedocente">Inicio</Link></li>
                        <li className="breadcrumb-item"><Link to="/tareas">Actividades</Link></li>
                        <li className="breadcrumb-item active">Revisar</li>
                    </ol>
                    <h1 className="page-header">Actividades</h1>
                    <div className="panel panel-inverse col-lg-6 offset-3" id="">
                        <PanelHeading
                            titulo={"Detalles tarea"}
                        />
                        <div className="panel-body">
                            <div className="row" id="">
                                <div className="col-4">
                                    <h5 className="mb-1">Curso:</h5>
                                    <h5 className="mb-1">Asignatura:</h5>
                                    <h5 className="mb-1">Id. tarea:</h5>
                                    <h5 className="mb-1">Descripción:</h5>
                                    <h5 className="mb-1">Fecha de creación:</h5>
                                    <h5 className="mb-1">Fecha de entrega:</h5>
                                </div>
                                <div className="col-8">
                                    <h5 className="mb-1">{curso}</h5>
                                    <h5 className="mb-1">{asignatura}</h5>
                                    <h5 className="mb-1">{idTarea}</h5>
                                    <h5 className="mb-1">{descripcionTarea}</h5>
                                    <h5 className="mb-1">{fechaCreacion}</h5>
                                    <h5 className="mb-1">{fechaEntrega}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-5'>
                            <div className="input-group">
                                <label class="input-group-text" id="filtrar">Filtrar:</label>
                                <input type="text" className="form-control"
                                        value={busqueda}
                                        onChange={buscador}
                                        placeholder="Ingrese palabra clave para filtrar por nombre"
                                />
                            </div>
                        </div>                        
                    </div>
                    <div className="panel panel-inverse" data-sortable-id="listaUsuarios">
                        <PanelHeading
                            titulo={"Listado de Alumnos"}
                        />
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-striped mb-0 align-middle">
                                    <thead>
                                        <tr>
                                            <th>ID. ALUMNO</th>
                                            <th>NOMBRE</th>
                                            <th>ESTADO TAREA</th>
                                            <th>CALIFICACIÓN</th>
                                            <th>OBSERVACIONES</th>
                                            <th width="1%">ACCIÓN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            resultados.map(
                                                item =>
                                                    <tr key={item.idRelTareaAlumno}>
                                                        <td>{item.idAlumno.numeroDocumento}</td>
                                                        <td className="text-upper">
                                                            {`${item.idAlumno.nombres} ${item.idAlumno.apellidos}`}
                                                        </td>
                                                        <td className="text-upper">{item.descripcion}</td>
                                                        <td>{item.calificacion}</td>
                                                        <td className="text-upper">{item.observaciones}</td>
                                                        <td nowrap="">
                                                            <Link to={`/tareas-calificar/${item.idRelTareaAlumno}`} className="btn btn-sm btn-primary w-70px me-1">Calificar</Link>                                                            
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

export default TareasDetalle;
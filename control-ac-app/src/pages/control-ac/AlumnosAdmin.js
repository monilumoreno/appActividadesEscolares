import React, { Fragment, useEffect, useState } from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import APIInvoke from '../../utils/APIInvoke';
import Header from '../../components/Header';
import PanelHeading from '../../components/PanelHeading';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import ReactTooltip from 'react-tooltip';
import ErrorAlert from '../../utils/ErrorAlert';

const AlumnosAdmin = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        cargarCursos();
        cargarAlumnos();
    }, []);

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

    const cargarAlumnos = async (idCurso) => {
        setLoading(true);  
        try {            
            let response
            if (idCurso  && idCurso > 0) {
                response = await APIInvoke.invokeGET(`/alumnos-curso/${idCurso}`);                                                
            } else {                
                response = await APIInvoke.invokeGET(`/alumnos-activos`);                
            }

            if (response.ok) {
                setAlumnos(response.body);
                setLoading(false);    
            }
        } catch (error) {
            console.log(error);            
            ErrorAlert.showAlert("Error al cargar los alumnos");
            setLoading(false);
        }  
    }

    const confirmarEliminacion = (e, idAlumno) => {
        e.preventDefault();
        swal({
            title: 'Eliminar Alumno',
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
                elimniarAlumno(idAlumno);
            }
        });
    }

    const elimniarAlumno = async (idAlumno) => {

        try {
            const response = await APIInvoke.invokePUT(`/alumnos/${idAlumno}`);            
            if (response.ok) {                
                swal({
                    title: 'Eliminar Alumno',
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
                cargarAlumnos(document.getElementById('idCurso').value);
            }
            else {
                ErrorAlert.showAlert(response.message);
            }
        } catch (error) {
            console.log(error);            
            ErrorAlert.showAlert("Error al eliminar el alumno");
            setLoading(false);
        } 
    }

    const onChange = (e) => {
        cargarAlumnos(e.target.value)
    }

    const buscador = (e) => {
        setBusqueda(e.target.value)
    }

    let resultados = []

    if (!busqueda) {
        resultados = alumnos
    } else {
        resultados = alumnos.filter(
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
                        <li className="breadcrumb-item active">Alumnos</li>
                    </ol>
                    <h1 className="page-header">Alumnos</h1>                    
                    <div className="row my-3">
                        <div className="col-4">
                            <Link to="/alumnos-crear" className="btn btn-green fs-bold me-3">Crear Alumno</Link>
                        </div>
                        <div className="col-3">                        
                            <div className="input-group">
                                <label class="input-group-text" id="curso">Curso:</label>
                                <select className="form-select"
                                    id="idCurso"
                                    name="idCurso"
                                    style={{ cursor: 'pointer' }}
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
                            <div className="panel panel-inverse" data-sortable-id="lstAlumnos">
                                <PanelHeading
                                    titulo={"Listado de Alumnos"}
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
                                                    <th>CURSO</th>
                                                    <th>ACUDIENTE</th>
                                                    <th width="1%">ACCIONES</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    resultados.map(
                                                        item =>
                                                            <tr key={item.idAlumno}>
                                                                <td>{item.numeroDocumento}</td>
                                                                <td>{`${item.nombres} ${item.apellidos}`}</td>
                                                                <td>{item.telefono}</td>
                                                                <td>{item.direccion}</td>
                                                                <td>{item.correo}</td>
                                                                <td>{item.idCurso.descripcionCurso}</td>
                                                                <td>{`${item.idAcudiente.nombres} ${item.idAcudiente.apellidos}`}</td>
                                                                <td nowrap="">
                                                                    <Link to={`/alumnos-editar/${item.idAlumno}`}
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
                                                                        Editar información del alumno
                                                                    </ReactTooltip>
                                                                    <button onClick={(e) => confirmarEliminacion(e, item.idAlumno)}
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
                                                                        Eliminar registro del alumno
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

export default AlumnosAdmin;
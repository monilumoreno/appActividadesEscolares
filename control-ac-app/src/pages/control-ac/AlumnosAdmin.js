import React, {Fragment, useEffect, useState} from 'react'
import SidebarAdmin from '../../components/SidebarAdmin';
import APIInvoke from '../../utils/APIInvoke';
import Header from '../../components/Header';
import PanelHeading from '../../components/PanelHeading';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const AlumnosAdmin = () => {

    const [ alumnos, setAlumnos ] = useState([]);
    const [ cursos, setCursos ] = useState([]);
    const { idCurso } = cursos;
    const [ busqueda, setBusqueda] = useState('');

    const cargarAlumnos = async (idCurso) => {
        let response
        if (idCurso === 0) {
            response = await APIInvoke.invokeGET(`/alumnos`);    
        } else {
            response = await APIInvoke.invokeGET(`/alumnos-curso/${idCurso}`);
        }
        setTimeout(() => {
            setAlumnos(response.body);    
        }, 0);        
    }

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

    const onChange = (e) => {        
        cargarAlumnos(document.getElementById('idCurso').value);        
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
        const response = await APIInvoke.invokeDELETE(`/alumnos/${idAlumno}`);
        setTimeout(() => {
            if (response.ok === true) {
                cargarAlumnos(document.getElementById('idCurso').value);
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
            } else {
                swal({
                    title: 'Eliminar Alumno',
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
        cargarAlumnos(0);
    }, []);

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
                        <li className="breadcrumb-item active"><Link to="">Alumnos</Link></li>
                    </ol>
                    <h1 className="page-header">Alumnos</h1>
                    <div className="row my-3">
                        <div className="col-4">
                            <Link to="/alumnos-crear" className="btn btn-green fs-bold me-3">Crear nuevo alumno</Link>
                        </div>
                        <div className="col-3">
                            <div className="input-group">
                                <label class="input-group-text" id="curso">Curso:</label>
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
                    <div className="panel panel-inverse" data-sortable-id="listaUsuarios">
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
                                                        <Link to={`/alumnos-editar/${item.idAlumno}`} className="btn btn-sm btn-primary w-60px me-1">Editar</Link>
                                                        <button onClick={(e) => confirmarEliminacion(e, item.idAlumno)} className="btn btn-sm btn-danger w-60px">Eliminar</button>
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

export default AlumnosAdmin;
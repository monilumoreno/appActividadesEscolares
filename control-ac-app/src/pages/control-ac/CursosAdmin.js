import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarAdmin from '../../components/SidebarAdmin';
import Spinner from '../../components/Spinner';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';
import ReactTooltip from 'react-tooltip';
import swal from 'sweetalert';
import ErrorAlert from '../../utils/ErrorAlert';

const CursosAdmin = () => {

    const [cursos, setCursos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarCursos();
    }, []);

    const cargarCursos = async () => {
        setLoading(true);
        try {
            const response = await APIInvoke.invokeGET(`/cursos-activos`);
            setCursos(response.body);    
        } catch (error) {
            console.log(error);
            ErrorAlert.showAlert("Error al conectar con el servidor");
        }        
        setLoading(false);
    }

    const confirmarElimninacion = (e, idCurso) => {
        e.preventDefault();
        swal({
            title: 'Eliminar Curso',
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
                elimniarCurso(idCurso);
            }
        });
    }

    const elimniarCurso = async (idCurso) => {
        try {
            const response = await APIInvoke.invokePUT(`/cursos/${idCurso}`);
            if (response.ok) {
                cargarCursos();
                swal({
                    title: 'Eliminar Curso',
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
        resultados = cursos
    } else {
        resultados = cursos.filter(
            (dato) => (dato.descripcionCurso).toLowerCase().includes(busqueda.toLocaleLowerCase())
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
                        <li className="breadcrumb-item active">Cursos</li>
                    </ol>
                    <h1 className="page-header">Cursos</h1>
                    <div className='col-6 offset-3'>
                        <div className="row mb-2">
                            <div className="col-4">
                                <Link to="/cursos-crear" className="btn btn-green fs-bold me-3">Crear Curso</Link>
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
                    </div>
                    {
                        loading
                            ?
                            <div className="col-lg-2 offset-5">
                                <Spinner />
                            </div>
                            :
                            <div className="panel panel-inverse col-6 offset-3" data-sortable-id="lstCursos">
                                <PanelHeading
                                    titulo={"Listado de Cursos"}
                                />
                                <div className="panel-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped mb-0 align-middle">
                                            <thead>
                                                <tr>
                                                    <th>CURSO ID.</th>
                                                    <th>DESCRIPCIÓN</th>
                                                    <th width="1%">ACCIONES</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    resultados.map(
                                                        item =>
                                                            <tr key={item.idCurso}>
                                                                <td>{item.idCurso}</td>
                                                                <td>{item.descripcionCurso}</td>
                                                                <td nowrap="">
                                                                    <Link to={`/cursos-editar/${item.idCurso}`}
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
                                                                        Editar información del curso
                                                                    </ReactTooltip>
                                                                    <button onClick={(e) => confirmarElimninacion(e, item.idCurso)}
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
                                                                        Eliminar registro del curso
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

export default CursosAdmin;
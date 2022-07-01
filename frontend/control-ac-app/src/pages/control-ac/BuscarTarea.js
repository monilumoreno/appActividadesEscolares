import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarDocte from '../../components/SidebarDocte';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';

const BuscarTarea = () => {

    const [paramsTarea, setParamsTarea] = useState({
        idCurso: '1',
        idAsignatura: '1',
        idDocente: localStorage.idUsuario
    })

    const { idCurso, idAsignatura, idDocente } = paramsTarea;

    const onChange = e => {
        setParamsTarea({
            ...paramsTarea,
            [e.target.name]: e.target.value
        })
   }

    const [cursos, setCursos] = useState([]);

    const cargarCursos = async () => {
        const response = await APIInvoke.invokeGET(`/cursos`);
        setCursos(response.body);
    }

    const [asignaturas, setAsignaturas] = useState([]);

    const cargarAsignaturas = async () => {
        const response = await APIInvoke.invokeGET(`/asignaturas`);
        setAsignaturas(response.body);
    }
     
   useEffect(() => {
        cargarCursos();
        cargarAsignaturas();
   }, [])

   const onSubmit = e => {
       e.preventDefault();
   }

    return (
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarDocte></SidebarDocte>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="">Inicio</Link></li>
                        <li className="breadcrumb-item active"><Link to="">Buscar</Link></li>
                    </ol>
                    <h1 className="page-header">Calificar actividad</h1>
                    <div className="panel panel-inverse col-lg-6 offset-3" id="">
                        <PanelHeading></PanelHeading>
                        <div className="panel-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card shadow-lg p-3 mb-3 bg-white">
                                            <div className="card-header center text-center border-light">
                                                <h4>BUSCAR TAREA</h4>
                                            </div>
                                            <div className="card-body">
                                                <form className="needs-validation" onSubmit={onSubmit} novalidate>
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="idCurso" className="form-label fw-bold">Grado:</label>
                                                            <select className="form-select"
                                                                id="idCurso"
                                                                name="idCurso"
                                                                tabIndex="1"
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
                                                            <div className="invalid-feedback">Selecciona grado</div>
                                                        </div>
                                                    </div>
                                                    <div className="row my-2">
                                                        <div className="col-md-12 mb-3">
                                                            <label htmlFor="idAsignatura" className="form-label fw-bold">Asignatura:</label>
                                                            <select className="form-control"
                                                                id="idAsignatura"
                                                                name="idAsignatura"
                                                                tabIndex="2"
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
                                                            <div className="invalid-feedback">Selecciona asignatura</div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12 mb-2">
                                                            <button type="submit" className="btn btn-outline-success" id="crear">Buscar</button>
                                                            <button type="reset" className="btn btn-outline-success" id="cancelar">Cancelar</button>
                                                            <Link to="/homedocente" className="btn btn-outline-success" id="cerrar">Cerrar</Link>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default BuscarTarea;
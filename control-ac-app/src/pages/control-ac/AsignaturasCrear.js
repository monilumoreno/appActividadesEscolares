import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarAdmin from '../../components/SidebarAdmin';
import PanelHeading from '../../components/PanelHeading';
import APIInvoke from '../../utils/APIInvoke';
import swal from 'sweetalert';
import ErrorAlert from '../../utils/ErrorAlert';

const AsignaturasCrear = () => {

  const [asignatura, setAsignatura] = useState({
    descripcionAsignatura: '',
  })

  const { descripcionAsignatura } = asignatura;

  useEffect(() => {
    document.getElementById('descripcionAsignatura').focus();
  }, [])  

  const crearAsignatura = async () => {
    const data = {
        descripcionAsignatura: asignatura.descripcionAsignatura,
    }
    try {
        const response = await APIInvoke.invokePOST(`/asignaturas`, data)
        if (response.ok) {
          swal({
            title: 'Información',
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
          });
          reset();  
        } else {
          ErrorAlert.showAlert(response.message);
        }      
    } catch (error) {
      console.log(error);
      ErrorAlert.showAlert("Error al conectar con el servidor");
    }    
  }

  const onChange = (e) => {
    setAsignatura({
      ...asignatura,
      [e.target.name]: e.target.value
    })
  }

  const reset = () => {
    setAsignatura({
      descripcionAsignatura: '',
    })
    document.getElementById('descripcionAsignatura').focus();
  }  

  const onSubmit = (e) => {
    e.preventDefault();
    crearAsignatura();
  }

  return (
    <Fragment>
      <div id="app" className="app app-header-fixed app-sidebar-fixed">
        <Header> </Header>
        <SidebarAdmin />
        <div id="content" className="app-content">
          <ol className="breadcrumb float-xl-end">
            <li className="breadcrumb-item"><Link to="/homeadmin">Inicio</Link></li>
            <li className="breadcrumb-item active"><Link to="/asignaturas">Asignaturas</Link></li>
            <li className="breadcrumb-item active">Crear</li>
          </ol>
          <h1 className="page-header">Asignaturas</h1>
          <div className="panel panel-inverse col-lg-5 offset-3" data-sortable-id="crearCurso">
            <PanelHeading />
            <div claclassNames="panel-body">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card shadow-lg p-3 mb-3 bg-white">
                      <div className="card-header center text-center border-light">
                        <h4>REGISTRO ASIGNATURAS</h4>
                      </div>
                      <div className="card-body">
                        <form onSubmit={onSubmit} className="needs-validation" novalidate>
                          <div className="row my-2">
                            <div className="col-md-12 mb-3">
                              <label htmlFor="descripcionAsignatura" className="form-label fw-bold">Nombre:</label>
                              <input type="text" className="form-control"
                                id="descripcionAsignatura"
                                name="descripcionAsignatura"
                                value={descripcionAsignatura}
                                onChange={onChange}
                                tabIndex="1"
                                placeholder="Ingrese nombre de la asignatura"
                                required
                              />
                              <div className="invalid-feedback">Ingresa nombre de la asignatura</div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12 mb-2 mb-md-0">
                              <button type="submit" className="btn btn-success me-1" id="crear" tabindex="9">Crear</button>
                              <button onClick={reset} type="reset"className="btn btn-success me-1" id="cancelar" tabindex="10">Cancelar</button>
                              <Link to="/asignaturas" className="btn btn-success me-1" id="cerrar" tabindex="11">Cerrar</Link>
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

export default AsignaturasCrear
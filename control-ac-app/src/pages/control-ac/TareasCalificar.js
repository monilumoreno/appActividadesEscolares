import React, {Fragment} from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import SidebarDocte from '../../components/SidebarDocte';
import PanelHeading from '../../components/PanelHeading';

const TareasCalificar = () => {

    const [ idreltarea ] = useParams();


    return ( 
        <Fragment>
            <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <SidebarDocte></SidebarDocte>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="/homedocente">Inicio</Link></li>                        
                        <li className="breadcrumb-item"><Link to="/tareas">Tareas</Link></li>                        
                        <li className="breadcrumb-item active">Calificar</li>								
                    </ol>
                    <h1 className="page-header"></h1>
                    <div className="panel panel-inverse" id="">
                        <PanelHeading
                            titulo={""}
                        />
                        <div className="panel-body">
                        </div>    
                    </div>
                </div>
            </div>
        </Fragment>
     );
}
 
export default TareasCalificar;
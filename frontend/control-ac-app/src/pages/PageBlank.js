import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import PanelHeading from '../../components/PanelHeading.';

const PageBlank = () => {
    return (
        <Fragment>
          <div id="app" className="app app-header-fixed app-sidebar-fixed">
                <Header></Header>
                <Sidebar></Sidebar>
                <div id="content" className="app-content">
                    <ol className="breadcrumb float-xl-end">
                        <li className="breadcrumb-item"><Link to="">Inicio</Link></li>                        
                        <li className="breadcrumb-item active"><Link to=""></Link></li>								
                    </ol>
                    <h1 className="page-header"></h1>
                    <div className="panel panel-inverse col-lg-6 offset-3" id="">
                        <PanelHeading></PanelHeading>  
                        <div className="panel-body">
                            <div className="container">
                                <div className="row">
                                  
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </Fragment>
      );    
}
 
export default PageBlank;
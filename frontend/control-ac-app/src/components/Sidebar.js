import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';

const Sidebar = () => {
    return ( 
        <Fragment>
            <div id="sidebar" className="app-sidebar">
                <div className="app-sidebar-content" data-scrollbar="true" data-height="100%">
                    <Menu/>
                </div>
            </div>
		    <div className="app-sidebar-bg"></div>
		    <div className="app-sidebar-mobile-backdrop"><Link to="#" data-dismiss="app-sidebar-mobile" class="stretched-link"></Link></div>
        </Fragment>
     );
}
 
export default Sidebar;
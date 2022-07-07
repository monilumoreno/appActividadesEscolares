import React, {Fragment} from 'react'
import { Link } from 'react-router-dom';

const BreadCrumb = () => {
    return (
        <Fragment>
            <ol class="breadcrumb float-xl-start">
                {
                    /*
				    <li class="breadcrumb-item"><Link to="#">Home</Link></li>
				    <li class="breadcrumb-item"><Link to="#">Library</Link></li>
                    */
                }
				<li class="breadcrumb-item active">Home</li>
			</ol>
        </Fragment>    
      );
}
 
export default BreadCrumb;
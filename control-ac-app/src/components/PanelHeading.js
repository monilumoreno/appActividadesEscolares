import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const PanelHeading = ({titulo}) => {
    return (
        <Fragment>
            <div className="panel-heading ui-sortable-handle">
                <h4 className="panel-title">{titulo}</h4>
                <div className="panel-heading-btn">
                    <Link to="#" className="btn btn-xs btn-icon btn-default" data-toggle="panel-expand"><i className="fa fa-expand"></i></Link>
                    <Link to="#" className="btn btn-xs btn-icon btn-success" data-toggle="panel-reload"><i className="fa fa-redo"></i></Link>
                    <Link to="#" className="btn btn-xs btn-icon btn-warning" data-toggle="panel-collapse"><i className="fa fa-minus"></i></Link>
                    <Link to="#" className="btn btn-xs btn-icon btn-danger" data-toggle="panel-remove"><i className="fa fa-times"></i></Link>
                </div>
            </div>
        </Fragment>
    );
}

export default PanelHeading;

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<Fragment>
			<div id="app" className="app">
				<div className="login login-with-news-feed">
					<div className="news-feed">
						<div className="news-image" style={{ backgroundImage: "url(../assets/img/login-bg/pizarra2.png)" }}></div>
						<div className="news-caption">							
							<p>
								La aplicación que acerca el acudiente al entorno escolar y a revisar el cumplimiento de las actividades escolares.
							</p>
						</div>
					</div>
					<div className="login-container">
						<div className="login-header mb-30px">
							<div className="icon" >
								<i className="fa fa-sign-in-alt"></i>
							</div>
						</div>
						<div className="login-content">
							<form className="fs-13px">
								<div className="form-floating mb-15px">
									<input type="text" className="form-control h-45px fs-13px" placeholder="Usuario" id="usuario" required />
									<label htmlFor="usuario" className="d-flex align-items-center fs-13px text-gray-600">Usuario</label>
								</div>
								<div className="form-floating mb-15px">
									<input type="password" className="form-control h-45px fs-13px" placeholder="Contraseña" id="password" required />
									<label htmlFor="password" className="d-flex align-items-center fs-13px text-gray-600">Contraseña</label>
								</div>
								<div className="form-check mb-30px">
									<input className="form-check-input" type="checkbox" value="1" id="rememberMe" />
									<label className="form-check-label" for="rememberMe">
										Recordar
									</label>
								</div>
								<div className="mb-15px">
									<Link to="/homeadmin" className="btn btn-success d-block h-45px w-100 btn-lg fs-14px">Entrar</Link>
								</div>
								<hr className="bg-gray-600 opacity-2" />								
							</form>
						</div>
					</div>
				</div>
				<Link to="#" className="btn btn-icon btn-circle btn-success btn-scroll-to-top" data-toggle="scroll-to-top"><i className="fa fa-angle-up"></i></Link>
			</div>
		</Fragment>
	);
}

export default Login;
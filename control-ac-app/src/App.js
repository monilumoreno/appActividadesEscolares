import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import HomeAdmin from './pages/control-ac/HomeAdmin';
import HomeAcudiente from './pages/control-ac/HomeAcudiente';
import HomeDocente from './pages/control-ac/HomeDocente';
import CrearTarea from './pages/control-ac/CrearTarea';
import BuscarTarea from './pages/control-ac/BuscarTarea';
import UsuariosAdmin from './pages/control-ac/UsuariosAdmin';
import UsuariosCrear from './pages/control-ac/UsuariosCrear';
import UsuariosEditar from './pages/control-ac/UsuariosEditar';
import PerfilEditar from './pages/control-ac/PerfilEditar';
import AlumnosAdmin from './pages/control-ac/AlumnosAdmin';

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path = "/" exact element = {<Login/>} />
          <Route path = "/homeadmin" exact element = {<HomeAdmin />} />
          <Route path = "/homeacudiente" exact element = {<HomeAcudiente />} />
          <Route path = "/homedocente" exact element = {<HomeDocente />} />
          <Route path = "/usuarios" exact element = {<UsuariosAdmin />} />
          <Route path = "/usuarios-crear" exact element = {<UsuariosCrear />} />
          <Route path = "/usuarios-editar/:idusuario" exact element = {<UsuariosEditar />} />
          <Route path = "/crear-actividad" exact element = {<CrearTarea />} />
          <Route path = "/buscar-tarea" exact element = {<BuscarTarea />} />
          <Route path = "/perfil-editar" exact element = {<PerfilEditar />} />
          <Route path = "/alumnos" exact element = {<AlumnosAdmin />} />
        </Routes>
      </Router>
    );
} 


export default App;

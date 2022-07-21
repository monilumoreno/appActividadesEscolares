import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';

import HomeAdmin from './pages/control-ac/HomeAdmin';
import HomeAcudiente from './pages/control-ac/HomeAcudiente';
import HomeDocente from './pages/control-ac/HomeDocente';
import AsignaturasAdmin from './pages/control-ac/AsignaturasAdmin';
import CursosAdmin from './pages/control-ac/CursosAdmin';
import UsuariosAdmin from './pages/control-ac/UsuariosAdmin';
import UsuariosCrear from './pages/control-ac/UsuariosCrear';
import UsuariosEditar from './pages/control-ac/UsuariosEditar';
import PerfilEditar from './pages/control-ac/PerfilEditar';
import AlumnosAdmin from './pages/control-ac/AlumnosAdmin';
import AlumnosCrear from './pages/control-ac/AlumnosCrear';
import AlumnosEditar from './pages/control-ac/AlumnosEditar';
import TareasAdmin from './pages/control-ac/TareasAdmin';
import TareasCrear from './pages/control-ac/TareasCrear';
import TareasBuscar from './pages/control-ac/TareasCrear';
import TareasBuscarAcu from './pages/control-ac/TareasBuscarAcu';
import TareasDetalle from './pages/control-ac/TareasDetalle';
import TareasCalificar from './pages/control-ac/TareasCalificar';
import TareasEditar from './pages/control-ac/TareasEditar';
import TareasListaAcu from './pages/control-ac/TareasListaAcu';
import AlumnosListar from './pages/control-ac/AlumnosListar';
import AsignaturasCrear from './pages/control-ac/AsignaturasCrear';

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path = '/' exact element = {<Login/>} />
          <Route path = '/homeadmin' exact element = {<HomeAdmin />} />
          <Route path = '/homeacudiente' exact element = {<HomeAcudiente />} />
          <Route path = '/homedocente' exact element = {<HomeDocente />} />
          <Route path = '/asignaturas' exact element = {<AsignaturasAdmin />} />
          <Route path = '/asignaturas-crear' exact element = {<AsignaturasCrear />} />
          <Route path = '/cursos' exact element = {<CursosAdmin />} />
          <Route path = '/usuarios' exact element = {<UsuariosAdmin />} />
          <Route path = '/usuarios-crear' exact element = {<UsuariosCrear />} />
          <Route path = '/usuarios-editar/:idusuario' exact element = {<UsuariosEditar />} />
          <Route path = '/alumnos' exact element = {<AlumnosAdmin />} />
          <Route path = '/alumnos-crear' exact element = {<AlumnosCrear />}/>
          <Route path = '/alumnos-editar/:idalumno' exact element = {<AlumnosEditar />}/>
          <Route path = '/alumnos-listar' exact element = {<AlumnosListar />}/>
          <Route path = '/tareas' exact element = {<TareasAdmin />} />
          <Route path = '/tareas-crear' exact element = {<TareasCrear />} />
          <Route path = '/tareas-editar/:idtarea' exact element = {<TareasEditar />} />
          <Route path = '/tareas-detalle/:idtarea' exact element = {<TareasDetalle />} />
          <Route path = '/tareas-calificar/:idreltareas' exact element = {<TareasCalificar />} />          
          <Route path = '/tareas-buscar' exact element = {<TareasBuscar />} />          
          <Route path = '/tareas-buscar-acu' exact element = {<TareasBuscarAcu />} />             
          <Route path = '/tareas-listar/:idalumno' exact element = {<TareasListaAcu />} />          
          <Route path = '/perfil-editar' exact element = {<PerfilEditar />} />          
        </Routes>
      </Router>
    );
} 


export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import HomeAdmin from './pages/control-ac/HomeAdmin';
import HomeAcudiente from './pages/control-ac/HomeAcudiente';
import HomeDocente from './pages/control-ac/HomeDocente';
import CrearTarea from './pages/control-ac/CrearTarea';
import BuscarTarea from './pages/control-ac/BuscarTarea';
import LoginV2 from './pages/auth/LoginV2';

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path = "/" exact element = {<LoginV2/>} />
          <Route path = "/homeadmin" exact element = {<HomeAdmin />} />
          <Route path = "/homeacudiente" exact element = {<HomeAcudiente />} />
          <Route path = "/homedocente" exact element = {<HomeDocente />} />
          <Route path = "/crear-actividad" exact element = {<CrearTarea />} />
          <Route path = "/buscar-tarea" exact element = {<BuscarTarea />} />
        </Routes>
      </Router>
    );
} 


export default App;

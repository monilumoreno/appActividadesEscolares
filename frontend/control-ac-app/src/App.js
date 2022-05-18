import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import HomeAdmin from './pages/control-ac/HomeAdmin';
import HomeAcudiente from './pages/control-ac/HomeAcudiente';
import HomeDocente from './pages/control-ac/HomeDocente';

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path = "/" exact element = {<Login/>} />
          <Route path = "/homeadmin" exact element = {<HomeAdmin />} />
          <Route path = "/homeacudiente" exact element = {<HomeAcudiente />} />
          <Route path = "/homedocente" exact element = {<HomeDocente />} />
        </Routes>
      </Router>
      );
} 


export default App;

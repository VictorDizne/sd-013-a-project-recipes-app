import React from 'react';
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import Bebidas from './pages/Bebidas';
import Provider from './redux/Context';
import Explorar from './pages/Explorar';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarComidasIng from './pages/ExplorarComidasIng';
import ExplorarBebidasIng from './pages/ExplorarBebidasIng';
import ExplorarBebidasAr from './pages/ExplorarBebidasAr';
import ExplorarComidasAr from './pages/ExplorarComidasAr';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/comidas" component={ MainPage } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route path="/explorar/bebidas/ingredientes" component={ ExplorarBebidasIng } />
          <Route path="/explorar/comidas/area" component={ ExplorarBebidasAr } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
          <Route path="/explorar/comidas/ingredientes" component={ ExplorarComidasIng } />
          <Route path="/explorar/bebidas/area" component={ ExplorarComidasAr } />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

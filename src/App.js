import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Provider from './context/Provider';
import {
  Login,
  Comidas,
  Perfil,
  Bebidas,
  Explorar,
  ReceitasFeitas,
  ReceitasFavoritas,
  NoteFound,
} from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route path="/explorar" component={ Explorar } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="*" component={ NoteFound } />
    </Switch>
  );
}

export default App;

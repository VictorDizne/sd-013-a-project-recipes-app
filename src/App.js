import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Comidas,
  DetalhesReceitaComida,
  DetalhesReceitaBebida,
  ReceitaProcessoComida,
  ReceitaProcessoBebida,
  Perfil,
  Bebidas,
  Explorar,
  ExplorarComidas,
  ExplorarBebidas,
  ExplorarComidasIngredientes,
  ExplorarBebidasIngredientes,
  LocalOrigem,
  ReceitasFeitas,
  ReceitasFavoritas,
  NoteFound,
} from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/perfil" component={ Perfil } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route
        path="/comidas/:id/in-progress"
        component={ ReceitaProcessoComida }
      />
      <Route
        path="/bebidas/:id/in-progress"
        component={ ReceitaProcessoBebida }
      />
      <Route path="/comidas/:id" component={ DetalhesReceitaComida } />
      <Route path="/bebidas/:id" component={ DetalhesReceitaBebida } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExplorarComidasIngredientes }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarBebidasIngredientes }
      />
      <Route exact path="/explorar/comidas/area" component={ LocalOrigem } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="*" component={ NoteFound } />
    </Switch>
  );
}

export default App;

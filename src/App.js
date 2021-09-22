import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Provider from './context/Provider';
import {
  Login,
  Comidas,
  Perfil,
  Bebidas,
  Explorar,
  ExplorarComidas,
  ExplorarBebidas,
  DetalhesReceitaComida,
  DetalhesReceiBebida,
  ReceitaProcessoComida,
  ReceitaProcessoBebida,
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
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/comidas/{id-da-receita}" component={ DetalhesReceitaComida } />
      <Route exact path="/bebidas/{id-da-receita}" component={ DetalhesReceiBebida } />
      <Route
        exact
        path="/comidas/{id-da-receita}/in-progress"
        component={ ReceitaProcessoComida }
      />
      <Route
        exact
        path="/bebidas/{id-da-receita}/in-progress"
        component={ ReceitaProcessoBebida }
      />
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

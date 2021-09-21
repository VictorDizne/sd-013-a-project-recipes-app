import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/provider';
import {
  Login,
  TelaComidas,
  TelaBebidas,
  DetalheComidas,
  DetalheBebidas,
  ReceitasProcessoComidas,
  ReceitasProcessoBebidas,
  Explorar,
  ExplorarComidas,
  ExplorarBebidas,
  IngredienteComidas,
  IngredienteBebidas,
  ExplorarComidasArea,
  Perfil,
  ReceitasFeitas,
  ReceitasFavoritas,
} from './pages';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ TelaComidas } />
          <Route exact path="/bebidas" component={ TelaBebidas } />
          <Route exact path="/comidas/{id-da-receita}" component={ DetalheComidas } />
          <Route exact path="/bebidas/{id-da-receita}" component={ DetalheBebidas } />
          <Route exact path="comidas/{id-da-receita}/in-progress" component={ ReceitasProcessoComidas } />
          <Route exact path="bebidas/{id-da-receita}/in-progress" component={ ReceitasProcessoBebidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route exact path="/explorar/comidas/ingredientes" component={ IngredienteComidas } />
          <Route exact path="/explorar/bebidas/ingredientes" component={ IngredienteBebidas } />
          <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

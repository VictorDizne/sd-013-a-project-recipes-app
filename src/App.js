import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import RecipesContextProvider from './context/RecipesContextProvider';
import {
  Bebidas, Comidas,
  DetalhesBebida,
  DetalhesComida,
  Explorar,
  ExplorarBebidas,
  ExplorarBebidasIngredientes,
  ExplorarComidas,
  ExplorarComidasArea,
  ExplorarComidasIngredientes,
  InProgressBebidas,
  InProgressComidas,
  Login,
  Perfil,
  ReceitasFavoritas,
  ReceitasFeitas,
} from './pages';

function App() {
  return (
    <div>
      <BrowserRouter>
        <RecipesContextProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Bebidas } />
            <Route exact path="/comidas/:id-da-receita" component={ DetalhesComida } />
            <Route exact path="/bebidas/:id-da-receita" component={ DetalhesBebida } />
            <Route
              exact
              path="/comidas/:id-da-receit/in-progress"
              component={ InProgressComidas }
            />
            <Route
              exact
              path="/bebidas/:id-da-receita/in-progress"
              component={ InProgressBebidas }
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
            <Route
              exact
              path="/explorar/comidas/area"
              component={ ExplorarComidasArea }
            />
            <Route exact path="/perfil" component={ Perfil } />
            <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
            <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          </Switch>
        </RecipesContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

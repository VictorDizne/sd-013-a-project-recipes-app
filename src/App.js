import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Container } from '@mui/material';
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
    <Container maxWidth="xs">
      <BrowserRouter>
        <RecipesContextProvider>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Comidas } />
            <Route exact path="/bebidas" component={ Bebidas } />
            <Route exact path="/comidas/:recipeId" component={ DetalhesComida } />
            <Route exact path="/bebidas/:recipeId" component={ DetalhesBebida } />
            <Route
              exact
              path="/comidas/:recipeId/in-progress"
              component={ InProgressComidas }
            />
            <Route
              exact
              path="/bebidas/:recipeId/in-progress"
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
    </Container>
  );
}

export default App;

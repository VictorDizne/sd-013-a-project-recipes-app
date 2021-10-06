import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';
import {
  ProcessDrink,
  ProcessFood,
  DrinkDetail,
  DrinkExplorer,
  NotFound,
  HomeFood,
  Login,
  DrinkIngredientsExp,
  Explorer,
  FavoriteRecipes,
  OriginExp,
  FoodExplorer,
  FoodIngredientsExp,
  ReadyRecipes,
  FoodDetails,
  Profile,
  HomeDrinks,
} from './pages';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fc8803',
    },
    secondary: {
      main: '#000000',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <Switch>
        <Route exact path="/comidas" component={ HomeFood } />
        <Route exact path="/bebidas" component={ HomeDrinks } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ ReadyRecipes } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ FoodIngredientsExp }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ DrinkIngredientsExp }
        />
        <Route exact path="/explorar" component={ Explorer } />
        <Route exact path="/explorar/bebidas" component={ DrinkExplorer } />
        <Route exact path="/explorar/comidas" component={ FoodExplorer } />
        <Route exact path="/explorar/comidas/area" component={ OriginExp } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />

        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <DrinkDetail { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <FoodDetails { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          render={ (props) => <ProcessFood { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          render={ (props) => <ProcessDrink { ...props } /> }
        />
        <Route component={ NotFound } />
      </Switch>
    </ThemeProvider>
  );
}

export default App;

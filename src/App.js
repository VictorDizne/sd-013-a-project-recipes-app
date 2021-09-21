import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import HomeFood from './pages/HomeFood';
import Login from './pages/Login';
import Profile from './pages/profile';
import Drinks from './pages/HomeDrinks';
import DrinkDetails from './pages/DrinkDetails';
import FoodDetails from './pages/FoodDetails';
import ReadyRecipes from './pages/readyRecipes';
import FoodIngredientsExp from './pages/FoodIngredientsExp';
import Explorer from './pages/explorer';
import DrinkExplorer from './pages/DrinkExplorer';
import FoodExplorer from './pages/foodExplorer';
import OriginExp from './pages/OriginExp';
import FavoriteRecipes from './pages/favoriteRecipe';
import DrinkIngredientsExp from './pages/DrinkIngredientsExp';

function App() {
  return (
    <Switch>
      <Route exact path="/comidas" component={ HomeFood } />
      <Route exact path="/bebidas" component={ Drinks } />
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
        render={ (props) => <DrinkDetails { ...props } /> }
      />
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => <FoodDetails { ...props } /> }
      />
    </Switch>
  );
}

export default App;

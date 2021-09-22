import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Drink from './pages/Drink';
import Food from './pages/Food';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodIngredients from './pages/ExploreFoodsIngredients';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import FinishedRecipes from './pages/FinishedRecipes';
import ExploreOrigin from './pages/ExploreOrigin';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route path="/comidas" component={ Food } />
        <Route path="/bebidas" component={ Drink } />
        <Route path="/comidas/:id" component={ FoodDetails } />
        <Route path="/bebidas/:id" component={ DrinkDetails } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/explorar/comidas/area" component={ ExploreOrigin } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksIngredients }
        />
        <Route path="/receitas-feitas" component={ FinishedRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/perfil" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;

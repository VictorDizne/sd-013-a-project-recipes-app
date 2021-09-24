import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Food from './pages/Food';
import Drinks from './pages/Drinks';
import FoodsExplorer from './pages/FoodsExplorer';
import DoneRecipes from './pages/DoneRecipes';
import DrinksExplorer from './pages/DrinksExplorer';
import Explorer from './pages/Explorer';
import FavoriteRecipes from './pages/FavoritesRecipes';
import FoodsByLocal from './pages/FoodsByLocal';
import ExploreByIngredients from './pages/ExplorerByIng';
import Profile from './pages/Profile';
import ContextAPIProvider from './ContextAPI/ContextAPI';
import MealDetails from './Pages/Foods';
import CocktailDetails from './Pages/Drinks';

function App() {
  return (
    <ContextAPIProvider>
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Food } />
            <Route exact path="/comidas/:id" component={ MealDetails } />
            <Route exact path="/bebidas" component={ Drinks } />
            <Route exact path="/bebidas/:id" component={ CocktailDetails } />
            <Route exact path="/explorar/comidas" component={ FoodsExplorer } />
            <Route exact path="/receitas-feitas" component={ DoneRecipes } />
            <Route exact path="/explorar/bebidas" component={ DrinksExplorer } />
            <Route exact path="/explorar" component={ Explorer } />
            <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
            <Route exact path="/explorar/comidas/area" component={ FoodsByLocal } />
            <Route
              exact
              path="/explorar/comidas/ingredientes"
              component={ ExploreByIngredients }
            />
            <Route
              exact
              path="/explorar/bebidas/ingredientes"
              component={ ExploreByIngredients }
            />
            <Route exact path="/perfil" component={ Profile } />
          </Switch>
        </BrowserRouter>
      </RecipesProvider>
    </ContextAPIProvider>
  );
}

export default App;

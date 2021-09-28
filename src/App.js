import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login';
// import FoodDetails from './Pages/FoodDetails';
import ContextAPIProvider from './ContextAPI/ContextAPI';
import RecipesProvider from './Context/RecipesProvider';
import Foods from './Pages/Foods';
import Drinks from './Pages/Drinks';
import FoodsExplorer from './Pages/FoodsExplorer';
import DoneRecipes from './Pages/DoneRecipes';
import DrinksExplorer from './Pages/DrinksExplorer';
import Explorer from './Pages/Explorer';
import FavoriteRecipes from './Pages/FavoritesRecipes';
import FoodsByLocal from './Pages/FoodsByLocal';
import ExploreByIngredients from './Pages/ExplorerByIng';
import Profile from './Pages/Profile';
// import DrinkDetails from './Pages/DrinkDetails';
import RecipeDetails from './Pages/RecipeDetails';

function App() {
  return (
    <ContextAPIProvider>
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/comidas" component={ Foods } />
            <Route exact path="/bebidas" component={ Drinks } />
            <Route exact path="/comidas/:id" component={ RecipeDetails } />
            <Route exact path="/bebidas/:id" component={ RecipeDetails } />
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

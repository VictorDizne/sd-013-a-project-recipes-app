import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  Foods,
  Drinks,
  FoodRecipeDetails,
  DrinkRecipesDetails,
  FoodProgress,
  DrinkProgress,
  Explorer,
  FoodsExplorer,
  FoodsExplorerByOrigin,
  DrinksExplorer,
  FoodsExplorerByIngredient,
  DrinksByIngredients,
  NotFound,
  Profile,
  DoneRecipes,
  FavoritedRecipes } from '.';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Foods } />
      <Route path="/bebidas" component={ Drinks } />
      <Route path="/comidas/:id" component={ FoodRecipeDetails } />
      <Route path="/bebidas/:id" component={ DrinkRecipesDetails } />
      <Route path="/comidas/:id/in-progress" component={ FoodProgress } />
      <Route path="/bebidas/:id/in-progress" component={ DrinkProgress } />
      <Route path="/explorar" component={ Explorer } />
      <Route
        path="/explorar/comidas"
        component={ FoodsExplorer }
      />
      <Route path="/explorar/bebidas" component={ DrinksExplorer } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ FoodsExplorerByIngredient }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ DrinksByIngredients }
      />
      <Route path="/explorar/comidas/area" component={ FoodsExplorerByOrigin } />
      <Route path="*" component={ NotFound } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavoritedRecipes } />
    </Switch>
  );
}

export default Routes;

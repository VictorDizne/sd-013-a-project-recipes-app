import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  Login,
  Meals,
  Drinks,
  MealDetails,
  DrinkDetails,
  Explore,
  ExploreMeals,
  ExploreDrinks,
  IngredientsMealsExplore,
  IngredientsDrinksExplore,
  ExploreMealsArea,
  Perfil,
  MadeRecipes,
  FavoriteRecipes,
  MealInProgress,
  DrinkInProgress,
} from './pages';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        exact
        path="/comidas"
        component={ Meals }
      />
      <Route
        exact
        path="/bebidas"
        component={ Drinks }
      />
      <Route
        exact
        path="/comidas/:id"
        component={ MealDetails }
      />
      <Route
        exact
        path="/bebidas/:id"
        component={ DrinkDetails }
      />
      <Route
        exact
        path="/comidas/:id/in-progress"
        component={ MealInProgress }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        component={ DrinkInProgress }
      />
      <Route
        exact
        path="/explorar"
        component={ Explore }
      />
      <Route
        exact
        path="/explorar/comidas"
        component={ ExploreMeals }
      />
      <Route
        exact
        path="/explorar/bebidas"
        component={ ExploreDrinks }
      />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ IngredientsMealsExplore }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ IngredientsDrinksExplore }
      />
      <Route
        exact
        path="/explorar/comidas/area"
        component={ ExploreMealsArea }
      />
      <Route
        exact
        path="/perfil"
        component={ Perfil }
      />
      <Route
        exact
        path="/receitas-feitas"
        component={ MadeRecipes }
      />
      <Route
        exact
        path="/receitas-favoritas"
        component={ FavoriteRecipes }
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
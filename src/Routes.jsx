import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  Login,
  Meals,
  Drinks,
  MealDetails,
  DrinkDetails,
  MealProgress,
  DrinkProgress,
  Explore,
  ExploreMeals,
  ExploreDrinks,
  IngredientsMealsExplore,
  IngredientsDrinksExplore,
  ExploreMealsArea,
  Perfil,
  MadeRecipes,
  FavoriteRecipes,
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
        path="/comidas/{id-da-receita}"
        component={ MealDetails }
      />
      <Route
        exact
        path="/bebidas/{id-da-receita}"
        component={ DrinkDetails }
      />
      <Route
        exact
        path="/comidas/{id-da-receita}/in-progress"
        component={ MealProgress }
      />
      <Route
        exact
        path="/bebidas/{id-da-receita}/in-progress"
        component={ DrinkProgress }
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
        path="/receitas-favoritasMe"
        component={ FavoriteRecipes }
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;

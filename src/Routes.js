import React from 'react';
import { Switch, Route } from 'react-router';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Beverages from './pages/Beverages';
import Login from './pages/Login';
import Details from './pages/Details';
import Explore from './pages/Explore';
import RecipeInProgress from './pages/RecipeInProgress';
import ExploreByType from './pages/ExploreByType';

function Routes() {
  return (
    <Switch>
      <Route exact path="/comidas" component={ Recipes } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/bebidas" component={ Beverages } />
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/:type/:id"
        render={ (props) => <Details { ...props } /> }
      />
      <Route
        exact
        path="/:type/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } /> }
      />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/:type" component={ ExploreByType } />
    </Switch>
  );
}

export default Routes;

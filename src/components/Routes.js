import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Comidas from '../pages/Comidas';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/comidas/:recipeId" component={ Comidas } />
      <Route path="/bebidas/:recipeId" component={ Comidas } />
      <Route
        path="/comidas/:recipeId/in-progress"
        component={ Comidas }
      />
      <Route
        path="/bebidas/:recipeId/in-progress"
        component={ Comidas }
      />
      <Route path="/explorar" component={ Comidas } />
      <Route path="/explorar/comidas" component={ Comidas } />
      <Route path="/explorar/bebidas" component={ Comidas } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ Comidas }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ Comidas }
      />
      <Route path="/explorar/comidas/area" component={ Comidas } />
      <Route path="/perfil" component={ Comidas } />
      <Route path="/receitas-feitas" component={ Comidas } />
      <Route path="/receitas-faviritas" component={ Comidas } />
    </Switch>
  );
}

export default Routes;

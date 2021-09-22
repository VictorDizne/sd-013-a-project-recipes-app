import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Comidas from '../pages/Comidas';
import Bebidas from '../pages/Bebidas';
import Explorar from '../pages/Explorar';
import ExplorarComidas from '../pages/ExplorarComidas';
import ExplorarBebidas from '../pages/ExplorarBebidas';
import ExplorarComidasIng from '../pages/ExplorarComidasIng';
import ExplorarBebidasIng from '../pages/ExplorarBebidasIng';
import ExplorarComidasOri from '../pages/ExplorarComidasOri';
import Perfil from '../pages/Perfil';
import ReceitasFeitas from '../pages/ReceitasFeitas';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
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
      <Route path="/explorar" component={ Explorar } />
      <Route path="/explorar/comidas" component={ ExplorarComidas } />
      <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExplorarComidasIng }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarBebidasIng }
      />
      <Route path="/explorar/comidas/area" component={ ExplorarComidasOri } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
    </Switch>
  );
}

export default Routes;

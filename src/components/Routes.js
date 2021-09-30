import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import Explorar from '../pages/Explorar';
import ExplorarComidas from '../pages/ExplorarComidas';
import ExplorarBebidas from '../pages/ExplorarBebidas';
import ExplorarComidasIng from '../pages/ExplorarComidasIng';
import ExplorarBebidasIng from '../pages/ExplorarBebidasIng';
import ExplorarComidasOri from '../pages/ExplorarComidasOri';
import Perfil from '../pages/Perfil';
import ReceitasFeitas from '../pages/ReceitasFeitas';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';
import ReceitasDetalhes from '../pages/ReceitaDetalhes';
import ReceitasProgresso from '../pages/ReceitasProgresso';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Recipes } />
      <Route exact path="/bebidas" component={ Recipes } />
      <Route exact path="/comidas/:recipeId" component={ ReceitasDetalhes } />
      <Route exact path="/bebidas/:recipeId" component={ ReceitasDetalhes } />
      <Route
        path="/comidas/:recipeId/in-progress"
        component={ ReceitasProgresso }
      />
      <Route
        path="/bebidas/:recipeId/in-progress"
        component={ ReceitasProgresso }
      />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
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

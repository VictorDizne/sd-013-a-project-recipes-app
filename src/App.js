import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Bebidas from './pages/Bebidas';
import Provider from './redux/Context';
import Explorar from './pages/Explorar';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarComidasIng from './pages/ExplorarComidasIng';
import ExplorarBebidasIng from './pages/ExplorarBebidasIng';
import NotFound from './pages/NotFound';
import ExplorarComidasAr from './pages/ExplorarComidasAr';
import CardDetailsMeal from './components/cardDetailsMeal';
import CardDetailsDrinks from './components/cardDetailsDrinks';
import CardMealsInProgress from './pages/CardMealsInProgress';
import CardDrinksInProgress from './pages/CardDrinksInProgress';
import SurpreendaComidas from './pages/SurpreendaComidas';
import SurpreendaBebidas from './pages/SurpreendaBebidas';
import Comidas from './pages/Comidas';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/comidas/:id"
            render={ ({ match: { params: { id } } }) => <CardDetailsMeal props={ id } /> }
          />
          <Route
            exact
            path="/comidas/:id/in-progress"
            component={ CardMealsInProgress }
          />
          <Route
            exact
            path="/bebidas/:id"
            render={ ({ match: { params: { id } } }) => (
              <CardDetailsDrinks props={ id } />
            ) }
          />
          <Route
            exact
            path="/bebidas/:id/in-progress"
            component={ CardDrinksInProgress }
          />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route path="/explorar/bebidas/ingredientes" component={ ExplorarBebidasIng } />
          <Route path="/explorar/comidas/area" component={ ExplorarComidasAr } />
          <Route
            path="/comidas/:id"
            component={ SurpreendaComidas }
          />
          <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
          <Route path="/explorar/comidas/ingredientes" component={ ExplorarComidasIng } />
          <Route path="/explorar/bebidas/area" component={ NotFound } />
          <Route
            path="/bebidas/:id"
            component={ SurpreendaBebidas }
          />
          <Route path="/perfil" component={ Perfil } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

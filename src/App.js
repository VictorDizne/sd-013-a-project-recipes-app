import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/login';
import Perfil from './components/PerfilScreen';
import RecipeDetail from './pages/recipeDetail';
import Comidas from './pages/comidas';
import Bebidas from './pages/bebidas';
import ExplorePage from './pages/explorePage';
import ExploreFoodPage from './pages/exploreFoodPage';
import ExploreDrinkPage from './pages/exploreDrinkPage';

function App() {
  return (
    <Switch>
      <Route exact path="/comidas" component={ Comidas } />
      <Route path="/comidas/:id" component={ RecipeDetail } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/explorar" component={ ExplorePage } />
      <Route exact path="/explorar/comidas" component={ ExploreFoodPage } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinkPage } />
      {/* <Route exact path="/bebidas/:id-da-receita" component={} />
      <Route exact path="/comidas/:id-da-receita/in-progress" component={} />
      <Route exact path="/bebidas/:id-da-receita/in-progress" component={} />
      <Route exact path="/explorar/comidas/ingredientes" component={} />
      <Route exact path="/explorar/bebidas/ingredientes" component={} />
      <Route exact path="/explorar/comidas/area" component={} />
      <Route exact path="/receitas-feitas" component={} />
      <Route exact path="/receitas-favoritas" component={} /> */}
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;

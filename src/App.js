import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './Components/SearchBar';
import MealDetails from './Pages/Foods';
import CocktailDetails from './Pages/Drinks';
import ContextAPIProvider from './ContextAPI/ContextAPI';

function App() {
  return (
    <ContextAPIProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" />
          <Route exact path="/bebidas" component={ SearchBar } />
          <Route exact path="/bebidas/:id" component={ CocktailDetails } />
          <Route exact path="/comidas" component={ SearchBar } />
          <Route exact path="/comidas/:id" component={ MealDetails } />
        </Switch>
      </BrowserRouter>
    </ContextAPIProvider>
  );
}

export default App;

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import SearchBar from './Components/SearchBar';
import FoodDetails from './Pages/FoodDetails';
import ContextAPIProvider from './ContextAPI/ContextAPI';
import DrinkDetails from './Pages/DrinkDetails';

function App() {
  return (
    <ContextAPIProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/bebidas" component={ SearchBar } />
          <Route exact path="/bebidas/:id" component={ DrinkDetails } />
          <Route exact path="/comidas" component={ SearchBar } />
          <Route exact path="/comidas/:id" component={ FoodDetails } />
        </Switch>
      </BrowserRouter>
    </ContextAPIProvider>
  );
}

export default App;

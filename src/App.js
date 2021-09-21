import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/profile';
import Foods from './pages/foods';

function App() {
  return (
    <Switch>
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/comidas" component={ Foods } />
    </Switch>
  );
}

export default App;

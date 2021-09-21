import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import HomeFood from './pages/HomeFood';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route path="/comidas" component={ HomeFood } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;

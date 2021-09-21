import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Foods from './pages/Foods';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Foods } />
    </Switch>
  );
}

export default App;

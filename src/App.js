import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import FoodsPage from './pages/FoodsPage';

function App() {
  return (

    <Switch>
      <Route path="/" component={ Login } />
      <Route path="/comidas" component={ FoodsPage } />
    </Switch>

  );
}

export default App;

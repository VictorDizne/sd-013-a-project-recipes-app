import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/provider';
import Login from './pages/Login';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={ Login } /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

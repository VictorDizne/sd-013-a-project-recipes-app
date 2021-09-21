import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/provider';
import Header from './components/Header';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          {/* <Route exact path="/" component={ Login } /> */}
        </Switch>
      </BrowserRouter>
      <Header />
    </Provider>
  );
}

export default App;

// comentário

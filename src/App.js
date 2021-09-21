import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Provider from './redux/Context';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import React from 'react';
// import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import MainPage from "./pages/MainPage";
import Login from './pages/Login';
import Provider from './redux/Context';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/mainpage" component={MainPage} /> */}
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

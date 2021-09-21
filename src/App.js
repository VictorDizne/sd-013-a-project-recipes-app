import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/mainpage" component={MainPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

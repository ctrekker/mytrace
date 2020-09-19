import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./views/Home";
import Data from "./views/Data";

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path={'/'} exact>
            <Home/>
          </Route>
          <Route path={'/data'} exact>
            <Data/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;

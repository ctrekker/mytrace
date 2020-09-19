import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./views/Home";
import Data from "./views/Data";
import Login from "./views/Login";
import 'antd/dist/antd.css';

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
          <Route path = {'/login'} exact>
              <Login/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default App;

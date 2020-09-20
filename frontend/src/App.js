import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Home from "./views/Home";
import Data from "./views/Data";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import About from "./views/About";
import RequireAuth from './components/RequireAuth';
import 'antd/dist/antd.css';

function App() {
  return (
      <BrowserRouter>
          <RequireAuth
            not={
              <Switch>
                <Route path={'/signup'} exact>
                  <SignUp/>
                </Route>
                <Route path={'/login'} exact>
                  <Login/>
                </Route>
                <Route path={'/about'} exact>
                    <About/>
                </Route>
                <Route path={'/'}>
                  <Login/>
                </Route>
              </Switch>
            }
          >
            <Switch>
              <Route path={'/'} exact>
                <Home/>
              </Route>
              <Route path={'/data'} exact>
                <Data/>
              </Route>
                <Route path={'/about'} exact>
                    <About/>
                </Route>
            </Switch>
          </RequireAuth>
      </BrowserRouter>
  );
}

export default App;

import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import AuthenticatedComp from './components/route/AuthenticatedComp';
import Login from './admin/login/login';
import { theme1 } from "./theme/index";
import { ThemeProvider } from '@material-ui/core';

const Blog = lazy(() => import('./blog/Blog'));
const Admin = lazy(() => import('./admin/Admin'));



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme1}>
      <Router basename="/">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Route exact path="/">
            <Blog />
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/admin">
            <AuthenticatedComp component={Admin}></AuthenticatedComp>
          </Route>
        </Suspense>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

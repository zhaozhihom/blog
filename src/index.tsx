import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";

const Blog = lazy(() => import('./blog-layout/Blog'));
const Admin = lazy(() => import('./admin/Admin'));


ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
      <Suspense fallback={<div>Loading...</div>}>
        <Route exact path="/">
          <Blog />
        </Route>
        <Route>
          <Admin />
        </Route>
      </Suspense>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

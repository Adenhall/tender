import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import MyTypes from 'pages/MyTypes';
import withLayout from 'hoc/withLayout';

const App = () => (
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/my-types" component={withLayout(MyTypes)} />
      <Route path="/" component={withLayout(Dashboard)} />
    </Switch>
  </Router>
);

export default App;

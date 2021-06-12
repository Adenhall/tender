import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import MyTypes from 'pages/MyTypes';
import withLayout from 'hoc/withLayout';
import ProtectedRoute from 'components/ProtectedRoute';

const App = () => (
  <Switch>
    <Route path="/login" component={Login} />
    <ProtectedRoute path="/my-types" component={withLayout(MyTypes)} />
    <ProtectedRoute path="/" component={withLayout(Dashboard)} />
  </Switch>
);

export default App;

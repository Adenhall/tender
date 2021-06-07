import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import MyTypes from 'pages/MyTypes';
import withLayout from 'hoc/withLayout';
import { useAuth } from 'contexts/AuthContext';

const App = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/my-types" component={withLayout(MyTypes)} />
      <Route path="/" component={withLayout(Dashboard)} />
    </Switch>
  );
};

export default App;

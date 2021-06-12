import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const ProtectedRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={() => {
        if (!currentUser) {
          return <Redirect to="/login" />;
        }
        return component && React.createElement(component);
      }}
    />
  );
};

export default ProtectedRoute;

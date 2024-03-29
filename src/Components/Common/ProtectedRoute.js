
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Auth from '../../lib/Auth';

const ProtectedRoute = ({ component: Component, ...rest}) => {
  // if(!Auth.isAuthenticated());
  return (
    <Route
      {...rest}
      render={props => Auth.isAuthenticated()
        ? (
          <Component {...props}
          />
        ) : (
          <Redirect to="/login"
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
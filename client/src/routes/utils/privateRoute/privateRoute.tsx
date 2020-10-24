import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

import TokenService from 'src/services/token.service';

const PrivateRoute: FC<Types.PrivateRouteProps> = ({ component, path, ...props }) => {
  const Component = component;

  return (
    <Route
      {...props}
      path={path}
      render={(routeProps) =>
        TokenService.hasAuthToken() ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: routeProps.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

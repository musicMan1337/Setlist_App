import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

import TokenService from 'src/services/token.service';

const PublicRoute: FC<Types.PublicRouteProps> = ({ component, loginSuccess, path, ...children }) => {
  const Component = component;

  return (
    <Route
      {...children}
      path={path}
      render={(routeProps) =>
        TokenService.hasAuthToken() ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeProps.location }
            }}
          />
        ) : (
          <Component loginSuccess={loginSuccess} {...routeProps} />
        )
      }
    />
  );
};

export default PublicRoute;

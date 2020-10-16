import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import TokenService from 'src/services/token.service';

const PublicRoute = ({ component, loginSuccess, path, ...props }) => {
  const Component = component;

  return (
    <Route
      {...props}
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

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  loginSuccess: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

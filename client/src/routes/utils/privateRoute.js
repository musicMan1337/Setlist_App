import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TokenService from '../../services/tokenService';

const PrivateRoute = ({ component, path, ...props }) => {
  const Component = component;

  return (
    <Route
      {...props}
      path={path}
      render={(routeProps) =>
        // TokenService.hasAuthToken() ? (
          <Component {...routeProps} />
        // ) : (
        //   <Redirect
        //     to={{
        //       pathname: '/login',
        //       state: { from: routeProps.location }
        //     }}
          // />
        // )
      }
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

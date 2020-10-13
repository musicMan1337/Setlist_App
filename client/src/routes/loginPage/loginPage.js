import React from 'react';
import PropTypes from 'prop-types';

import { LoginForm } from 'src/components';

const LoginPage = ({ loginSuccess }) => {
  return (
    <>
      <LoginForm loginSuccess={loginSuccess} />
    </>
  );
};

export default LoginPage;

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired
};

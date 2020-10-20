import React from 'react';
import PropTypes from 'prop-types';

import { LoginForm } from 'src/components';

const LoginPage = ({ loginSuccess }) => {
  return (
    <div>
      <p>Demo user:</p>
      <p>Username: admin | Password: admin</p>
      <br />
      <LoginForm loginSuccess={loginSuccess} />
    </div>
  );
};

export default LoginPage;

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired
};

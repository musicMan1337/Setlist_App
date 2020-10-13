import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserService from 'src/services/user.service';
import TokenService from 'src/services/token.service';

import './loginForm.scss';

import { Button } from 'src/components/utils';

const LoginForm = ({ loginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeSubmit, setActiveSubmit] = useState(false);

  useLayoutEffect(() => {
    const validForm = () => {
      const name = username.length >= 3 && username.length <= 50;
      const pass = password.length >= 3 && password.length <= 150;

      if (name && pass) setActiveSubmit(true);
      else setActiveSubmit(false);
    };

    validForm();
  }, [username, password]);

  const submitButton = activeSubmit ? (
    <Button type="submit">Login</Button>
  ) : (
    <Button type="submit" disabled>
      Login
    </Button>
  );

  const registerButton = activeSubmit ? (
    <Button type="submit" value="register">
      Register
    </Button>
  ) : (
    <Button type="submit" disabled>
      Register
    </Button>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { authToken, user_name, id } = await
      e.target.button.value === 'register'
        ? UserService.userRegistration
        : UserService.userLogin;

      TokenService.saveAuthToken(authToken)
      loginSuccess(user_name, id)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <label className="form-label" htmlFor="username">
        Username:
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="form-label" htmlFor="password">
        Password:
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {submitButton} or {registerButton}
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  loginSuccess: PropTypes.func.isRequired
};

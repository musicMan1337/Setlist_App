import React, { useLayoutEffect, useState } from 'react';

import './loginForm.scss'

import { Button } from 'src/components/utils/tools';

const LoginForm = () => {
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

  return (
    <form className="login-form" onSubmit={() => null}>
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

      {submitButton}
    </form>
  );
};

export default LoginForm;

import React from 'react';

import { LoginForm } from 'src/components';

import { LoginSuccess } from 'src/app/app';

type LoginPageProps = {
  loginSuccess: LoginSuccess;
};

const LoginPage = ({ loginSuccess }: LoginPageProps) => {
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

import React from 'react';

import { LoginForm } from 'src/components';

const LoginPage = ({ loginSuccess }: Types.LoginPageProps) => {
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

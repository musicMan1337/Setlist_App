import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import './app.scss'

import {
  LoginPage,
  HomePage,
  SongsPage,
  SetsPage,
  GigsPage,
  PrivateRoute
} from 'src/routes';

import { Header } from 'src/components';
import { Button } from 'src/components/utils';
import DatabaseContextProvider from 'src/context/databaseContext';

const App = () => {
  const [userName, setUserName] = useState('fake-user');
  const [userId, setUserId] = useState(1);

  const handleLoginSuccess = (user_name, id) => {
    setUserName(user_name);
    setUserId(id);
  };

  const handleLogout = () => {
    setUserName('')
    setUserId(0)
  }

  // TODO - temp for checking route wiring
  const pathSwitch = ['/login', '/', '/songs', '/sets', '/gigs'].map((path) => (
    <Link to={path} key={path}>
      <Button>
        <p>Path for: {path}</p>
      </Button>
    </Link>
  ));

  return (
    <div className="app">
      <Header userName={userName} logout={handleLogout} />
      <div style={{ flexDirection: 'row' }}>{pathSwitch}</div>
      <main className="main-container">
        <DatabaseContextProvider userId={userId}>
          <Switch>
            <Route
              path="/login"
              render={(props) => (
                <LoginPage loginSuccess={handleLoginSuccess} {...props} />
              )}
            />
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/songs" component={SongsPage} />
            <PrivateRoute path="/sets" component={SetsPage} />
            <PrivateRoute path="/gigs" component={GigsPage} />
          </Switch>
        </DatabaseContextProvider>
      </main>
    </div>
  );
};

export default App;

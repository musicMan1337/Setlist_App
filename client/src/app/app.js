import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import {
  LoginPage,
  HomePage,
  SongsPage,
  SetsPage,
  GigsPage,
  PrivateRoute
} from 'src/routes';

import { Header } from 'src/components';
import { MainContainer } from 'src/components/utils/containers';
import { Button } from 'src/components/utils/tools';
import DatabaseContextProvider from 'src/context/databaseContext';

const App = () => {
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
      <Header />
      <div style={{ flexDirection: 'row' }}>{pathSwitch}</div>
      <MainContainer>
        <DatabaseContextProvider>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/songs" component={SongsPage} />
            <PrivateRoute path="/sets" component={SetsPage} />
            <PrivateRoute path="/gigs" component={GigsPage} />
          </Switch>
        </DatabaseContextProvider>
      </MainContainer>
    </div>
  );
};

export default App;

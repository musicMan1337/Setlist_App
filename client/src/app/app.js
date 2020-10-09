import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import {
  LoginPage,
  HomePage,
  SongsView,
  SetsView,
  GigsView,
  PrivateRoute
} from 'src/routes';

import { Header } from 'src/components';
import { Button } from 'src/components/utils/tools';
import config from 'src/config';

const App = () => {
  // temp for checking api wiring
  const [wiring, setWiring] = useState([]);
  const fetcher = async (path) => {
    let testData = null;

    if (path === '/users/login') {
      const body = {
        user_name: 'John Smith',
        password: 'so_secret'
      };
      testData = await fetch(config.API_ENDPOINT + path, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((res) => res.json());
    } else {
      testData = await fetch(config.API_ENDPOINT + path, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      }).then((res) => res.json());
    }

    return setWiring(JSON.stringify(testData));
  };

  const apiSwitch = ['/users/login/', '/songs', '/sets', '/gigs'].map(
    (path) => (
      <Button onClick={() => fetcher(path)} key={path}>
        <h1>Api fetch: {path}</h1>
      </Button>
    )
  );

  // TODO - temp for checking route wiring
  const pathSwitch = ['/login', '/', '/songs', '/sets', '/gigs'].map((path) => (
    <Link to={path} key={path}>
      <Button>
        <h1>Path for: {path}</h1>
      </Button>
    </Link>
  ));

  return (
    <div className="App">
      <Header />
      <div style={{ flexDirection: 'row' }}>{apiSwitch}</div>
      <h2>Path: {wiring}</h2>
      <div style={{ flexDirection: 'row' }}>{pathSwitch}</div>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute path="/songs" component={SongsView} />
        <PrivateRoute path="/sets" component={SetsView} />
        <PrivateRoute path="/gigs" component={GigsView} />
      </Switch>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import * as u from '../components/utils/utils';
import * as r from '../routes';
import PrivateRoute from '../routes/Utils/privateRoute';
// import config from '../config';

const App = () => {
  // TODO - temp for checking api wiring
  const [wiring, setWiring] = useState('');
  const fetcher = async (path) => {
    // const testData = await fetch(config.API_ENDPOINT + path, {
    //   method: 'GET',
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // }).then((res) => res.json());

    return setWiring(path)
    // return setWiring(JSON.parse(testData))
  };

  const apiSwitch = ['/', '/songs', '/sets', '/gigs'].map((path) => (
    <u.Button onClick={() => fetcher(path)} key={path}>
      <h1>Api fetch: {path}</h1>
    </u.Button>
  ));

  // TODO - temp for checking route wiring
  const pathSwitch = ['/login', '/', '/songs', '/sets', '/gigs'].map((path) => (
    <Link to={path} key={path}>
      <u.Button>
        <h1>Path for: {path}</h1>
      </u.Button>
    </Link>
  ));

  return (
    <div className="App">
      <header>TODO-create Header component</header>
      <div style={{ flexDirection: 'row' }}>{apiSwitch}</div>
      <h2>Path: {wiring}</h2>
      <div style={{ flexDirection: 'row' }}>{pathSwitch}</div>
      <Switch>
        <Route path="/login" component={r.LoginPage} />
        <PrivateRoute exact path="/" component={r.HomePage} />
        <PrivateRoute path="/songs" component={r.SongsView} />
        <PrivateRoute path="/sets" component={r.SetsView} />
        <PrivateRoute path="/gigs" component={r.GigsView} />
      </Switch>
    </div>
  );
};

export default App;

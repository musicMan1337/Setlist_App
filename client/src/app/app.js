import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { LoginPage, HomePage, SongsView, SetsView, GigsView } from '../routes';
import PrivateRoute from '../routes/Utils/privateRoute';
import { Button } from '../components/utils/utils';
import config from '../config';

const App = () => {
  // TODO - temp for checking api wiring
  const [wiring, setWiring] = useState('');
  const fetcher = async (path) => {
    console.log(`Fetch: ${path}`);

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
    <Button onClick={() => fetcher(path)} key={path}>
      <h1>Api fetch: {path}</h1>
    </Button>
  ));

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
      <header>TODO-create Header component</header>
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

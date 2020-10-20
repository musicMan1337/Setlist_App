import React from 'react';
import { Link } from 'react-router-dom';

import './homePage.scss';

import { HomeForms } from 'src/components';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="directions">
        <p>Need to create some sets for your band&#39;s next gig?</p>
        <br />
        <p>First, create some songs!</p>
        <br />
        <p>
          Then create a few empty sets, go to the{' '}
          <Link to="/sets">
            <strong>Set-Lists</strong>
          </Link>{' '}
          page and load up your songs into some sets!
        </p>
        <br />
      </div>
      <h1>Create some stuff!</h1>
      <HomeForms />
    </div>
  );
};

export default HomePage;
